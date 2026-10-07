/** Navbar and footer (Strapi's Navigation single type). */

import { strapiMediaUrl, type StrapiMedia } from '@/lib/strapi/client';
import type {
  FooterColumnContent,
  FooterContent,
  FooterSocialContent,
  ImageAsset,
  NavContent,
  NavLink,
  SocialPlatform,
} from '@/lib/types';
import { mapCta, mapImage, text } from './shared';

interface RawNavLink {
  label?: string | null;
  href?: string | null;
}

export interface RawNavigation {
  footerLogo?: StrapiMedia | null;
  footerCta?: {
    title?: string | null;
    description?: string | null;
    label?: string | null;
    href?: string | null;
  } | null;
  footerColumns?: Array<{
    heading?: string | null;
    links?: RawNavLink[] | null;
  }> | null;
  socialLinks?: Array<{
    platform?: string | null;
    href?: string | null;
  }> | null;
  copyright?: string | null;
  logo?: StrapiMedia | null;
  logoDark?: StrapiMedia | null;
  navLinks?: RawNavLink[] | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  appearanceLabel?: string | null;
}

export function mapNavContent(
  raw: RawNavigation | null | undefined,
  fallback: NavContent
): NavContent {
  // Links missing a label or href are skipped; no usable links at all → the fallback links.
  const links: NavLink[] = (Array.isArray(raw?.navLinks) ? raw.navLinks : [])
    .filter(link => text(link?.label, '') && text(link?.href, ''))
    .map(link => ({ label: link.label!, href: link.href! }));

  // Each logo version falls back on its own: a missing dark logo must never
  // leave the light (black) one on the dark bar.
  const light = mapImage(raw?.logo, fallback.logo);
  const logo: ImageAsset = {
    ...light,
    darkSrc: raw?.logoDark?.url
      ? strapiMediaUrl(raw.logoDark)
      : fallback.logo.darkSrc,
  };

  return {
    logo,
    links: links.length ? links : fallback.links,
    ctaText: text(raw?.ctaText, fallback.ctaText),
    ctaHref: text(raw?.ctaHref, fallback.ctaHref),
    appearanceLabel: text(raw?.appearanceLabel, fallback.appearanceLabel),
  };
}

const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  'linkedin',
  'twitter',
  'instagram',
  'github',
  'youtube',
];

/**
 * Footer content, falling back field by field: columns without a heading,
 * links without a label or href and socials with an unknown platform are
 * skipped; nothing usable left → the fallback list.
 */
export function mapFooterContent(
  raw: RawNavigation | null | undefined,
  fallback: FooterContent
): FooterContent {
  const cta = raw?.footerCta;
  const columns: FooterColumnContent[] = (
    Array.isArray(raw?.footerColumns) ? raw.footerColumns : []
  )
    .filter(column => text(column?.heading, ''))
    .map(column => ({
      heading: column.heading!,
      links: (Array.isArray(column.links) ? column.links : [])
        .filter(link => text(link?.label, '') && text(link?.href, ''))
        .map(link => ({ label: link.label!, href: link.href! })),
    }));
  const socials: FooterSocialContent[] = (
    Array.isArray(raw?.socialLinks) ? raw.socialLinks : []
  )
    .filter(
      social =>
        SOCIAL_PLATFORMS.includes(social?.platform as SocialPlatform) &&
        text(social?.href, '')
    )
    .map(social => ({
      platform: social.platform as SocialPlatform,
      href: social.href!,
    }));

  return {
    logo: mapImage(raw?.footerLogo, fallback.logo),
    cta: {
      title: text(cta?.title, fallback.cta.title),
      description: text(cta?.description, fallback.cta.description),
      action: mapCta(
        cta ? { label: cta.label, href: cta.href } : null,
        fallback.cta.action
      ),
    },
    columns: columns.length ? columns : fallback.columns,
    socials: socials.length ? socials : fallback.socials,
    copyright: text(raw?.copyright, fallback.copyright),
  };
}

/** Bundled white "US" mark for the black footer. */
export const DEFAULT_FOOTER_LOGO: ImageAsset = {
  src: '/Footer/footer-logo.png',
  alt: 'UpSpace Labs',
  width: 336,
  height: 174,
};

/** Bundled navbar logo (black) and its white dark-mode version. */
export const DEFAULT_LOGO: ImageAsset = {
  src: '/Navbar/logo.png',
  darkSrc: '/Navbar/logo-white.png',
  alt: 'UpSpace Labs',
  width: 147,
  height: 21,
};
