'use client';

import { useMemo } from 'react';
import { toJobListing } from '@/lib/jobs/listing';
import type { JobListing } from '@/lib/types';
import { filterJobs, selectJobsFilters, useJobsStore } from '@/store';
import { useJobs } from './useJobs';

/**
 * The /career open roles: jobs from the Job Portal API, filtered by the jobs
 * slice and mapped to list rows. While the API is unreachable `fallback`
 * shows instead; an empty (successful) answer stays empty.
 */
export function useOpenRoles(fallback: JobListing[]) {
  const query = useJobs();
  const filters = useJobsStore(selectJobsFilters);

  const roles = useMemo(() => {
    if (!query.data) return query.isError ? fallback : [];
    return filterJobs(query.data, filters).map(toJobListing);
  }, [query.data, query.isError, filters, fallback]);

  return {
    roles,
    isLoading: query.isPending,
    isError: query.isError,
    /** True when the list comes from the built-in fallback, not the API. */
    isFallback: !query.data && query.isError,
    refetch: query.refetch,
  };
}
