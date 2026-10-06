import { cache } from 'react';
import type { LegalPage } from '@/lib/types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import { mapLegalPage, type RawLegalPage } from '@/lib/strapi/legal-mappers';
import { legalPageFallbacks } from './legal-fallback';

const builtIn = (slug: string): LegalPage | null => {
  const raw = legalPageFallbacks.find(p => p.slug === slug);
  return raw ? mapLegalPage(raw) : null;
};

/** Every built-in page: the "other policies" list when Strapi is unreachable. */
export const legalPageSlugs = legalPageFallbacks.flatMap(p =>
  p.slug ? [p.slug] : []
);

/**
 * The policy page at `/<slug>`, or `null` (→ 404). Strapi wins; a built-in
 * page with the same slug stands in while Strapi is unreachable or has no
 * usable entry for it.
 */
export const getLegalPage = cache(
  async (slug: string): Promise<LegalPage | null> => {
    try {
      const entries = await strapiFetch<RawLegalPage[]>(
        `/legal-pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections]=true`
      );
      const page = Array.isArray(entries) ? entries[0] : undefined;
      return (page && mapLegalPage(page)) ?? builtIn(slug);
    } catch (err) {
      logStrapiFallback('[strapi] using built-in legal page', err);
      return builtIn(slug);
    }
  }
);

/** Slugs to prebuild: Strapi's pages, else the built-in ones. */
export async function getLegalSlugs(): Promise<string[]> {
  try {
    const entries = await strapiFetch<Array<{ slug?: string | null }>>(
      '/legal-pages?fields[0]=slug&pagination[pageSize]=100'
    );
    const slugs = (Array.isArray(entries) ? entries : []).flatMap(e =>
      e.slug ? [e.slug] : []
    );
    return slugs.length ? slugs : legalPageSlugs;
  } catch {
    return legalPageSlugs;
  }
}
