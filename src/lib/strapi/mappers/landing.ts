/** The home page (Strapi's Landing Page) — also the shared card carousel and showcase. */

import { type StrapiMedia } from '@/lib/strapi/client';
import type {
  CardCarouselContent,
  CarouselCard,
  CustomerStory,
  FeatureRowContent,
  FeaturedApp,
  FeaturedAppsContent,
  HeroContent,
  ImageAsset,
  LandingPageContent,
  ProductShowcaseContent,
  ShowcaseFeature,
  ShowcaseTab,
} from '@/lib/types';
import {
  RawCta,
  RawSectionHeading,
  mapCta,
  mapImage,
  mapImageWithDark,
  mapOptionalCta,
  mapSectionHeading,
  optionalText,
  text,
} from './shared';

/**
 * Tabs without a label are skipped (none left → the fallback tabs); a tab
 * without a screenshot uses the fallback tab's at the same position.
 * Features without a title are skipped (none left → the fallback features).
 */
export function mapProductShowcase(
  raw: RawProductShowcase | null | undefined,
  fallback: ProductShowcaseContent
): ProductShowcaseContent {
  if (!raw) return fallback;

  const tabs: ShowcaseTab[] = (Array.isArray(raw.tabs) ? raw.tabs : [])
    .filter(tab => text(tab?.label, ''))
    .map((tab, index) => {
      const base = fallback.tabs[index] ?? fallback.tabs[0];
      return {
        label: tab.label!,
        badge: optionalText(tab.badge),
        image: mapImageWithDark(tab.image, tab.darkImage, base.image),
        card: {
          show:
            typeof tab.showCard === 'boolean' ? tab.showCard : base.card.show,
          title: optionalText(tab.cardTitle),
          image: mapImage(tab.cardImage, base.card.image),
          action: mapOptionalCta(tab.cardAction, base.card.action),
        },
      };
    });

  const features: ShowcaseFeature[] = (
    Array.isArray(raw.features) ? raw.features : []
  )
    .filter(feature => text(feature?.title, ''))
    .map(feature => ({
      title: feature.title!,
      description: text(feature.description, ''),
    }));

  return {
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    tabs: tabs.length ? tabs : fallback.tabs,
    features: features.length ? features : fallback.features,
  };
}

/**
 * Cards without a title are skipped (none left → the fallback cards); each
 * card falls back to the fallback card at the same position (cycling) for
 * its description and image. A card without a link shows none.
 */
export function mapCardCarousel(
  raw: RawCardCarousel | null | undefined,
  fallback: CardCarouselContent
): CardCarouselContent {
  if (!raw) return fallback;

  const cards: CarouselCard[] = (Array.isArray(raw.cards) ? raw.cards : [])
    .filter(card => text(card?.title, ''))
    .map((card, index) => {
      const base = fallback.cards[index % fallback.cards.length];
      return {
        title: card.title!,
        description: text(card.description, base.description),
        image: mapImage(card.image, base.image),
        action: mapOptionalCta(card.action, base.action),
      };
    });

  return {
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    cards: cards.length ? cards : fallback.cards,
  };
}

/**
 * Stories without a company are skipped (none left → the fallback stories).
 * A story's logo and quote fall back to the fallback story at the same
 * position; an empty author or role is simply left out, and a story
 * without a link shows none.
 */
export function mapCustomerStories(
  raw: RawCustomerStory[] | null | undefined,
  fallback: CustomerStory[]
): CustomerStory[] {
  const stories = (Array.isArray(raw) ? raw : []).filter(story =>
    text(story?.company, '')
  );
  if (!stories.length) return fallback;

  return stories.map((story, index) => {
    const base = fallback[index % fallback.length];
    return {
      company: story.company!,
      logo: mapImage(story.logo, base.logo),
      quote: text(story.quote, base.quote),
      author: optionalText(story.author),
      role: optionalText(story.role),
      action: mapOptionalCta(story.action, base.action),
    };
  });
}

export interface RawHero {
  headline?: string | null;
  subtitle?: string | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  image?: StrapiMedia | null;
}

interface RawFeaturedApp {
  title?: string | null;
  badge?: string | null;
  description?: string | null;
  href?: string | null;
}

