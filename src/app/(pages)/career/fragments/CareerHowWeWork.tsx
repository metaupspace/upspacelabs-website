import Image from 'next/image';
import { FeatureSplit } from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import type { HowWeWorkContent } from '@/lib/types';

/**
 * "Build it, ship it, learn from it": the design system's FeatureSplit — a
 * blue eyebrow, the title and paragraphs on the left, the text-art birds on
 * the right. The illustration is shown at its own size; its media column is
 * as wide as the drawing (698 of its 735px), so the transparent margin runs
 * past the column and the birds' tip meets the right page guide. Inverted
 * in dark mode. Phones: text, then the image full width.
 */
export function CareerHowWeWork({ content }: { content: HowWeWorkContent }) {
  const { eyebrow, title, paragraphs, image } = content;

  return (
    <InnerGuideContent contentClassName="px-6 pt-4 pb-20 md:pt-3 md:pr-0 md:pb-11 md:pl-12">
      <FeatureSplit
        size="xl"
        mobileOrder="content-first"
        lineBreaks="never"
        eyebrow={eyebrow ?? undefined}
        title={title}
        description={paragraphs.map((paragraph, index) => (
          <span key={index} className="block [&+&]:mt-[23px]">
            {paragraph}
          </span>
        ))}
        media={
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 768px) 735px, 100vw"
            className="block h-auto w-full max-w-none md:w-[105.3%] dark:invert"
          />
        }
        mediaWidth="minmax(0, 698px)"
        mediaMaxWidth="none"
        contentMaxWidth="30.5rem"
        columnGap="2rem"
        classNames={{
          eyebrow:
            'mb-2.5 text-[13.5px] font-bold tracking-[0.02em] text-[#2563EB] uppercase [line-height:1.3]',
          title:
            'text-[30px] font-bold tracking-[-0.02em] [font-variation-settings:normal] [line-height:1.15] md:text-[39px] md:[line-height:1.1]',
          description:
            'mt-[14px] text-[14px] text-neutral-500 [line-height:23px] dark:text-neutral-400',
          media: 'overflow-visible',
        }}
      />
    </InnerGuideContent>
  );
}
