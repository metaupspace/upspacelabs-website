import { ArrowUpRight } from '@metaupspace/icons';
import { FeatureSplit } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import {
  DISPLAY_HEADING_CLASSNAMES,
  SectionHeading,
} from '@/components/shared/SectionHeading';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { FeatureRowContent, SectionHeadingContent } from '@/lib/types';

interface PlatformSectionProps {
  heading: SectionHeadingContent;
  rows: FeatureRowContent[];
}

/**
 * "Built for the Demands of Modern Business": a heading (32px title in DM
 * Sans' display optical size, no tracking; 14px #737373 description) over alternating
 * FeatureSplit rows (28/36 Bold title, 14/24 text, 14/20 Medium link on desktop, per Figma). From md up the rows sit 6.7% inside the page guides
 * with a 14% gap between text and illustration, 80px apart.
 */
export function PlatformSection({ heading, rows }: PlatformSectionProps) {
  return (
    <>
      <SectionHeading
        content={heading}
        className="pt-20 pb-12 md:pt-[60px] md:pb-[35px]"
        classNames={DISPLAY_HEADING_CLASSNAMES}
      />
      <InnerGuideContent contentClassName="flex flex-col gap-16 px-6 pb-16 md:gap-[30px] md:px-[33px] md:pb-0">
        {rows.map((row, index) => (
          <FeatureSplit
            key={index}
            title={row.title}
            description={row.description || undefined}
            action={
              row.action
                ? {
                    ...row.action,
                    endIcon: <ArrowUpRight size={20} strokeWidth={1.75} />,
                  }
                : undefined
            }
            media={
              <ThemedImage
                image={row.image}
                sizes="(min-width: 768px) 513px, 100vw"
                className="block h-auto w-full md:aspect-[513/392] md:rounded-[20px] md:object-cover"
              />
            }
            mediaPosition={row.imagePosition === 'left' ? 'start' : 'end'}
            mobileOrder="media-first"
            // Figma desktop: 513×392 image 33px inside the guide, 85px from the
            // text; the text inset a further 40px when the image is on the right.
            mediaWidth="513px"
            mediaMaxWidth="none"
            columnGap="85px"
            headingLevel="h3"
            classNames={{
              content: row.imagePosition === 'left' ? undefined : 'md:pl-10',
              title:
                'md:text-[28px] md:font-bold md:tracking-[-0.15px] md:[line-height:36px]',
              description: 'md:mt-[11px] md:text-[14px] md:[line-height:24px]',
              action:
                'md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
            }}
            linkComponent={AppLink}
          />
        ))}
      </InnerGuideContent>
    </>
  );
}