interface RawFeaturedApps {
  label?: string | null;
  apps?: RawFeaturedApp[] | null;
  action?: RawCta | null;
  image?: StrapiMedia | null;
}

interface RawFeatureRow {
  title?: string | null;
  description?: string | null;
  action?: RawCta | null;
  image?: StrapiMedia | null;
  darkImage?: StrapiMedia | null;
  imagePosition?: string | null;
}

interface RawShowcaseTab {
  label?: string | null;
  badge?: string | null;
  image?: StrapiMedia | null;
  darkImage?: StrapiMedia | null;
  showCard?: boolean | null;
  cardTitle?: string | null;
  cardImage?: StrapiMedia | null;
  cardAction?: RawCta | null;
}

interface RawShowcaseFeature {
  title?: string | null;
  description?: string | null;
}

interface RawProductShowcase {
  title?: string | null;
  description?: string | null;
  tabs?: RawShowcaseTab[] | null;
  features?: RawShowcaseFeature[] | null;
}

interface RawCarouselCard {
  title?: string | null;
  description?: string | null;
  image?: StrapiMedia | null;
  action?: RawCta | null;
}

export interface RawCardCarousel {
  title?: string | null;
  description?: string | null;
  cards?: RawCarouselCard[] | null;
}

interface RawCustomerStory {
  company?: string | null;
  logo?: StrapiMedia | null;
  quote?: string | null;
  author?: string | null;
  role?: string | null;
  action?: RawCta | null;
}

export interface RawLandingPage {
  customerStories?: RawCustomerStory[] | null;
  cardCarousel?: RawCardCarousel | null;
  productShowcase?: RawProductShowcase | null;
  hero?: RawHero | null;
  productsHeading?: RawSectionHeading | null;
  featuredApps?: RawFeaturedApps | null;
  platformHeading?: RawSectionHeading | null;
  featureRows?: RawFeatureRow[] | null;
}

/**
 * Rows without a title are skipped; none left → the fallback rows. Each row
 * falls back field by field to the fallback row at the same position (or the
 * first), so images and links stay sensible while editors fill things in.
 */
export function mapFeatureRows(
  raw: RawFeatureRow[] | null | undefined,
  fallback: FeatureRowContent[]
): FeatureRowContent[] {
  const rows = (Array.isArray(raw) ? raw : []).filter(row =>
    text(row?.title, '')
  );
  if (!rows.length) return fallback;

  return rows.map((row, index) => {
    const base = fallback[index] ?? fallback[0];
    return {
      title: row.title!,
      description: text(row.description, base.description),
      action: mapOptionalCta(row.action, base.action),
      image: mapImageWithDark(row.image, row.darkImage, base.image),
      imagePosition:
        row.imagePosition === 'left' || row.imagePosition === 'right'
          ? row.imagePosition
          : base.imagePosition,
    };
  });
}

export function mapFeaturedApps(
  raw: RawFeaturedApps | null | undefined,
  fallback: FeaturedAppsContent
): FeaturedAppsContent {
  if (!raw) return fallback;

  // Apps without a title are skipped; none left → the fallback apps.
  const apps: FeaturedApp[] = (Array.isArray(raw.apps) ? raw.apps : [])
    .filter(app => text(app?.title, ''))
    .map(app => ({
      title: app.title!,
      description: text(app.description, ''),
      badge: optionalText(app.badge),
      href: optionalText(app.href),
    }));

  return {
    label: text(raw.label, fallback.label),
    apps: apps.length ? apps : fallback.apps,
    action: mapOptionalCta(raw.action, fallback.action),
    image: mapImage(raw.image, fallback.image),
  };
}

/** Bundled feature-row illustrations, used until an editor uploads them in Strapi. */
export const DEFAULT_ECOSYSTEM_IMAGE: ImageAsset = {
  src: '/home/right.png',
  darkSrc: '/home/dark-right.png',
  alt: 'Three glowing spheres joined in a ring',
  width: 1340,
  height: 1174,
};

export const DEFAULT_INTELLIGENCE_IMAGE: ImageAsset = {
  src: '/home/left.png',
  alt: 'A glowing brain beside a sparkle',
  width: 1330,
  height: 1182,
};

