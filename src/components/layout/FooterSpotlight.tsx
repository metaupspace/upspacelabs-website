'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const WATERMARK = 'div[aria-hidden] > span';

/**
 * Footer watermark spotlight (as on payloadcms.com): while a mouse moves over
 * the footer, a soft glow follows it and lights up the big watermark letters
 * through a grain texture; it fades out when the mouse leaves. The look lives
 * in globals.css (`.footer-spotlight`); this only feeds the pointer position
 * to it as `--spot-x` / `--spot-y`, in the watermark's own (unzoomed) pixels.
 * Touch and pen leave the watermark as it is.
 */
export function FooterSpotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      const mark = root.querySelector<HTMLElement>(WATERMARK);
      if (!mark || !last) return;
      const box = mark.getBoundingClientRect();
      // Pointer coordinates are screen pixels; the gradient is laid out in the
      // element's CSS pixels, which differ under the large-screen `zoom`.
      const scale = box.width ? mark.offsetWidth / box.width : 1;
      mark.style.setProperty(
        '--spot-x',
        `${(last.clientX - box.left) * scale}px`
      );
      mark.style.setProperty(
        '--spot-y',
        `${(last.clientY - box.top) * scale}px`
      );
      mark.style.setProperty('--spot-a', '1');
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      root
        .querySelector<HTMLElement>(WATERMARK)
        ?.style.setProperty('--spot-a', '0');
    };

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ref} className="footer-spotlight">
      {children}
    </div>
  );
}
