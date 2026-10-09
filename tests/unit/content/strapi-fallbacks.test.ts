import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  textToGroups,
  mapAboutPageContent,
  mapCareerPageContent,
  mapCareerGallery,
  mapWhyJoin,
  mapOpenRoles,
  mapHowWeWork,
  mapFounded,
  mapTeam,
  mapOffices,
  mapProgress,
  mapBlogCard,
  mapBlogPage,
  mapBlogPost,
  plainText,
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
import { aboutPageFallback } from '@/lib/content/about';
import { careerPageFallback } from '@/lib/content/career';
import { blogPageFallback, blogPostFallbacks } from '@/lib/content/blog';

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

describe('mapBlogPost', () => {
  const fallback = blogPostFallbacks[0];

  it('uses Strapi values and falls back per field', () => {
    const post = mapBlogPost(
      {
        slug: 'northfield-logistics',
        title: 'New title',
        summary: ' ',
        coverImage: {
          url: 'https://cdn.test/cover.jpg',
          width: 800,
          height: 776,
        },
      },
      fallback
    );
    expect(post).toEqual({
      slug: 'northfield-logistics',
      title: 'New title',
      breadcrumbLabel: fallback.breadcrumbLabel,
      summary: fallback.summary,
      excerpt: fallback.excerpt,
      coverImage: {
        ...fallback.coverImage,
        src: 'https://cdn.test/cover.jpg',
        width: 800,
        height: 776,
      },
      logosLabel: fallback.logosLabel,
      logos: fallback.logos,
      stats: fallback.stats,
      body: fallback.body,
      moreStories: fallback.moreStories,
    });
  });

  it('maps logos, filling images by position and skipping unnamed ones', () => {
    const post = mapBlogPost(
      {
        title: 'T',
        logosLabel: 'Used by us',
        logos: [
          { name: 'Acme', image: { url: 'https://cdn.test/acme.png' } },
          { name: 'Beta' },
          { name: '' },
        ],
      },
      fallback
    );
    expect(post.logosLabel).toBe('Used by us');
    expect(post.logos.map(logo => [logo.name, logo.image.src])).toEqual([
      ['Acme', 'https://cdn.test/acme.png'],
      ['Beta', fallback.logos[1].image.src],
    ]);
    expect(mapBlogPost({ title: 'T', logos: [] }, fallback).logos).toEqual(
      fallback.logos
    );
    // A post without built-in logos: a logo without an upload gets a bundled one.
    expect(
      mapBlogPost(
        { title: 'T', logos: [{ name: 'Gamma' }] },
        { ...fallback, logos: [] }
      ).logos
    ).toEqual([
      {
        name: 'Gamma',
        image: {
          src: '/Blog/logos/hobbes.png',
          alt: 'Gamma',
          width: 267,
          height: 96,
        },
        href: null,
      },
    ]);
  });

  it('maps the body blocks in order, skips empty or unknown ones, and gives an image block without an upload the bundled image', () => {
    const post = mapBlogPost(
      {
        title: 'T',
        stats: [{ value: '60%', label: 'less admin' }, { value: '' }],
        body: [
          {
            __component: 'blog.text-section',
            heading: 'Intro',
            body: 'A\nB\n\nC',
          },
          {
            __component: 'blog.pull-quote',
            quote: 'Great',
            author: 'Ana',
            role: '',
          },
          { __component: 'blog.text-section', body: '  ' },
          { __component: 'blog.image', caption: 'No image' },
          { __component: 'blog.unknown' },
        ],
      },
      fallback
    );
    expect(post.stats).toEqual([{ value: '60%', label: 'less admin' }]);
    expect(post.body).toEqual([
      { type: 'text', heading: 'Intro', groups: [['A', 'B'], ['C']] },
      { type: 'quote', quote: 'Great', author: 'Ana', role: null },
      {
        type: 'image',
        image: {
          src: '/Blog/northfield-cover.jpg',
          alt: 'No image',
          width: 485,
          height: 472,
        },
        caption: 'No image',
      },
    ]);
  });

  it('falls back to the bundled stats and body when Strapi has none', () => {
    const post = mapBlogPost({ title: 'T', stats: [], body: [] }, fallback);
    expect(post.stats).toEqual(fallback.stats);
    expect(post.body).toEqual(fallback.body);
  });

  it('maps More stories, falling back to the bundled carousel', () => {
    expect(mapBlogPost({ title: 'T' }, fallback).moreStories).toEqual(
      fallback.moreStories
    );
    const { moreStories } = mapBlogPost(
      {
        title: 'T',
        moreStories: { title: 'Related', cards: [{ title: 'One' }] },
      },
      fallback
    );
    expect(moreStories.title).toBe('Related');
    expect(moreStories.description).toBe(fallback.moreStories.description);
    expect(moreStories.cards).toHaveLength(1);
    expect(moreStories.cards[0].image).toEqual(
      fallback.moreStories.cards[0].image
    );
  });

  it('splits body text into groups (blank line) of lines', () => {
    expect(textToGroups('one\ntwo \n\n\n three\n')).toEqual([
      ['one', 'two'],
      ['three'],
    ]);
  });

  it('keeps the bundled cover when none is uploaded', () => {
    expect(mapBlogPost({ title: 'T' }, fallback).coverImage).toEqual(
      fallback.coverImage
    );
  });
});