/** Bundled customer logos (64px squares, shown at 27px). */
export const DEFAULT_CUSTOMER_LOGOS: Record<string, ImageAsset> =
  Object.fromEntries(
    [
      ['northfield', 'Northfield Logistics'],
      ['brightpath', 'Brightpath Schools'],
      ['meridian', 'Meridian Health'],
      ['kavya', 'Kavya Retail'],
    ].map(([key, name]) => [
      key,
      {
        src: `/home/logo-${key}.png`,
        alt: `${name} logo`,
        width: 64,
        height: 64,
      },
    ])
  );

/** Bundled carousel card artwork. */
export const DEFAULT_CAROUSEL_IMAGES: ImageAsset[] = [
  {
    src: '/home/carousel-1.jpg',
    alt: 'Glowing hearts in a circle',
    width: 485,
    height: 472,
  },
  {
    src: '/home/carousel-2.jpg',
    alt: 'An R logo over rushing water',
    width: 485,
    height: 472,
  },
  {
    src: '/home/carousel-3.jpg',
    alt: 'A green lightning bolt on a dark grid',
    width: 485,
    height: 472,
  },
];

/** Bundled dashboard crop used by the showcase's phone cards. */
export const DEFAULT_SHOWCASE_CARD_IMAGE: ImageAsset = {
  src: '/Product/showcase-card.jpg',
  alt: 'An UpSentrix dashboard with attendance and tasks',
  width: 532,
  height: 325,
};

/** Bundled product screenshots for the showcase tabs — placeholders until the real ones are uploaded. */
const showcaseImage = (name: string, alt: string): ImageAsset => ({
  src: `/Product/showcase-${name}.jpg`,
  alt,
  width: 1602,
  height: 1052,
});

export const DEFAULT_SHOWCASE_IMAGES = {
  core: showcaseImage('core', 'UpSentrix Core lead pipeline board'),
  people: showcaseImage('people', 'UpSentrix People preview'),
  learn: showcaseImage('learn', 'UpSentrix Learn preview'),
};

/** Bundled Featured apps image, used until an editor uploads one in Strapi. */
export const DEFAULT_FEATURED_APPS_IMAGE: ImageAsset = {
  src: '/Product/featured-apps.png',
  alt: 'The UpSentrix "UX" mark on a blue and green gradient',
  width: 403,
  height: 325,
};

/** Bundled product shot, used until an editor uploads one in Strapi. */
export const DEFAULT_HERO_IMAGE: ImageAsset = {
  src: '/hero/hero.png',
  alt: 'The Upspace HR dashboard shown on a laptop: attendance, check-in time and remaining hours',
  width: 2398,
  height: 1644,
};

export function mapHeroContent(
  raw: RawHero | null | undefined,
  fallback: HeroContent
): HeroContent {
  // Without any hero entry the whole fallback hero is used. Once there is one,
  // an emptied secondary CTA means the editor removed it, so it stays hidden.
  if (!raw) return fallback;

  return {
    headline: text(raw.headline, fallback.headline),
    subtitle: text(raw.subtitle, fallback.subtitle),
    primaryCta: mapCta(raw.primaryCta, fallback.primaryCta),
    secondaryCta: raw.secondaryCta
      ? mapCta(raw.secondaryCta, fallback.secondaryCta ?? fallback.primaryCta)
      : null,
    image: mapImage(raw.image, fallback.image),
  };
}

export function mapLandingPageContent(
  raw: RawLandingPage | null | undefined,
  fallback: LandingPageContent
): LandingPageContent {
  return {
    hero: mapHeroContent(raw?.hero, fallback.hero),
    productsHeading: mapSectionHeading(
      raw?.productsHeading,
      fallback.productsHeading
    ),
    featuredApps: mapFeaturedApps(raw?.featuredApps, fallback.featuredApps),
    platformHeading: mapSectionHeading(
      raw?.platformHeading,
      fallback.platformHeading
    ),
    featureRows: mapFeatureRows(raw?.featureRows, fallback.featureRows),
    productShowcase: mapProductShowcase(
      raw?.productShowcase,
      fallback.productShowcase
    ),
    cardCarousel: mapCardCarousel(raw?.cardCarousel, fallback.cardCarousel),
    customerStories: mapCustomerStories(
      raw?.customerStories,
      fallback.customerStories
    ),
  };
}
