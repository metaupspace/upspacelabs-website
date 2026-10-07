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
import { ApplyForm } from './fragments/ApplyForm';

interface ApplyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ApplyPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = await jobsService.get(slug);
    return { title: `Apply — ${job.title}`, robots: { index: false } };
  } catch {
    return { title: 'Apply', robots: { index: false } };
  }
}

/**
 * /career/<job code>/apply — the application form, submitted to the Job
 * Portal API. The job is fetched here (an unknown code is a 404) and handed
 * to the client's query cache.
 */
export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const [{ applyForm, jobDetail }] = await Promise.all([
    getCareerPageContent(),
    queryClient.fetchQuery(jobQueryOptions(slug)).catch((err: JobsApiError) => {
      if (err?.status === 404 || err?.status === 400) notFound();
    }),
  ]);

  return (
    <PageFrame showGuides={false}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ApplyForm
          slug={slug}
          labels={applyForm}
          unavailableMessage={jobDetail.unavailableMessage}
        />
      </HydrationBoundary>
    </PageFrame>
  );
}
