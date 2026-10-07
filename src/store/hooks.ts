import { useStore, type RootStore } from './store';

/** Jobs slice of the store, read through a selector. */
export function useJobsStore<T>(selector: (state: RootStore) => T): T {
  return useStore(selector);
}
