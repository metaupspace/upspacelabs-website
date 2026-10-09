import { ChevronRight } from '@metaupspace/icons';
import { FeatureSplit } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { InlineLinks } from '@/components/shared/InlineLinks';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { BlogPost } from '@/lib/types';

/**
 * Top of a blog post — the design system's FeatureSplit as the page header:
 * a "Home › <post>" breadcrumb (Home in grey, the post in black, both
 * 14/20 Medium as in Figma), the 40px title (h1) and the summary on the left,
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
            <ol className="flex min-w-0 items-center gap-1 text-sm [line-height:20px] font-medium md:tracking-[-0.02em]">
              <li className="shrink-0">
                <AppLink
                  href="/"
                  className="text-[#525252] transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                >
                  Home
                </AppLink>
              </li>
              <li
                aria-hidden
                className="shrink-0 text-[#525252] dark:text-neutral-400"
              >
                <ChevronRight size={14} />
              </li>
              <li
                aria-current="page"
                className="min-w-0 truncate text-black dark:text-white"
              >
                {post.breadcrumbLabel ?? post.title}
              </li>
            </ol>
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
          // Figma desktop: 40/48 SemiBold title (-0.3px), 14/24 Medium summary.
          title:
            'text-[2rem] leading-[1.2] [font-variation-settings:normal] md:text-[2.5rem] md:font-semibold md:tracking-[-0.3px] md:[line-height:48px]',
          description:
            'text-[14.5px] leading-6 text-neutral-500 md:text-[14px] md:font-medium dark:text-neutral-500',
        }}
      />
    </InnerGuideContent>
  );
}
