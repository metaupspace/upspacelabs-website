import { FeatureSplit, Globe, type GlobeArc } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { FoundedContent } from '@/lib/types';

/**
 * "Founded in Delhi": the title and paragraphs on the left, the design
 * system's dotted Globe on the right with arcs out of the office. From md up
 * the globe is larger than its column and the column crops it (FeatureSplit's
 * media box hides overflow), so it bleeds off the right and bottom; sizes are
 * in container units so the crop holds at every width. Phones: the text, then
 * the whole globe.
 */
export function AboutFounded({ content }: { content: FoundedContent }) {
  const arcs: GlobeArc[] = content.connections.map((place, index) => ({
    id: place.label ?? `arc-${index}`,
    from: content.office,
    to: { lat: place.lat, lng: place.lng },
    altitude: place.altitude ?? undefined,
  }));

  return (
    <InnerGuideContent contentClassName="px-6 pt-20 md:pt-24 md:pr-0 md:pl-[55px]">
      <FeatureSplit
        size="xl"
        mobileOrder="content-first"
        lineBreaks="never"
        title={content.title}
        description={content.paragraphs.map((paragraph, index) => (
          <span key={index} className="block [&+&]:mt-4 md:[&+&]:mt-[28px]">
            {paragraph}
          </span>
        ))}
        mediaWidth="47%"
        mediaMaxWidth="none"
        mediaAspectRatio="937 / 823"
        contentMaxWidth="38rem"
        classNames={{
          // Phones: centred text.
          content: 'max-md:items-center max-md:text-center',
          title:
            'text-[26px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.2] md:text-[48px]',
          description:
            'mt-[22px] text-[13.25px] text-neutral-500 [line-height:17.5px] md:mt-[13px] md:text-[17px] md:[line-height:28px] dark:text-neutral-400',
          // Phones: a wide, short box bleeding to the screen's right edge.
          media:
            '[container-type:inline-size] max-md:-mr-6 max-md:w-[calc(100%+24px)] max-md:aspect-[366/261]!',
        }}
        media={
          // Larger than its box, which crops it: phones bottom right,
          // from md up off the right and bottom of the column.
          <div className="absolute top-[-3cqw] left-[12cqw] w-[126cqw] md:top-[calc(81%-64cqw)] md:left-[calc(60%-64cqw)] md:w-[128cqw]">
            <Globe
              arcs={arcs}
              center={{ lat: 18, lng: 108 }}
              aria-label={`Globe with arcs from our office to ${content.connections
                .map(place => place.label)
                .filter(Boolean)
                .join(', ')}`}
            />
          </div>
        }
      />
    </InnerGuideContent>
  );
}
