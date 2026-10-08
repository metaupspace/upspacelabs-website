import { ArrowRight } from '@metaupspace/icons';
import { CardCarousel } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';
import type { CardCarouselContent } from '@/lib/types';

/**
 * The Figma desktop layout of the home and About Us carousels: a 32/38 Bold
 * title (wrapping at 490px) 8px over 14/20 Medium text (452px), 34px above
 * 305px cards 18px apart — a 305×297 image (7px corners), 15px gap, 16/24
 * Medium title, 6px, 12/16 text, 10px, 14/20 Medium link with a 20px arrow.
 */
const FIGMA = {
  headingClassName: 'pt-20 pb-10 md:pt-[60px] md:pb-[34px]',
  headlineMaxWidth: '490px',
  subtitleMaxWidth: '452px',
  headline:
    'md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
  subtitle:
    'md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
  // The link's wrapper as a flex row (no inline line box), 10px under the text.
  card: 'md:[&_p+div]:mt-[10px]! md:[&_p+div]:flex md:[&_a_svg]:size-5 md:[&_h3]:text-[16px] md:[&_h3]:font-medium md:[&_h3]:tracking-[-0.02em] md:[&_h3]:[line-height:24px] md:[&_p]:text-[12px] md:[&_p]:[line-height:16px] md:[&_a]:text-[14px] md:[&_a]:font-medium md:[&_a]:tracking-[-0.02em] md:[&_a]:[line-height:20px]',
  item: {
    media: 'md:rounded-[7px]',
    body: 'md:mt-[15px]',
    description: 'md:mt-[6px]',
  },
} as const;

/**
 * A heading over the design system's CardCarousel — the home and About Us
 * "Building a foundation…" / stories sections, the Career page's and a blog
 * post's "More stories". Scrolls sideways (drag, trackpad, touch; snapping
 * to each card, no auto-scroll) inside the page guides from
 * md up, stacked full width (inset 43px) on phones, under the 31px bold mobile
 * heading. `variant="figma"` is the Figma desktop layout (see `FIGMA`); the
 * default is the older 398px-card look (44px title, 18px description).
 */
export function CardCarouselSection({
  content,
  variant = 'default',
  headlineMaxWidth,
  headingClassName,
  carouselClassName = 'px-[43px] pb-16 md:px-0 md:pb-24',
}: {
  content: CardCarouselContent;
  /** `figma`: the home / About Us Figma desktop layout. */
  variant?: 'default' | 'figma';
  /** Max width of the title, any CSS length — to choose where it wraps. */
  headlineMaxWidth?: string;
  /** Spacing around the heading. Default "pt-20 pb-10 md:pt-24 md:pb-12". */
  headingClassName?: string;
  /** Spacing around the cards. Default "px-[43px] pb-16 md:px-0 md:pb-24". */
  carouselClassName?: string;
}) {
  const figma = variant === 'figma';

  return (
    <>
      <SectionHeading
        content={content}
        className={
          headingClassName ??
          (figma ? FIGMA.headingClassName : 'pt-20 pb-10 md:pt-24 md:pb-12')
        }
        headlineMaxWidth={
          headlineMaxWidth ?? (figma ? FIGMA.headlineMaxWidth : undefined)
        }
        subtitleMaxWidth={figma ? FIGMA.subtitleMaxWidth : '37.5rem'}
        classNames={{
          content: 'px-5 md:px-6',
          headline: cn(
            'text-[31px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.4] md:text-[2.75rem] md:font-semibold md:tracking-normal md:[line-height:1.2]',
            figma && FIGMA.headline
          ),
          subtitle: cn(
            'mt-[11px] text-[15px] tracking-[-0.01em] text-neutral-500 [line-height:20px] md:text-[1.125rem] md:tracking-normal md:[line-height:1.5] dark:text-neutral-400',
            figma && FIGMA.subtitle
          ),
        }}
      />
      <InnerGuideContent contentClassName={carouselClassName}>
        <CardCarousel
          aria-label={content.title}
          mobileLayout="stack"
          // No auto-scroll: visitors scroll the cards themselves.
          {...(figma
            ? { cardWidth: '305px', gap: '18px', edgePadding: '8px' }
            : {})}
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
            ...(figma ? { classNames: FIGMA.item } : {}),
          }))}
          classNames={figma ? { card: FIGMA.card } : undefined}
          linkComponent={AppLink}
        />
      </InnerGuideContent>
    </>
  );
}