describe('blog listing', () => {
  const cover = blogPostFallbacks[0].coverImage;

  it('maps a card, deriving the excerpt from the summary when unset', () => {
    expect(
      mapBlogCard(
        { slug: 'a', title: 'A', summary: 'Cut **HR admin** by 60%.' },
        cover
      )
    ).toEqual({
      slug: 'a',
      title: 'A',
      excerpt: plainText('Cut **HR admin** by 60%.'),
      coverImage: cover,
    });
    expect(
      mapBlogCard({ slug: 'a', title: 'A', excerpt: 'Short' }, cover)?.excerpt
    ).toBe('Short');
  });

  it('drops posts without a slug or title', () => {
    expect(mapBlogCard({ title: 'A' }, cover)).toBeNull();
    expect(mapBlogCard({ slug: 'a', title: ' ' }, cover)).toBeNull();
  });

  it('falls back per field for the page header', () => {
    expect(mapBlogPage(null, blogPageFallback)).toEqual(blogPageFallback);
    expect(
      mapBlogPage({ title: 'Stories', description: '' }, blogPageFallback)
    ).toEqual({ ...blogPageFallback, title: 'Stories' });
  });
});

describe('mapAboutPageContent', () => {
  it('uses the whole fallback without an entry, and falls back per field', () => {
    expect(mapAboutPageContent(null, aboutPageFallback)).toEqual(
      aboutPageFallback
    );
    const { hero } = mapAboutPageContent(
      { hero: { headline: 'Hello', subtitle: '', primaryCta: null } },
      aboutPageFallback
    );
    expect(hero).toEqual({
      ...aboutPageFallback.hero,
      headline: 'Hello',
      secondaryCta: null,
    });
  });
});

describe('mapFounded', () => {
  const fallback = aboutPageFallback.founded;

  it('splits paragraphs on blank lines and parses decimal strings', () => {
    expect(
      mapFounded(
        {
          title: 'Founded',
          description: 'One.\n\n  Two.  ',
          officeLat: '19.07',
          officeLng: '72.88',
          connections: [
            { label: 'Paris', lat: '48.85', lng: '2.35', altitude: null },
            { label: 'Broken', lat: 'x', lng: '1' },
          ],
        },
        fallback
      )
    ).toEqual({
      title: 'Founded',
      paragraphs: ['One.', 'Two.'],
      office: { lat: 19.07, lng: 72.88 },
      connections: [{ label: 'Paris', lat: 48.85, lng: 2.35, altitude: null }],
    });
  });

  it('falls back per field', () => {
    expect(mapFounded(null, fallback)).toEqual(fallback);
    expect(
      mapFounded({ title: '', description: ' ', connections: [] }, fallback)
    ).toEqual(fallback);
  });
});

