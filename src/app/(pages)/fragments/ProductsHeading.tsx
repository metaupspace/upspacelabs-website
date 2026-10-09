import { SectionHeading } from '@/components/shared/SectionHeading';
import type { SectionHeadingContent } from '@/lib/types';

/**
 * Heading of the products section: a 32/38 Bold title over a 14/20 Medium description
 * (Figma desktop). `id="products"` is the hero's "See Products" anchor.
 */
export function ProductsHeading({
  content,
}: {
  content: SectionHeadingContent;
}) {
  return (
    <SectionHeading
      id="products"
      content={content}
      className="pt-20 pb-[23px] md:pt-[60px] md:pb-[33px]"
      classNames={{
        headline:
          'text-[1.875rem] md:text-[2rem] md:font-bold md:tracking-[-0.2px] md:[line-height:38px]',
        subtitle:
          'mt-[9px] [line-height:1.5] md:mt-[8px] md:text-[14px] md:font-medium md:tracking-[-0.02em] md:[line-height:20px]',
      }}
    />
  );
}
