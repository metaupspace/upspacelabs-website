import { Hero, type HeroClassNames } from '@metaupspace/ui';
import type { SectionHeadingContent } from '@/lib/types';

/** The display-cut heading ("Built for the Demands…"): 32/38 Bold title, 14/20 Medium #737373 description on desktop (Figma). */
export const DISPLAY_HEADING_CLASSNAMES = {
  headline:
    'text-[1.875rem] tracking-normal [font-variation-settings:normal] md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
  subtitle:
    'mt-[10px] text-[1rem] text-neutral-500 [line-height:1.4] md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px] dark:text-neutral-400',
} satisfies HeroClassNames;

interface SectionHeadingProps {
  content: SectionHeadingContent;
  /** Anchor target, e.g. "products" for `/#products`. */
  id?: string;
  /** Spacing around the heading. */
  className?: string;
  /** Merged over the defaults below — sizes, colours, gaps per section. */
  classNames?: HeroClassNames;
  /** Max width of the title, any CSS length (Hero default 46rem). */
  headlineMaxWidth?: string;
  /** Max width of the description, any CSS length (Hero default 35rem). */
  subtitleMaxWidth?: string;
}

/**
 * A section's centred title and description — the design system's Hero
 * without actions, as an `h2`, with the content inset like the page.
 */
export function SectionHeading({
  content,
  id,
  className,
  classNames,
  headlineMaxWidth,
  subtitleMaxWidth,
}: SectionHeadingProps) {
  return (
    <Hero
      id={id}
      headingLevel="h2"
      className={`scroll-mt-[5.375rem] ${className ?? ''}`}
      classNames={{
        ...classNames,
        content: `px-6 ${classNames?.content ?? ''}`,
      }}
      headlineMaxWidth={headlineMaxWidth}
      subtitleMaxWidth={subtitleMaxWidth}
      headline={content.title}
      subtitle={content.description}
    />
  );
}
