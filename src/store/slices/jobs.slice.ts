import type { StateCreator } from 'zustand';

export interface JobsFilters {
  /** Department to show ("all" for every team). */
  team: string;
  /** Free-text match on title, department and location. */
  search: string;
}

export interface JobsSlice {
  jobsFilters: JobsFilters;
  setJobsTeam: (team: string) => void;
  setJobsSearch: (search: string) => void;
  resetJobsFilters: () => void;
}

export const DEFAULT_JOBS_FILTERS: JobsFilters = { team: 'all', search: '' };

/** Client-side state of the open-roles list (the jobs themselves live in the query cache). */
export const createJobsSlice: StateCreator<
  JobsSlice,
  [],
  [],
  JobsSlice
> = set => ({
  jobsFilters: DEFAULT_JOBS_FILTERS,
  setJobsTeam: team => set(s => ({ jobsFilters: { ...s.jobsFilters, team } })),
  setJobsSearch: search =>
    set(s => ({ jobsFilters: { ...s.jobsFilters, search } })),
  resetJobsFilters: () => set({ jobsFilters: DEFAULT_JOBS_FILTERS }),
});
