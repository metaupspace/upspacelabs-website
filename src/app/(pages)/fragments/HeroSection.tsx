import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { HeroContent } from '@/lib/types';

interface HeroSectionProps {
  content: HeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const { headline, subtitle, primaryCta, secondaryCta } = content;

  return (
    <section
      aria-labelledby="hero-heading"
      className="pt-32 pb-12 md:pt-[10.75rem]"
    >
      <InnerGuideContent contentClassName="flex flex-col items-center px-6 text-center">
        <h1
          id="hero-heading"
          className="max-w-[46rem] text-[2.25rem] leading-[1.2] font-semibold tracking-[-0.05em] text-black md:text-5xl md:whitespace-pre-line dark:text-white"
        >
          {headline}
        </h1>

        <p className="mt-[17px] max-w-[35rem] text-[14.5px] leading-6 text-[#A3A3A3]">
          {subtitle}
        </p>

        <div className="mt-[31px] flex flex-wrap items-center justify-center gap-x-4 gap-y-4">
          <Button
            href={primaryCta.href}
            className="group h-[46px] rounded-[6px] px-4 font-normal"
          >
            {primaryCta.label}
            <ArrowRight
              aria-hidden
              className="size-5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </Button>

          {secondaryCta && (
            <Link
              href={secondaryCta.href as Route}
              className="inline-flex h-[46px] items-center rounded-[6px] px-4 text-sm text-[#525252] transition-colors hover:bg-[#F5F5F5] hover:text-(--color-primary) dark:text-[#D4D4D4] dark:hover:bg-[#171717]"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </InnerGuideContent>
    </section>
  );
}
