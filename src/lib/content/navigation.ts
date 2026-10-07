import { cache } from 'react';
import type { FooterContent, LayoutContent, NavContent } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import {
  DEFAULT_FOOTER_LOGO,
  DEFAULT_LOGO,
  mapFooterContent,
  mapNavContent,
  type RawNavigation,
} from '@/lib/strapi/mappers';

/** Used whole when Strapi is unreachable, and field by field for anything left empty. */
export const navContentFallback: NavContent = {
  logo: DEFAULT_LOGO,
  links: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Careers', href: '/career' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/contact-us',
  appearanceLabel: 'Appearance',
};

/** Used whole when Strapi is unreachable, and field by field for anything left empty. */
export const footerContentFallback: FooterContent = {
  logo: DEFAULT_FOOTER_LOGO,
  cta: {
    title: 'Modern Systems for Teams\nThat Never Stop Moving.',
    description:
      'Automatically engage every lead, handle follow-ups, and convert conversations into booked meetings — without manual calling.',
    action: { label: 'Get Started for Free', href: '/contact-us' },
  },
  columns: [
    {
      heading: 'UpSpace Labs',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Careers', href: '/career' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Contact Us', href: '/contact-us' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Terms of Service', href: '/terms-of-service' },
        { label: 'Refund Policy', href: '/refund-policy' },
      ],
    },
  ],
  socials: [
    {
      platform: 'linkedin',
      href: 'https://www.linkedin.com/company/upspacelabs',
    },
    { platform: 'twitter', href: 'https://x.com/upspacelabs' },
    { platform: 'instagram', href: 'https://www.instagram.com/upspacelabs' },
  ],
  copyright: '© 2026 UpSpace Labs. All rights reserved.',
};

const NAVIGATION_QUERY = [
  'populate[navLinks]=true',
  'populate[logo]=true',
  'populate[logoDark]=true',
  'populate[footerLogo]=true',
  'populate[footerCta]=true',
  'populate[footerColumns][populate][links]=true',
  'populate[socialLinks]=true',
].join('&');

async function fetchNavigation(): Promise<RawNavigation | null> {
  try {
    return await strapiFetch<RawNavigation | null>(
      `/navigation?${NAVIGATION_QUERY}`
    );
  } catch (err) {
    // Unreachable, unconfigured, non-OK or non-JSON — all fall back.
    if (process.env.NODE_ENV !== 'production') {
      logStrapiFallback(
        '[strapi] falling back to static navigation content',
        err
      );
    }
    return null;
  }
}

/** Navbar + footer content from the Navigation entry. Deduplicated per request; falls back field by field. */
export const getLayoutContent = cache(async (): Promise<LayoutContent> => {
  const raw = await fetchNavigation();
  return {
    nav: mapNavContent(raw, navContentFallback),
    footer: mapFooterContent(raw, footerContentFallback),
  };
});

/** Navbar content only. */
export async function getNavContent(): Promise<NavContent> {
  return (await getLayoutContent()).nav;
}
