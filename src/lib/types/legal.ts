/** One block of a legal section, in order. */
export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] };

export interface LegalSection {
  /** URL-safe anchor, unique within the page. */
  id: string;
  heading: string;
  blocks: LegalBlock[];
}

/** A policy page such as /terms or /privacy-policy. */
export interface LegalPage {
  slug: string;
  title: string;
  /** ISO date (`YYYY-MM-DD`), or `null` when not set. */
  lastUpdated: string | null;
  sections: LegalSection[];
}
