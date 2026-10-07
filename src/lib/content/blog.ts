import { cache } from 'react';
import type {
  BlogCard,
  BlogLogo,
  BlogPageContent,
  BlogPost,
  CardCarouselContent,
  ImageAsset,
} from '../types';
import { logStrapiFallback, strapiFetch } from '@/lib/strapi/client';
import {
  DEFAULT_CAROUSEL_IMAGES,
  mapBlogCard,
  mapBlogPage,
  mapBlogPost,
  plainText,
  textToGroups,
  type RawBlogPost,
} from '@/lib/strapi/mappers';

const DEFAULT_COVER: ImageAsset = {
  src: '/Blog/northfield-cover.jpg',
  alt: 'An R logo over rushing water',
  width: 485,
  height: 472,
};

/** Placeholder logos (cut from the design), all 96px tall so they share a baseline band. */
const logo = (name: string, file: string, width: number): BlogLogo => ({
  name,
  image: { src: `/Blog/logos/${file}.png`, alt: name, width, height: 96 },
  href: null,
});

/** "More stories" carousel at the bottom of a post. */
export const MORE_STORIES_FALLBACK: CardCarouselContent = {
  title: 'More Stories',
  description: 'More stories about how teams work better with UpSentrix.',
  cards: [
    {
      title: 'Inside UpSpace Labs',
      description:
        'A look at the space and the team of 20 building UpSpace Labs.',
      image: DEFAULT_CAROUSEL_IMAGES[0],
      action: { label: 'Read More', href: '/blog/inside-upspace-labs' },
    },
    {
      title: 'Why we built UpSentrix',
      description:
        'The problem behind our first product and how we plan to solve it.',
      image: DEFAULT_CAROUSEL_IMAGES[1],
      action: { label: 'Read More', href: '/blog/why-we-built-upsentrix' },
    },
    {
      title: 'Learning that scales',
      description: 'How we approach learning tools for growing teams.',
      image: DEFAULT_CAROUSEL_IMAGES[2],
      action: { label: 'Read More', href: '/blog/learning-that-scales' },
    },
    {
      title: 'Teams that stay in sync',
      description:
        'How UpSentrix keeps distributed teams working from the same data.',
      image: DEFAULT_CAROUSEL_IMAGES[0],
      action: { label: 'Read More', href: '/blog/teams-that-stay-in-sync' },
    },
  ],
};

/** A short example post: header and "More stories" only. */
const examplePost = (
  slug: string,
  title: string,
  excerpt: string,
  coverImage: ImageAsset
): BlogPost => ({
  slug,
  title,
  summary: excerpt,
  excerpt,
  coverImage,
  stats: [],
  body: [],
  moreStories: MORE_STORIES_FALLBACK,
  logosLabel: '',
  logos: [],
});

/** Built-in posts — shown when Strapi is unreachable, and the field-level fallback for the same slug. */
export const blogPostFallbacks: BlogPost[] = [
  {
    slug: 'northfield-logistics',
    title: 'How Northfield Logistics cut HR admin by 60% with UpSentrix People',
    summary:
      '[Northfield Logistics](#) runs warehouses and delivery fleets across 12 cities in India. As its workforce passed 1,200 people, the company moved from spreadsheets to UpSentrix People to manage hiring, attendance, leave, and payroll in one place.',
    excerpt:
      'How a 12-city logistics company moved 1,200 people off spreadsheets and onto UpSentrix People.',
    coverImage: DEFAULT_COVER,
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
        type: 'text',
        heading: null,
        groups: textToGroups(
          'Northfield Logistics grew fast. In three years, it went from a single warehouse in Gurugram to operations in 12 cities, with drivers, warehouse staff, and office teams working different shifts across different sites. Its HR team of six was managing all of it with spreadsheets, email threads, and paper forms.\nThe cost showed up everywhere. Leave requests got lost, attendance had to be reconciled by hand every month, and new hires sometimes waited two weeks to be fully set up. The team needed one system everyone could use, from the head office to the loading dock.'
        ),
      },
      {
        type: 'quote',
        quote:
          'UpSentrix People gave us one place for every employee, from the head office to the loading dock. Our HR team finally has time to focus on people instead of paperwork.',
        author: 'Priya Malhotra',
        role: 'Head of HR, Northfield Logistics',
      },
      {
        type: 'text',
        heading: 'Northfield needed one place for every employee',
        groups: textToGroups(
          'Before UpSentrix People, employee records lived in four different tools. Managers could not see who was on shift, who was on leave, or who was due for a review without asking HR. HR, in turn, spent most of its week answering those questions instead of working on hiring and retention.\nNorthfield chose UpSentrix People because it brought records, attendance, leave, and onboarding into a single view, and because it worked on the phones its field staff already carried. No new hardware, no long training sessions.\n\nThe rollout took six weeks. The UpSpace Labs team migrated more than 1,200 employee records, set up shift rules for each site, and connected attendance data directly to payroll. Northfield started with two warehouses, gathered feedback from managers, and then rolled out to every city.\nField staff now mark attendance, apply for leave, and download payslips from their phones. Managers approve requests in a few taps and see their team’s schedule at a glance. HR no longer chases paperwork at the end of the month.\n\nOnboarding changed the most. New hires now get a digital checklist before their first day, sign documents online, and have access to the tools they need on day one. What once took up to two weeks now takes three days.\nPayroll became faster and more accurate too. Because attendance and leave feed straight into payroll, the monthly reconciliation that used to take the HR team four days is now done in an afternoon. Employees noticed the difference as well. Payslips arrive on time, leave balances are always up to date, and questions that once needed an email to HR are answered in the app.'
        ),
      },
      {
        type: 'text',
        heading: 'What comes next for Northfield',
        groups: textToGroups(
          'With the basics running smoothly, Northfield’s HR team now spends its time on work that matters more: improving retention among drivers, building clear career paths for warehouse staff, and planning hiring for three new cities next year.\nThe company is now exploring UpSentrix Learn to train new warehouse staff and UpSentrix Score to track team performance, both connected to the same employee data it already manages in UpSentrix People.'
        ),
      },
    ],
    moreStories: MORE_STORIES_FALLBACK,
    logosLabel: 'UpSentrix Products Used by Northfield',
    logos: [
      logo('Hobbes', 'hobbes', 267),
      logo('Digit', 'digit', 222),
      logo('Writesonic', 'writesonic', 318),
      logo('ltv.ai', 'ltv-ai', 264),
      logo('Digit', 'digit-2', 222),
      logo('Gigamind', 'gigamind', 255),
    ],
  },
  examplePost(
    'inside-upspace-labs',
    'Inside UpSpace Labs',
    'A look at the space and the team of 20 building UpSpace Labs.',
    DEFAULT_CAROUSEL_IMAGES[0]
  ),
  examplePost(
    'why-we-built-upsentrix',
    'Why we built UpSentrix',
    'The problem behind our first product and how we plan to solve it.',
    DEFAULT_CAROUSEL_IMAGES[1]
  ),
  examplePost(
    'learning-that-scales',
    'Learning that scales',
    'How we approach learning tools for growing teams.',
    DEFAULT_CAROUSEL_IMAGES[2]
  ),
  examplePost(
    'teams-that-stay-in-sync',
    'Teams that stay in sync',
    'How UpSentrix keeps distributed teams working from the same data.',
    DEFAULT_CAROUSEL_IMAGES[0]
  ),
  examplePost(
    'payroll-without-the-month-end-rush',
    'Payroll without the month-end rush',
    'What changes when attendance and leave feed straight into payroll.',
    DEFAULT_CAROUSEL_IMAGES[2]
  ),
];

