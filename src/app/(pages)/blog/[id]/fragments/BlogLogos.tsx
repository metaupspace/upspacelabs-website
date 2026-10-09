import { LogoMarquee, type MarqueeLogo } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { BlogPost } from '@/lib/types';

/** Shared look of both rows: logos keep their own grey at full opacity. */
const LOGO_PROPS = {
  logoHeight: 25.6,
  opacity: 1,
  colorOnHover: false,
  // Inverted for dark mode the faint logos get faint too; a zero-blur
  // white drop-shadow stacks a second copy, roughly doubling their opacity.
  logoClassName: 'dark:[&_img]:drop-shadow-[0_0_0_#fff]',
} as const;

/**
 * "UpSentrix Products Used by …": a grey label over greyscale logos — the
 * design system's LogoMarquee, scrolling continuously at every size (pauses
 * on hover, still under reduced motion). Phones: a 15px label over a row
 * running edge to edge, logos 44px apart. From md up: a 12.5px label over a
 * row between the page guides, logos 72px apart.
 */
export function BlogLogos({ post }: { post: BlogPost }) {
  if (!post.logos.length) return null;

  const logos: MarqueeLogo[] = post.logos.map(logo => ({
    name: logo.name,
    src: logo.image.src,
    href: logo.href ?? undefined,
  }));

  return (
    <InnerGuideContent contentClassName="px-6 pt-14 md:px-[60px] md:pt-[57px]">
      <section aria-label={post.logosLabel || 'Logos'}>
        {post.logosLabel && (
          <p className="mb-[30px] text-center text-[15px] font-medium text-[#808080] md:mb-11 md:text-[14px] md:[line-height:28.9px] md:font-semibold dark:text-neutral-500">
            {post.logosLabel}
          </p>
        )}
        {/* Out of the side padding, so logos are cut off at the guides / screen edges. */}
        <LogoMarquee
          {...LOGO_PROPS}
          logos={logos}
          mode="marquee"
          gap={44}
          fade={0}
          className="-mx-6 w-auto md:hidden"
        />
        <LogoMarquee
          {...LOGO_PROPS}
          logos={logos}
          mode="marquee"
          gap={72}
          fade={0}
          className="-mx-[60px] hidden w-auto md:block"
        />
      </section>
    </InnerGuideContent>
  );
}
