import { SectionHeading } from '@/components/shared/SectionHeading';
import type { SectionHeadingContent } from '@/lib/types';

/**
 * Heading of the products section: a 36px title over the hero's 14.5px
 * description. `id="products"` is the hero's "See Products" anchor.
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
      className="pt-20 pb-[23px] md:pt-24"
      classNames={{
        headline: 'text-[1.875rem] md:text-[2.25rem]',
        subtitle: 'mt-[9px] [line-height:1.5]',
      }}
    />
  );
}
