import { ProgressPath } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { ProgressContent } from '@/lib/types';
import { PinnedPathHeight } from './PinnedPathHeight';
import { SkipProgressButton } from './SkipProgressButton';

/**
 * "Our path of progress": the design system's ProgressPath between the page
 * guides. The section pins while scrolling down pans the timeline sideways
 * (the ring follows the current milestone); the title stays in the pinned
 * frame via `header`. The stage pins just under the sticky navbar (87px).
 * Reduced motion gets a plain horizontally scrollable row instead.
 */
export function AboutProgress({ content }: { content: ProgressContent }) {
  return (
    <InnerGuideContent>
      <PinnedPathHeight>
        <ProgressPath
          aria-label={content.title}
          // Geometry as CSS variables so desktop can take Figma's: milestones
          // 250px apart, the first 130px in, stems 19px (above) / 22px (below),
          // text 33px left of its dot and 153px wide.
          className="pp-zoom-fix [--ab-gap:clamp(240px,26vw,380px)] [--ab-lead:160px] [--ab-offset:48px] [--ab-stem-above:28px] [--ab-stem-below:32px] [--ab-text:14rem] md:[--ab-gap:250px] md:[--ab-lead:130px] md:[--ab-offset:33px] md:[--ab-stem-above:19px] md:[--ab-stem-below:22px] md:[--ab-text:153px]"
          header={
            <div className="mx-auto max-w-[40rem] px-6 text-center">
              <h2 className="text-[30px] [line-height:1.2] font-bold tracking-[-0.02em] text-black [font-variation-settings:normal] md:text-[32px] md:[line-height:38px] md:tracking-[-0.2px] dark:text-white">
                {content.title}
              </h2>
              {content.description && (
                <p className="mt-3 text-[15px] [line-height:1.5] text-neutral-500 md:mt-[8px] md:text-[14px] md:[line-height:20px] md:font-medium md:tracking-[-0.02em] dark:text-neutral-400">
                  {content.description}
                </p>
              )}
            </div>
          }
          items={content.milestones.map((milestone, index) => ({
            id: `milestone-${index}`,
            date: milestone.date ?? undefined,
            title: milestone.title,
            subtitle: milestone.status ?? undefined,
            description: milestone.description ?? undefined,
          }))}
          spacing="var(--ab-gap)"
          leadIn="var(--ab-lead)"
          leadOut="35vw"
          textOffset="var(--ab-offset)"
          textMaxWidth="var(--ab-text)"
          stemAbove="var(--ab-stem-above)"
          stemBelow="var(--ab-stem-below)"
          // A "Skip" button in the corner jumps past the pinned timeline.
          // Pin under the sticky navbar.
          stickyTop="87px"
          hint={
            content.hint ? <SkipProgressButton label={content.hint} /> : null
          }
          classNames={{
            // Figma desktop: 76px from the description to the milestones.
            header: 'mb-[90px] md:mb-[76px]',
            // Top-aligned (not centred in the full-height stage), 40px under the
            // section above (Figma desktop). The rest of the screen under the
            // navbar on zoomed (large) screens too — see PinnedPathHeight.
            stage:
              'h-[calc(100vh/var(--page-zoom)-var(--pp-top))]! justify-start pt-10',
            // Desktop type from Figma: date and status 12/16, title 14/20 Bold
            // -2%, description 12/20, hint 12/16.
            date: 'text-[17px] [line-height:26px] md:text-[12px] md:[line-height:16px]',
            title:
              'text-[20px] font-bold [line-height:28px] md:text-[14px] md:tracking-[-0.02em] md:[line-height:20px]',
            subtitle:
              'mt-0.5 text-[17px] [line-height:26px] md:text-[12px] md:[line-height:16px]',
            description:
              'mt-1 text-[17px] [line-height:27px] md:mt-[2px] md:text-[12px] md:[line-height:20px]',
            hint: 'right-8 bottom-8 text-[15px] md:right-[30px] md:text-[12px] md:[line-height:16px]',
          }}
        />
      </PinnedPathHeight>
    </InnerGuideContent>
  );
}
