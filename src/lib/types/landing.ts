import type { CtaLink } from './shared';

export interface HeroContent {
  /** Line breaks (`\n`) are preserved on md+ screens. */
  headline: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink | null;
}

export interface LandingPageContent {
  hero: HeroContent;
}
