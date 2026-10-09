/** The /career pages (Strapi's Career Page); the jobs themselves come from the Job Portal API. */

import { strapiMediaUrl, type StrapiMedia } from '@/lib/strapi/client';
import type {
  ApplyFieldCopy,
  ApplyFormLabels,
  CareerPageContent,
  CareerPerk,
  CareerVideo,
  HowWeWorkContent,
  JobDetailLabels,
  OpenRolesContent,
  WhyJoinContent,
} from '@/lib/types';
import {
  RawCta,
  RawSectionHeading,
  mapImage,
  mapOptionalCta,
  mapSectionHeading,
  optionalText,
  text,
} from './shared';

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
  jobDetail?: Partial<Record<keyof JobDetailLabels, string | null>> | null;
  applyForm?:
    | (Partial<
        Record<Exclude<keyof ApplyFormLabels, 'fields'>, string | null>
      > & { fields?: unknown })
    | null;
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

/** The open-roles heading from Strapi (the jobs come from the Job Portal API only). */
export function mapOpenRoles(
  raw: RawCareerPage['openRoles'],
  fallback: OpenRolesContent
): OpenRolesContent {
  return {
    title: text(raw?.title, fallback.title),
    description: text(raw?.description, fallback.description),
  };
}

/** Each label falls back on its own. */
export function mapJobDetailLabels(
  raw: RawCareerPage['jobDetail'],
  fallback: JobDetailLabels
): JobDetailLabels {
  return Object.fromEntries(
    (Object.keys(fallback) as (keyof JobDetailLabels)[]).map(key => [
      key,
      text(raw?.[key], fallback[key]),
    ])
  ) as unknown as JobDetailLabels;
}

/** Strings fall back one by one; each field's label, placeholder and option names too. */
export function mapApplyFormLabels(
  raw: RawCareerPage['applyForm'],
  fallback: ApplyFormLabels
): ApplyFormLabels {
  const rawFields =
    raw?.fields && typeof raw.fields === 'object'
      ? (raw.fields as Record<string, Partial<ApplyFieldCopy> | undefined>)
      : {};
  const fields = Object.fromEntries(
    Object.entries(fallback.fields).map(([key, base]) => {
      const f = rawFields[key] ?? {};
      const options = base.options
        ? Object.fromEntries(
            Object.entries(base.options).map(([value, name]) => [
              value,
              text(f.options?.[value], name),
            ])
          )
        : undefined;
      return [
        key,
        {
          label: text(f.label, base.label),
          placeholder: text(f.placeholder, base.placeholder),
          ...(options ? { options } : {}),
        },
      ];
    })
  );
  const strings = Object.fromEntries(
    (Object.keys(fallback) as (keyof ApplyFormLabels)[])
      .filter(key => key !== 'fields')
      .map(key => [
        key,
        text(
          raw?.[key as Exclude<keyof ApplyFormLabels, 'fields'>],
          fallback[key] as string
        ),
      ])
  );
  return { ...(strings as Omit<ApplyFormLabels, 'fields'>), fields };
}

/**
 * Without a hero entry the whole fallback hero is used; once there is one,
 * an emptied badge or button means the editor removed it, so it stays hidden.
 */
export function mapCareerPageContent(
  raw: RawCareerPage | null | undefined,
  fallback: CareerPageContent
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
    openRoles: mapOpenRoles(raw?.openRoles, fallback.openRoles),
    howWeWork: mapHowWeWork(raw?.howWeWork, fallback.howWeWork),
    officesHeading: mapSectionHeading(
      raw?.officesHeading,
      fallback.officesHeading
    ),
    jobDetail: mapJobDetailLabels(raw?.jobDetail, fallback.jobDetail),
    applyForm: mapApplyFormLabels(raw?.applyForm, fallback.applyForm),
  };
}
