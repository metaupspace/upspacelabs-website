import { strapiMediaUrl, type StrapiMedia } from '@/lib/strapi/client';
import type {
  AboutPageContent,
  CareerPageContent,
  CareerPerk,
  CareerVideo,
  HowWeWorkContent,
  JobListing,
  OpenRolesContent,
  WhyJoinContent,
  FoundedContent,
  GlobeConnection,
  Milestone,
  Office,
  OfficesContent,
  ProgressContent,
  TeamContent,
  TeamMember,
  BlogBlock,
  BlogCard,
  BlogPageContent,
  BlogLogo,
  BlogStat,
  BlogPost,
  CardCarouselContent,
  CarouselCard,
  CtaLink,
  CustomerStory,
  FeaturedApp,
  FeaturedAppsContent,
  FeatureRowContent,
  FooterColumnContent,
  FooterContent,
  FooterSocialContent,
  HeroContent,
  ImageAsset,
  LandingPageContent,
  NavContent,
  NavLink,
  SocialPlatform,
  ProductShowcaseContent,
  ShowcaseFeature,
  ShowcaseTab,
  SectionHeadingContent,
} from '@/lib/types';

/*
 * Every mapper takes the static fallback for its content and falls back
 * field by field: a missing, null or blank value from Strapi (an unfilled
 * field, an unexpected shape, a half-published entry) renders the fallback
 * instead of an empty or broken section.
 */

// ─── Shared ────────────────────────────────────────────────────────────────

interface RawCta {
  label?: string | null;
  href?: string | null;
}

/** `value` when it is a non-blank string, otherwise `fallback`. */
const text = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value : fallback;

const mapCta = (
  raw: RawCta | null | undefined,
  fallback: CtaLink
): CtaLink => ({
  label: text(raw?.label, fallback.label),
  href: text(raw?.href, fallback.href),
});

/** Maps a Strapi media field, or returns `fallback` when it is empty. */
const mapImage = (
  media: StrapiMedia | null | undefined,
  fallback: ImageAsset
): ImageAsset =>
  media?.url
    ? {
        src: strapiMediaUrl(media),
        alt: text(media.alternativeText, fallback.alt),
        width: media.width ?? fallback.width,
        height: media.height ?? fallback.height,
      }
    : fallback;

interface RawSectionHeading {
  title?: string | null;
  description?: string | null;
}

const mapSectionHeading = (
  raw: RawSectionHeading | null | undefined,
  fallback: SectionHeadingContent
): SectionHeadingContent => ({
  title: text(raw?.title, fallback.title),
  description: text(raw?.description, fallback.description),
});

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

/**
 * A light image plus its optional dark-mode version. An uploaded light image
 * without a dark one shows in both themes (the bundled dark cut-out would no
 * longer match it); with no uploads at all, both bundled versions are used.
 */
const mapImageWithDark = (
  media: StrapiMedia | null | undefined,
  darkMedia: StrapiMedia | null | undefined,
  fallback: ImageAsset
): ImageAsset => {
  const image = mapImage(media, fallback);
  if (darkMedia?.url) return { ...image, darkSrc: strapiMediaUrl(darkMedia) };
  return media?.url ? { ...image, darkSrc: undefined } : image;
};

// ─── Navigation ────────────────────────────────────────────────────────────

interface RawNavLink {
  label?: string | null;
  href?: string | null;
}

export interface RawNavigation {
  footerLogo?: StrapiMedia | null;
  footerCta?: {
    title?: string | null;
    description?: string | null;
    label?: string | null;
    href?: string | null;
  } | null;
  footerColumns?: Array<{
    heading?: string | null;
    links?: RawNavLink[] | null;
  }> | null;
  socialLinks?: Array<{
    platform?: string | null;
    href?: string | null;
  }> | null;
  copyright?: string | null;
  logo?: StrapiMedia | null;
  logoDark?: StrapiMedia | null;
  navLinks?: RawNavLink[] | null;
  ctaText?: string | null;
  ctaHref?: string | null;
  appearanceLabel?: string | null;
}

