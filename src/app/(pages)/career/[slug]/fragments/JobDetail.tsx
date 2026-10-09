'use client';

import { ArrowRight, ChevronRight } from '@metaupspace/icons';
import { StatList } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { useJob } from '@/hooks/useJobs';
import type { ApiJob, JobDetailLabels } from '@/lib/types';
import { JobDescription } from './JobDescription';

/** "Full-time", "internship" → "Full Time", "Internship". */
const titleCase = (value: string) =>
  value.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

function facts(job: ApiJob, labels: JobDetailLabels) {
  return [
    {
      id: 'location',
      label: labels.locationLabel,
      value: job.remote ? `${job.location} / Remote` : job.location,
    },
    {
      id: 'type',
      label: labels.employmentTypeLabel,
      value: titleCase(job.employment_type),
    },
    { id: 'department', label: labels.departmentLabel, value: job.department },
    { id: 'level', label: labels.levelLabel, value: titleCase(job.level) },
  ].filter(fact => fact.value);
}

/**
 * A single open role: a breadcrumb, the title and its key facts (the design
 * system's StatList — label over value, a divider between, a short purple
 * bar on the page guide) on the left; the description, requirements (folded
 * behind "View More") and "Apply Now" on the right. Phones stack the two.
 */
export function JobDetail({
  slug,
  labels,
}: {
  slug: string;
  labels: JobDetailLabels;
}) {
  const { data: job, isError, isPending } = useJob(slug);

  return (
    <InnerGuideContent contentClassName="px-6 pt-28 pb-20 md:pt-[190px] md:pr-[57px] md:pb-24 md:pl-[46px]">
      {job ? (
        <article className="grid gap-12 md:grid-cols-[minmax(0,295px)_minmax(0,1fr)] md:gap-[87px]">
          <header>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-[13.5px] md:text-[12px] md:[line-height:16px] md:font-medium">
                <li>
                  <AppLink
                    href="/"
                    className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  >
                    Home
                  </AppLink>
                </li>
                <li aria-hidden className="text-neutral-500">
                  <ChevronRight size={14} />
                </li>
                <li
                  aria-current="page"
                  className="font-medium text-black dark:text-white"
                >
                  {job.title}
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 text-[28px] [line-height:1.25] font-semibold tracking-[-0.01em] text-black [font-variation-settings:normal] md:text-[24px] md:[line-height:30px] md:tracking-[-0.15px] dark:text-white">
              {job.title}
            </h1>
            <StatList
              as="dl"
              aria-label="Role details"
              size="sm"
              items={facts(job, labels)}
              gap="0px"
              labelMaxWidth="none"
              accentHeight="49px"
              classNames={{
                root: 'mt-[34px]',
                item: 'flex-col border-b border-neutral-300 pt-[26px] pb-[22px] pl-0 last:border-b-0 dark:border-neutral-700',
                label:
                  'mt-0 text-[15.5px] text-neutral-500 [line-height:22px] md:text-[14px] md:tracking-[-0.02em] md:[line-height:20px] dark:text-neutral-400',
                value:
                  'mt-2 text-[20px] font-normal tracking-[-0.01em] [line-height:28px] md:text-[18px] md:font-medium md:tracking-[-0.04em]',
                // On the left page guide, beside each value.
                accent: 'top-[51px] -left-[46px] max-md:hidden',
              }}
            />
          </header>

          <div className="md:pt-2">
            <JobDescription job={job} labels={labels} />
            <AppLink
              href={`/career/${slug}/apply`}
              className="mt-10 flex h-[60px] w-full items-center justify-center gap-3 rounded-[9px] bg-[#4F46E5] text-[17px] font-medium text-white transition-colors hover:bg-[#4338CA] focus-visible:ring-4 focus-visible:ring-[#4F46E5]/30 focus-visible:outline-none md:h-[68px] md:text-[16px] md:[line-height:24px] md:tracking-[-0.02em]"
            >
              {labels.applyLabel}
              <ArrowRight aria-hidden size={20} strokeWidth={2} />
            </AppLink>
          </div>
        </article>
      ) : (
        <p
          role={isError ? 'alert' : 'status'}
          className="py-20 text-center text-neutral-500 dark:text-neutral-400"
        >
          {isPending && !isError ? '…' : labels.unavailableMessage}
        </p>
      )}
    </InnerGuideContent>
  );
}
