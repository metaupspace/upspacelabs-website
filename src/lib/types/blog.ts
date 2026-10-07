import type { CardCarouselContent } from './landing';
import type { ImageAsset } from './shared';

/** A post as shown in the /blog grid. */
export interface BlogCard {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: ImageAsset;
}

/** Header of the /blog listing page. */
export interface BlogPageContent {
  breadcrumbLabel: string;
  title: string;
  description: string;
}

/** A key figure in the post's sidebar. */
export interface BlogStat {
  value: string;
  label: string | null;
}

/** One block of the post body, in order. */
export type BlogBlock =
  | {
      type: 'text';
      heading: string | null;
      /** Paragraph groups (gap between) of lines (no gap between). */
      groups: string[][];
    }
  | { type: 'quote'; quote: string; author: string | null; role: string | null }
  | { type: 'image'; image: ImageAsset; caption: string | null };

/** A logo in the post's logo row. */
export interface BlogLogo {
  name: string;
  image: ImageAsset;
  href: string | null;
}

/** A blog post / customer story at /blog/<slug>. */
export interface BlogPost {
  slug: string;
  /** Page title (`h1`). */
  title: string;
  /** Intro under the title. `[label](url)` becomes an inline link. */
  summary: string;
  /** Short line for the post's card in listings. */
  excerpt: string;
  coverImage: ImageAsset;
  /** Small heading over the logo row, e.g. "UpSentrix Products Used by Northfield". */
  logosLabel: string;
  logos: BlogLogo[];
  /** Key figures beside the body (sticky sidebar). */
  stats: BlogStat[];
  body: BlogBlock[];
  /** Related stories carousel at the bottom of the post. */
  moreStories: CardCarouselContent;
}
