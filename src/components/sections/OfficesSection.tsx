import { InnerGuideContent } from '@/components/layout/PageFrame';
import { OfficeMapCard } from '@/components/shared/OfficeMapCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import type { OfficesContent } from '@/lib/types';

/**
 * "Working in office across two incredible cities": a centred heading over
 * one OfficeMapCard per office (About Us and Career pages) — two side by side from md up (11px apart,
 * inset 24px from the guides), stacked on phones.
 */
export function OfficesSection({
  content,
  subtitleMaxWidth = '30rem',
}: {
  content: OfficesContent;
  /** Max width of the description, any CSS length — to choose where it wraps. */
  subtitleMaxWidth?: string;
}) {
  return (
    <section aria-label={content.title.replace(/\n/g, ' ')}>
      <SectionHeading
        content={content}
        className="pt-20 pb-10 md:pt-24 md:pb-[39px]"
        subtitleMaxWidth={subtitleMaxWidth}
        classNames={{
          content: 'px-6',
          headline:
            'text-[30px] font-semibold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[2.53rem] md:[line-height:1.08]',
          subtitle:
            'mt-[11px] text-[15px] text-neutral-500 [line-height:1.6] md:text-[15.5px] md:[line-height:1.5] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="px-6 pb-6">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[11px]">
          {content.offices.map(office => (
            <li key={office.city}>
              <OfficeMapCard
                label={`Map of our ${office.city} office`}
                mapQuery={office.mapQuery}
                mapZoom={office.mapZoom}
                background={office.background}
                // Phones: a taller card and a wider map so it stays usable.
                className="max-md:aspect-[4/3.6]!"
                classNames={{ frame: 'max-md:h-[78%]! max-md:w-[84%]!' }}
              />
            </li>
          ))}
        </ul>
      </InnerGuideContent>
    </section>
  );
}
