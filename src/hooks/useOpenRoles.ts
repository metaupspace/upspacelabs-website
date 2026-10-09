'use client';

import { useMemo } from 'react';
import { toJobListing } from '@/lib/jobs/listing';
import { filterJobs, selectJobsFilters, useJobsStore } from '@/store';
import { useJobs } from './useJobs';

/**
 * The /career open roles: jobs from the Job Portal API, filtered by the jobs
 * slice and mapped to list rows. `null` until the API answers (and while it
 * is unreachable); an empty (successful) answer stays empty.
 */
export function useOpenRoles() {
  const query = useJobs();
  const filters = useJobsStore(selectJobsFilters);

  const roles = useMemo(
    () =>
      query.data ? filterJobs(query.data, filters).map(toJobListing) : null,
    [query.data, filters]
  );

  return {
    roles,
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}
