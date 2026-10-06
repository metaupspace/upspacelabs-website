import { ChevronRight } from '@metaupspace/icons';
import { Hero } from '@metaupspace/ui';
import { AppLink } from '@/components/shared/AppLink';
import type { BlogPageContent } from '@/lib/types';

/**
 * /blog header — the design system's Hero (no actions) as the page `h1`: a
 * centred "Home › Blog" breadcrumb, a 54px display-cut title and an 18px
 * grey description (measured from the 0.58× design capture).
 */
export function BlogListHeader({ content }: { content: BlogPageContent }) {
  return (
    <Hero
      as="header"
      headingLevel="h1"
      className="pt-28 pb-10 md:pt-[8.5rem] md:pb-[50px]"
      headlineMaxWidth="44rem"
      subtitleMaxWidth="37.5rem"
      eyebrow={
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm">
            <li>
              <AppLink
                href="/"
                className="text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
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
              {content.breadcrumbLabel}
            </li>
          </ol>
        </nav>
      }
      headline={content.title}
      subtitle={content.description}
      lineBreaks="never"
      classNames={{
        content: 'px-6',
        eyebrow: 'mb-[22px]',
        headline:
          'text-[2.25rem] tracking-[-0.01em] [font-variation-settings:normal] md:text-[3.375rem]',
        subtitle:
          'mt-3 text-[15px] text-neutral-500 [line-height:1.5] md:text-[1.125rem] dark:text-neutral-400',
      }}
    />
  );
}
