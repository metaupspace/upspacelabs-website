import { ArrowUpRight } from '@metaupspace/icons';
import { ProductShowcase } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { ProductShowcaseContent } from '@/lib/types';

/**
 * "Take a look at some of our Products": a 49px display-cut heading and
 * 20px description (measured from the 0.45× design capture) over the
 * design system's ProductShowcase — auto-advancing product tabs, a
 * screenshot per tab and the feature row — spanning the page guides. Phones
 * get the mobile design instead: a 29px bold heading over 15px text, then the
 * stack of product cards inset 40px, all on a light grey background.
 */
export function ProductShowcaseSection({
  content,
}: {
  content: ProductShowcaseContent;
}) {
  return (
    <div className="bg-neutral-50 md:bg-transparent dark:bg-transparent">
      <SectionHeading
        content={content}
        className="pt-20 pb-10 md:pt-24 md:pb-[51px]"
        headlineMaxWidth="52rem"
        subtitleMaxWidth="38rem"
        classNames={{
          headline:
            'text-[29px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.4] md:text-[3.0625rem] md:font-semibold md:tracking-normal md:[line-height:1.2]',
          subtitle:
            'mt-[11px] text-[15px] tracking-[-0.01em] text-neutral-500 [line-height:1.3] md:text-[1.25rem] md:tracking-normal md:[line-height:1.55] dark:text-neutral-400',
        }}
      />
      <InnerGuideContent contentClassName="px-10 pb-16 md:px-0 md:pb-0">
        <ProductShowcase
          aria-label={content.title}
          items={content.tabs.map((tab, index) => ({
            value: `tab-${index}`,
            label: tab.label,
            badge: tab.badge ?? undefined,
            media: (
              <ThemedImage
                image={tab.image}
                sizes="(min-width: 768px) 87vw, 100vw"
                className="block h-auto w-full"
              />
            ),
            card: tab.card.show
              ? {
                  title: tab.card.title ?? undefined,
                  image: {
                    src: tab.card.image.src,
                    darkSrc: tab.card.image.darkSrc,
                    alt: tab.card.image.alt,
                  },
                  action: tab.card.action
                    ? {
                        ...tab.card.action,
                        endIcon: <ArrowUpRight size={18} strokeWidth={1.75} />,
                      }
                    : undefined,
                }
              : false,
          }))}
          mobileLayout="cards"
          features={content.features}
          classNames={{
            // The designed line breaks (`\n`) only on wide screens; narrower columns wrap naturally.
            featureDescription: 'md:whitespace-normal 2xl:whitespace-pre-line',
          }}
        />
      </InnerGuideContent>
    </div>
  );
}
