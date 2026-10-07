import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import PageFrame from '@/components/layout/PageFrame';
import { jobQueryOptions } from '@/hooks/useJobs';
import { getCareerPageContent } from '@/lib/content/career';
import type { JobsApiError } from '@/lib/types';
import { jobsService } from '@/services/jobs.service';
import { JobDetail } from './fragments/JobDetail';

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = await jobsService.get(slug);
    return {
      title: `${job.title} — Careers`,
      description: job.description.slice(0, 160),
    };
  } catch {
    return { title: 'Careers' };
  }
}

/**
 * One open role, /career/<job code> (e.g. /career/udi-001), from the Job
 * Portal API. The job is fetched here (so it is in the HTML) and handed to
 * the client's query cache; an unknown code is a 404, while an unreachable
 * API renders the page's "couldn't load" message (the client retries).
 */
export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const [{ jobDetail }] = await Promise.all([
    getCareerPageContent(),
    queryClient.fetchQuery(jobQueryOptions(slug)).catch((err: JobsApiError) => {
      if (err?.status === 404 || err?.status === 400) notFound();
    }),
  ]);

  return (
    <PageFrame showGuides={false}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <JobDetail slug={slug} labels={jobDetail} />
      </HydrationBoundary>
    </PageFrame>
  );
}
