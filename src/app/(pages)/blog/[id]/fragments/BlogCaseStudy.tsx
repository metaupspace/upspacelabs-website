import { CaseStudy, type CaseStudyBlock } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { BlogBlock, BlogPost } from '@/lib/types';

const toBlock = (
  block: BlogBlock,
  index: number,
  blocks: BlogBlock[]
): CaseStudyBlock => {
  const id = `block-${index}`;
  switch (block.type) {
    case 'text':
      return {
        type: 'text',
        id,
        // A section right after another one sits 29px below it — the same gap
        // as after the pull quote (Figma), not the design system's 104px.
        ...(blocks[index - 1]?.type === 'text'
          ? { spacingBefore: '29px' }
          : {}),
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
        // Figma desktop: figures 32/38 SemiBold (-0.2px) over 14/20 labels;
        // headings 16/24 Bold (-2%), text 14/24, the quote 20/33 Medium
        // (-0.2px) with its 18/28 attribution (+4%, the name Bold, the role Medium).
        classNames={{
          sidebar:
            'md:[&_dd]:text-[32px] md:[&_dd]:font-semibold md:[&_dd]:tracking-[-0.2px] md:[&_dd]:[line-height:38px] md:[&_dt]:text-[14px] md:[&_dt]:tracking-[-0.16px] md:[&_dt]:[line-height:20px]',
          heading:
            'md:text-[16px] md:font-bold md:tracking-[-0.02em] md:[line-height:24px]',
          paragraph: 'md:text-[14px] md:[line-height:24px]',
          quote:
            'md:[&_blockquote]:text-[20px] md:[&_blockquote]:font-medium md:[&_blockquote]:tracking-[-0.2px] md:[&_blockquote]:[line-height:33px] md:[&_figcaption]:tracking-[0.04em] md:[&_figcaption_span:last-child]:font-medium',
        }}
      />
    </InnerGuideContent>
  );
}
