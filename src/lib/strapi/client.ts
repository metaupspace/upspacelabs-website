const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/+$/, '');
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const STRAPI_CONTACT_API_TOKEN = process.env.STRAPI_CONTACT_API_TOKEN;

/**
 * How long (seconds) Strapi responses are cached before being refetched.
 * Development always refetches, so edits in the admin panel show up on the
 * next page load; production defaults to 5 minutes (STRAPI_REVALIDATE_SECONDS).
 */
const configuredRevalidate = Number(process.env.STRAPI_REVALIDATE_SECONDS);
const DEFAULT_REVALIDATE =
  process.env.NODE_ENV === 'development'
    ? 0
    : Number.isFinite(configuredRevalidate) && configuredRevalidate >= 0
      ? configuredRevalidate
      : 300;

export class StrapiError extends Error {}

export function logStrapiFallback(message: string, error: unknown): void {
  if (error instanceof StrapiError) {
    console.warn(`${message}: ${error.message}`);
    return;
  }

  console.error(`${message}:`, error);
}

interface StrapiResponse<T> {
  data: T;
}

/**
 * Fetches `${STRAPI_URL}/api${path}` and returns the `data` field.
 * Throws `StrapiError` on missing config or non-2xx responses — callers
 * are expected to catch this and fall back to static content.
 */
export async function strapiFetch<T>(
  path: string,
  options?: { revalidate?: number }
): Promise<T> {
  if (!STRAPI_URL) {
    throw new StrapiError('STRAPI_URL is not configured');
  }

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: STRAPI_API_TOKEN
      ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
      : undefined,
    next: { revalidate: options?.revalidate ?? DEFAULT_REVALIDATE },
  });

  if (!res.ok) {
    throw new StrapiError(`Strapi request failed: ${path} (${res.status})`);
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data;
}

/** Writes JSON using the restricted token dedicated to contact submissions. */
export async function strapiPost<T>(path: string, body: unknown): Promise<T> {
  if (!STRAPI_URL) {
    throw new StrapiError('STRAPI_URL is not configured');
  }
  if (!STRAPI_CONTACT_API_TOKEN) {
    throw new StrapiError('STRAPI_CONTACT_API_TOKEN is not configured');
  }

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${STRAPI_CONTACT_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new StrapiError(`Strapi request failed: ${path} (${res.status})`);
  }

  const json: StrapiResponse<T> = await res.json();
  return json.data;
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
}

/** Resolves a Strapi media `url` (which may be relative) to an absolute URL. */
export function strapiMediaUrl(media?: StrapiMedia | null): string {
  if (!media?.url) return '';
  if (media.url.startsWith('http://') || media.url.startsWith('https://')) {
    return media.url;
  }
  return `${STRAPI_URL ?? ''}${media.url}`;
}
