import type { LandingPageContent } from '../types';
import { strapiFetch, StrapiError } from '@/lib/strapi/client';
import {
  mapLandingPageContent,
  type RawLandingPage,
} from '@/lib/strapi/mappers';

/** Shown when Strapi is unreachable or the landing page is not yet filled in. */
export const landingPageFallback: LandingPageContent = {
  hero: {
    headline: 'A New Generation of\nSoftware, Built for Business.',
    subtitle:
      'We build intelligent software products that simplify complex work, connect teams, and help businesses operate, adapt, and grow in a rapidly changing world.',
    primaryCta: { label: 'Book a Demo Call', href: '/contact-us' },
    secondaryCta: { label: 'See Products', href: '/#products' },
  },
};

export async function getLandingPageContent(): Promise<LandingPageContent> {
  try {
    const raw = await strapiFetch<RawLandingPage | null>(
      '/landing-page?populate[hero][populate]=*'
    );
    if (!raw?.hero) return landingPageFallback;
    return mapLandingPageContent(raw);
  } catch (err) {
    if (process.env.NODE_ENV !== 'production' && err instanceof StrapiError) {
      console.warn(
        `[strapi] falling back to static landing content: ${err.message}`
      );
    }
    return landingPageFallback;
  }
}
