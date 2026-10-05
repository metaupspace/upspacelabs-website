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
    footerColumns: [],
    socialLinks: [],
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
