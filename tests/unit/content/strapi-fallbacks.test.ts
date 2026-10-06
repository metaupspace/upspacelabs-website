import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  mapFooterContent,
  mapCardCarousel,
  mapCustomerStories,
  mapFeatureRows,
  mapProductShowcase,
  mapFeaturedApps,
  mapHeroContent,
  mapLandingPageContent,
  mapNavContent,
} from '@/lib/strapi/mappers';
import {
  footerContentFallback,
  navContentFallback,
} from '@/lib/content/navigation';
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
      logo: navContentFallback.logo,
      links: [{ label: 'Blog', href: '/blog' }],
      ctaText: 'Talk to us',
      ctaHref: '/contact-us',
      appearanceLabel: navContentFallback.appearanceLabel,
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

describe('mapLandingPageContent', () => {
  it('returns the whole fallback without data', () => {
    expect(mapLandingPageContent(null, landingPageFallback)).toEqual(
      landingPageFallback
    );
  });

  it('maps the products heading and falls back per field', () => {
    const { productsHeading } = mapLandingPageContent(
      { productsHeading: { title: 'Our products', description: '' } },
      landingPageFallback
    );
    expect(productsHeading).toEqual({
      title: 'Our products',
      description: landingPageFallback.productsHeading.description,
    });
  });
});

describe('mapFeatureRows', () => {
  const fallback = landingPageFallback.featureRows;

  it('returns the fallback rows without data or titled rows', () => {
    expect(mapFeatureRows(null, fallback)).toEqual(fallback);
    expect(mapFeatureRows([{ title: ' ' }], fallback)).toEqual(fallback);
  });

  it('falls back per field to the row at the same position', () => {
    const [first, second] = mapFeatureRows(
      [{ title: 'One' }, { title: 'Two', imagePosition: 'sideways' }],
      fallback
    );
    // No link in Strapi means the editor left it out — it isn't borrowed from the fallback.
    expect(first).toEqual({ ...fallback[0], title: 'One', action: null });
    expect(second.imagePosition).toBe(fallback[1].imagePosition);
    expect(second.image).toEqual(fallback[1].image);
  });

  it('keeps the bundled dark image only while the bundled light one is used', () => {
    const [bundled, uploaded, both] = mapFeatureRows(
      [
        { title: 'A' },
        { title: 'B', image: { url: 'https://cdn.test/b.png' } },
        {
          title: 'C',
          image: { url: 'https://cdn.test/c.png' },
          darkImage: { url: 'https://cdn.test/c-dark.png' },
        },
      ],
      fallback
    );
    expect(bundled.image.darkSrc).toBe(fallback[0].image.darkSrc);
    expect(uploaded.image.darkSrc).toBeUndefined();
    expect(both.image).toMatchObject({
      src: 'https://cdn.test/c.png',
      darkSrc: 'https://cdn.test/c-dark.png',
    });
  });

  it('hides a removed link', () => {
    expect(
      mapFeatureRows([{ title: 'A', action: null }], fallback)[0].action
    ).toBeNull();
  });
});

describe('mapProductShowcase', () => {
  const fallback = landingPageFallback.productShowcase;

  it('returns the whole fallback without data', () => {
    expect(mapProductShowcase(null, fallback)).toEqual(fallback);
  });

  it('maps tabs, falling back per tab to the bundled screenshot', () => {
    const content = mapProductShowcase(
      {
        title: 'Products',
        tabs: [
          { label: 'Core', image: { url: 'https://cdn.test/core.png' } },
          { label: 'People', badge: 'Soon' },
          { label: '' },
        ],
      },
      fallback
    );
    expect(content.title).toBe('Products');
    expect(content.description).toBe(fallback.description);
    expect(content.tabs).toHaveLength(2);
    expect(content.tabs[0]).toMatchObject({
      label: 'Core',
      badge: null,
      image: { src: 'https://cdn.test/core.png' },
    });
    expect(content.tabs[1].image).toEqual(fallback.tabs[1].image);
    expect(content.features).toEqual(fallback.features);
  });

  it('maps the phone cards: visibility, title, image and link', () => {
    const [core, people] = mapProductShowcase(
      {
        tabs: [
          {
            label: 'Core',
            cardTitle: 'Pulse',
            cardImage: { url: 'https://cdn.test/card.png' },
            cardAction: { label: 'Open', href: '/core' },
          },
          { label: 'People', showCard: false },
        ],
      },
      fallback
    ).tabs;
    expect(core.card).toMatchObject({
      show: true,
      title: 'Pulse',
      image: { src: 'https://cdn.test/card.png' },
      action: { label: 'Open', href: '/core' },
    });
    // No card fields: hidden as asked, bundled image, no title or link.
    expect(people.card).toEqual({
      show: false,
      title: null,
      image: fallback.tabs[1].card.image,
      action: null,
    });
  });

  it('falls back to the default tabs and keeps titled features only', () => {
    const content = mapProductShowcase(
      { tabs: [], features: [{ title: 'Fast' }, { title: ' ' }] },
      fallback
    );
    expect(content.tabs).toEqual(fallback.tabs);
    expect(content.features).toEqual([{ title: 'Fast', description: '' }]);
  });
});

