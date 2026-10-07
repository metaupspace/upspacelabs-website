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

/** "Open roles at UpSpace Labs": a heading (Strapi) over the jobs (Job Portal API). */
export interface OpenRolesContent {
  title: string;
  description: string;
  /** Built-in roles, shown while the Job Portal API is unreachable. */
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

/** Fixed wording of a single role's page, /career/<job code> (the job comes from the Job Portal API). */
export interface JobDetailLabels {
  aboutTitle: string;
  requirementsTitle: string;
  locationLabel: string;
  employmentTypeLabel: string;
  departmentLabel: string;
  levelLabel: string;
  skillsLabel: string;
  experienceLabel: string;
  educationLabel: string;
  certificationsLabel: string;
  viewMoreLabel: string;
  viewLessLabel: string;
  applyLabel: string;
  unavailableMessage: string;
}

/** Label, placeholder and (for dropdowns) option names of one apply-form field. */
export interface ApplyFieldCopy {
  label: string;
  placeholder: string;
  /** Dropdown option names by value. */
  options?: Record<string, string>;
}

/** Wording of /career/<job>/apply (the form itself follows the Job Portal API). */
export interface ApplyFormLabels {
  titleTemplate: string;
  breadcrumbLabel: string;
  submitLabel: string;
  submittingLabel: string;
  uploadLabel: string;
  successTitle: string;
  successMessage: string;
  duplicateMessage: string;
  rateLimitMessage: string;
  errorMessage: string;
  techSectionTitle: string;
  /** By field name (see `ApplyFormValues`). */
  fields: Record<string, ApplyFieldCopy>;
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
  /** Labels of the single-role pages. */
  jobDetail: JobDetailLabels;
  /** Wording of the apply pages. */
  applyForm: ApplyFormLabels;
}
