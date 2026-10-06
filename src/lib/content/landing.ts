import type { LandingPageContent } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import {
  mapLandingPageContent,
  DEFAULT_CAROUSEL_IMAGES,
  DEFAULT_CUSTOMER_LOGOS,
  DEFAULT_ECOSYSTEM_IMAGE,
  DEFAULT_FEATURED_APPS_IMAGE,
  DEFAULT_INTELLIGENCE_IMAGE,
  DEFAULT_SHOWCASE_CARD_IMAGE,
  DEFAULT_SHOWCASE_IMAGES,
  DEFAULT_HERO_IMAGE,
  type RawLandingPage,
} from '@/lib/strapi/mappers';

const STORY_QUOTE =
  'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.';

/** Used whole when Strapi is unreachable or has no landing page, and field by field for anything left empty. */
export const landingPageFallback: LandingPageContent = {
  hero: {
    headline: 'A New Generation of\nSoftware, Built for Business.',
    subtitle:
      'We build intelligent software products that simplify complex work, connect teams, and help businesses operate, adapt, and grow in a rapidly changing world.',
    primaryCta: { label: 'Book a Demo Call', href: '/contact-us' },
    secondaryCta: { label: 'See Products', href: '/#products' },
    image: DEFAULT_HERO_IMAGE,
  },
  productsHeading: {
    title: 'Software for Every Part of Modern Work',
    description:
      'From people and processes to collaboration and learning, our products work together to help businesses build better, more connected ways of working.',
  },
  featuredApps: {
    label: 'Featured apps',
    apps: [
      {
        title: 'UpSentrix Core',
        description:
          'Connected systems for your essential business operations.',
        badge: null,
        href: '/product',
      },
      {
        title: 'UpSentrix Learn',
        description: 'Build skills, share knowledge, and grow your teams.',
        badge: 'Coming Soon',
        href: null,
      },
      {
        title: 'UpSentrix People',
        description: 'Smarter people management for modern, growing teams.',
        badge: 'Coming Soon',
        href: null,
      },
      {
        title: 'More Products',
        description:
          'Many Products to simplify your business process are under development',
        badge: 'Coming Soon',
        href: null,
      },
    ],
    action: { label: 'Explore UpSentrix Core', href: '/product' },
    image: DEFAULT_FEATURED_APPS_IMAGE,
  },
  platformHeading: {
    title: 'Built for the Demands of Modern Business',
    description:
      'Every product we build is designed to be secure, compliant, and reliable from the ground up.',
  },
  featureRows: [
    {
      title: 'Everything Works Better\nTogether',
      description:
        'Our products are built to work as part of a larger ecosystem, helping teams connect information, workflows, and everyday operations without unnecessary silos.',
      action: { label: 'Explore Upsentix', href: '/product' },
      image: DEFAULT_ECOSYSTEM_IMAGE,
      imagePosition: 'right',
    },
    {
      title: 'Technology That\nUnderstands the Work',
      description:
        'We bring intelligence into the products themselves, using AI and automation to reduce repetitive work, surface useful insights, and help teams move with greater clarity.',
      action: { label: 'View Live in Action', href: '/contact-us' },
      image: DEFAULT_INTELLIGENCE_IMAGE,
      imagePosition: 'left',
    },
  ],
  productShowcase: {
    title: 'Take a look at some of our Products',
    description:
      'From lead capture to qualification and booking, AI handles every step without manual effort.',
    tabs: [
      {
        label: 'UpSentrix Core',
        badge: null,
        image: DEFAULT_SHOWCASE_IMAGES.core,
        card: {
          show: true,
          title: 'Pulse Dashboard',
          image: DEFAULT_SHOWCASE_CARD_IMAGE,
          action: { label: 'UpSentrix People', href: '/product' },
        },
      },
      {
        label: 'UpSentrix People',
        badge: 'Coming Soon',
        image: DEFAULT_SHOWCASE_IMAGES.people,
        card: {
          show: false,
          title: null,
          image: DEFAULT_SHOWCASE_CARD_IMAGE,
          action: null,
        },
      },
      {
        label: 'UpSentrix Learn',
        badge: 'Coming Soon',
        image: DEFAULT_SHOWCASE_IMAGES.learn,
        card: {
          show: true,
          title: 'Client Portal',
          image: DEFAULT_SHOWCASE_CARD_IMAGE,
          action: { label: 'Coming Soon', href: '/product' },
        },
      },
    ],
    features: [
      {
        title: 'One source of truth',
        description:
          'Keep every business record in one\nplace, always up to date.',
      },
      {
        title: 'Easy integrations',
        description:
          'Connect the tools your teams\nalready use in a few clicks.',
      },
      {
        title: 'Enterprise security',
        description:
          'Role-based access and encryption protect\nyour business data.',
      },
      {
        title: 'Live reporting',
        description:
          'See how every part of the\nbusiness is doing in real time.',
      },
    ],
  },
  cardCarousel: {
    title: 'Building a foundation for your startup for growth',
    description:
      'A connected ecosystem of products designed to simplify operations, automate workflows, and keep teams aligned.',
    cards: [0, 1, 2, 0, 1, 2].map(n => ({
      title: 'Intuitive navigation',
      description:
        'Adapts seamlessly to any device, ensuring accessibility on-the-go.',
      image: DEFAULT_CAROUSEL_IMAGES[n],
      action: { label: 'Read More', href: '/product' },
    })),
  },
  customerStories: [
    {
      company: 'Northfield Logistics',
      logo: DEFAULT_CUSTOMER_LOGOS.northfield,
      quote: STORY_QUOTE,
      author: 'Priya Malhotra',
      role: 'Head of HR, Northfield Logistics',
      action: { label: 'Read Northfield\u2019s Story', href: '/about-us' },
    },
    {
      company: 'Brightpath Schools',
      logo: DEFAULT_CUSTOMER_LOGOS.brightpath,
      quote: STORY_QUOTE,
      author: 'Arjun Mehta',
      role: 'Principal, Brightpath Schools',
      action: { label: 'Read Brightpath\u2019s Story', href: '/about-us' },
    },
    {
      company: 'Meridian Health',
      logo: DEFAULT_CUSTOMER_LOGOS.meridian,
      quote: STORY_QUOTE,
      author: 'Sara Iyer',
      role: 'COO, Meridian Health',
      action: { label: 'Read Meridian\u2019s Story', href: '/about-us' },
    },
    {
      company: 'Kavya Retail',
      logo: DEFAULT_CUSTOMER_LOGOS.kavya,
      quote: STORY_QUOTE,
      author: 'Rohan Kapoor',
      role: 'Founder, Kavya Retail',
      action: { label: 'Read Kavya\u2019s Story', href: '/about-us' },
    },
  ],
};

async function fetchLandingPage(): Promise<RawLandingPage | null> {
  try {
    return await strapiFetch<RawLandingPage | null>(
      '/landing-page?populate[hero][populate]=*&populate[productsHeading]=true&populate[featuredApps][populate]=*&populate[platformHeading]=true&populate[featureRows][populate]=*&populate[productShowcase][populate][tabs][populate]=*&populate[productShowcase][populate][features]=true&populate[cardCarousel][populate][cards][populate]=*&populate[customerStories][populate]=*'
    );
  } catch (err) {
    // Unreachable, unconfigured, non-OK or non-JSON — all fall back.
    if (process.env.NODE_ENV !== 'production') {
      logStrapiFallback('[strapi] falling back to static landing content', err);
    }
    return null;
  }
}

/** Landing page content from Strapi, falling back field by field to `landingPageFallback`. */
export async function getLandingPageContent(): Promise<LandingPageContent> {
  return mapLandingPageContent(await fetchLandingPage(), landingPageFallback);
}
