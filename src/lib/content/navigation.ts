import type { NavContent } from '../types';
import { strapiFetch, StrapiError } from '@/lib/strapi/client';
import { mapNavContent, type RawNavigation } from '@/lib/strapi/mappers';

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
    return await strapiFetch<RawNavigation>(
      '/navigation?populate[navLinks]=true'
    );
  } catch (err) {
    if (process.env.NODE_ENV !== 'production' && err instanceof StrapiError) {
      console.warn(
        `[strapi] falling back to static navigation content: ${err.message}`
      );
    }
    return null;
  }
}

export async function getNavContent(): Promise<NavContent> {
  const raw = await fetchNavigation();
  return raw ? mapNavContent(raw) : navContentFallback;
}
