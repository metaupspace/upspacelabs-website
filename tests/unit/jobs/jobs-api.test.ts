import { afterEach, describe, expect, it, vi } from 'vitest';
import { JOBS_API_URL, jobsService } from '@/services/jobs.service';
import { toJobListing } from '@/lib/jobs/listing';
import { filterJobs, jobTeams } from '@/store/selectors/jobs.selectors';
import { DEFAULT_JOBS_FILTERS } from '@/store/slices/jobs.slice';
import type { ApiJob } from '@/lib/types';

const job = (over: Partial<ApiJob> = {}): ApiJob => ({
  _id: '1',
  jobId: 'UDI-001',
  title: 'UI-UX design Intern',
  department: 'Design',
  domain: 'Design',
  level: 'Intern',
  employment_type: 'Internship',
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
  createdAt: '2026-06-03T11:50:43.412Z',
  updatedAt: '2026-06-03T11:50:43.412Z',
  ...over,
});

const respond = (status: number, body: unknown) =>
  vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response(JSON.stringify(body), { status }));

afterEach(() => vi.restoreAllMocks());

describe('jobsService', () => {
  it('lists jobs from /api/jobs, unwrapping the envelope', async () => {
    const fetch = respond(200, {
      success: true,
      statusCode: 200,
      message: 'ok',
      data: [job()],
    });
    await expect(jobsService.list()).resolves.toEqual([job()]);
    expect(fetch.mock.calls[0][0]).toBe(`${JOBS_API_URL}/api/jobs`);
  });

  it('fetches one job by code, URL-encoded', async () => {
    const fetch = respond(200, {
      success: true,
      statusCode: 200,
      message: 'ok',
      data: job(),
    });
    await jobsService.get('UDI 001');
    expect(fetch.mock.calls[0][0]).toBe(`${JOBS_API_URL}/api/jobs/UDI%20001`);
  });

  it('throws the API message and status on errors', async () => {
    respond(404, { success: false, statusCode: 404, message: 'Job not found' });
    await expect(jobsService.get('NOPE')).rejects.toEqual({
      message: 'Job not found',
      status: 404,
    });
  });

  it('reports network failures with status 0', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new TypeError('fetch failed')
    );
    await expect(jobsService.list()).rejects.toEqual({
      message: 'fetch failed',
      status: 0,
    });
  });
});

describe('jobs mapping and filters', () => {
  it('turns a job into a list row linking to /career/<code>', () => {
    expect(toJobListing(job())).toEqual({
      title: 'UI-UX design Intern',
      slug: 'udi-001',
      team: 'Design',
      location: 'Delhi',
    });
    expect(toJobListing(job({ remote: true })).location).toBe('Delhi / Remote');
  });

  it('filters by team and search, newest first', () => {
    const jobs = [
      job({
        jobId: 'A',
        title: 'Backend Engineer',
        department: 'Engineering',
        createdAt: '2026-01-01',
      }),
      job({
        jobId: 'B',
        title: 'Designer',
        department: 'Design',
        createdAt: '2026-03-01',
      }),
      job({
        jobId: 'C',
        title: 'Frontend Engineer',
        department: 'Engineering',
        createdAt: '2026-02-01',
      }),
    ];
    expect(filterJobs(jobs, DEFAULT_JOBS_FILTERS).map(j => j.jobId)).toEqual([
      'B',
      'C',
      'A',
    ]);
    expect(
      filterJobs(jobs, { team: 'Engineering', search: '' }).map(j => j.jobId)
    ).toEqual(['C', 'A']);
    expect(
      filterJobs(jobs, { team: 'all', search: 'front' }).map(j => j.jobId)
    ).toEqual(['C']);
    expect(jobTeams(jobs)).toEqual(['Design', 'Engineering']);
  });
});

describe('job detail labels', () => {
  it('fall back one by one', async () => {
    const { mapJobDetailLabels } = await import('@/lib/strapi/mappers');
    const { careerPageFallback } = await import('@/lib/content/career');
    const labels = mapJobDetailLabels(
      { applyLabel: 'Apply', aboutTitle: ' ' },
      careerPageFallback.jobDetail
    );
    expect(labels.applyLabel).toBe('Apply');
    expect(labels.aboutTitle).toBe(careerPageFallback.jobDetail.aboutTitle);
    expect(mapJobDetailLabels(null, careerPageFallback.jobDetail)).toEqual(
      careerPageFallback.jobDetail
    );
  });
});
