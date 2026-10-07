import { ProgressPath } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { ProgressContent } from '@/lib/types';

/**
 * "Our path of progress": the design system's ProgressPath between the page
 * guides. The section pins while scrolling down pans the timeline sideways
 * (the ring follows the current milestone); the title stays in the pinned
 * frame via `header`. The navbar hides while scrolling down, so the stage
 * pins at the very top, padded to clear it when it slides back in. Reduced
 * motion gets a plain horizontally scrollable row instead.
 */
export function AboutProgress({ content }: { content: ProgressContent }) {
  return (
    <InnerGuideContent>
      <ProgressPath
        aria-label={content.title}
        header={
          <div className="mx-auto max-w-[40rem] px-6 text-center">
            <h2 className="text-[30px] [line-height:1.2] font-bold tracking-[-0.02em] text-black [font-variation-settings:normal] md:text-[2.5rem] dark:text-white">
              {content.title}
            </h2>
            {content.description && (
              <p className="mt-3 text-[15px] [line-height:1.5] text-neutral-500 md:text-base dark:text-neutral-400">
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
        spacing="clamp(240px, 26vw, 380px)"
        leadIn="160px"
        leadOut="35vw"
        textOffset="48px"
        textMaxWidth="14rem"
        stemAbove="28px"
        stemBelow="32px"
        hint={content.hint}
        classNames={{
          header: 'mb-[90px]',
          // Top-aligned (not centred in the full-height stage) so it sits close to
          // the section above; 96px clears the navbar when it slides back in.
          stage: 'justify-start pt-24',
          date: 'text-[17px] [line-height:26px]',
          title: 'text-[20px] font-bold [line-height:28px]',
          subtitle: 'mt-0.5 text-[17px] [line-height:26px]',
          description: 'mt-1 text-[17px] [line-height:27px]',
          hint: 'right-8 bottom-8 text-[15px]',
        }}
      />
    </InnerGuideContent>
  );
}
