import Image from 'next/image';
import { ArrowRight } from '@metaupspace/icons';
import { ProductShowcase, Testimonial } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import type { CustomerStory } from '@/lib/types';

/**
 * Customer stories — the design system's ProductShowcase in its testimonial
 * form: each tab (company logo + name, along the bottom, subtle style) shows
 * that customer's quote, attribution and story link, auto-advancing.
 * Desktop type from Figma: quote 30/39 Medium, attribution 18/28 Bold,
 * link and tabs 14/20 Medium.
 */
export function CustomerStories({ stories }: { stories: CustomerStory[] }) {
  return (
    // With the page's 96px bottom padding: 105px above the footer (Figma desktop).
    <InnerGuideContent contentClassName="md:pb-[9px]">
      <ProductShowcase
        aria-label="Customer stories"
        tabsPosition="bottom"
        tabStyle="subtle"
        classNames={{
          // Dark mode: lighter dividers (#525252) between dark grey tabs
          // (#171717) so each tab reads as its own box; the active one stays black.
          tab: 'md:h-[60px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px] dark:border-neutral-600 dark:bg-neutral-900',
          tabActive: 'md:font-medium dark:bg-black',
        }}
        items={stories.map((story, index) => ({
          value: `story-${index}`,
          label: story.company,
          icon: (
            <Image
              src={story.logo.src}
              alt=""
              width={27}
              height={27}
              className="size-[27px]"
            />
          ),
          content: (
            <Testimonial
              // Figma desktop: 60px above the 743px-wide quote, 31px to the name,
              // 20px to the link, 84px to the tabs.
              className="px-6 pt-16 pb-16 md:pt-[60px] md:pb-[84px] md:[&_figcaption]:mt-[31px]! md:[&_figcaption+div]:mt-[20px]! md:[&_figcaption+div]:flex md:[&_figcaption+div]:justify-center md:[&_figcaption+div_svg]:size-5"
              maxWidth="743px"
              quote={story.quote}
              author={story.author ?? undefined}
              role={story.role ?? undefined}
              action={
                story.action
                  ? {
                      ...story.action,
                      endIcon: <ArrowRight size={24} strokeWidth={1.75} />,
                    }
                  : undefined
              }
              classNames={{
                quote:
                  'md:text-[30px] md:font-medium md:tracking-[-0.2px] md:[line-height:39px]',
                author:
                  'md:text-[18px] md:font-bold md:tracking-[0.04em] md:[line-height:28px]',
                action:
                  'md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
              }}
              linkComponent={AppLink}
            />
          ),
        }))}
      />
    </InnerGuideContent>
  );
}
