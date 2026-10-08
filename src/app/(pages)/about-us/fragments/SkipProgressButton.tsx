'use client';

import type { MouseEvent } from 'react';

/**
 * "Skip" in the corner of the pinned progress path: jumps straight past the
 * section (no smooth scroll, so the timeline doesn't play), leaving the next
 * section just under the sticky navbar (the path's `--pp-top`).
 */
export function SkipProgressButton({ label }: { label: string }) {
  const skip = (event: MouseEvent<HTMLButtonElement>) => {
    const section = event.currentTarget.closest<HTMLElement>('.pp-zoom-fix');
    if (!section) return;
    const navbar =
      parseFloat(getComputedStyle(section).getPropertyValue('--pp-top')) || 0;
    const end = section.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({ top: end - navbar, behavior: 'instant' });
  };

  return (
    <button
      type="button"
      onClick={skip}
      className="pointer-events-auto rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-[#666666] transition-colors hover:border-neutral-900 hover:text-black focus-visible:ring-4 focus-visible:ring-[#2563EB]/30 focus-visible:outline-none dark:border-neutral-700 dark:bg-black dark:text-neutral-400 dark:hover:border-white dark:hover:text-white"
    >
      {label}
    </button>
  );
}
