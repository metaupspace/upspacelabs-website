import { ArrowRight } from '@metaupspace/icons';
import { CardCarousel } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { CardCarouselContent } from '@/lib/types';

/**
 * A heading over the design system's CardCarousel — the home page's
 * "Building a foundation…" section and a blog post's "More stories".
 * The carousel: — 398px cards 24px apart, auto-scrolling
 * (marquee) inside the page guides from md up, stacked full width (inset 43px) on phones.
 * Desktop: 18px description 48px above the cards (1.51× design capture);
 * phones: the 31px bold mobile heading.
 */
export function CardCarouselSection({
  content,
  headlineMaxWidth,
  headingClassName = 'pt-20 pb-10 md:pt-24 md:pb-12',
}: {
  content: CardCarouselContent;
  /** Max width of the title, any CSS length — to choose where it wraps. */
  headlineMaxWidth?: string;
  /** Spacing around the heading. Default "pt-20 pb-10 md:pt-24 md:pb-12". */
  headingClassName?: string;
}) {
  return (
    <>
      <SectionHeading
        content={content}
        className={headingClassName}
        headlineMaxWidth={headlineMaxWidth}
        subtitleMaxWidth="37.5rem"
        classNames={{
          content: 'px-5 md:px-6',
          headline:
            'text-[31px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.4] md:text-[2.75rem] md:font-semibold md:tracking-normal md:[line-height:1.2]',
          subtitle:
            'mt-[11px] text-[15px] tracking-[-0.01em] text-neutral-500 [line-height:20px] md:text-[1.125rem] md:tracking-normal md:[line-height:1.5] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="px-[43px] pb-16 md:px-0 md:pb-24">
        <CardCarousel
          aria-label={content.title}
          mobileLayout="stack"
          // Continuous marquee on desktop at 80px/s (design-system default 40); pauses on hover/focus/touch and respects reduced motion.
          autoScroll
          autoScrollSpeed={80}
          items={content.cards.map((card, index) => ({
            id: `card-${index}`,
            title: card.title,
            description: card.description || undefined,
            image: {
              src: card.image.src,
              alt: card.image.alt,
              darkSrc: card.image.darkSrc,
            },
            action: card.action
              ? {
                  ...card.action,
                  endIcon: <ArrowRight size={24} strokeWidth={1.75} />,
                }
              : undefined,
          }))}
          linkComponent={AppLink}
        />
      </InnerGuideContent>
    </>
  );
}
