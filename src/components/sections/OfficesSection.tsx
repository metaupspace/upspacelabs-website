import { InnerGuideContent } from '@/components/layout/PageFrame';
import { OfficeMapCard } from '@/components/shared/OfficeMapCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';
import type { OfficesContent } from '@/lib/types';

/**
 * The About Us Figma desktop layout: a 32/38 Bold title 8px over 14/20 Medium
 * text (wrapping at 432px), 60px under the section above and 35px over two
 * 530×394 cards 10px apart, inset 20px, each with a 358×276 map (6px corners).
 */
const FIGMA = {
  headline:
    'md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
  subtitle:
    'md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
} as const;

/**
 * "Working in office across two incredible cities": a centred heading over
 * one OfficeMapCard per office (About Us and Career pages) — two side by side from md up (11px apart,
 * inset 24px from the guides), stacked on phones.
 */
export function OfficesSection({
  content,
  variant = 'default',
  subtitleMaxWidth,
}: {
  content: OfficesContent;
  /** `figma`: the About Us Figma desktop layout (see `FIGMA`). */
  variant?: 'default' | 'figma';
  /** Max width of the description, any CSS length — to choose where it wraps. */
  subtitleMaxWidth?: string;
}) {
  const figma = variant === 'figma';
  return (
    <section aria-label={content.title.replace(/\n/g, ' ')}>
      <SectionHeading
        content={content}
        className={
          figma
            ? 'pt-20 pb-10 md:pt-[60px] md:pb-[35px]'
            : 'pt-20 pb-10 md:pt-24 md:pb-[39px]'
        }
        subtitleMaxWidth={subtitleMaxWidth ?? (figma ? '432px' : '30rem')}
        classNames={{
          content: 'px-6',
          headline: cn(
            'text-[30px] font-semibold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[2.53rem] md:[line-height:1.08]',
            figma && FIGMA.headline
          ),
          subtitle: cn(
            'mt-[11px] text-[15px] text-neutral-500 [line-height:1.6] md:text-[15.5px] md:[line-height:1.5] dark:text-neutral-400',
            figma && FIGMA.subtitle
          ),
        }}
      />
      <InnerGuideContent
        contentClassName={figma ? 'px-6 pb-6 md:px-5 md:pb-0' : 'px-6 pb-6'}
      >
        <ul
          className={cn(
            'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[11px]',
            figma && 'md:gap-[10px]'
          )}
        >
          {content.offices.map(office => (
            <li key={office.city}>
              <OfficeMapCard
                label={`Map of our ${office.city} office`}
                mapQuery={office.mapQuery}
                mapZoom={office.mapZoom}
                background={office.background}
                // Phones: a taller card and a wider map so it stays usable.
                className="max-md:aspect-[4/3.6]!"
                {...(figma
                  ? {
                      aspectRatio: '530 / 394',
                      mapWidth: '67.55%',
                      mapHeight: '70.05%',
                    }
                  : {})}
                classNames={{
                  frame: cn(
                    'max-md:h-[78%]! max-md:w-[84%]!',
                    figma && 'md:rounded-[6px]'
                  ),
                }}
              />
            </li>
          ))}
        </ul>
      </InnerGuideContent>
    </section>
  );
}
