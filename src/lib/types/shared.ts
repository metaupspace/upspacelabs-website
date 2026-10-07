export interface NavLink {
  label: string;
  href: string;
}

/** An image with its intrinsic size (for next/image) and alt text. */
export interface ImageAsset {
  src: string;
  /** Shown instead of `src` in dark mode, e.g. a transparent cut-out of artwork with a white background. */
  darkSrc?: string;
  alt: string;
  width: number;
  height: number;
}

/** A section's title and the short description under it. */
export interface SectionHeadingContent {
  title: string;
  description: string;
}

/** A labelled call-to-action (button or text link). */
export interface CtaLink {
  label: string;
  href: string;
}
