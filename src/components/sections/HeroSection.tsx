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
    /** The section — e.g. its top padding. */
    root?: string;
    headline?: string;
    subtitle?: string;
    /** Both buttons. */
    actions?: string;
    /** The second button only, after `actions`. */
    secondaryAction?: string;
    /** The row holding the buttons — e.g. its gap below the description. */
    actionsRow?: string;
    /** Wrapper of the image — e.g. its gap below the CTAs. */
    media?: string;
    /** Box around the image that crops it — e.g. a fixed aspect ratio. */
    frame?: string;
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
      className={cn('pt-32 md:pt-[10.75rem]', classNames?.root)}
      classNames={{
        content: 'px-6',
        headline: classNames?.headline,
        subtitle: classNames?.subtitle,
        actions: classNames?.actionsRow,
        primaryAction: classNames?.actions,
        secondaryAction: cn(classNames?.actions, classNames?.secondaryAction),
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
        <div className={cn('overflow-hidden', classNames?.frame)}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            sizes="(min-width: 768px) 87vw, 100vw"
            className={cn('block h-auto w-full', classNames?.image)}
          />
        </div>
      </InnerGuideContent>
    </Hero>
  );
}
