import { ArrowUpRight } from '@metaupspace/icons';
import { Badge, BeamLine, Hero } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import type { CareerHeroContent } from '@/lib/types';

/**
 * Staggered entrance: each part fades up in turn (tailwindcss-animate,
 * skipped under reduced motion).
 */
const ENTER =
  'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:fill-mode-both';

/** One beam glowing down an edge of the inner card. */
function EdgeBeam({ side, delay }: { side: 'left' | 'right'; delay: number }) {
  return (
    <span
      className={`absolute inset-y-0 w-[5px] blur-[1px] ${side === 'left' ? '-left-[3px]' : '-right-[3px]'}`}
    >
      <BeamLine
        orientation="vertical"
        lineColor="transparent"
        thickness={5}
        beamLength="120px"
        beamColor="rgba(37, 99, 235, 0.45)"
        duration={5}
        delay={delay}
      />
    </span>
  );
}

/**
 * Top of /career, inside the page's inner card (CareerFrame): a "Now
 * Hiring" pill on a line across the card, the
 * headline, subtitle and a blue "See Open Roles" button — the design
 * system's Hero. Motion, all inside the card: a blue beam runs along the
 * pill's line, two more glow down the card's edges (staggered), the pill's
 * dot pulses, and the content fades up in sequence. Beams and pulse stop
 * under reduced motion. Phones: no card, the pill's line spans the screen.
 */
export function CareerHero({ content }: { content: CareerHeroContent }) {
  const { badge, headline, subtitle, cta } = content;

  return (
    <section className="relative">
      <InnerGuideContent contentClassName="relative">
        {/* Beams down the inner card's edges (the lines are drawn by CareerFrame). */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[7.2%] inset-y-0 hidden md:block"
        >
          <EdgeBeam side="left" delay={0.8} />
          <EdgeBeam side="right" delay={3.3} />
        </div>
        {badge && (
          // The line through the pill's centre (137px + 26.5px), across the card.
          <div className="absolute inset-x-0 top-[136px] md:inset-x-[7.2%] md:top-[163px]">
            <BeamLine
              lineColor="var(--color-neutral-200)"
              className="dark:[background:var(--color-neutral-800)]!"
              beamLength="72px"
              duration={4.5}
              delay={0.4}
            />
          </div>
        )}
        <Hero
          className="pt-28 pb-16 md:pt-[137px] md:pb-24"
          classNames={{
            content: 'px-6',
            eyebrow: `mb-[34px] ${ENTER}`,
            headline: `text-[2.5rem] font-medium tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.15] md:text-[4.5rem] md:[line-height:1.1] ${ENTER} delay-150`,
            subtitle: `mt-6 text-base text-neutral-500 [line-height:1.6] md:text-[1.25rem] md:[line-height:34px] dark:text-neutral-400 ${ENTER} delay-300`,
            actions: `mt-9 ${ENTER} delay-500`,
            primaryAction:
              'h-[65px] rounded-md [&>span]:gap-[18px] bg-[#2563EB] px-[33px] text-[19px] font-medium text-white hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]/30',
          }}
          headlineMaxWidth="48rem"
          subtitleMaxWidth="46rem"
          eyebrow={
            badge ? (
              <Badge
                variant="custom"
                label={badge}
                startIcon={
                  <span aria-hidden className="relative flex size-[17px]">
                    <span className="absolute inline-flex size-full rounded-full bg-[#2563EB] opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-[17px] rounded-full bg-[#2563EB]" />
                  </span>
                }
                className="h-[53px] gap-[14px] rounded-full border border-neutral-200 bg-white px-[29px] text-[17px] font-normal text-black dark:border-neutral-800 dark:bg-black dark:text-white"
              />
            ) : undefined
          }
          headline={headline}
          subtitle={subtitle}
          primaryAction={
            cta
              ? {
                  label: cta.label,
                  href: cta.href,
                  endIcon: <ArrowUpRight size={24} strokeWidth={2} />,
                }
              : undefined
          }
          linkComponent={AppLink}
        />
      </InnerGuideContent>
    </section>
  );
}
