import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOpenRoles } from '@/hooks/useOpenRoles';
import { jobsService } from '@/services/jobs.service';
import { useStore } from '@/store';
import type { ApiJob, JobListing } from '@/lib/types';

const FALLBACK: JobListing[] = [
  {
    title: 'Frontend Engineer',
    slug: 'frontend-engineer',
    team: 'Engineering',
    location: 'Delhi',
  },
];

const apiJob = (jobId: string, department: string): ApiJob => ({
  _id: jobId,
  jobId,
  title: `${department} role`,
  department,
  domain: department,
  level: 'Mid',
  employment_type: 'Full-time',
  location: 'Delhi',
  remote: false,
  description: '',
  requirements: {
    skills: [],
    experience: [],
    education: [],
    certifications: [],
  },
  isActive: true,
  createdAt: '2026-01-01',
  updatedAt: '2026-01-01',
});

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider
    client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
  >
    {children}
  </QueryClientProvider>
);

afterEach(() => {
  vi.restoreAllMocks();
  useStore.getState().resetJobsFilters();
});

describe('useOpenRoles', () => {
  it('lists API jobs as rows, filtered by the jobs slice', async () => {
    vi.spyOn(jobsService, 'list').mockResolvedValue([
      apiJob('ENG-1', 'Engineering'),
      apiJob('DES-1', 'Design'),
    ]);
    const { result } = renderHook(() => useOpenRoles(FALLBACK), { wrapper });
    await waitFor(() => expect(result.current.roles).toHaveLength(2));
    expect(result.current.isFallback).toBe(false);
    act(() => useStore.getState().setJobsTeam('Design'));
    expect(result.current.roles.map(r => r.slug)).toEqual(['des-1']);
  });

  it('stays empty when the API has no open roles', async () => {
    vi.spyOn(jobsService, 'list').mockResolvedValue([]);
    const { result } = renderHook(() => useOpenRoles(FALLBACK), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.roles).toEqual([]);
  });

  it('shows the built-in roles while the API is unreachable', async () => {
    vi.spyOn(jobsService, 'list').mockRejectedValue({
      message: 'fetch failed',
      status: 0,
    });
    const { result } = renderHook(() => useOpenRoles(FALLBACK), { wrapper });
    await waitFor(() => expect(result.current.isFallback).toBe(true));
    expect(result.current.roles).toEqual(FALLBACK);
  });
});
