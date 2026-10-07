import { ChevronRight } from '@metaupspace/icons';
import { FeatureSplit } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { InlineLinks } from '@/components/shared/InlineLinks';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { BlogPost } from '@/lib/types';

/**
 * Top of a blog post — the design system's FeatureSplit as the page header:
 * a "Home ›" breadcrumb, the 40px title (h1) and the summary on the left,
 * a 14.5px / 24px summary, and the cover image (309 : 299, 8px corners)
 * top-aligned on the right.
 */
export function BlogHero({ post }: { post: BlogPost }) {
  return (
    <InnerGuideContent contentClassName="px-6 pt-28 md:px-[60px] md:pt-[8.5rem]">
      <FeatureSplit
        as="div"
        headingLevel="h1"
        size="xl"
        verticalAlign="start"
        mobileOrder="content-first"
        lineBreaks="never"
        mediaWidth="32%"
        mediaMaxWidth="100%"
        mediaAlign="end"
        mediaAspectRatio="309 / 299"
        contentMaxWidth="32.5rem"
        columnGap="2rem"
        eyebrow={
          <nav aria-label="Breadcrumb">
            <AppLink
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              Home
              <ChevronRight aria-hidden size={14} />
            </AppLink>
          </nav>
        }
        title={post.title}
        description={
          post.summary ? (
            <InlineLinks
              text={post.summary}
              linkClassName="underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:text-neutral-900 dark:decoration-neutral-700 dark:hover:text-white"
            />
          ) : undefined
        }
        media={
          <ThemedImage
            image={post.coverImage}
            sizes="(min-width: 768px) 32vw, 100vw"
            className="h-full w-full rounded-lg object-cover"
          />
        }
        classNames={{
          eyebrow: 'mb-5',
          title:
            'text-[2rem] leading-[1.2] [font-variation-settings:normal] md:text-[2.5rem]',
          description:
            'text-[14.5px] leading-6 text-neutral-500 dark:text-neutral-500',
        }}
      />
    </InnerGuideContent>
  );
}