/** Defaults for a post that exists only in Strapi and leaves fields empty. */
const EMPTY_POST: Omit<BlogPost, 'slug' | 'title'> = {
  summary: '',
  excerpt: '',
  coverImage: DEFAULT_COVER,
  logosLabel: '',
  logos: [],
  stats: [],
  body: [],
  moreStories: MORE_STORIES_FALLBACK,
};

type Lookup = { post: RawBlogPost | null; reachable: boolean };

async function fetchPost(slug: string): Promise<Lookup> {
  try {
    const posts = await strapiFetch<RawBlogPost[]>(
      `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[coverImage]=true&populate[logos][populate]=*&populate[stats]=true&populate[body][on][blog.text-section]=true&populate[body][on][blog.pull-quote]=true&populate[body][on][blog.image][populate]=*&populate[moreStories][populate][cards][populate]=*`
    );
    return {
      post: Array.isArray(posts) ? (posts[0] ?? null) : null,
      reachable: true,
    };
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      logStrapiFallback('[strapi] falling back to built-in blog posts', err);
    }
    return { post: null, reachable: false };
  }
}

/**
 * The post at `/blog/<slug>`, or `null` (→ 404). Strapi wins; a built-in post
 * with the same slug fills its empty fields, and stands in entirely while
 * Strapi is unreachable. Deduplicated per request (metadata + page).
 */
export const getBlogPost = cache(
  async (slug: string): Promise<BlogPost | null> => {
    const fallback = blogPostFallbacks.find(post => post.slug === slug) ?? null;
    const { post } = await fetchPost(slug);
    if (post) {
      return mapBlogPost(
        post,
        fallback ?? { slug, title: slug, ...EMPTY_POST }
      );
    }
    return fallback;
  }
);

// ─── Listing (/blog) ──────────────────────────────────────────────────────

/** Header of /blog — used whole when Strapi is unreachable, and field by field. */
export const blogPageFallback: BlogPageContent = {
  breadcrumbLabel: 'Blog',
  title: 'Building a foundation for your startup for growth',
  description:
    'A connected ecosystem of products designed to simplify operations, automate workflows, and keep teams aligned.',
};

const fallbackCards = (): BlogCard[] =>
  blogPostFallbacks.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || plainText(post.summary),
    coverImage: post.coverImage,
  }));

/** The /blog header and every post's card (newest first); built-in posts when Strapi is unreachable. */
export const getBlogListing = cache(
  async (): Promise<{ page: BlogPageContent; posts: BlogCard[] }> => {
    try {
      const [page, posts] = await Promise.all([
        strapiFetch<Parameters<typeof mapBlogPage>[0]>('/blog-page').catch(
          () => null
        ),
        strapiFetch<RawBlogPost[]>(
          '/blog-posts?sort=createdAt:desc&pagination[pageSize]=100&fields[0]=slug&fields[1]=title&fields[2]=excerpt&fields[3]=summary&populate[coverImage]=true'
        ),
      ]);
      const cards = (Array.isArray(posts) ? posts : []).flatMap(
        post => mapBlogCard(post, DEFAULT_COVER) ?? []
      );
      return {
        page: mapBlogPage(page, blogPageFallback),
        posts: cards.length ? cards : fallbackCards(),
      };
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        logStrapiFallback(
          '[strapi] falling back to built-in blog listing',
          err
        );
      }
      return { page: blogPageFallback, posts: fallbackCards() };
    }
  }
);
