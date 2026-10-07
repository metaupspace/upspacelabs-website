import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react', async orig => ({
  ...(await orig<typeof import('react')>()),
  cache: <T>(fn: T) => fn,
}));

const strapiFetch = vi.fn();
vi.mock('@/lib/strapi/client', () => ({
  strapiFetch: (...args: unknown[]) => strapiFetch(...args),
  logStrapiFallback: vi.fn(),
}));

import { getLegalPage, getLegalSlugs } from '@/lib/content/legal';
import { mapLegalPage, parseLegalBody, slugify } from '@/lib/strapi/mappers';

describe('parseLegalBody', () => {
  it('splits paragraphs, bullet lists and sub-headings', () => {
    expect(parseLegalBody('One\n\n### Sub\n\n- a\n- b\n\nTwo')).toEqual([
      { type: 'paragraph', text: 'One' },
      { type: 'subheading', text: 'Sub' },
      { type: 'list', items: ['a', 'b'] },
      { type: 'paragraph', text: 'Two' },
    ]);
    expect(parseLegalBody('  \n\n ')).toEqual([]);
  });
});

describe('mapLegalPage', () => {
  it('builds unique anchors and skips empty sections', () => {
    const page = mapLegalPage({
      slug: 'terms',
      title: 'Terms',
      lastUpdated: '2026-05-01',
      sections: [
        { heading: 'Use & Care', body: 'A' },
        { heading: 'Use & Care', body: 'B' },
        { heading: 'Empty', body: '  ' },
        { heading: '', body: 'No heading' },
      ],
    });
    expect(page?.sections.map(s => s.id)).toEqual(['use-care', 'use-care-2']);
    expect(page?.lastUpdated).toBe('2026-05-01');
  });

  it('returns null without slug, title or usable sections', () => {
    expect(mapLegalPage({ title: 'T', sections: [] })).toBeNull();
    expect(mapLegalPage({ slug: 's', title: 'T', sections: [] })).toBeNull();
  });

  it('slugifies headings', () => {
    expect(slugify('Plans & Payment!')).toBe('plans-payment');
  });
});

describe('legal loaders', () => {
  beforeEach(() => {
    strapiFetch.mockReset();
  });

  it('serves built-in pages when Strapi is unreachable', async () => {
    strapiFetch.mockRejectedValue(new Error('down'));
    expect((await getLegalPage('terms-of-service'))?.title).toBe(
      'Terms of Service'
    );
    expect(await getLegalPage('nope')).toBeNull();
    expect(await getLegalSlugs()).toEqual([
      'terms-of-service',
      'privacy-policy',
      'refund-policy',
    ]);
  });

  it('prefers the Strapi entry, falling back when it is unusable', async () => {
    strapiFetch.mockResolvedValueOnce([
      {
        slug: 'terms-of-service',
        title: 'CMS Terms',
        sections: [{ heading: 'One', body: 'Body' }],
      },
    ]);
    expect((await getLegalPage('terms-of-service'))?.title).toBe('CMS Terms');
    strapiFetch.mockResolvedValueOnce([
      { slug: 'terms-of-service', title: 'Empty' },
    ]);
    expect((await getLegalPage('terms-of-service'))?.title).toBe(
      'Terms of Service'
    );
  });
});
