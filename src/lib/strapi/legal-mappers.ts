import type { LegalBlock, LegalPage, LegalSection } from '@/lib/types';

export interface RawLegalPage {
  slug?: string | null;
  title?: string | null;
  lastUpdated?: string | null;
  sections?: Array<{ heading?: string | null; body?: string | null }> | null;
}

const nonEmpty = (v?: string | null): v is string =>
  typeof v === 'string' && v.trim() !== '';

/** "Terms of Service" → "terms-of-service". */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Section body text → blocks. Paragraphs are separated by a blank line; lines
 * starting with "- " form a bullet list; "### Title" is a sub-heading.
 */
export function parseLegalBody(body: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  for (const chunk of body.split(/\n\s*\n/)) {
    const lines = chunk
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    let list: string[] = [];
    const flush = () => {
      if (list.length) blocks.push({ type: 'list', items: list });
      list = [];
    };
    for (const line of lines) {
      if (line.startsWith('- ')) {
        list.push(line.slice(2).trim());
      } else if (line.startsWith('### ')) {
        flush();
        blocks.push({ type: 'subheading', text: line.slice(4).trim() });
      } else {
        flush();
        blocks.push({ type: 'paragraph', text: line });
      }
    }
    flush();
  }
  return blocks;
}

function mapSections(raw: RawLegalPage['sections']): LegalSection[] {
  const seen = new Map<string, number>();
  return (raw ?? []).flatMap((s): LegalSection[] => {
    if (!nonEmpty(s.heading)) return [];
    const blocks = parseLegalBody(s.body ?? '');
    if (!blocks.length) return [];
    // Duplicate headings get -2, -3… so anchors stay unique.
    const base = slugify(s.heading) || 'section';
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return [
      { id: n === 1 ? base : `${base}-${n}`, heading: s.heading, blocks },
    ];
  });
}

/** A Strapi entry, or `null` when it has no slug, title or usable sections. */
export function mapLegalPage(raw: RawLegalPage): LegalPage | null {
  if (!nonEmpty(raw.slug) || !nonEmpty(raw.title)) return null;
  const sections = mapSections(raw.sections);
  if (!sections.length) return null;
  return {
    slug: raw.slug,
    title: raw.title,
    lastUpdated: nonEmpty(raw.lastUpdated) ? raw.lastUpdated : null,
    sections,
  };
}
