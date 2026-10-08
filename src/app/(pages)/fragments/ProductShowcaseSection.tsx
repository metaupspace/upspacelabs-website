import { ArrowUpRight } from '@metaupspace/icons';
import { ProductShowcase } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { ProductShowcaseContent } from '@/lib/types';

/**
 * "Take a look at some of our Products": a 32/38 Bold heading and 14/20 Medium
 * description (Figma desktop) over the
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
        className="pt-20 pb-10 md:pt-[60px] md:pb-[35px]"
        headlineMaxWidth="52rem"
        // Figma desktop: the description wraps at 414px.
        subtitleMaxWidth="min(38rem, 414px)"
        classNames={{
          headline:
            'text-[29px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.4] md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
          subtitle:
            'mt-[11px] text-[15px] tracking-[-0.01em] text-neutral-500 [line-height:1.3] md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px] dark:text-neutral-400',
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
            // Figma desktop: tabs 14/20 Medium (the active one Bold) with a 10/12
            // Medium badge; features 14/20 over 10/13, both Medium.
            // 60px-tall tabs; the feature row 9px under the screenshot, 30px / 29px padding.
            tab: 'md:h-[60px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
            tabActive: 'md:font-bold md:tracking-normal',
            badge: 'md:text-[10px] md:font-medium md:[line-height:12px]',
            features: 'md:mt-[9px]',
            feature: 'md:pt-[30px] md:pb-[29px]',
            featureTitle:
              'md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
            // The designed line breaks (`\n`) only on wide screens; narrower columns wrap naturally.
            featureDescription:
              'md:mt-[6px] md:text-[10px] md:font-medium md:tracking-[-0.02em] md:[line-height:13px] md:whitespace-normal 2xl:whitespace-pre-line',
          }}
        />
      </InnerGuideContent>
    </div>
  );
}
