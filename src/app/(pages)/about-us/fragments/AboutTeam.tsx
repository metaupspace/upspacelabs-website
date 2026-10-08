import { CardCarousel } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { TeamContent } from '@/lib/types';

/**
 * "Meet the team": a centred heading over the design system's CardCarousel
 * of square portraits with the name and role under each — auto-scrolling
 * inside the page guides (pauses on hover / touch, still under reduced
 * motion). The `team` id is the hero's "Meet the Team" target. Desktop type
 * from Figma: 32/38 Bold title, 14/20 Medium text; name 18/28 Bold +4%, role 14/20.
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
        className="pt-20 pb-10 md:pt-[60px] md:pb-[40px]"
        subtitleMaxWidth="min(30rem, 432px)"
        classNames={{
          content: 'px-6',
          headline:
            'text-[30px] font-semibold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
          subtitle:
            'mt-[11px] text-[15px] text-neutral-500 [line-height:1.6] md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="pb-16 md:pb-0">
        <CardCarousel
          aria-label={content.title.replace(/\n/g, ' ')}
          autoScroll
          autoScrollSpeed={40}
          cardWidth="min(287px, 70vw)"
          gap="18px"
          edgePadding="28px"
          // Figma desktop: 250px cards 15px apart, 25px inside the guide.
          className="md:[--card-carousel-card-width:250px]! md:[--card-carousel-edge:25px]! md:[--card-carousel-gap:15px]!"
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
              media: 'rounded-lg md:rounded-[9px]',
              body: 'mt-[14px] md:mt-[10px]',
              title:
                'text-[20px] font-bold [font-variation-settings:normal] [line-height:1.2] md:text-[18px] md:tracking-[0.04em] md:[line-height:28px]',
              description:
                'mt-2 text-[16px] text-neutral-500 [line-height:1.3] md:mt-[2px] md:text-[14px] md:tracking-[-0.02em] md:[line-height:20px] dark:text-neutral-400',
            },
          }))}
        />
      </InnerGuideContent>
    </section>
  );
}
