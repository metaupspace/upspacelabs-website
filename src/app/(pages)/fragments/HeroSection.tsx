import Image from 'next/image';
import { ArrowRight } from '@metaupspace/icons';
import { Hero } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import type { HeroContent } from '@/lib/types';

interface HeroSectionProps {
  content: HeroContent;
}

/** Landing hero — the design system's Hero fed with Strapi content, with the product shot spanning the page guides. */
export function HeroSection({ content }: HeroSectionProps) {
  const { headline, subtitle, primaryCta, secondaryCta, image } = content;

  return (
    <Hero
      className="pt-32 md:pt-[10.75rem]"
      classNames={{ content: 'px-6', media: 'mt-[45px]' }}
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
          className="block h-auto w-full"
        />
      </InnerGuideContent>
    </Hero>
  );
}
