'use client';

import { useEffect, useState } from 'react';
import type { LegalBlock, LegalPage } from '@/lib/types';

const formatDate = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  const day = date.getUTCDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const month = date.toLocaleString('en-GB', {
    month: 'long',
    timeZone: 'UTC',
  });
  return `${day}${suffix} ${month} ${date.getUTCFullYear()}`;
};

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case 'subheading':
      return (
        <h3 className="mt-6 text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {block.text}
        </h3>
      );
    case 'list':
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-neutral-400">
          {block.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

/** Highlights the section currently under the sticky header as the reader scrolls. */
function useActiveSection(ids: string[]): [string, (id: string) => void] {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // A band just under the fixed navbar.
      { rootMargin: '-290px 0px -60% 0px' }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}

export function LegalDocument({ page }: { page: LegalPage }) {
  const ids = page.sections.map(s => s.id);
  const [active, setActive] = useActiveSection(ids);

  return (
    <article className="mx-auto w-full max-w-(--frame) px-(--gutter) pt-28 pb-20 md:pt-[1.625rem] md:pb-28">
      {/* Title stays pinned while the sections scroll past. It pins at the very
          top, padded past the sticky navbar (which sits over the padding), so
          sections never show above the title. The article's top padding is
          reduced by the same amount. */}
      <header className="bg-background md:sticky md:top-0 md:z-10 md:h-[17.5rem] md:pt-[8.375rem]">
        <h1 className="text-[2.25rem] leading-[1.15] font-semibold tracking-[-0.04em] text-neutral-950 md:text-[48px] md:leading-[58px] md:tracking-[-0.4px] dark:text-white">
          {page.title}
        </h1>
        {page.lastUpdated && (
          <p className="mt-4 text-sm text-neutral-500 md:mt-5 md:text-[14px] md:leading-6 md:font-medium dark:text-neutral-400">
            Last Updated on {formatDate(page.lastUpdated)}
          </p>
        )}
      </header>

      <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-8 md:mt-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
        <nav
          aria-label={`${page.title} sections`}
          className="min-w-0 md:sticky md:top-[17.5rem] md:-ml-[1.9rem] md:self-start"
        >
          <ul className="-mx-(--gutter) flex [scrollbar-width:none] gap-1 overflow-x-auto px-(--gutter) pb-2 md:mx-0 md:flex-col md:gap-0 md:overflow-visible md:px-0 md:pb-0">
            {page.sections.map(section => {
              const current = section.id === active;
              return (
                <li key={section.id} className="shrink-0">
                  <a
                    href={`#${section.id}`}
                    onClick={() => setActive(section.id)}
                    aria-current={current ? 'location' : undefined}
                    // Desktop type from Figma: the current item 16/24 Medium, the rest
                    // 14/20 in #525252, all -2%.
                    className={`block rounded-full px-4 py-1.5 text-sm whitespace-nowrap transition-colors md:rounded-none md:border-l-4 md:py-2 md:pl-[1.9rem] md:leading-5 md:tracking-[-0.02em] md:whitespace-normal ${
                      current
                        ? // Phones: a filled pill; from md up only the indigo line marks it (no fill in either theme).
                          'bg-neutral-100 font-medium text-neutral-950 md:border-indigo-500 md:bg-transparent md:text-[16px] md:leading-6 dark:bg-neutral-800 dark:text-white md:dark:bg-transparent'
                        : 'text-neutral-500 hover:text-neutral-900 md:border-transparent md:text-[#525252] dark:text-neutral-400 dark:hover:text-white md:dark:text-neutral-400'
                    }`}
                  >
                    {section.heading}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="min-w-0 space-y-10 md:space-y-12">
          {page.sections.map(section => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-[17.5rem]"
            >
              <h2
                id={`${section.id}-title`}
                className="text-xl font-semibold tracking-[-0.01em] text-neutral-950 md:text-[16px] md:leading-[29px] md:font-bold md:tracking-[-0.02em] dark:text-white"
              >
                {section.heading}
              </h2>
              <div className="mt-3 space-y-4 text-[15px] leading-7 text-neutral-600 md:text-[14px] md:leading-[29px] md:tracking-[-0.02em] md:text-neutral-500 dark:text-neutral-400">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
