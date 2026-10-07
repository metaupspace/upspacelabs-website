'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Route } from 'next';
import { useSelectedLayoutSegments } from 'next/navigation';
import { ArrowRight } from '@metaupspace/icons';
import { SiteFooter as FooterBlock } from '@metaupspace/ui';
import { SOCIAL_ICONS } from '@/lib/brand-icons';
import { hidesFooterCta } from '@/lib/footer';
import type { FooterContent } from '@/lib/types';

/**
 * Set up the same way as the upsentrix-new website's footer.
 *
 * Page guides sit at 6.5625% of the `--frame` width (centred when the viewport is
 * wider). From md up this overrides the block's own side gutter (`--g`, capped at
 * 120px) with the same formula so the footer card and columns line up with the
 * lines at any width. Class names are written out in full so Tailwind can see them.
 */
const FOOTER_LAYOUT =
  'md:[&_.sf-pad]:[--g:max(6.5625vw,calc((100vw_-_var(--frame))_/_2_+_var(--frame)_*_0.065625))]! ' +
  'md:[&_.sf-cta-wrap]:[--g:max(6.5625vw,calc((100vw_-_var(--frame))_/_2_+_var(--frame)_*_0.065625))]! ' +
  'md:[&_.sf-card-body]:max-w-[46rem]! ' +
  // CTA card background in dark mode (the block defaults to neutral-900).
  'dark:[&_.sf-card]:bg-[var(--color-neutral-950)]! ' +
  // Phones: a larger watermark (outer letters may crop); the crop height scales with it.
  'max-md:[&_div[aria-hidden]]:h-[12.2cqw]! max-md:[&_div[aria-hidden]>span]:text-[22cqw]!';

/** Renders `\n`-separated lines with a break from md up (the design stacks the CTA title). */
function Lines({ text }: { text: string }) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {i > 0 && <br className="hidden md:inline" />}
      {i > 0 && <span className="md:hidden"> </span>}
      {line}
    </span>
  ));
}

export function SiteFooter({ content }: { content: FooterContent }) {
  const { logo, cta, columns, socials, copyright } = content;
  // No CTA card on role / apply pages and the policy pages (decided during SSR, so no flash).
  const showCta = !hidesFooterCta(useSelectedLayoutSegments());

  return (
    <FooterBlock
      tone="dark"
      // Match the page guides: same side gutters at every width, card flush to the lines.
      maxWidth={4000}
      // Without the card, sit above the page guides (they overlap the card's top edge, and would poke into the footer).
      className={showCta ? FOOTER_LAYOUT : `${FOOTER_LAYOUT} relative z-30`}
      pageBackground="var(--color-background)"
      watermark="UPSPACE LABS"
      // "UPSPACE LABS" in DM Sans bold is 6.71em wide, so 13.4cqw spans ~90% of the
      // footer like the design (inset, not bleeding). A fixed size avoids the block's
      // auto-fit, which mis-measures on re-render.
      watermarkSize={13.4}
      watermarkColor="#FFFFFF14"
      columnsOffset={0}
      logo={
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className="h-[3.35rem] w-auto"
        />
      }
      copyright={copyright}
      socials={socials.map(({ platform, href }) => {
        const Icon = SOCIAL_ICONS[platform];
        return {
          label: platform,
          href,
          icon: <Icon aria-hidden className="size-4" />,
        };
      })}
      columns={columns.map(col => ({
        title: col.heading,
        links: col.links.map(l => ({ label: l.label, href: l.href })),
      }))}
      cta={
        showCta
          ? {
              title: <Lines text={cta.title} />,
              description: cta.description,
              action: {
                label: cta.action.label,
                href: cta.action.href,
                icon: <ArrowRight aria-hidden className="size-4" />,
                showArrow: true,
              },
              // The upspacelabs design's button blue (upsentrix uses indigo #4F46E5).
              buttonBackground: '#2563EB',
              // The design system's ring placement, in the upspacelabs design's indigo and purple.
              rings: [
                {
                  color: '#6366F1',
                  x: 0,
                  y: 5.2,
                  from: 'top',
                  radius: 21.2,
                  thickness: 8.6,
                },
                {
                  color: '#A855F7',
                  x: 100,
                  y: -1.7,
                  from: 'bottom',
                  radius: 23.2,
                  thickness: 8.75,
                },
              ],
            }
          : undefined
      }
      renderLink={({ href, external, onClick, className, style, children }) =>
        external || !href ? (
          <a
            href={href}
            className={className}
            style={style}
            onClick={onClick}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {children}
          </a>
        ) : (
          <Link
            href={href as Route}
            className={className}
            style={style}
            onClick={onClick}
          >
            {children}
          </Link>
        )
      }
    />
  );
}
