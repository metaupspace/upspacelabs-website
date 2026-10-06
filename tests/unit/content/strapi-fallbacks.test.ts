import { afterEach, describe, expect, it, vi } from 'vitest';
import { mapHeroContent, mapNavContent } from '@/lib/strapi/mappers';
import { navContentFallback } from '@/lib/content/navigation';
import { landingPageFallback } from '@/lib/content/landing';

const heroFallback = landingPageFallback.hero;

describe('mapNavContent', () => {
  it('uses Strapi values when present', () => {
    const nav = mapNavContent(
      {
        navLinks: [{ label: 'Blog', href: '/blog' }],
        ctaText: 'Talk to us',
        ctaHref: '/contact-us',
      },
      navContentFallback
    );
    expect(nav).toEqual({
      links: [{ label: 'Blog', href: '/blog' }],
      ctaText: 'Talk to us',
      ctaHref: '/contact-us',
    });
  });

  it('returns the whole fallback without data', () => {
    expect(mapNavContent(null, navContentFallback)).toEqual(navContentFallback);
  });

  it('falls back field by field for blank or missing values', () => {
    const nav = mapNavContent(
      { navLinks: [], ctaText: '  ', ctaHref: null },
      navContentFallback
    );
    expect(nav).toEqual(navContentFallback);
  });

  it('skips incomplete links and keeps the usable ones', () => {
    const nav = mapNavContent(
      {
        navLinks: [
          { label: 'Home', href: '/' },
          { label: '', href: '/x' },
          { label: 'No href', href: null },
        ],
      },
      navContentFallback
    );
    expect(nav.links).toEqual([{ label: 'Home', href: '/' }]);
  });

  it('survives an unexpected shape', () => {
    const raw = { navLinks: 'oops' } as unknown as Parameters<
      typeof mapNavContent
    >[0];
    expect(mapNavContent(raw, navContentFallback).links).toEqual(
      navContentFallback.links
    );
  });
});

describe('mapHeroContent', () => {
  it('returns the whole fallback without a hero', () => {
    expect(mapHeroContent(null, heroFallback)).toEqual(heroFallback);
  });

  it('falls back field by field', () => {
    const hero = mapHeroContent(
      {
        headline: 'From Strapi',
        subtitle: '',
        primaryCta: { label: 'Go', href: null },
        secondaryCta: { label: '', href: '/products' },
      },
      heroFallback
    );
    expect(hero.headline).toBe('From Strapi');
    expect(hero.subtitle).toBe(heroFallback.subtitle);
    expect(hero.primaryCta).toEqual({
      label: 'Go',
      href: heroFallback.primaryCta.href,
    });
    expect(hero.secondaryCta).toEqual({
      label: heroFallback.secondaryCta!.label,
      href: '/products',
    });
    expect(hero.image).toEqual(heroFallback.image);
  });

  it('respects a removed secondary CTA', () => {
    const hero = mapHeroContent(
      { headline: 'H', secondaryCta: null },
      heroFallback
    );
    expect(hero.secondaryCta).toBeNull();
  });

  it('maps a Strapi image and resolves relative URLs against STRAPI_URL', async () => {
    vi.resetModules();
    vi.stubEnv('STRAPI_URL', 'http://cms.test/');
    const { mapHeroContent: map } = await import('@/lib/strapi/mappers');
    const hero = map(
      {
        image: {
          url: '/uploads/hero.png',
          alternativeText: 'Dashboard',
          width: 1600,
          height: 1000,
        },
      },
      heroFallback
    );
    expect(hero.image).toEqual({
      src: 'http://cms.test/uploads/hero.png',
      alt: 'Dashboard',
      width: 1600,
      height: 1000,
    });
  });

  it('fills a Strapi image’s missing alt text and size from the fallback', () => {
    const hero = mapHeroContent(
      { image: { url: 'https://cdn.test/a.png', alternativeText: null } },
      heroFallback
    );
    expect(hero.image).toEqual({
      ...heroFallback.image,
      src: 'https://cdn.test/a.png',
    });
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
});
