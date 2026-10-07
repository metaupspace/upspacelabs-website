/**
 * Building blocks of the Strapi mappers: blank-aware text, links, images
 * and section headings, each falling back field by field.
 */

import { strapiMediaUrl, type StrapiMedia } from '@/lib/strapi/client';
import type { CtaLink, ImageAsset, SectionHeadingContent } from '@/lib/types';

export interface RawCta {
  label?: string | null;
  href?: string | null;
}

/** `value` when it is a non-blank string, otherwise `fallback`. */
export const text = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value : fallback;

export const mapCta = (
  raw: RawCta | null | undefined,
  fallback: CtaLink
): CtaLink => ({
  label: text(raw?.label, fallback.label),
  href: text(raw?.href, fallback.href),
});

/** Maps a Strapi media field, or returns `fallback` when it is empty. */
export const mapImage = (
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

export interface RawSectionHeading {
  title?: string | null;
  description?: string | null;
}

export const mapSectionHeading = (
  raw: RawSectionHeading | null | undefined,
  fallback: SectionHeadingContent
): SectionHeadingContent => ({
  title: text(raw?.title, fallback.title),
  description: text(raw?.description, fallback.description),
});

/**
 * A light image plus its optional dark-mode version. An uploaded light image
 * without a dark one shows in both themes (the bundled dark cut-out would no
 * longer match it); with no uploads at all, both bundled versions are used.
 */
export const mapImageWithDark = (
  media: StrapiMedia | null | undefined,
  darkMedia: StrapiMedia | null | undefined,
  fallback: ImageAsset
): ImageAsset => {
  const image = mapImage(media, fallback);
  if (darkMedia?.url) return { ...image, darkSrc: strapiMediaUrl(darkMedia) };
  return media?.url ? { ...image, darkSrc: undefined } : image;
};

/** Blank optional strings become `null` (no badge, no link). */
export const optionalText = (value: unknown): string | null =>
  typeof value === 'string' && value.trim() ? value : null;

/**
 * Like the hero's secondary CTA: a removed action stays hidden, blank fields
 * fall back, and one that still has no label or link is dropped.
 */
export function mapOptionalCta(
  raw: RawCta | null | undefined,
  fallback: CtaLink | null
): CtaLink | null {
  if (!raw) return null;
  const cta = mapCta(raw, fallback ?? { label: '', href: '' });
  return cta.label && cta.href ? cta : null;
}

/** Strapi decimals can arrive as strings; anything unparseable is `null`. */
export const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};