export function mapNavContent(
  raw: RawNavigation | null | undefined,
  fallback: NavContent
): NavContent {
  // Links missing a label or href are skipped; no usable links at all → the fallback links.
  const links: NavLink[] = (Array.isArray(raw?.navLinks) ? raw.navLinks : [])
    .filter(link => text(link?.label, '') && text(link?.href, ''))
    .map(link => ({ label: link.label!, href: link.href! }));

  // Each logo version falls back on its own: a missing dark logo must never
  // leave the light (black) one on the dark bar.
  const light = mapImage(raw?.logo, fallback.logo);
  const logo: ImageAsset = {
    ...light,
    darkSrc: raw?.logoDark?.url
      ? strapiMediaUrl(raw.logoDark)
      : fallback.logo.darkSrc,
  };

  return {
    logo,
    links: links.length ? links : fallback.links,
    ctaText: text(raw?.ctaText, fallback.ctaText),
    ctaHref: text(raw?.ctaHref, fallback.ctaHref),
    appearanceLabel: text(raw?.appearanceLabel, fallback.appearanceLabel),
  };
}

const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
  'linkedin',
  'twitter',
  'instagram',
  'github',
  'youtube',
];

/**
 * Footer content, falling back field by field: columns without a heading,
 * links without a label or href and socials with an unknown platform are
 * skipped; nothing usable left → the fallback list.
 */
export function mapFooterContent(
  raw: RawNavigation | null | undefined,
  fallback: FooterContent
): FooterContent {
  const cta = raw?.footerCta;
  const columns: FooterColumnContent[] = (
    Array.isArray(raw?.footerColumns) ? raw.footerColumns : []
  )
    .filter(column => text(column?.heading, ''))
    .map(column => ({
      heading: column.heading!,
      links: (Array.isArray(column.links) ? column.links : [])
        .filter(link => text(link?.label, '') && text(link?.href, ''))
        .map(link => ({ label: link.label!, href: link.href! })),
    }));
  const socials: FooterSocialContent[] = (
    Array.isArray(raw?.socialLinks) ? raw.socialLinks : []
  )
    .filter(
      social =>
        SOCIAL_PLATFORMS.includes(social?.platform as SocialPlatform) &&
        text(social?.href, '')
    )
    .map(social => ({
      platform: social.platform as SocialPlatform,
      href: social.href!,
    }));

  return {
    logo: mapImage(raw?.footerLogo, fallback.logo),
    cta: {
      title: text(cta?.title, fallback.cta.title),
      description: text(cta?.description, fallback.cta.description),
      action: mapCta(
        cta ? { label: cta.label, href: cta.href } : null,
        fallback.cta.action
      ),
    },
    columns: columns.length ? columns : fallback.columns,
    socials: socials.length ? socials : fallback.socials,
    copyright: text(raw?.copyright, fallback.copyright),
  };
}

// ─── Blog ─────────────────────────────────────────────────────────────────

interface RawBlogBlock {
  __component?: string;
  heading?: string | null;
  body?: string | null;
  quote?: string | null;
  author?: string | null;
  role?: string | null;
  image?: StrapiMedia | null;
  caption?: string | null;
}

/** Body text → paragraph groups (blank line) of lines (single line break). */
export const textToGroups = (body: string): string[][] =>
  body
    .split(/\n\s*\n/)
    .map(group =>
      group
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean)
    )
    .filter(group => group.length > 0);

/** Body blocks in order; empty or unknown blocks are skipped. */
function mapBlogBody(raw: RawBlogBlock[]): BlogBlock[] {
  return raw.flatMap((block): BlogBlock[] => {
    switch (block?.__component) {
      case 'blog.text-section': {
        const groups = textToGroups(text(block.body, ''));
        return groups.length
          ? [{ type: 'text', heading: optionalText(block.heading), groups }]
          : [];
      }
      case 'blog.pull-quote':
        return text(block.quote, '')
          ? [
              {
                type: 'quote',
                quote: block.quote!,
                author: optionalText(block.author),
                role: optionalText(block.role),
              },
            ]
          : [];
      case 'blog.image':
        return block.image?.url
          ? [
              {
                type: 'image',
                image: mapImage(block.image, {
                  src: '',
                  alt: text(block.caption, ''),
                  width: 1200,
                  height: 800,
                }),
                caption: optionalText(block.caption),
              },
            ]
          : [];
      default:
        return [];
    }
  });
}

