import type { ApiJob } from '@/lib/types';
import type { RootStore } from '../store';
import type { JobsFilters } from '../slices/jobs.slice';

export const selectJobsFilters = (state: RootStore) => state.jobsFilters;
export const selectSetJobsTeam = (state: RootStore) => state.setJobsTeam;
export const selectSetJobsSearch = (state: RootStore) => state.setJobsSearch;

/** Jobs matching the filters, newest first. */
export function filterJobs(jobs: ApiJob[], filters: JobsFilters): ApiJob[] {
  const search = filters.search.trim().toLowerCase();
  return jobs
    .filter(job => filters.team === 'all' || job.department === filters.team)
    .filter(
      job =>
        !search ||
        [job.title, job.department, job.location].some(value =>
          value.toLowerCase().includes(search)
        )
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Every department present, for a team filter. */
export const jobTeams = (jobs: ApiJob[]): string[] =>
  [...new Set(jobs.map(job => job.department))].sort();
