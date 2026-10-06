import type { CtaLink, ImageAsset, SectionHeadingContent } from './shared';

/** Top of /career. */
export interface CareerHeroContent {
  /** Pill above the headline ("Now Hiring in Delhi"); `null` hides it. */
  badge: string | null;
  /** Line breaks (`\n`) are kept from md up. */
  headline: string;
  subtitle: string;
  /** `null` hides the button. */
  cta: CtaLink | null;
}

/** A tile of the career video gallery. */
export interface CareerVideo {
  title: string;
  poster: ImageAsset;
  /** mp4 / webm URL or a YouTube / Vimeo link; `null` shows the poster without a play button. */
  src: string | null;
  /** Blue (`primary`) or white (`light`, for dark or busy posters) play button. */
  playButton: 'primary' | 'light';
}

/** One reason to join in the "Why join us" grid. */
export interface CareerPerk {
  title: string;
  description: string | null;
}

/** "Why people choose to build with us": text beside a grid of perks. */
export interface WhyJoinContent {
  /** Small blue label above the title; `null` hides it. */
  eyebrow: string | null;
  title: string;
  description: string;
  perks: CareerPerk[];
}

/** An open role in the /career list. */
export interface JobListing {
  title: string;
  /** `/career/<slug>` is the role's page. */
  slug: string;
  team: string | null;
  location: string | null;
}

/** "Open roles at UpSpace Labs": a heading over the list of jobs. */
export interface OpenRolesContent {
  title: string;
  description: string;
  jobs: JobListing[];
}

/** "Build it, ship it, learn from it": text beside an illustration. */
export interface HowWeWorkContent {
  /** Small blue label above the title; `null` hides it. */
  eyebrow: string | null;
  title: string;
  /** One entry per paragraph. */
  paragraphs: string[];
  /** Transparent illustration (inverted in dark mode). */
  image: ImageAsset;
}

/** Everything the /career page renders, from Strapi's Career Page single type. */
export interface CareerPageContent {
  hero: CareerHeroContent;
  /** Bento video gallery under the hero. */
  gallery: CareerVideo[];
  whyJoin: WhyJoinContent;
  openRoles: OpenRolesContent;
  howWeWork: HowWeWorkContent;
  /** Heading over the office map cards (the cards themselves come from the About page). */
  officesHeading: SectionHeadingContent;
}