describe('mapTeam', () => {
  const fallback = aboutPageFallback.team;

  it('skips unnamed members and uses the placeholder without a photo', () => {
    const team = mapTeam(
      {
        title: 'Our team',
        description: '',
        members: [
          { name: 'Asha', role: 'Designer', photo: null },
          { name: ' ', role: 'Ghost' },
          {
            name: 'Ravi',
            role: '',
            photo: {
              url: 'https://cdn.test/ravi.jpg',
              width: 600,
              height: 600,
            },
          },
        ],
      },
      fallback
    );
    expect(team.title).toBe('Our team');
    expect(team.description).toBe(fallback.description);
    expect(team.members).toHaveLength(2);
    expect(team.members[0]).toMatchObject({
      name: 'Asha',
      role: 'Designer',
      photo: { src: '/About/team/img.jpg', alt: 'Asha' },
    });
    expect(team.members[1].role).toBeNull();
    expect(team.members[1].photo).toMatchObject({
      src: 'https://cdn.test/ravi.jpg',
    });
  });

  it('falls back to the built-in team', () => {
    expect(mapTeam(null, fallback)).toEqual(fallback);
    expect(mapTeam({ title: 'T', members: [] }, fallback).members).toEqual(
      fallback.members
    );
  });
});

describe('mapOffices', () => {
  const fallback = aboutPageFallback.offices;

  it('maps offices, defaulting the map to the city and the background to bg.png', () => {
    const { offices } = mapOffices(
      {
        title: 'Offices',
        offices: [
          { city: 'Pune', mapQuery: '', mapZoom: 99, background: null },
          { city: '', mapQuery: 'Nowhere' },
          {
            city: 'Delhi',
            mapQuery: '28.61,77.21',
            mapZoom: 12,
            background: {
              url: 'https://cdn.test/delhi.png',
              width: 800,
              height: 400,
            },
          },
        ],
      },
      fallback
    );
    expect(offices).toEqual([
      {
        city: 'Pune',
        mapQuery: 'Pune',
        mapZoom: 15,
        background: { src: '/About/bg.png', alt: '', width: 1717, height: 916 },
      },
      {
        city: 'Delhi',
        mapQuery: '28.61,77.21',
        mapZoom: 12,
        background: expect.objectContaining({
          src: 'https://cdn.test/delhi.png',
          alt: '',
        }),
      },
    ]);
  });

  it('falls back to the built-in offices', () => {
    expect(mapOffices(null, fallback)).toEqual(fallback);
    expect(mapOffices({ title: '', offices: [] }, fallback)).toEqual(fallback);
  });
});

describe('mapProgress', () => {
  const fallback = aboutPageFallback.progress;

  it('skips untitled milestones, nulls empty fields and hides an emptied hint', () => {
    expect(
      mapProgress(
        {
          title: 'Path',
          description: ' ',
          hint: '',
          milestones: [
            {
              date: '2027',
              title: 'Launch',
              status: 'Planned',
              description: '',
            },
            { date: '2028', title: ' ' },
          ],
        },
        fallback
      )
    ).toEqual({
      title: 'Path',
      description: fallback.description,
      hint: null,
      milestones: [
        { date: '2027', title: 'Launch', status: 'Planned', description: null },
      ],
    });
  });

  it('falls back to the built-in milestones', () => {
    expect(mapProgress(null, fallback)).toEqual(fallback);
    expect(
      mapProgress({ title: 'T', hint: 'Scroll', milestones: [] }, fallback)
        .milestones
    ).toEqual(fallback.milestones);
  });
});

