import type { CtaLink, ImageAsset, SectionHeadingContent } from './shared';

export interface HeroContent {
  /** Line breaks (`\n`) are preserved on md+ screens. */
  headline: string;
  subtitle: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink | null;
  /** Product shot below the CTAs, spanning the page guides. */
  image: ImageAsset;
}

/** One app in the Featured apps card. */
export interface FeaturedApp {
  title: string;
  description: string;
  /** Status pill after the title, e.g. "Coming Soon". */
  badge: string | null;
  href: string | null;
}

/** The product image beside a grid of apps, under the products heading. */
export interface FeaturedAppsContent {
  label: string;
  apps: FeaturedApp[];
  action: CtaLink | null;
  image: ImageAsset;
}

/** A title, description and link beside an illustration. */
export interface FeatureRowContent {
  /** Line breaks (`\n`) are preserved on md+ screens. */
  title: string;
  description: string;
  action: CtaLink | null;
  image: ImageAsset;
  imagePosition: 'left' | 'right';
}

/** The tab's card in the phone layout (image, title, the tab label, link). */
export interface ShowcaseCard {
  /** Whether this tab gets a card on phones. */
  show: boolean;
  /** Card heading; `null` shows the tab label instead. */
  title: string | null;
  image: ImageAsset;
  action: CtaLink | null;
}

/** One product tab of the showcase. */
export interface ShowcaseTab {
  label: string;
  /** Pill after the label, e.g. "Coming Soon". */
  badge: string | null;
  image: ImageAsset;
  card: ShowcaseCard;
}

export interface ShowcaseFeature {
  title: string;
  /** Line breaks (`\n`) are kept. */
  description: string;
}

/** "Take a look at some of our Products": heading, product tabs and a feature row. */
export interface ProductShowcaseContent {
  title: string;
  description: string;
  tabs: ShowcaseTab[];
  features: ShowcaseFeature[];
}

/** One card of the carousel. */
export interface CarouselCard {
  title: string;
  description: string;
  image: ImageAsset;
  action: CtaLink | null;
}

/** "Building a foundation…": heading over a scrolling row of cards. */
export interface CardCarouselContent {
  title: string;
  description: string;
  cards: CarouselCard[];
}

/** One customer story: the company tab and its testimonial. */
export interface CustomerStory {
  company: string;
  logo: ImageAsset;
  quote: string;
  author: string | null;
  role: string | null;
  action: CtaLink | null;
}

export interface LandingPageContent {
  hero: HeroContent;
  /** Heading of the products section below the hero. */
  productsHeading: SectionHeadingContent;
  featuredApps: FeaturedAppsContent;
  /** Heading above the feature rows. */
  platformHeading: SectionHeadingContent;
  featureRows: FeatureRowContent[];
  productShowcase: ProductShowcaseContent;
  cardCarousel: CardCarouselContent;
  customerStories: CustomerStory[];
}
