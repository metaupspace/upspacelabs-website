import { queryOptions, useQuery } from '@tanstack/react-query';
import { jobsService } from '@/services/jobs.service';
import type { ApiJob, JobsApiError } from '@/lib/types';

export const JOBS_KEY = ['jobs'] as const;
export const JOB_KEY = (identifier: string) =>
  ['jobs', identifier.toLowerCase()] as const;

/** Shared by `useJobs` and the server prefetch on /career (keeps their cache key in sync). */
export const jobsQueryOptions = () =>
  queryOptions<ApiJob[], JobsApiError>({
    queryKey: JOBS_KEY,
    queryFn: () => jobsService.list(),
    staleTime: 5 * 60 * 1000,
  });

export const jobQueryOptions = (identifier: string) =>
  queryOptions<ApiJob, JobsApiError>({
    queryKey: JOB_KEY(identifier),
    queryFn: () => jobsService.get(identifier),
    staleTime: 5 * 60 * 1000,
  });

/** Every active job from the Job Portal API. */
export function useJobs() {
  return useQuery(jobsQueryOptions());
}

/** One job by code or id — for the upcoming /career/<job> page. */
export function useJob(identifier: string | undefined) {
  return useQuery({
    ...jobQueryOptions(identifier ?? ''),
    enabled: Boolean(identifier),
  });
}
