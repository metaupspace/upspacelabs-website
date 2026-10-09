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
        action: {
          label: 'Read Northfield\u2019s Story',
          href: '/blog/northfield-logistics',
        },
      },
      {
        company: 'Brightpath Schools',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Arjun Mehta',
        role: 'Principal, Brightpath Schools',
        action: {
          label: 'Read Brightpath\u2019s Story',
          href: '/blog/northfield-logistics',
        },
      },
      {
        company: 'Meridian Health',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Sara Iyer',
        role: 'COO, Meridian Health',
        action: {
          label: 'Read Meridian\u2019s Story',
          href: '/blog/northfield-logistics',
        },
      },
      {
        company: 'Kavya Retail',
        quote:
          'Working with UpSpace Labs felt like adding a product team to our own. They listened closely, moved fast, and genuinely cared about getting it right for our people.',
        author: 'Rohan Kapoor',
        role: 'Founder, Kavya Retail',
        action: {
          label: 'Read Kavya\u2019s Story',
          href: '/blog/northfield-logistics',
        },
      },
    ],
  },
  'api::about-page.about-page': {
    hero: {
      headline: 'Meet UpSpace Labs, the\nteam Behind the Products.',
      subtitle:
        'We are the product studio of MetaUpSpace: designers, engineers, and AI specialists building intelligent software that helps businesses run, connect, and grow.',
      primaryCta: { label: 'Explore Our Products', href: '/#products' },
      secondaryCta: { label: 'Meet the Team', href: '/about-us#team' },
    },
    founded: {
      title: 'Founded in Delhi in 2026',
      description:
        'UpSpace Labs was founded in 2026 as the product studio of MetaUpSpace. Our main office is in Delhi, where a team of 20 designers, engineers, and product specialists work side by side on one goal: turning complex business problems into software people enjoy using.\n\nEvery product we build, from CPMS to the UpSentrix suite, is planned, designed, and shipped from this office. We are a young company, and this is only the start.',
      officeLat: 28.61,
      officeLng: 77.21,
      connections: [
        { label: 'London', lat: 51.51, lng: -0.13, altitude: 0.1 },
        { label: 'Singapore', lat: 1.35, lng: 103.82, altitude: 0.08 },
        { label: 'Dubai', lat: 25.2, lng: 55.27, altitude: 0.06 },
        { label: 'New York', lat: 40.71, lng: -74.0, altitude: 0.08 },
        { label: 'Sydney', lat: -33.87, lng: 151.21, altitude: 0.1 },
        { label: 'Mumbai', lat: 19.08, lng: 72.88, altitude: 0.04 },
        { label: 'Bangkok', lat: 13.76, lng: 100.5, altitude: 0.05 },
        { label: 'Jakarta', lat: -6.2, lng: 106.85, altitude: 0.07 },
        { label: 'Hong Kong', lat: 22.32, lng: 114.17, altitude: 0.06 },
        { label: 'Shanghai', lat: 31.23, lng: 121.47, altitude: 0.07 },
        { label: 'Seoul', lat: 37.57, lng: 126.98, altitude: 0.08 },
        { label: 'Tokyo', lat: 35.68, lng: 139.69, altitude: 0.09 },
      ],
    },
    team: {
      title: 'Meet the team\nbehind UpSpace Labs',
      description:
        'Designers, engineers, and product thinkers who care about how software feels, not just how it works.',
      members: [
        { name: '[Name]', role: 'Head of Product' },
        { name: '[Name]', role: 'Product Designer' },
        { name: '[Name]', role: 'Software Engineer' },
        { name: '[Name]', role: 'AI Engineer' },
        { name: '[Name]', role: 'Growth Lead' },
        { name: '[Name]', role: 'Engineering Lead' },
      ],
    },
    offices: {
      title: 'Working in office across two\nincredible cities',
      description:
        'We work together in person. Our teams in Delhi and Mumbai share one way of building: close collaboration, fast feedback, and real ownership.',
      offices: [
        { city: 'Delhi', mapQuery: 'TBI KIET, Ghaziabad', mapZoom: 15 },
        { city: 'Mumbai', mapQuery: 'TBI KIET, Ghaziabad', mapZoom: 15 },
      ],
    },
    progress: {
      title: 'Our path of progress',
      description:
        'Founded in Delhi in 2026. Here is what we are launching, in order.',
      hint: 'Skip',
      milestones: [
        {
          date: '2026',
          title: 'Founded',
          description:
            'UpSpace Labs opens its main office in Delhi with a team of 20.',
        },
        { date: '2026', title: 'UpSentrix Core', status: 'Launching' },
        { date: '2026', title: 'UpSentrix People', status: 'Upcoming' },
        { date: '2026', title: 'UpSentrix Learn', status: 'Launching' },
        {
          date: '2026',
          title: 'Founded',
          description:
            'UpSpace Labs opens its main office in Delhi with a team of 20.',
        },
        { date: '2026', title: 'UpSentrix Core', status: 'Launching' },
        { date: '2026', title: 'UpSentrix People', status: 'Upcoming' },
        { date: '2026', title: 'UpSentrix Learn', status: 'Launching' },
      ],
    },
    stories: {
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
  },
  'api::contact-page.contact-page': {
    title: 'Having any issues?',
    description:
      'Tell us what is going wrong or what you need. Our team usually replies within one working day.',
    infoItems: [
      {
        icon: 'phone',
        tone: 'green',
        label: 'Phone',
        value: '+91 6000 831 966',
        href: 'tel:+916000831966',
      },
      {
        icon: 'mail',
        tone: 'blue',
        label: 'Email',
        value: 'hello@upspacelabs.com',
        href: 'mailto:hello@upspacelabs.com',
      },
      {
        icon: 'clock',
        tone: 'green',
        label: 'Support hours',
        value: 'Mon – Fri, 9:00 AM – 6:00 PM IST',
      },
    ],
    form: {
      nameLabel: 'Full name',
      namePlaceholder: 'Your name',
      emailLabel: 'Email',
      emailPlaceholder: 'you@company.com',
      phoneLabel: 'Phone',
      phonePlaceholder: '+91 6000 831 966',
      topicLabel: 'What do you need help with?',
      topicPlaceholder: 'Select a topic',
      topics: [
        'Product demo',
        'Pricing',
        'Technical support',
        'Billing',
        'Partnership',
        'Something else',
      ],
      messageLabel: 'How can we help?',
      messagePlaceholder: 'Tell us a little about what is happening',
      submitLabel: 'Send message',
      successTitle: 'Thanks, we got your message',
      successMessage:
        'Someone from our team will get back to you within one working day.',
      errorMessage: 'We could not send your message. Please try again shortly.',
    },
  },
  'api::career-page.career-page': {
    hero: {
      badge: 'Now Hiring in Delhi',
      headline: 'Do the Best Work of Your\nCareer With Us.',
      subtitle:
        'We are a young product company in Delhi building software for growing businesses. Join a team of 20 where your work ships, your ideas count, and you grow as fast as we do.',
      cta: { label: 'See Open Roles', href: '#open-roles' },
    },
    // Posters are uploaded in the admin; the clip is a public placeholder.
    gallery: [
      {
        title: 'Unified inbox',
        videoUrl:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        playButton: 'primary',
      },
      {
        title: 'Life at UpSpace Labs',
        videoUrl:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        playButton: 'light',
      },
      {
        title: 'Product walkthrough',
        videoUrl:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        playButton: 'primary',
      },
      {
        title: 'Operator in action',
        videoUrl:
          'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
        playButton: 'primary',
      },
    ],
    whyJoin: {
      eyebrow: 'Why join us',
      title: 'Why people choose to build\nwith us',
      description:
        'We are small enough that everyone’s work matters, and ambitious enough that there is always something new to learn. Here is what you can expect when you join.',
      perks: [
        {
          title: 'Ownership from Day 1',
          description:
            'What you build reaches real customers, often within weeks.',
        },
        {
          title: 'A team to learn from',
          description:
            'Work next to people who have built and shipped products before.',
        },
        {
          title: 'Work in Production',
          description: 'Take on more responsibility as the company grows.',
        },
        {
          title: 'No layers',
          description:
            'Talk directly to founders and customers, not through a chain.',
        },
        {
          title: 'Flexible hours',
          description: 'Plan your day around the hours when you work best.',
        },
        {
          title: 'Learning support',
          description: 'Courses, books, and events to keep your skills sharp.',
        },
      ],
    },
    openRoles: {
      title: 'Open roles at UpSpace Labs',
      description:
        'Every role is full-time and based in our Delhi office. Don’t see your role? Write to us anyway.',
    },
    howWeWork: {
      eyebrow: 'How we work',
      title: 'Build it, ship it, learn from it',
      description:
        'UpSpace Labs started in 2026 with a simple belief: good software comes from small teams that stay close to the problem. Our 20 designers, engineers, and product people work together in one office in Delhi, so ideas move quickly from a whiteboard to a working product.\n\nWe plan in short cycles, review each other’s work openly, and talk to customers often. You will not wait months to see your work live. You will see it in the hands of real users, hear what they think, and make it better.',
    },
    officesHeading: {
      title: 'Our office Across',
      description:
        'Everyone works from one office, which keeps communication simple and decisions fast. Come in, sit with the team, and see what we are building.',
    },
    jobDetail: {
      aboutTitle: 'About the role',
      requirementsTitle: 'What we’re looking for',
      locationLabel: 'Location',
      employmentTypeLabel: 'Employment Type',
      departmentLabel: 'Department',
      levelLabel: 'Experience Level',
      skillsLabel: 'Skills',
      experienceLabel: 'Experience',
      educationLabel: 'Education',
      certificationsLabel: 'Certifications',
      viewMoreLabel: 'View More',
      viewLessLabel: 'View Less',
      applyLabel: 'Apply Now',
      unavailableMessage:
        'We couldn’t load this role right now. Please try again in a moment.',
    },
    applyForm: {
      titleTemplate: 'Apply as {role} Now',
      breadcrumbLabel: 'Apply Now',
      submitLabel: 'Apply Now',
      submittingLabel: 'Submitting…',
      uploadLabel: 'Upload your Resume',
      successTitle: 'Application sent',
      successMessage:
        'Thanks for applying. Our team will review your application and get back to you by email.',
      duplicateMessage:
        'You have already applied for this role with this email address.',
      rateLimitMessage:
        'Too many attempts. Please wait a minute and try again.',
      errorMessage:
        'We could not submit your application. Please try again shortly.',
      techSectionTitle: 'For technical roles (optional)',
      fields: {
        firstName: {
          label: 'First Name',
          placeholder: 'Anurag',
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Rai',
        },
        email: {
          label: 'Email',
          placeholder: 'you@example.com',
        },
        contactNumber: {
          label: 'Phone',
          placeholder: '+91 6000 831 966',
        },
        whatsappNumber: {
          label: 'WhatsApp Number',
          placeholder: '+91 6000 831 966',
        },
        currentLocation: {
          label: 'Current Location',
          placeholder: 'New Delhi, India',
        },
        linkedinId: {
          label: 'LinkedIn Profile',
          placeholder: 'https://linkedin.com/in/your-name',
        },
        qualification: {
          label: 'Highest Qualification',
          placeholder: 'B.Tech Computer Science',
        },
        experience: {
          label: 'Years of Experience',
          placeholder: 'Select experience',
          options: {
            fresher: 'Fresher',
            '0-1': '0–1 years',
            '1-3': '1–3 years',
            '3-5': '3–5 years',
          },
        },
        lastSalary: {
          label: 'Last Salary',
          placeholder: '8 LPA',
        },
        noticePeriod: {
          label: 'Notice Period',
          placeholder: '30 days',
        },
        comfortableFlexibleShifts: {
          label: 'Comfortable with flexible shifts?',
          placeholder: 'Select an option',
          options: {
            yes: 'Yes',
            no: 'No',
          },
        },
        hearAboutUs: {
          label: 'How did you hear about us?',
          placeholder: 'Select an option',
          options: {
            linkedin_post: 'LinkedIn post',
            linkedin_company: 'LinkedIn company page',
            job_portal: 'Job portal',
            whatsapp_telegram: 'WhatsApp / Telegram',
            company_website: 'Company website',
            other: 'Other',
          },
        },
        referredBy: {
          label: 'Referred By (optional)',
          placeholder: 'Name of the person who referred you',
        },
        githubId: {
          label: 'GitHub Profile',
          placeholder: 'https://github.com/your-name',
        },
        portfolioLink: {
          label: 'Portfolio',
          placeholder: 'https://your-portfolio.com',
        },
        technologiesKnown: {
          label: 'Technologies You Know',
          placeholder: 'React, TypeScript, Node.js',
        },
        hardestProblem: {
          label: 'Hardest Problem You Have Solved',
          placeholder: 'Tell us about it',
        },
        whyGoodFit: {
          label: 'Why should we hire you',
          placeholder: 'Tell us why you are a good fit',
        },
        whyJoinUs: {
          label: 'Why do you want to join UpSpace Labs?',
          placeholder: 'What excites you about this role',
        },
      },
    },
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
    breadcrumbLabel: 'Read Northfield’s Story',
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
  // Collection type: the Terms of Service policy page, created while there are none.
  'api::legal-page.legal-page': {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    lastUpdated: '2026-05-01',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: 'By accessing or using the UpSpace Labs website and products (the “Services”), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Services.\n\nThese Terms form a binding agreement between you (or the organisation you represent) and UpSpace Labs. Continued use of the Services means you accept any updates to these Terms, which we will post on this page with a new “Last Updated” date.',
      },
      {
        heading: 'Use of the Services',
        body: 'We grant you a limited, non-exclusive, non-transferable and revocable right to use the Services for your internal business purposes.\n\n### What you may not do\n\n- Share, resell, rent or sublicense access to the Services.\n- Reverse engineer, decompile or attempt to discover the source code of the Services.\n- Copy, modify or create derivative works from the Services.\n- Use the Services for any unlawful, defamatory or unauthorised purpose.',
      },
      {
        heading: 'Accounts and Security',
        body: 'You are responsible for the accuracy of the information you give us, for keeping your credentials confidential, and for all activity under your account.\n\nTell us immediately at the address below if you suspect unauthorised access. We may suspend an account to protect the Services or other customers.',
      },
      {
        heading: 'Acceptable Use',
        body: 'You agree to use the Services lawfully and respectfully. You must not upload malicious code, attempt to disrupt or overload the Services, probe them for vulnerabilities without our written permission, or use them to send spam or infringing content.\n\nWe may remove content or restrict access that breaks these rules.',
      },
      {
        heading: 'Plans and Payment',
        body: 'Paid plans are billed in advance for the period shown at purchase. Unless the law says otherwise, fees are non-refundable once a billing period has started.\n\nIf you are on a free trial, you can cancel before it ends without charge. We will give at least 30 days’ notice before changing prices for an existing subscription.',
      },
      {
        heading: 'Intellectual Property',
        body: 'UpSpace Labs keeps all rights, title and interest in the Services, including software, design, trademarks and documentation. These Terms do not transfer any ownership to you.\n\nYou keep ownership of the data you put into the Services. You give us the permission needed to host and process that data to provide the Services to you.',
      },
      {
        heading: 'Disclaimers and Liability',
        body: 'The Services are provided “as is” and “as available”, without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose and non-infringement.\n\nTo the extent the law allows, UpSpace Labs is not liable for indirect, incidental, special, consequential or punitive damages, and our total liability for any claim will not exceed the amount you paid for the Services in the 12 months before the claim.',
      },
      {
        heading: 'Termination',
        body: 'You may stop using the Services at any time. We may suspend or end your access if you breach these Terms or if we are required to by law.\n\nOn termination, your right to use the Services ends. You can export your data for 30 days afterwards, after which we delete it as described in our Privacy Policy.',
      },
      {
        heading: 'Contact Information',
        body: 'If you have any questions about these Terms, please contact us:\n\n- Email: hello@upspacelabs.com\n- Phone: +91 6000 831 966\n- Website: www.upspacelabs.com',
      },
    ],
  },
} as const;