describe('mapCardCarousel', () => {
  const fallback = landingPageFallback.cardCarousel;

  it('returns the whole fallback without data or titled cards', () => {
    expect(mapCardCarousel(null, fallback)).toEqual(fallback);
    expect(mapCardCarousel({ cards: [{ title: '' }] }, fallback).cards).toEqual(
      fallback.cards
    );
  });

  it('fills each card from the fallback card at the same position', () => {
    const cards = mapCardCarousel(
      {
        title: 'Built for growth',
        cards: [
          {
            title: 'One',
            image: { url: 'https://cdn.test/one.jpg' },
            action: { label: 'Go', href: '/one' },
          },
          { title: 'Two' },
        ],
      },
      fallback
    ).cards;
    expect(cards[0]).toMatchObject({
      title: 'One',
      description: fallback.cards[0].description,
      image: { src: 'https://cdn.test/one.jpg' },
      action: { label: 'Go', href: '/one' },
    });
    expect(cards[1]).toEqual({
      title: 'Two',
      description: fallback.cards[1].description,
      image: fallback.cards[1].image,
      action: null,
    });
  });
});

describe('mapCustomerStories', () => {
  const fallback = landingPageFallback.customerStories;

  it('returns the fallback stories without data or named companies', () => {
    expect(mapCustomerStories(null, fallback)).toEqual(fallback);
    expect(mapCustomerStories([{ company: ' ' }], fallback)).toEqual(fallback);
  });

  it('fills logo and quote from the matching fallback, leaves optional fields out', () => {
    const [story] = mapCustomerStories(
      [{ company: 'Acme', author: 'Ana', role: '' }],
      fallback
    );
    expect(story).toEqual({
      company: 'Acme',
      logo: fallback[0].logo,
      quote: fallback[0].quote,
      author: 'Ana',
      role: null,
      action: null,
    });
  });
});

describe('mapFooterContent', () => {
  const fallback = footerContentFallback;

  it('returns the whole fallback without data', () => {
    expect(mapFooterContent(null, fallback)).toEqual(fallback);
  });

  it('maps columns, socials and the CTA, skipping unusable entries', () => {
    const footer = mapFooterContent(
      {
        footerCta: { title: 'Ship faster', label: '', href: '/start' },
        footerColumns: [
          {
            heading: 'Company',
            links: [
              { label: 'About', href: '/about' },
              { label: '', href: '/x' },
            ],
          },
          { heading: ' ', links: [{ label: 'Lost', href: '/lost' }] },
        ],
        socialLinks: [
          { platform: 'instagram', href: 'https://instagram.com/x' },
          { platform: 'myspace', href: 'https://myspace.com/x' },
        ],
        copyright: '',
      },
      fallback
    );
    expect(footer.cta).toEqual({
      title: 'Ship faster',
      description: fallback.cta.description,
      action: { label: fallback.cta.action.label, href: '/start' },
    });
    expect(footer.columns).toEqual([
      { heading: 'Company', links: [{ label: 'About', href: '/about' }] },
    ]);
    expect(footer.socials).toEqual([
      { platform: 'instagram', href: 'https://instagram.com/x' },
    ]);
    expect(footer.copyright).toBe(fallback.copyright);
    expect(footer.logo).toEqual(fallback.logo);
  });
});

describe('navigation logo', () => {
  it('falls back per version, so the dark bar never gets the black logo', () => {
    const nav = mapNavContent(
      { logo: { url: 'https://cdn.test/logo.png', width: 592, height: 84 } },
      navContentFallback
    );
    expect(nav.logo.src).toBe('https://cdn.test/logo.png');
    expect(nav.logo.darkSrc).toBe(navContentFallback.logo.darkSrc);
    expect(mapNavContent(null, navContentFallback).logo).toEqual(
      navContentFallback.logo
    );
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('mapFeaturedApps', () => {
  const fallback = landingPageFallback.featuredApps;

  it('returns the whole fallback without data', () => {
    expect(mapFeaturedApps(null, fallback)).toEqual(fallback);
  });

  it('maps apps, turning blank badges and links into null', () => {
    const content = mapFeaturedApps(
      {
        label: 'Apps',
        apps: [
          { title: 'One', badge: '', href: '  ', description: 'First' },
          { title: 'Two', badge: 'Beta', href: '/two' },
          { title: '', description: 'No title — skipped' },
        ],
        action: { label: 'See all', href: '/apps' },
      },
      fallback
    );
    expect(content.label).toBe('Apps');
    expect(content.apps).toEqual([
      { title: 'One', badge: null, href: null, description: 'First' },
      { title: 'Two', badge: 'Beta', href: '/two', description: '' },
    ]);
    expect(content.action).toEqual({ label: 'See all', href: '/apps' });
    expect(content.image).toEqual(fallback.image);
  });

  it('falls back to the default apps and label when they are empty', () => {
    const content = mapFeaturedApps({ label: ' ', apps: [] }, fallback);
    expect(content.label).toBe(fallback.label);
    expect(content.apps).toEqual(fallback.apps);
  });

  it('hides a removed action and fills a half-empty one', () => {
    expect(mapFeaturedApps({ action: null }, fallback).action).toBeNull();
    expect(
      mapFeaturedApps({ action: { label: 'Go', href: '' } }, fallback).action
    ).toEqual({ label: 'Go', href: fallback.action!.href });
  });
});
