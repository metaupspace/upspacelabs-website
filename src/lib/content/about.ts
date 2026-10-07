import { cache } from 'react';
import type { AboutPageContent } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import { landingPageFallback } from './landing';
import {
  DEFAULT_OFFICE_BACKGROUND,
  DEFAULT_TEAM_PHOTO,
  mapAboutPageContent,
  type RawAboutPage,
} from '@/lib/strapi/mappers';

/** Used whole when Strapi is unreachable or has no About page, and field by field for anything left empty. */
export const aboutPageFallback: AboutPageContent = {
  hero: {
    headline: 'Meet UpSpace Labs, the\nteam Behind the Products.',
    subtitle:
      'We are the product studio of MetaUpSpace: designers, engineers, and AI specialists building intelligent software that helps businesses run, connect, and grow.',
    primaryCta: { label: 'Explore Our Products', href: '/#products' },
    secondaryCta: { label: 'Meet the Team', href: '/about-us#team' },
    image: {
      src: '/About/About-hero.jpg',
      alt: 'The UpSpace Labs team in front of a waterfall',
      width: 4032,
      height: 2268,
    },
  },
  founded: {
    title: 'Founded in Delhi in 2026',
    paragraphs: [
      'UpSpace Labs was founded in 2026 as the product studio of MetaUpSpace. Our main office is in Delhi, where a team of 20 designers, engineers, and product specialists work side by side on one goal: turning complex business problems into software people enjoy using.',
      'Every product we build, from CPMS to the UpSentrix suite, is planned, designed, and shipped from this office. We are a young company, and this is only the start.',
    ],
    office: { lat: 28.61, lng: 77.21 },
    connections: [
      { label: 'London', lat: 51.51, lng: -0.13, altitude: 0.1 },
      { label: 'Singapore', lat: 1.35, lng: 103.82, altitude: 0.08 },
      { label: 'Dubai', lat: 25.2, lng: 55.27, altitude: 0.06 },
      { label: 'New York', lat: 40.71, lng: -74.0, altitude: 0.08 },
      { label: 'Sydney', lat: -33.87, lng: 151.21, altitude: 0.1 },
    ],
  },
  team: {
    title: 'Meet the team\nbehind UpSpace Labs',
    description:
      'Designers, engineers, and product thinkers who care about how software feels, not just how it works.',
    members: [
      'Head of Product',
      'Product Designer',
      'Software Engineer',
      'AI Engineer',
      'Growth Lead',
      'Engineering Lead',
    ].map(role => ({
      name: '[Name]',
      role,
      photo: { ...DEFAULT_TEAM_PHOTO, alt: role },
    })),
  },
  offices: {
    title: 'Working in office across two\nincredible cities',
    description:
      'We work together in person. Our teams in Delhi and Mumbai share one way of building: close collaboration, fast feedback, and real ownership.',
    offices: [
      {
        city: 'Delhi',
        mapQuery: 'TBI KIET, Ghaziabad',
        mapZoom: 15,
        background: DEFAULT_OFFICE_BACKGROUND,
      },
      {
        city: 'Mumbai',
        mapQuery: 'TBI KIET, Ghaziabad',
        mapZoom: 15,
        background: DEFAULT_OFFICE_BACKGROUND,
      },
    ],
  },
  progress: {
    title: 'Our path of progress',
    description:
      'Founded in Delhi in 2026. Here is what we are launching, in order.',
    hint: '[Scroll to Explore]',
    // The four steps twice, so the path runs past the first screen.
    milestones: [0, 1].flatMap(() => [
      {
        date: '2026',
        title: 'Founded',
        status: null,
        description:
          'UpSpace Labs opens its main office in Delhi with a team of 20.',
      },
      {
        date: '2026',
        title: 'UpSentrix Core',
        status: 'Launching',
        description: null,
      },
      {
        date: '2026',
        title: 'UpSentrix People',
        status: 'Upcoming',
        description: null,
      },
      {
        date: '2026',
        title: 'UpSentrix Learn',
        status: 'Launching',
        description: null,
      },
    ]),
  },
  // Same cards as the home page's carousel.
  stories: landingPageFallback.cardCarousel,
};

/** About page content from Strapi, falling back field by field to `aboutPageFallback`. */
export const getAboutPageContent = cache(
  async (): Promise<AboutPageContent> => {
    try {
      const raw = await strapiFetch<RawAboutPage | null>(
        '/about-page?populate[hero][populate]=*&populate[founded][populate]=*&populate[team][populate][members][populate]=*&populate[offices][populate][offices][populate]=*&populate[progress][populate]=*&populate[stories][populate][cards][populate]=*'
      );
      return mapAboutPageContent(raw, aboutPageFallback);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        logStrapiFallback('[strapi] falling back to static about content', err);
      }
      return aboutPageFallback;
    }
  }
);