export interface RawBlogPost {
  title?: string | null;
  slug?: string | null;
  summary?: string | null;
  excerpt?: string | null;
  coverImage?: StrapiMedia | null;
  stats?: Array<{ value?: string | null; label?: string | null }> | null;
  body?: RawBlogBlock[] | null;
  moreStories?: RawCardCarousel | null;
  logosLabel?: string | null;
  logos?: Array<{
    name?: string | null;
    image?: StrapiMedia | null;
    href?: string | null;
  }> | null;
}

/** A Strapi post, falling back field by field (summary, cover) to `fallback`. */
export function mapBlogPost(raw: RawBlogPost, fallback: BlogPost): BlogPost {
  return {
    slug: text(raw.slug, fallback.slug),
    title: text(raw.title, fallback.title),
    summary: text(raw.summary, fallback.summary),
    excerpt: text(raw.excerpt, fallback.excerpt),
    coverImage: mapImage(raw.coverImage, fallback.coverImage),
    logosLabel: text(raw.logosLabel, fallback.logosLabel),
    logos: mapBlogLogos(raw.logos, fallback.logos),
    stats: mapBlogStats(raw.stats, fallback.stats),
    moreStories: mapCardCarousel(raw.moreStories, fallback.moreStories),
    body: (() => {
      const body = mapBlogBody(Array.isArray(raw.body) ? raw.body : []);
      return body.length ? body : fallback.body;
    })(),
  };
}

/** Stats without a value are skipped; none left → the fallback stats. */
function mapBlogStats(
  raw: RawBlogPost['stats'],
  fallback: BlogStat[]
): BlogStat[] {
  const stats = (Array.isArray(raw) ? raw : [])
    .filter(stat => text(stat?.value, ''))
    .map(stat => ({ value: stat.value!, label: optionalText(stat.label) }));
  return stats.length ? stats : fallback;
}

/**
 * Logos without a name are skipped (none left → the fallback logos); one
 * without an image uses the fallback logo at the same position, if any,
 * otherwise it is dropped.
 */
function mapBlogLogos(
  raw: RawBlogPost['logos'],
  fallback: BlogLogo[]
): BlogLogo[] {
  const logos = (Array.isArray(raw) ? raw : [])
    .filter(logo => text(logo?.name, ''))
    .flatMap((logo, index): BlogLogo[] => {
      const base = fallback[index];
      if (!logo.image?.url && !base) return [];
      return [
        {
          name: logo.name!,
          image: base
            ? mapImage(logo.image, base.image)
            : mapImage(logo.image, {
                src: '',
                alt: logo.name!,
                width: 1,
                height: 1,
              }),
          href: optionalText(logo.href),
        },
      ];
    });
  return logos.length ? logos : fallback;
}

/** `[label](url)` → `label`, for plain-text uses (cards, meta descriptions). */
export const plainText = (value: string) =>
  value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

/**
 * A post for the /blog grid. Posts without a slug or title are skipped by the
 * caller; an empty excerpt falls back to the plain-text summary.
 */
export function mapBlogCard(
  raw: RawBlogPost,
  defaultCover: ImageAsset
): BlogCard | null {
  if (!text(raw.slug, '') || !text(raw.title, '')) return null;
  return {
    slug: raw.slug!,
    title: raw.title!,
    excerpt: text(raw.excerpt, plainText(text(raw.summary, ''))),
    coverImage: mapImage(raw.coverImage, defaultCover),
  };
}

export interface RawBlogPage {
  breadcrumbLabel?: string | null;
  title?: string | null;
  description?: string | null;
}

