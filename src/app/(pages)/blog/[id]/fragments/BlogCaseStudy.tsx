import { CaseStudy, type CaseStudyBlock } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { BlogBlock, BlogPost } from '@/lib/types';

const toBlock = (block: BlogBlock, index: number): CaseStudyBlock => {
  const id = `block-${index}`;
  switch (block.type) {
    case 'text':
      return {
        type: 'text',
        id,
        heading: block.heading ?? undefined,
        paragraphs: block.groups,
      };
    case 'quote':
      return {
        type: 'quote',
        id,
        quote: block.quote,
        author: block.author ?? undefined,
        role: block.role ?? undefined,
      };
    case 'image':
      return {
        type: 'image',
        id,
        src: block.image.src,
        alt: block.image.alt,
        caption: block.caption ?? undefined,
      };
  }
};

/**
 * The post body — the design system's CaseStudy spanning the page guides:
 * the key figures in a sticky sidebar (accent bars on the left guide, clear
 * of the fixed navbar) beside the article blocks (text sections, pull quote,
 * images) in the order they are in Strapi; the quote reaches the right guide.
 */
export function BlogCaseStudy({ post }: { post: BlogPost }) {
  if (!post.body.length) return null;

  return (
    <InnerGuideContent contentClassName="px-6 pt-16 md:pt-24 md:pr-[28px] md:pl-0">
      <CaseStudy
        aria-label={post.title}
        stats={post.stats}
        sidebarPosition={post.stats.length ? 'start' : 'none'}
        stickyTop="7rem"
        // Fill the guides: the article grows with the page instead of the
        // design system's 50.5rem cap, and the right padding above (28px)
        // equals the quote's bleed, so the quote ends on the right guide.
        contentMaxWidth="none"
        blocks={post.body.map(toBlock)}
      />
    </InnerGuideContent>
  );
}
