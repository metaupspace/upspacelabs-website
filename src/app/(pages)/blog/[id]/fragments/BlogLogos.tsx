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
 * design system's LogoMarquee. Phones: a 15px label over one row that
 * scrolls edge to edge (logos 44px apart, cut off at the screen edges).
 * From md up: a 12.5px label over a centred, static row 72px apart.
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
          <p className="mb-[30px] text-center text-[15px] font-medium text-[#808080] md:mb-11 md:text-[12.5px] dark:text-neutral-500">
            {post.logosLabel}
          </p>
        )}
        {/* Phones: full-bleed marquee (out of the 24px gutter), no edge fade. */}
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
          mode="static"
          gap={72}
          className="hidden md:block"
        />
      </section>
    </InnerGuideContent>
  );
}
