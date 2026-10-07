import type { ApiJob, JobListing } from '@/lib/types';

/** A Job Portal job as a row of the /career list; its page is `/career/<job code>`. */
export const toJobListing = (job: ApiJob): JobListing => ({
  title: job.title,
  slug: job.jobId.toLowerCase(),
  team: job.department || null,
  location: job.remote ? `${job.location} / Remote` : job.location || null,
});
