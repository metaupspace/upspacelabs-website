import { cache } from 'react';
import type { CareerPageContent, ImageAsset } from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import { mapCareerPageContent, type RawCareerPage } from '@/lib/strapi/mappers';

/** Placeholder clip until real videos are uploaded in Strapi (public CC0 sample from MDN). */
const SAMPLE_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const poster = (file: string, alt: string, height: number): ImageAsset => ({
  src: `/Career/${file}`,
  alt,
  width: 595,
  height,
});

/** Used whole when Strapi is unreachable or has no Career page, and field by field for anything left empty. */
export const careerPageFallback: CareerPageContent = {
  hero: {
    badge: 'Now Hiring in Delhi',
    headline: 'Do the Best Work of Your\nCareer With Us.',
    subtitle:
      'We are a young product company in Delhi building software for growing businesses. Join a team of 20 where your work ships, your ideas count, and you grow as fast as we do.',
    cta: { label: 'See Open Roles', href: '#open-roles' },
  },
  gallery: [
    {
      title: 'Unified inbox',
      poster: poster(
        'gallery-inbox.jpg',
        'Unified inbox with the Operator assistant',
        416
      ),
      src: SAMPLE_VIDEO,
      playButton: 'primary',
    },
    {
      title: 'Life at UpSpace Labs',
      poster: poster(
        'gallery-portrait.jpg',
        'A member of the UpSpace Labs team',
        849
      ),
      src: SAMPLE_VIDEO,
      playButton: 'light',
    },
    {
      title: 'Product walkthrough',
      poster: poster('gallery-app.jpg', 'The Conduit app on a desktop', 416),
      src: SAMPLE_VIDEO,
      playButton: 'primary',
    },
    {
      title: 'Operator in action',
      poster: poster(
        'gallery-inbox.jpg',
        'Operator assistant answering inbox messages',
        416
      ),
      src: SAMPLE_VIDEO,
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
  // The heading only: the roles come from the Job Portal API.
  openRoles: {
    title: 'Open roles at UpSpace Labs',
    description:
      'Every role is full-time and based in our Delhi office. Don’t see your role? Write to us anyway.',
  },
  howWeWork: {
    eyebrow: 'How we work',
    title: 'Build it, ship it, learn from it',
    paragraphs: [
      'UpSpace Labs started in 2026 with a simple belief: good software comes from small teams that stay close to the problem. Our 20 designers, engineers, and product people work together in one office in Delhi, so ideas move quickly from a whiteboard to a working product.',
      'We plan in short cycles, review each other’s work openly, and talk to customers often. You will not wait months to see your work live. You will see it in the hands of real users, hear what they think, and make it better.',
    ],
    image: {
      src: '/Career/birds.png',
      alt: 'Birds in flight, drawn in text characters',
      width: 735,
      height: 552,
    },
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
    rateLimitMessage: 'Too many attempts. Please wait a minute and try again.',
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
};

/** Career page content from Strapi, falling back field by field to `careerPageFallback`. */
export const getCareerPageContent = cache(
  async (): Promise<CareerPageContent> => {
    try {
      const raw = await strapiFetch<RawCareerPage | null>(
        '/career-page?populate[hero][populate]=*&populate[gallery][populate]=*&populate[whyJoin][populate]=*&populate[openRoles]=true&populate[howWeWork][populate]=*&populate[officesHeading]=true&populate[jobDetail]=true&populate[applyForm]=true'
      );
      return mapCareerPageContent(raw, careerPageFallback);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        logStrapiFallback(
          '[strapi] falling back to static career content',
          err
        );
      }
      return careerPageFallback;
    }
  }
);
