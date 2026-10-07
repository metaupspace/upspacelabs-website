import type { ReactNode } from 'react';
import { InnerGuideContent } from '@/components/layout/PageFrame';

/**
 * The career page's inner card: two vertical lines inset 7.2% (of the space
 * between the page guides) on each side, running the full length of the
 * page's sections. Sections inside can draw beams along them (see
 * CareerHero). From md up only — phones have no guides.
 */
export function CareerFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <InnerGuideContent
        className="pointer-events-none absolute inset-0 hidden md:grid"
        contentClassName="relative h-full"
      >
        <span
          aria-hidden
          className="absolute inset-x-[7.2%] inset-y-0 border-x border-[#E5E5E5] dark:border-[#404040]"
        />
      </InnerGuideContent>
      {children}
    </div>
  );
}
