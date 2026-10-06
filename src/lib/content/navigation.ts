import type { NavContent } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import { mapNavContent, type RawNavigation } from '@/lib/strapi/mappers';

/** Used whole when Strapi is unreachable, and field by field for anything left empty. */
export const navContentFallback: NavContent = {
  links: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Careers', href: '/career' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/contact-us',
};

async function fetchNavigation(): Promise<RawNavigation | null> {
  try {
    return await strapiFetch<RawNavigation | null>(
      '/navigation?populate[navLinks]=true'
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

/** Navigation from Strapi, falling back field by field to `navContentFallback`. */
export async function getNavContent(): Promise<NavContent> {
  return mapNavContent(await fetchNavigation(), navContentFallback);
}
