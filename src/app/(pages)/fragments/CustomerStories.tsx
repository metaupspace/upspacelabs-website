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
 */
export function CustomerStories({ stories }: { stories: CustomerStory[] }) {
  return (
    <InnerGuideContent>
      <ProductShowcase
        aria-label="Customer stories"
        tabsPosition="bottom"
        tabStyle="subtle"
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
              className="px-6 pt-16 pb-16 md:pt-[136px] md:pb-[122px]"
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
              linkComponent={AppLink}
            />
          ),
        }))}
      />
    </InnerGuideContent>
  );
}
