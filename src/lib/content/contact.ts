import { cache } from 'react';
import type { ContactPageContent } from '@/lib/types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import {
  mapContactPageContent,
  type RawContactPage,
} from '@/lib/strapi/mappers';
import { contactPageFallback } from './contact-fallback';

const CONTACT_QUERY = 'populate[infoItems]=true&populate[form]=true';

/** Contact page copy, deduplicated per request; static fallback when Strapi is down or empty. */
export const getContactPageContent = cache(
  async (): Promise<ContactPageContent> => {
    try {
      const raw = await strapiFetch<RawContactPage | null>(
        `/contact-page?${CONTACT_QUERY}`
      );
      return raw ? mapContactPageContent(raw) : contactPageFallback;
    } catch (err) {
      logStrapiFallback('[strapi] using static contact content', err);
      return contactPageFallback;
    }
  }
);
