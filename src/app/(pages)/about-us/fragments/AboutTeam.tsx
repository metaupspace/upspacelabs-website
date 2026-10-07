import { CardCarousel } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { TeamContent } from '@/lib/types';

/**
 * "Meet the team": a centred heading over the design system's CardCarousel
 * of square portraits with the name and role under each — auto-scrolling
 * inside the page guides (pauses on hover / touch, still under reduced
 * motion). The `team` id is the hero's "Meet the Team" target.
 */
export function AboutTeam({ content }: { content: TeamContent }) {
  return (
    <section
      id="team"
      aria-label={content.title.replace(/\n/g, ' ')}
      className="scroll-mt-24"
    >
      <SectionHeading
        content={content}
        className="pt-20 pb-10 md:pt-24 md:pb-[43px]"
        subtitleMaxWidth="30rem"
        classNames={{
          content: 'px-6',
          headline:
            'text-[30px] font-semibold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[2.4375rem] md:[line-height:1.1]',
          subtitle:
            'mt-[11px] text-[15px] text-neutral-500 [line-height:1.6] md:text-[15.5px] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="pb-16 md:pb-24">
        <CardCarousel
          aria-label={content.title.replace(/\n/g, ' ')}
          autoScroll
          autoScrollSpeed={40}
          cardWidth="min(287px, 70vw)"
          gap="18px"
          edgePadding="28px"
          items={content.members.map((member, index) => ({
            id: `member-${index}`,
            title: member.name,
            description: member.role ?? undefined,
            image: {
              src: member.photo.src,
              darkSrc: member.photo.darkSrc,
              alt: member.photo.alt,
            },
            mediaAspectRatio: '1 / 1',
            headingLevel: 'h3',
            classNames: {
              media: 'rounded-lg',
              body: 'mt-[14px]',
              title:
                'text-[20px] font-bold [font-variation-settings:normal] [line-height:1.2]',
              description:
                'mt-2 text-[16px] text-neutral-500 [line-height:1.3] dark:text-neutral-400',
            },
          }))}
        />
      </InnerGuideContent>
    </section>
  );
}
