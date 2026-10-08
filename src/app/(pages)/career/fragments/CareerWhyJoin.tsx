import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { WhyJoinContent } from '@/lib/types';

/** Solid star — four long points and four short diagonal ones — the perk marker. */
function Sparkle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-[34px] text-black dark:text-white"
      fill="currentColor"
    >
      <path d="M12.00 0.00 L13.34 8.77 L17.37 6.63 L15.23 10.66 L24.00 12.00 L15.23 13.34 L17.37 17.37 L13.34 15.23 L12.00 24.00 L10.66 15.23 L6.63 17.37 L8.77 13.34 L0.00 12.00 L8.77 10.66 L6.63 6.63 L10.66 8.77Z" />
    </svg>
  );
}

/**
 * "Why people choose to build with us": a blue eyebrow, the title and a
 * short description on the left; a two-column grid of perks (star, title,
 * one line) on the right; on phones the perks are a list with a line
 * under each. From lg up the grid starts 46.2% across;
 * narrower screens stack the text over the grid, which is one column on
 * phones.
 */
export function CareerWhyJoin({ content }: { content: WhyJoinContent }) {
  const { eyebrow, title, description, perks } = content;

  return (
    <InnerGuideContent contentClassName="px-6 pt-16 pb-20 md:px-[46px] md:pt-2 md:pb-24 lg:pr-[38px]">
      <section
        aria-labelledby="why-join-title"
        className="grid gap-12 lg:grid-cols-[46.2%_minmax(0,1fr)] lg:gap-0"
      >
        <div className="max-w-[30rem]">
          {eyebrow && (
            <p className="text-[13.5px] [line-height:1.3] font-bold tracking-[0.02em] text-[#2563EB] uppercase md:text-[12px] md:[line-height:16px] md:tracking-normal">
              {eyebrow}
            </p>
          )}
          <h2
            id="why-join-title"
            className="mt-2.5 text-[30px] [line-height:1.15] font-bold tracking-[-0.02em] text-black [font-variation-settings:normal] md:text-[32px] md:[line-height:38px] md:tracking-[-0.2px] md:whitespace-pre-line dark:text-white"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-[13px] text-[14px] [line-height:23px] text-neutral-500 md:text-[12px] md:[line-height:20px] dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-x-[26px] sm:grid-cols-2 sm:gap-y-10 md:gap-y-[46px] lg:pt-[14px]">
          {perks.map(perk => (
            <li
              key={perk.title}
              // Phones: a line under every perk but the last, the text inset inside it.
              className="border-neutral-200 max-sm:border-b max-sm:px-5 max-sm:pt-7 max-sm:pb-7 max-sm:first:pt-0 max-sm:last:border-b-0 dark:border-neutral-800"
            >
              <Sparkle />
              <h3 className="mt-[15px] max-w-[18rem] text-[19.5px] [line-height:1.2] font-bold tracking-[-0.01em] text-black [font-variation-settings:normal] md:text-[18px] md:[line-height:28px] md:tracking-[0.04em] dark:text-white">
                {perk.title}
              </h3>
              {perk.description && (
                <p className="mt-2.5 max-w-[18rem] pl-0.5 text-base [line-height:23px] text-neutral-500 md:text-[14px] md:[line-height:20px] md:tracking-[-0.02em] dark:text-neutral-400">
                  {perk.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </InnerGuideContent>
  );
}
