import type { CtaLink, ImageAsset } from './shared';

export interface HeroContent {
  /** Line breaks (`\n`) are preserved on md+ screens. */
  headline: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink | null;
  /** Product shot below the CTAs, spanning the page guides. */
  image: ImageAsset;
}

export interface LandingPageContent {
  hero: HeroContent;
}
