import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createJobsSlice, type JobsSlice } from './slices/jobs.slice';

/** All client state, one slice per feature (server data lives in TanStack Query). */
export type RootStore = JobsSlice;

export const useStore = create<RootStore>()(
  devtools((...a) => ({ ...createJobsSlice(...a) }), {
    name: 'upspacelabs-store',
  })
);
