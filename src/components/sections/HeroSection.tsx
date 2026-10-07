import Image from 'next/image';
import { ArrowRight } from '@metaupspace/icons';
import { Hero } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { cn } from '@/lib/utils';
import type { HeroContent } from '@/lib/types';

interface HeroSectionProps {
  content: HeroContent;
  /** Per-page tweaks on top of the home page's look. */
  classNames?: {
    subtitle?: string;
    /** Wrapper of the image — e.g. its gap below the CTAs. */
    media?: string;
    /** The image itself — e.g. rounded corners for a photo. */
    image?: string;
  };
}

/**
 * Page hero — the design system's Hero fed with Strapi content, with the
 * image spanning the page guides. Used by the home and About Us pages.
 */
export function HeroSection({ content, classNames }: HeroSectionProps) {
  const { headline, subtitle, primaryCta, secondaryCta, image } = content;

  return (
    <Hero
      className="pt-32 md:pt-[10.75rem]"
      classNames={{
        content: 'px-6',
        subtitle: classNames?.subtitle,
        media: cn('mt-[45px]', classNames?.media),
      }}
      headline={headline}
      subtitle={subtitle}
      primaryAction={{
        label: primaryCta.label,
        href: primaryCta.href,
        endIcon: <ArrowRight strokeWidth={1.75} />,
      }}
      secondaryAction={
        secondaryCta
          ? { label: secondaryCta.label, href: secondaryCta.href }
          : undefined
      }
      linkComponent={AppLink}
    >
      <InnerGuideContent>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority
          sizes="(min-width: 768px) 87vw, 100vw"
          className={cn('block h-auto w-full', classNames?.image)}
        />
      </InnerGuideContent>
    </Hero>
  );
}
