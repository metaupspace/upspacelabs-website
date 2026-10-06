export interface NavLink {
  label: string;
  href: string;
}

/** An image with its intrinsic size (for next/image) and alt text. */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A labelled call-to-action (button or text link). */
export interface CtaLink {
  label: string;
  href: string;
}
