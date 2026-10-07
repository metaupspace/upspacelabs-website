import Image from 'next/image';
import { ProductSpotlight } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import type { FeaturedAppsContent } from '@/lib/types';

interface FeaturedAppsProps {
  content: FeaturedAppsContent;
}

/** "Featured apps" card under the products heading — the design system's ProductSpotlight fed with Strapi content. */
export function FeaturedApps({ content }: FeaturedAppsProps) {
  const { label, apps, action, image } = content;

  return (
    <InnerGuideContent contentClassName="px-6 pb-16 md:px-[60px] md:pb-24">
      <ProductSpotlight
        as="section"
        aria-label={label}
        label={label}
        items={apps.map(app => ({
          title: app.title,
          description: app.description || undefined,
          badge: app.badge ?? undefined,
          href: app.href ?? undefined,
        }))}
        action={action ?? undefined}
        media={
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 40vw, 100vw"
            className="block h-auto w-full rounded-[20px]"
          />
        }
        linkComponent={AppLink}
      />
    </InnerGuideContent>
  );
}
