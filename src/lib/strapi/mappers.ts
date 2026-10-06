import { strapiMediaUrl, type StrapiMedia } from '@/lib/strapi/client';
import type {
  CtaLink,
  HeroContent,
  ImageAsset,
  LandingPageContent,
  NavContent,
  NavLink,
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

// ─── Navigation ────────────────────────────────────────────────────────────

interface RawNavLink {
  label?: string | null;
  href?: string | null;
}

export interface RawNavigation {
  navLinks?: RawNavLink[] | null;
  ctaText?: string | null;
  ctaHref?: string | null;
}

export function mapNavContent(
  raw: RawNavigation | null | undefined,
  fallback: NavContent
): NavContent {
  // Links missing a label or href are skipped; no usable links at all → the fallback links.
  const links: NavLink[] = (Array.isArray(raw?.navLinks) ? raw.navLinks : [])
    .filter(link => text(link?.label, '') && text(link?.href, ''))
    .map(link => ({ label: link.label!, href: link.href! }));

  return {
    links: links.length ? links : fallback.links,
    ctaText: text(raw?.ctaText, fallback.ctaText),
    ctaHref: text(raw?.ctaHref, fallback.ctaHref),
  };
}

// ─── Landing Page ──────────────────────────────────────────────────────────

interface RawHero {
  headline?: string | null;
  subtitle?: string | null;
  primaryCta?: RawCta | null;
  secondaryCta?: RawCta | null;
  image?: StrapiMedia | null;
}

export interface RawLandingPage {
  hero?: RawHero | null;
}

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
  return { hero: mapHeroContent(raw?.hero, fallback.hero) };
}
