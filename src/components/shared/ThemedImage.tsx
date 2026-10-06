import Image from 'next/image';
import type { ImageAsset } from '@/lib/types';

interface ThemedImageProps {
  image: ImageAsset;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** next/image that swaps to `image.darkSrc` (when set) under the `.dark` class. */
export function ThemedImage({
  image,
  sizes,
  className = '',
  priority,
}: ThemedImageProps) {
  const props = { width: image.width, height: image.height, sizes, priority };
  if (!image.darkSrc) {
    return (
      <Image src={image.src} alt={image.alt} className={className} {...props} />
    );
  }
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        className={`${className} dark:hidden`}
        {...props}
      />
      <Image
        src={image.darkSrc}
        alt=""
        aria-hidden
        className={`${className} hidden dark:block`}
        {...props}
      />
    </>
  );
}
