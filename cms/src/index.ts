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
        action: { label: 'Read More', href: '/blog/northfield-logistics' },
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
  'api::blog-page.blog-page': {
    breadcrumbLabel: 'Blog',
    title: 'Building a foundation for your startup for growth',
    description:
      'A connected ecosystem of products designed to simplify operations, automate workflows, and keep teams aligned.',
  },
  // Collection type: one example post, created only while there are none.
  'api::blog-post.blog-post': {
    title: 'How Northfield Logistics cut HR admin by 60% with UpSentrix People',
    slug: 'northfield-logistics',
    excerpt:
      'How a 12-city logistics company moved 1,200 people off spreadsheets and onto UpSentrix People.',
    summary:
      '[Northfield Logistics](#) runs warehouses and delivery fleets across 12 cities in India. As its workforce passed 1,200 people, the company moved from spreadsheets to UpSentrix People to manage hiring, attendance, leave, and payroll in one place.',
    stats: [
      { value: '60%', label: 'less time spent on HR admin' },
      { value: '1,200+', label: 'employees managed in one system' },
      { value: '3 days', label: 'to onboard a new hire, down from two weeks' },
      {
        value: '4 days',
        label: 'of monthly payroll work cut to one afternoon',
      },
    ],
    body: [
      {
        __component: 'blog.text-section',
        body: 'Northfield Logistics grew fast. In three years, it went from a single warehouse in Gurugram to operations in 12 cities, with drivers, warehouse staff, and office teams working different shifts across different sites. Its HR team of six was managing all of it with spreadsheets, email threads, and paper forms.\nThe cost showed up everywhere. Leave requests got lost, attendance had to be reconciled by hand every month, and new hires sometimes waited two weeks to be fully set up. The team needed one system everyone could use, from the head office to the loading dock.',
      },
      {
        __component: 'blog.pull-quote',
        quote:
          'UpSentrix People gave us one place for every employee, from the head office to the loading dock. Our HR team finally has time to focus on people instead of paperwork.',
        author: 'Priya Malhotra',
        role: 'Head of HR, Northfield Logistics',
      },
      {
        __component: 'blog.text-section',
        heading: 'Northfield needed one place for every employee',
        body: 'Before UpSentrix People, employee records lived in four different tools. Managers could not see who was on shift, who was on leave, or who was due for a review without asking HR. HR, in turn, spent most of its week answering those questions instead of working on hiring and retention.\nNorthfield chose UpSentrix People because it brought records, attendance, leave, and onboarding into a single view, and because it worked on the phones its field staff already carried. No new hardware, no long training sessions.\n\nThe rollout took six weeks. The UpSpace Labs team migrated more than 1,200 employee records, set up shift rules for each site, and connected attendance data directly to payroll. Northfield started with two warehouses, gathered feedback from managers, and then rolled out to every city.\nField staff now mark attendance, apply for leave, and download payslips from their phones. Managers approve requests in a few taps and see their team’s schedule at a glance. HR no longer chases paperwork at the end of the month.\n\nOnboarding changed the most. New hires now get a digital checklist before their first day, sign documents online, and have access to the tools they need on day one. What once took up to two weeks now takes three days.\nPayroll became faster and more accurate too. Because attendance and leave feed straight into payroll, the monthly reconciliation that used to take the HR team four days is now done in an afternoon. Employees noticed the difference as well. Payslips arrive on time, leave balances are always up to date, and questions that once needed an email to HR are answered in the app.',
      },
      {
        __component: 'blog.text-section',
        heading: 'What comes next for Northfield',
        body: 'With the basics running smoothly, Northfield’s HR team now spends its time on work that matters more: improving retention among drivers, building clear career paths for warehouse staff, and planning hiring for three new cities next year.\nThe company is now exploring UpSentrix Learn to train new warehouse staff and UpSentrix Score to track team performance, both connected to the same employee data it already manages in UpSentrix People.',
      },
    ],
    moreStories: {
      title: 'More Stories',
      description: 'More stories about how teams work better with UpSentrix.',
      cards: [
        {
          title: 'Inside UpSpace Labs',
          description:
            'A look at the space and the team of 20 building UpSpace Labs.',
          action: { label: 'Read More', href: '/blog/inside-upspace-labs' },
        },
        {
          title: 'Why we built UpSentrix',
          description:
            'The problem behind our first product and how we plan to solve it.',
          action: { label: 'Read More', href: '/blog/why-we-built-upsentrix' },
        },
        {
          title: 'Learning that scales',
          description: 'How we approach learning tools for growing teams.',
          action: { label: 'Read More', href: '/blog/learning-that-scales' },
        },
        {
          title: 'Teams that stay in sync',
          description:
            'How UpSentrix keeps distributed teams working from the same data.',
          action: { label: 'Read More', href: '/blog/teams-that-stay-in-sync' },
        },
      ],
    },
    logosLabel: 'UpSentrix Products Used by Northfield',
    logos: [
      { name: 'Hobbes' },
      { name: 'Digit' },
      { name: 'Writesonic' },
      { name: 'ltv.ai' },
      { name: 'Digit' },
      { name: 'Gigamind' },
    ],
  },
} as const;

type SeededUid = keyof typeof SEEDS;

/** More entries for collection types, created together with the first one. */
const EXTRA_ENTRIES: Partial<Record<SeededUid, object[]>> = {
  // Example posts so the /blog grid and "More stories" links have pages.
  'api::blog-post.blog-post': [
    {
      title: 'Inside UpSpace Labs',
      slug: 'inside-upspace-labs',
      excerpt: 'A look at the space and the team of 20 building UpSpace Labs.',
      summary: 'A look at the space and the team of 20 building UpSpace Labs.',
    },
    {
      title: 'Why we built UpSentrix',
      slug: 'why-we-built-upsentrix',
      excerpt:
        'The problem behind our first product and how we plan to solve it.',
      summary:
        'The problem behind our first product and how we plan to solve it.',
    },
    {
      title: 'Learning that scales',
      slug: 'learning-that-scales',
      excerpt: 'How we approach learning tools for growing teams.',
      summary: 'How we approach learning tools for growing teams.',
    },
    {
      title: 'Teams that stay in sync',
      slug: 'teams-that-stay-in-sync',
      excerpt:
        'How UpSentrix keeps distributed teams working from the same data.',
      summary:
        'How UpSentrix keeps distributed teams working from the same data.',
    },
    {
      title: 'Payroll without the month-end rush',
      slug: 'payroll-without-the-month-end-rush',
      excerpt:
        'What changes when attendance and leave feed straight into payroll.',
      summary:
        'What changes when attendance and leave feed straight into payroll.',
    },
  ],
};

/** Collection types also need `findOne` (single entries by id). */
const COLLECTION_TYPES: SeededUid[] = ['api::blog-post.blog-post'];

/** Public website content — readable without an API token. */
const PUBLIC_READ_ACTIONS = (Object.keys(SEEDS) as SeededUid[]).flatMap(uid =>
  COLLECTION_TYPES.includes(uid)
    ? [`${uid}.find`, `${uid}.findOne`]
    : [`${uid}.find`]
);

async function seedSingleTypes(strapi: Core.Strapi) {
  for (const uid of Object.keys(SEEDS) as SeededUid[]) {
    const existing = await strapi.documents(uid).findFirst();
    if (existing) continue;

    // Seed shapes mirror the schemas; the generated types are not available
    // until `strapi ts:generate-types` has been run.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await strapi.documents(uid).create({ data: SEEDS[uid] as any });
    for (const entry of EXTRA_ENTRIES[uid] ?? []) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await strapi.documents(uid).create({ data: entry as any });
    }
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