export function mapBlogPage(
  raw: RawBlogPage | null | undefined,
  fallback: BlogPageContent
): BlogPageContent {
  return {
    breadcrumbLabel: text(raw?.breadcrumbLabel, fallback.breadcrumbLabel),
    title: text(raw?.title, fallback.title),
    description: text(raw?.description, fallback.description),
  };
}

// ─── Landing Page ──────────────────────────────────────────────────────────

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

interface RawCardCarousel {
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

/** Blank optional strings become `null` (no badge, no link). */
const optionalText = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() ? value : null;

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

/**
 * Like the hero's secondary CTA: a removed action stays hidden, blank fields
 * fall back, and one that still has no label or link is dropped.
 */
function mapOptionalCta(
  raw: RawCta | null | undefined,
  fallback: CtaLink | null
): CtaLink | null {
  if (!raw) return null;
  const cta = mapCta(raw, fallback ?? { label: '', href: '' });
  return cta.label && cta.href ? cta : null;
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

/** Bundled white "US" mark for the black footer. */
export const DEFAULT_FOOTER_LOGO: ImageAsset = {
  src: '/Footer/footer-logo.png',
  alt: 'UpSpace Labs',
  width: 336,
  height: 174,
};

/** Bundled navbar logo (black) and its white dark-mode version. */
export const DEFAULT_LOGO: ImageAsset = {
  src: '/Navbar/logo.png',
  darkSrc: '/Navbar/logo-white.png',
  alt: 'UpSpace Labs',
  width: 147,
  height: 21,
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

// ─── About Page ────────────────────────────────────────────────────────────

interface RawFounded {
  title?: string | null;
  description?: string | null;
  officeLat?: number | string | null;
  officeLng?: number | string | null;
  connections?:
    | {
        label?: string | null;
        lat?: number | string | null;
        lng?: number | string | null;
        altitude?: number | string | null;
      }[]
    | null;
}

interface RawTeam {
  title?: string | null;
  description?: string | null;
  members?:
    | {
        name?: string | null;
        role?: string | null;
        photo?: StrapiMedia | null;
      }[]
    | null;
}

interface RawOffices {
  title?: string | null;
  description?: string | null;
  offices?:
    | {
        city?: string | null;
        mapQuery?: string | null;
        mapZoom?: number | null;
        background?: StrapiMedia | null;
      }[]
    | null;
}

interface RawProgress {
  title?: string | null;
  description?: string | null;
  hint?: string | null;
  milestones?:
    | {
        date?: string | null;
        title?: string | null;
        status?: string | null;
        description?: string | null;
      }[]
    | null;
}

export interface RawAboutPage {
  hero?: RawHero | null;
  founded?: RawFounded | null;
  team?: RawTeam | null;
  offices?: RawOffices | null;
  progress?: RawProgress | null;
  stories?: RawCardCarousel | null;
}

/** Milestones without a title are skipped (none left → the fallback ones); an emptied hint is hidden. */
export function mapProgress(
  raw: RawProgress | null | undefined,
  fallback: ProgressContent
): ProgressContent {
  if (!raw) return fallback;
  const milestones = (raw.milestones ?? []).flatMap((m): Milestone[] => {
    const title = text(m?.title, '');
    if (!title) return [];
    return [
      {
        date: optionalText(m.date),
        title,
        status: optionalText(m.status),
        description: optionalText(m.description),
      },
    ];
  });
  return {
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    hint: optionalText(raw.hint),
    milestones: milestones.length ? milestones : fallback.milestones,
  };
}

/** Illustration behind an office's map when none is uploaded. */
export const DEFAULT_OFFICE_BACKGROUND: ImageAsset = {
  src: '/About/bg.png',
  alt: '',
  width: 1717,
  height: 916,
};

/** Offices without a city are skipped (none left → the fallback offices); the map defaults to the city. */
export function mapOffices(
  raw: RawOffices | null | undefined,
  fallback: OfficesContent
): OfficesContent {
  if (!raw) return fallback;
  const offices = (raw.offices ?? []).flatMap((office): Office[] => {
    const city = text(office?.city, '');
    if (!city) return [];
    const zoom = toNumber(office.mapZoom);
    return [
      {
        city,
        mapQuery: text(office.mapQuery, city),
        mapZoom: zoom !== null && zoom >= 3 && zoom <= 20 ? zoom : 15,
        // Decorative: the map's title names the city.
        background: {
          ...mapImage(office.background, DEFAULT_OFFICE_BACKGROUND),
          alt: '',
        },
      },
    ];
  });
  return {
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    offices: offices.length ? offices : fallback.offices,
  };
}

/** Shown for a team member without a photo. */
export const DEFAULT_TEAM_PHOTO: ImageAsset = {
  src: '/About/team/img.jpg',
  alt: '',
  width: 640,
  height: 640,
};

/** Members without a name are skipped (none left → the fallback team). */
export function mapTeam(
  raw: RawTeam | null | undefined,
  fallback: TeamContent
): TeamContent {
  if (!raw) return fallback;
  const members = (raw.members ?? []).flatMap((member): TeamMember[] => {
    const name = text(member?.name, '');
    if (!name) return [];
    return [
      {
        name,
        role: optionalText(member.role),
        photo: mapImage(member.photo, { ...DEFAULT_TEAM_PHOTO, alt: name }),
      },
    ];
  });
  return {
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    members: members.length ? members : fallback.members,
  };
}

/** Strapi decimals can arrive as strings; anything unparseable is `null`. */
const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

export function mapFounded(
  raw: RawFounded | null | undefined,
  fallback: FoundedContent
): FoundedContent {
  if (!raw) return fallback;
  const paragraphs = text(raw.description, '')
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);
  const officeLat = toNumber(raw.officeLat);
  const officeLng = toNumber(raw.officeLng);
  const connections = (raw.connections ?? []).flatMap(
    (c): GlobeConnection[] => {
      const lat = toNumber(c?.lat);
      const lng = toNumber(c?.lng);
      if (lat === null || lng === null) return [];
      return [
        {
          label: optionalText(c.label),
          lat,
          lng,
          altitude: toNumber(c.altitude),
        },
      ];
    }
  );
  return {
    title: text(raw.title, fallback.title),
    paragraphs: paragraphs.length ? paragraphs : fallback.paragraphs,
    office:
      officeLat !== null && officeLng !== null
        ? { lat: officeLat, lng: officeLng }
        : fallback.office,
    connections: connections.length ? connections : fallback.connections,
  };
}

export function mapAboutPageContent(
  raw: RawAboutPage | null | undefined,
  fallback: AboutPageContent
): AboutPageContent {
  return {
    hero: mapHeroContent(raw?.hero, fallback.hero),
    founded: mapFounded(raw?.founded, fallback.founded),
    team: mapTeam(raw?.team, fallback.team),
    offices: mapOffices(raw?.offices, fallback.offices),
    progress: mapProgress(raw?.progress, fallback.progress),
    stories: mapCardCarousel(raw?.stories, fallback.stories),
  };
}

// ─── Career Page ───────────────────────────────────────────────────────────

export interface RawCareerPage {
  hero?: {
    badge?: string | null;
    headline?: string | null;
    subtitle?: string | null;
    cta?: RawCta | null;
  } | null;
  gallery?:
    | {
        title?: string | null;
        poster?: StrapiMedia | null;
        video?: StrapiMedia | null;
        videoUrl?: string | null;
        playButton?: string | null;
      }[]
    | null;
  whyJoin?: {
    eyebrow?: string | null;
    title?: string | null;
    description?: string | null;
    perks?: { title?: string | null; description?: string | null }[] | null;
  } | null;
  openRoles?: { title?: string | null; description?: string | null } | null;
  howWeWork?: {
    eyebrow?: string | null;
    title?: string | null;
    description?: string | null;
    image?: StrapiMedia | null;
  } | null;
  officesHeading?: RawSectionHeading | null;
}

/**
 * Videos without a title are skipped (none left → the fallback gallery); a
 * missing poster uses the fallback tile's at the same position. An uploaded
 * video wins over `videoUrl`; with neither the tile shows only its poster.
 */
export function mapCareerGallery(
  raw: RawCareerPage['gallery'],
  fallback: CareerVideo[]
): CareerVideo[] {
  const videos = (raw ?? []).flatMap((item, index): CareerVideo[] => {
    const title = text(item?.title, '');
    if (!title) return [];
    const base = fallback[index % fallback.length];
    const upload = item.video?.url ? strapiMediaUrl(item.video) : '';
    return [
      {
        title,
        poster: {
          ...mapImage(item.poster, base.poster),
          alt: text(item.poster?.alternativeText, title),
        },
        src: upload || optionalText(item.videoUrl),
        playButton: item.playButton === 'light' ? 'light' : 'primary',
      },
    ];
  });
  return videos.length ? videos : fallback;
}

/** Perks without a title are skipped (none left → the fallback perks); an emptied eyebrow is hidden. */
export function mapWhyJoin(
  raw: RawCareerPage['whyJoin'],
  fallback: WhyJoinContent
): WhyJoinContent {
  if (!raw) return fallback;
  const perks = (raw.perks ?? []).flatMap((perk): CareerPerk[] => {
    const title = text(perk?.title, '');
    return title
      ? [{ title, description: optionalText(perk.description) }]
      : [];
  });
  return {
    eyebrow: optionalText(raw.eyebrow),
    title: text(raw.title, fallback.title),
    description: text(raw.description, fallback.description),
    perks: perks.length ? perks : fallback.perks,
  };
}

/** Paragraphs split on blank lines; an emptied eyebrow is hidden. */
export function mapHowWeWork(
  raw: RawCareerPage['howWeWork'],
  fallback: HowWeWorkContent
): HowWeWorkContent {
  if (!raw) return fallback;
  const paragraphs = text(raw.description, '')
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean);
  return {
    eyebrow: optionalText(raw.eyebrow),
    title: text(raw.title, fallback.title),
    paragraphs: paragraphs.length ? paragraphs : fallback.paragraphs,
    image: mapImage(raw.image, fallback.image),
  };
}

export interface RawJob {
  title?: string | null;
  slug?: string | null;
  team?: string | null;
  location?: string | null;
}

/** Jobs need a title and slug; with none left (or no Strapi list) the fallback jobs show. */
export function mapOpenRoles(
  raw: RawCareerPage['openRoles'],
  rawJobs: RawJob[] | null | undefined,
  fallback: OpenRolesContent
): OpenRolesContent {
  const jobs = (rawJobs ?? []).flatMap((job): JobListing[] => {
    const title = text(job?.title, '');
    const slug = text(job?.slug, '');
    return title && slug
      ? [
          {
            title,
            slug,
            team: optionalText(job.team),
            location: optionalText(job.location),
          },
        ]
      : [];
  });
  return {
    title: text(raw?.title, fallback.title),
    description: text(raw?.description, fallback.description),
    jobs: jobs.length ? jobs : fallback.jobs,
  };
}

/**
 * Without a hero entry the whole fallback hero is used; once there is one,
 * an emptied badge or button means the editor removed it, so it stays hidden.
 */
export function mapCareerPageContent(
  raw: RawCareerPage | null | undefined,
  fallback: CareerPageContent,
  rawJobs?: RawJob[] | null
): CareerPageContent {
  const hero = raw?.hero;
  return {
    hero: hero
      ? {
          badge: optionalText(hero.badge),
          headline: text(hero.headline, fallback.hero.headline),
          subtitle: text(hero.subtitle, fallback.hero.subtitle),
          cta: mapOptionalCta(hero.cta, fallback.hero.cta),
        }
      : fallback.hero,
    gallery: mapCareerGallery(raw?.gallery, fallback.gallery),
    whyJoin: mapWhyJoin(raw?.whyJoin, fallback.whyJoin),
    openRoles: mapOpenRoles(raw?.openRoles, rawJobs, fallback.openRoles),
    howWeWork: mapHowWeWork(raw?.howWeWork, fallback.howWeWork),
    officesHeading: mapSectionHeading(
      raw?.officesHeading,
      fallback.officesHeading
    ),
  };
}
