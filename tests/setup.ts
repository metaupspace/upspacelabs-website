import '@testing-library/jest-dom/vitest';

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class MockIntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver ?? MockResizeObserver;
  window.IntersectionObserver =
    window.IntersectionObserver ??
    (MockIntersectionObserver as unknown as typeof IntersectionObserver);

  window.matchMedia =
    window.matchMedia ??
    ((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }));
}