describe('mapCareerPageContent', () => {
  it('uses the whole fallback without a hero entry', () => {
    expect(mapCareerPageContent(null, careerPageFallback)).toEqual(
      careerPageFallback
    );
    expect(mapCareerPageContent({ hero: null }, careerPageFallback)).toEqual(
      careerPageFallback
    );
  });

  it('maps gallery videos: upload wins over a link, untitled tiles are skipped', () => {
    const fallback = careerPageFallback.gallery;
    const gallery = mapCareerGallery(
      [
        {
          title: 'Team day',
          poster: { url: 'https://cdn.test/p.jpg', width: 600, height: 400 },
          video: { url: 'https://cdn.test/v.mp4' },
          videoUrl: 'https://youtu.be/x',
          playButton: 'light',
        },
        { title: 'Link only', videoUrl: 'https://youtu.be/y' },
        { title: '', videoUrl: 'https://youtu.be/z' },
        { title: 'Poster only' },
      ],
      fallback
    );
    expect(gallery.map(v => [v.title, v.src, v.playButton])).toEqual([
      ['Team day', 'https://cdn.test/v.mp4', 'light'],
      ['Link only', 'https://youtu.be/y', 'primary'],
      ['Poster only', null, 'primary'],
    ]);
    expect(gallery[0].poster).toMatchObject({
      src: 'https://cdn.test/p.jpg',
      alt: 'Team day',
    });
    expect(gallery[1].poster.src).toBe(fallback[1].poster.src);
    expect(mapCareerGallery([], fallback)).toEqual(fallback);
  });

  it('maps the "Why join us" perks and hides an emptied eyebrow', () => {
    const fallback = careerPageFallback.whyJoin;
    expect(mapWhyJoin(null, fallback)).toEqual(fallback);
    expect(
      mapWhyJoin(
        {
          eyebrow: '',
          title: 'Why us',
          perks: [
            { title: 'Remote Fridays', description: '' },
            { title: ' ', description: 'Skipped' },
          ],
        },
        fallback
      )
    ).toEqual({
      eyebrow: null,
      title: 'Why us',
      description: fallback.description,
      perks: [{ title: 'Remote Fridays', description: null }],
    });
    expect(mapWhyJoin({ title: 'T', perks: [] }, fallback).perks).toEqual(
      fallback.perks
    );
  });

  it('takes the open-roles heading from Strapi', () => {
    const fallback = careerPageFallback.openRoles;
    expect(
      mapOpenRoles({ title: 'We are hiring', description: '' }, fallback)
    ).toEqual({
      title: 'We are hiring',
      description: fallback.description,
    });
    expect(mapOpenRoles(null, fallback)).toEqual(fallback);
  });

  it('splits "How we work" paragraphs and keeps the bundled image without an upload', () => {
    const fallback = careerPageFallback.howWeWork;
    expect(mapHowWeWork(null, fallback)).toEqual(fallback);
    expect(
      mapHowWeWork(
        {
          eyebrow: ' ',
          title: 'Our way',
          description: 'One.\n\nTwo.',
          image: null,
        },
        fallback
      )
    ).toEqual({
      eyebrow: null,
      title: 'Our way',
      paragraphs: ['One.', 'Two.'],
      image: fallback.image,
    });
  });

  it('maps the heading over the office cards', () => {
    const fallback = careerPageFallback;
    expect(
      mapCareerPageContent(
        { officesHeading: { title: 'Visit us', description: '' } },
        fallback
      ).officesHeading
    ).toEqual({
      title: 'Visit us',
      description: fallback.officesHeading.description,
    });
  });

  it('falls back per field and hides an emptied badge or button', () => {
    expect(
      mapCareerPageContent(
        { hero: { badge: ' ', headline: 'Join us', subtitle: '', cta: null } },
        careerPageFallback
      ).hero
    ).toEqual({
      badge: null,
      headline: 'Join us',
      subtitle: careerPageFallback.hero.subtitle,
      cta: null,
    });
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
