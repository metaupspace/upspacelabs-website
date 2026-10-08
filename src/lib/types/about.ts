import type { CardCarouselContent, HeroContent } from './landing';
import type { ImageAsset } from './shared';

export interface GlobeLocation {
  lat: number;
  lng: number;
}

/** One arc on the globe, from the office to a place. */
export interface GlobeConnection extends GlobeLocation {
  label: string | null;
  /** Peak height of the arc as a fraction of the globe's radius. */
  altitude: number | null;
}

/** "Founded in Delhi" — text beside the dotted globe. */
export interface FoundedContent {
  title: string;
  /** One entry per paragraph. */
  paragraphs: string[];
  /** Where every arc starts. */
  office: GlobeLocation;
  connections: GlobeConnection[];
}

export interface TeamMember {
  name: string;
  role: string | null;
  photo: ImageAsset;
}

/** "Meet the team" — a heading over a carousel of people. */
export interface TeamContent {
  /** Line breaks (`\n`) are kept from md up. */
  title: string;
  description: string;
  members: TeamMember[];
}

/** One office card: a map over an illustration of the city. */
export interface Office {
  city: string;
  /** What the map shows — an address, a place name or "lat,lng". */
  mapQuery: string;
  mapZoom: number;
  background: ImageAsset;
}

/** "Working in office across two incredible cities". */
export interface OfficesContent {
  /** Line breaks (`\n`) are kept from md up. */
  title: string;
  description: string;
  offices: Office[];
}

/** A point on the progress timeline. */
export interface Milestone {
  date: string | null;
  title: string;
  /** Short line under the title — "Launching", "Upcoming". */
  status: string | null;
  description: string | null;
}

/** "Our path of progress" — a heading over the milestone timeline. */
export interface ProgressContent {
  title: string;
  description: string;
  /** Label of the corner "Skip" button (jumps past the timeline); `null` hides it. */
  hint: string | null;
  milestones: Milestone[];
}

/** Everything the /about-us page renders, from Strapi's About Page single type. */
export interface AboutPageContent {
  /** Headline, subtitle, two CTAs and the team photo. */
  hero: HeroContent;
  founded: FoundedContent;
  team: TeamContent;
  offices: OfficesContent;
  progress: ProgressContent;
  /** "Building a foundation…" — the shared card carousel. */
  stories: CardCarouselContent;
}
