'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from '@metaupspace/icons';
import type { ApiJob, JobDetailLabels } from '@/lib/types';

/** Height of the folded text: 13 lines of 37px. */
const FOLDED_HEIGHT = 481;

const BODY =
  'text-[15px] text-neutral-500 [line-height:30px] md:text-[14px] md:tracking-[-0.02em] md:[line-height:29px] dark:text-neutral-400';

/**
 * "About the role" — the job's description (a paragraph per line) and its
 * requirements as lists — folded to 13 lines behind "View More" when longer.
 */
export function JobDescription({
  job,
  labels,
}: {
  job: ApiJob;
  labels: JobDetailLabels;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el) setOverflows(el.scrollHeight > FOLDED_HEIGHT + 37);
  }, [job]);

  const paragraphs = job.description
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean);
  const groups = (
    [
      [labels.skillsLabel, job.requirements?.skills],
      [labels.experienceLabel, job.requirements?.experience],
      [labels.educationLabel, job.requirements?.education],
      [labels.certificationsLabel, job.requirements?.certifications],
    ] as const
  ).filter(([, items]) => items && items.length > 0);
  const folded = overflows && !open;

  return (
    <section aria-labelledby="about-role">
      <div
        ref={ref}
        id="job-description"
        className="overflow-hidden"
        style={folded ? { maxHeight: FOLDED_HEIGHT } : undefined}
      >
        <h2
          id="about-role"
          className="text-[21px] [line-height:1.3] font-semibold text-black [font-variation-settings:normal] md:text-[18px] md:[line-height:28px] md:font-bold md:tracking-[0.04em] dark:text-white"
        >
          {labels.aboutTitle}
        </h2>
        <div className={`mt-4 ${BODY}`}>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {groups.length > 0 && (
          <>
            <h2 className="mt-8 text-[21px] [line-height:1.3] font-semibold text-black [font-variation-settings:normal] md:text-[18px] md:[line-height:28px] md:font-bold md:tracking-[0.04em] dark:text-white">
              {labels.requirementsTitle}
            </h2>
            <dl className={`mt-4 ${BODY}`}>
              {groups.map(([label, items]) => (
                <div key={label} className="mt-3 first:mt-0">
                  <dt className="font-medium text-black dark:text-white">
                    {label}
                  </dt>
                  <dd>
                    <ul className="list-disc pl-5 marker:text-neutral-400">
                      {items!.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </div>

      {overflows && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls="job-description"
          onClick={() => setOpen(v => !v)}
          className="mt-8 inline-flex items-center gap-2.5 text-[18px] font-medium text-black transition-colors hover:text-[#4F46E5] md:text-[16px] md:[line-height:24px] md:tracking-[-0.02em] dark:text-white"
        >
          {open ? labels.viewLessLabel : labels.viewMoreLabel}
          <ChevronDown
            aria-hidden
            size={20}
            strokeWidth={2}
            className={open ? 'rotate-180' : undefined}
          />
        </button>
      )}
    </section>
  );
}
