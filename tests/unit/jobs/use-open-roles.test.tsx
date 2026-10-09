import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useOpenRoles } from '@/hooks/useOpenRoles';
import { jobsService } from '@/services/jobs.service';
import { useStore } from '@/store';
import type { ApiJob } from '@/lib/types';

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
    const { result } = renderHook(() => useOpenRoles(), { wrapper });
    await waitFor(() => expect(result.current.roles).toHaveLength(2));
    act(() => useStore.getState().setJobsTeam('Design'));
    expect(result.current.roles?.map(r => r.slug)).toEqual(['des-1']);
  });

  it('stays empty when the API has no open roles', async () => {
    vi.spyOn(jobsService, 'list').mockResolvedValue([]);
    const { result } = renderHook(() => useOpenRoles(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.roles).toEqual([]);
  });

  it('has no roles (section hidden) while the API is unreachable', async () => {
    vi.spyOn(jobsService, 'list').mockRejectedValue({
      message: 'fetch failed',
      status: 0,
    });
    const { result } = renderHook(() => useOpenRoles(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.roles).toBeNull();
  });
});