type SeededUid = keyof typeof SEEDS;

/** More entries for collection types, created together with the first one. */
const EXTRA_ENTRIES: Partial<Record<SeededUid, object[]>> = {
  // More policy pages, created together with the Terms of Service.
  'api::legal-page.legal-page': [
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      lastUpdated: '2026-09-30',
      sections: [
        {
          heading: 'Introduction',
          body: 'UpSpace Labs (“UpSpace Labs”, “we”, “us”) is the product studio of MetaUpSpace, based in New Delhi, India.\n\nThis Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website or use our products, including CPMS and the UpSentrix suite. By using our website or products, you agree to the practices described in this policy.',
        },
        {
          heading: 'Information We Collect',
          body: 'We collect only the information we need to provide and improve our services:\n\n- Account details, such as your name, work email, phone number, and company name.\n- Billing details, such as billing address and payment information, processed securely by our payment partners.\n- Product data that you or your team add to our products, such as employee records, courses, or business records.\n- Usage data, such as pages visited, features used, device type, browser, and IP address.',
        },
        {
          heading: 'How We Use Your Information',
          body: 'We use your information to create and manage your account, provide and support our products, process payments, send service updates, improve our products, and keep our services secure. We do not sell your personal information to anyone.',
        },
        {
          heading: 'Sharing Your Information',
          body: 'We share information only with trusted service providers who help us run our business, such as hosting, payment, and email providers, and only as far as needed to deliver our services. We may also share information when required by law or to protect the rights, safety, and property of UpSpace Labs and our users.',
        },
        {
          heading: 'Data Security and Retention',
          body: 'We use industry-standard safeguards, including encryption in transit, access controls, and regular security reviews, to protect your data. We keep personal information only for as long as your account is active or as required by law. When data is no longer needed, we delete or anonymise it.',
        },
        {
          heading: 'Cookies',
          body: 'Our website uses cookies to remember your preferences, understand how visitors use the site, and improve performance. You can control cookies through your browser settings. Blocking some cookies may affect how the website works.',
        },
        {
          heading: 'Your Rights',
          body: 'You may have the right to access, correct, update, or delete your personal information, and to withdraw consent for certain uses. To make a request, contact us using the details below. We will respond within a reasonable time and in line with applicable law, including India’s Digital Personal Data Protection Act, 2023.',
        },
        {
          heading: 'Changes to This Policy',
          body: 'We may update this Privacy Policy from time to time. When we make significant changes, we will update the date at the top of this page and, where appropriate, notify you by email or through our products.',
        },
        {
          heading: 'Contact Us',
          body: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us at:\nEmail: [privacy email]\nAddress: [registered office address], New Delhi, India',
        },
      ],
    },
    {
      slug: 'refund-policy',
      title: 'Refund Policy',
      lastUpdated: '2026-09-30',
      sections: [
        {
          heading: 'Overview',
          body: 'At UpSpace Labs, we want you to be happy with our products. This Refund Policy explains when you can request a refund for paid plans of CPMS and the UpSentrix suite, and how the process works.',
        },
        {
          heading: 'Free Trials',
          body: 'Where a free trial is available, you can try our products before you pay. We recommend using the trial to make sure a product meets your needs. You will not be charged if you cancel before the trial ends.',
        },
        {
          heading: 'Eligibility for Refunds',
          body: 'You may request a full refund within 14 days of your first payment for a new subscription if:\n\n- The product does not work as described and our support team cannot fix the issue.\n- You were charged incorrectly or more than once for the same plan.\n- You cancelled before renewal but were still charged for the next billing period.',
        },
        {
          heading: 'Non-Refundable Items',
          body: 'Refunds are generally not available for:\n\n- Renewal payments after the 14-day window has passed.\n- Partial months or unused time on an active subscription.\n- Custom setup, data migration, training, or other one-time services that have already been delivered.\n- Accounts suspended for breaking our Terms of Service.',
        },
        {
          heading: 'How to Request a Refund',
          body: 'Email our support team with your account email, invoice number, and the reason for your request. We will review your request and reply within 5 business days.',
        },
        {
          heading: 'Processing Refunds',
          body: 'Approved refunds are issued to the original payment method. Depending on your bank or card provider, it may take 7 to 10 business days for the amount to appear in your account.',
        },
        {
          heading: 'Cancelling Your Subscription',
          body: 'You can cancel your subscription at any time from your account settings. Your plan stays active until the end of the current billing period, and you will not be charged again.',
        },
        {
          heading: 'Changes to This Policy',
          body: 'We may update this Refund Policy from time to time. Any changes will be posted on this page with an updated date.',
        },
        {
          heading: 'Contact Us',
          body: 'For refund requests or questions about this policy, please contact us at:\nEmail: [billing email]\nAddress: [registered office address], New Delhi, India',
        },
      ],
    },
  ],
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
const COLLECTION_TYPES: SeededUid[] = [
  'api::blog-post.blog-post',
  'api::legal-page.legal-page',
];

/** Public website content — readable without an API token. */
const PUBLIC_READ_ACTIONS = (Object.keys(SEEDS) as SeededUid[]).flatMap(uid =>
  COLLECTION_TYPES.includes(uid)
    ? [`${uid}.find`, `${uid}.findOne`]
    : [`${uid}.find`]
);

/** The `data` a document `create()` accepts (from Strapi's generated types). */
type SeedData = NonNullable<
  Parameters<ReturnType<Core.Strapi['documents']>['create']>[0]
>['data'];

async function seedSingleTypes(strapi: Core.Strapi) {
  for (const uid of Object.keys(SEEDS) as SeededUid[]) {
    const existing = await strapi.documents(uid).findFirst();
    if (existing) continue;

    // The seeds are read-only (`as const`) object literals mirroring the schemas
    // (cms/src/api, cms/src/components); Strapi's generated types expect its
    // own mutable input shape, so they are cast to it.
    await strapi
      .documents(uid)
      .create({ data: SEEDS[uid] as unknown as SeedData });
    for (const entry of EXTRA_ENTRIES[uid] ?? []) {
      await strapi.documents(uid).create({ data: entry as SeedData });
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
