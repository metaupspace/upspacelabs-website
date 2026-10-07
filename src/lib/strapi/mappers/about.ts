/** The /about-us page (Strapi's About Page). */

import { type StrapiMedia } from '@/lib/strapi/client';
import type {
  AboutPageContent,
  FoundedContent,
  GlobeConnection,
  ImageAsset,
  Milestone,
  Office,
  OfficesContent,
  ProgressContent,
  TeamContent,
  TeamMember,
} from '@/lib/types';
import {
  RawCardCarousel,
  RawHero,
  mapCardCarousel,
  mapHeroContent,
} from './landing';
import { mapImage, optionalText, text, toNumber } from './shared';

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
