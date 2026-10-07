/** Blog posts and the /blog listing. */

import { type StrapiMedia } from '@/lib/strapi/client';
import type {
  BlogBlock,
  BlogCard,
  BlogLogo,
  BlogPageContent,
  BlogPost,
  BlogStat,
  ImageAsset,
} from '@/lib/types';
import { RawCardCarousel, mapCardCarousel } from './landing';
import { mapImage, optionalText, text } from './shared';

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
