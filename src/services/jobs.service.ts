import type {
  ApiJob,
  ApplicationRequest,
  ApplicationResponse,
  JobsApiEnvelope,
  JobsApiError,
} from '@/lib/types';

/**
 * Base URL of the Job Portal backend (Job_Portal_Backend, NestJS). Public, as
 * the browser calls it directly (the API allows any origin).
 */
export const JOBS_API_URL = (
  process.env.NEXT_PUBLIC_JOBS_API_URL ??
  'https://your-job-portal.upspacelabs.com'
).replace(/\/+$/, '');

/** How long (seconds) server-side job fetches are cached. */
const REVALIDATE_SECONDS = 300;

/** Call a path under `/api` and unwrap the `{ success, data }` envelope; failures throw a `JobsApiError`. */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const write = Boolean(init?.method && init.method !== 'GET');
  let res: Response;
  try {
    res = await fetch(`${JOBS_API_URL}/api${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
      // Reads are cached on the server (Next's data cache; ignored in the browser).
      ...(write
        ? { cache: 'no-store' }
        : { next: { revalidate: REVALIDATE_SECONDS } }),
    });
  } catch (cause) {
    const err: JobsApiError = {
      message: cause instanceof Error ? cause.message : 'Network error',
      status: 0,
    };
    throw err;
  }
  const body = (await res.json().catch(() => null)) as
    (Partial<JobsApiEnvelope<T>> & { message?: string | string[] }) | null;
  if (!res.ok || !body?.success) {
    const message = Array.isArray(body?.message)
      ? body.message.join(', ')
      : body?.message;
    const err: JobsApiError = {
      message: message || res.statusText || 'Request failed',
      status: res.status,
    };
    throw err;
  }
  return body.data as T;
}

export const jobsService = {
  /** Every active job. */
  list: () => request<ApiJob[]>('/jobs'),
  /** One active job by its code ("UDI-001", any case) or MongoDB id. */
  get: (identifier: string) =>
    request<ApiJob>(`/jobs/${encodeURIComponent(identifier)}`),
  /** Upload a résumé (PDF or Word, max 5 MB); resolves to its hosted URL. */
  uploadResume: (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return request<{ url: string }>('/upload/resume', { method: 'POST', body });
  },
  /** Apply to a job (code or id). 409: already applied with this email; 429: too many attempts. */
  apply: (jobIdentifier: string, application: ApplicationRequest) =>
    request<ApplicationResponse>(
      `/applications/${encodeURIComponent(jobIdentifier)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application),
      }
    ),
};
