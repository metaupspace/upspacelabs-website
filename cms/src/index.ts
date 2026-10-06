import type { Core } from '@strapi/strapi';

/**
 * Initial content for single types. Written once, only when the entry does
 * not exist yet — after that, editors own it in the admin panel.
 */
const SEEDS = {
  'api::navigation.navigation': {
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about-us' },
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Careers', href: '/career' },
    ],
    ctaText: 'Get Started',
    ctaHref: '/contact-us',
    appearanceLabel: 'Appearance',
    footerCta: {
      title: 'Modern Systems for Teams\nThat Never Stop Moving.',
      description:
        'Automatically engage every lead, handle follow-ups, and convert conversations into booked meetings — without manual calling.',
      label: 'Get Started for Free',
      href: '/contact-us',
    },
    footerColumns: [
      {
        heading: 'UpSpace Labs',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '/about-us' },
          { label: 'Careers', href: '/career' },
        ],
      },
      {
        heading: 'Resources',
        links: [
          { label: 'Blog', href: '/blog' },
          { label: 'Contact Us', href: '/contact-us' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms of Service', href: '/terms-of-service' },
          { label: 'Refund Policy', href: '/refund-policy' },
        ],
      },
    ],
    socialLinks: [
      {
        platform: 'linkedin',
        href: 'https://www.linkedin.com/company/upspacelabs',
      },
      { platform: 'twitter', href: 'https://x.com/upspacelabs' },
      { platform: 'instagram', href: 'https://www.instagram.com/upspacelabs' },
    ],
    copyright: '© 2026 UpSpace Labs. All rights reserved.',
  },
  'api::landing-page.landing-page': {
    hero: {
      headline: 'A New Generation of\nSoftware, Built for Business.',
      subtitle:
        'We build intelligent software products that simplify complex work, connect teams, and help businesses operate, adapt, and grow in a rapidly changing world.',
      primaryCta: { label: 'Book a Demo Call', href: '/contact-us' },
      secondaryCta: { label: 'See Products', href: '/#products' },
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
          href: '/product',
        },
        {
          title: 'UpSentrix Learn',
          badge: 'Coming Soon',
          description: 'Build skills, share knowledge, and grow your teams.',
        },
        {
          title: 'UpSentrix People',
          badge: 'Coming Soon',
          description: 'Smarter people management for modern, growing teams.',
        },
        {
          title: 'More Products',
          badge: 'Coming Soon',
          description:
            'Many Products to simplify your business process are under development',
        },
      ],
      action: { label: 'Explore UpSentrix Core', href: '/product' },
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
        imagePosition: 'right',
      },
      {
        title: 'Technology That\nUnderstands the Work',
        description:
          'We bring intelligence into the products themselves, using AI and automation to reduce repetitive work, surface useful insights, and help teams move with greater clarity.',
        action: { label: 'View Live in Action', href: '/contact-us' },
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
          cardTitle: 'Pulse Dashboard',
          cardAction: { label: 'UpSentrix People', href: '/product' },
        },
        { label: 'UpSentrix People', badge: 'Coming Soon', showCard: false },
        {
          label: 'UpSentrix Learn',
          badge: 'Coming Soon',
          cardTitle: 'Client Portal',
          cardAction: { label: 'Coming Soon', href: '/product' },
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
      cards: [1, 2, 3, 4, 5, 6].map(() => ({
        title: 'Intuitive navigation',
        description:
          'Adapts seamlessly to any device, ensuring accessibility on-the-go.',
        action: { label: 'Read More', href: '/product' },
      })),
    },
    customerStories: [
      {
        company: 'Northfield Logistics',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Priya Malhotra',
        role: 'Head of HR, Northfield Logistics',
        action: { label: 'Read Northfield\u2019s Story', href: '/about-us' },
      },
      {
        company: 'Brightpath Schools',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Arjun Mehta',
        role: 'Principal, Brightpath Schools',
        action: { label: 'Read Brightpath\u2019s Story', href: '/about-us' },
      },
      {
        company: 'Meridian Health',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Sara Iyer',
        role: 'COO, Meridian Health',
        action: { label: 'Read Meridian\u2019s Story', href: '/about-us' },
      },
      {
        company: 'Kavya Retail',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Rohan Kapoor',
        role: 'Founder, Kavya Retail',
        action: { label: 'Read Kavya\u2019s Story', href: '/about-us' },
      },
    ],
  },
} as const;

type SeededUid = keyof typeof SEEDS;

/** Public website content — readable without an API token. */
const PUBLIC_READ_ACTIONS = (Object.keys(SEEDS) as SeededUid[]).map(
  uid => `${uid}.find`
);

async function seedSingleTypes(strapi: Core.Strapi) {
  for (const uid of Object.keys(SEEDS) as SeededUid[]) {
    const existing = await strapi.documents(uid).findFirst();
    if (existing) continue;

    // Seed shapes mirror the schemas; the generated types are not available
    // until `strapi ts:generate-types` has been run.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await strapi.documents(uid).create({ data: SEEDS[uid] as any });
    strapi.log.info(`[seed] created initial ${uid}`);
  }
}

async function grantPublicRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  for (const action of PUBLIC_READ_ACTIONS) {
    const granted = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!granted) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action, role: publicRole.id } });
    }
  }
}

const plugin = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seedSingleTypes(strapi);
    await grantPublicRead(strapi);
  },
};

export default plugin;
