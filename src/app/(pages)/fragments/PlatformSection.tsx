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
 * "Built for the Demands of Modern Business": a heading (38px title in DM
 * Sans' display optical size, no tracking; 16px #737373 description) over alternating
 * FeatureSplit rows. From md up the rows sit 6.7% inside the page guides
 * with a 14% gap between text and illustration, 80px apart.
 */
export function PlatformSection({ heading, rows }: PlatformSectionProps) {
  return (
    <>
      <SectionHeading
        content={heading}
        className="pt-20 pb-12 md:pt-24 md:pb-[60px]"
        classNames={DISPLAY_HEADING_CLASSNAMES}
      />
      <InnerGuideContent contentClassName="flex flex-col gap-16 px-6 pb-16 md:gap-20 md:px-[6.7%] md:pb-24">
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
                sizes="(min-width: 768px) 466px, 100vw"
                className="block h-auto w-full"
              />
            }
            mediaPosition={row.imagePosition === 'left' ? 'start' : 'end'}
            mobileOrder="media-first"
            columnGap="14%"
            headingLevel="h3"
            linkComponent={AppLink}
          />
        ))}
      </InnerGuideContent>
    </>
  );
}
