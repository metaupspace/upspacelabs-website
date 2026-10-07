import { ArrowRight } from '@metaupspace/icons';
import { MediaCard } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import type { BlogCard } from '@/lib/types';

/**
 * Every post as a design-system MediaCard in a static grid — 3 per row on
 * desktop, 2 on tablets, 1 on phones; images at the design's 223 : 197.
 */
export function BlogGrid({ posts }: { posts: BlogCard[] }) {
  return (
    <InnerGuideContent contentClassName="px-6 md:px-10">
      <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <MediaCard
            key={post.slug}
            as="li"
            headingLevel="h2"
            mediaAspectRatio="223 / 197"
            title={post.title}
            description={post.excerpt || undefined}
            image={{
              src: post.coverImage.src,
              alt: post.coverImage.alt,
              darkSrc: post.coverImage.darkSrc,
            }}
            action={{
              label: 'Read More',
              href: `/blog/${post.slug}`,
              endIcon: <ArrowRight size={24} strokeWidth={1.75} />,
              'aria-label': `Read more: ${post.title}`,
            }}
            linkComponent={AppLink}
          />
        ))}
      </ul>
    </InnerGuideContent>
  );
}
