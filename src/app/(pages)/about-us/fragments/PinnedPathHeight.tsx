'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Keeps the pinned ProgressPath the right height on zoomed (large) screens.
 *
 * ProgressPath sizes its section as `100vh + how far the path pans`, and
 * `zoom` (globals.css) scales `100vh` past the real screen height. This
 * measures the pan distance (as ProgressPath does) into `--pp-overflow`, which
 * the `.pp-zoom-fix` rule in globals.css combines with `100vh / --page-zoom`.
 */
export function PinnedPathHeight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current?.querySelector<HTMLElement>('.pp-zoom-fix');
    const stage = section?.querySelector<HTMLElement>('.sticky');
    const track = section?.querySelector<HTMLElement>('[role="list"]');
    if (!section || !stage || !track) return;
    const measure = () =>
      section.style.setProperty(
        '--pp-overflow',
        `${Math.max(0, track.scrollWidth - stage.clientWidth)}px`
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
