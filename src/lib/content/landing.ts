import type { LandingPageContent } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import {
  mapLandingPageContent,
  DEFAULT_HERO_IMAGE,
  type RawLandingPage,
} from '@/lib/strapi/mappers';

/** Used whole when Strapi is unreachable or has no landing page, and field by field for anything left empty. */
export const landingPageFallback: LandingPageContent = {
  hero: {
    headline: 'A New Generation of\nSoftware, Built for Business.',
    subtitle:
      'We build intelligent software products that simplify complex work, connect teams, and help businesses operate, adapt, and grow in a rapidly changing world.',
    primaryCta: { label: 'Book a Demo Call', href: '/contact-us' },
    secondaryCta: { label: 'See Products', href: '/#products' },
    image: DEFAULT_HERO_IMAGE,
  },
};

async function fetchLandingPage(): Promise<RawLandingPage | null> {
  try {
    return await strapiFetch<RawLandingPage | null>(
      '/landing-page?populate[hero][populate]=*'
    );
  } catch (err) {
    // Unreachable, unconfigured, non-OK or non-JSON — all fall back.
    if (process.env.NODE_ENV !== 'production') {
      logStrapiFallback('[strapi] falling back to static landing content', err);
    }
    return null;
  }
}

/** Landing page content from Strapi, falling back field by field to `landingPageFallback`. */
export async function getLandingPageContent(): Promise<LandingPageContent> {
  return mapLandingPageContent(await fetchLandingPage(), landingPageFallback);
}
