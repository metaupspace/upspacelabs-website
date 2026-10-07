import type { ReactNode } from 'react';
import { AppLink } from '@/components/shared/AppLink';

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Plain CMS text with `[label](url)` turned into links — internal paths
 * through next/link, external URLs in a new tab.
 */
export function InlineLinks({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName?: string;
}) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const external = /^https?:\/\//.test(href);
    parts.push(
      external ? (
        <a
          key={start}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>
      ) : (
        <AppLink key={start} href={href} className={linkClassName}>
          {label}
        </AppLink>
      )
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
