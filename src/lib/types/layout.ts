import type { CtaLink, ImageAsset, NavLink } from './shared';

export interface NavContent {
  /** Light-mode logo; `darkSrc` is the dark-mode (white) version. */
  logo: ImageAsset;
  links: NavLink[];
  ctaText: string;
  ctaHref: string;
  /** Label beside the theme switch in the mobile menu. */
  appearanceLabel: string;
}

export type SocialPlatform =
  'linkedin' | 'twitter' | 'instagram' | 'github' | 'youtube';

export interface FooterColumnContent {
  heading: string;
  links: NavLink[];
}

export interface FooterSocialContent {
  platform: SocialPlatform;
  href: string;
}

export interface FooterContent {
  /** White mark shown on the black footer. */
  logo: ImageAsset;
  /** Card above the footer. `\n` in the title stacks it from md up. */
  cta: { title: string; description: string; action: CtaLink };
  columns: FooterColumnContent[];
  socials: FooterSocialContent[];
  copyright: string;
}

/** Everything the root layout needs from the CMS. */
export interface LayoutContent {
  nav: NavContent;
  footer: FooterContent;
}
