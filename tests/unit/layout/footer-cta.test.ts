import { describe, expect, it } from 'vitest';
import { hidesFooterCta } from '@/lib/footer';

describe('hidesFooterCta', () => {
  it('hides the card on a role, its apply page and the policy pages', () => {
    expect(hidesFooterCta(['(pages)', 'career', 'udi-001'])).toBe(true);
    expect(hidesFooterCta(['(pages)', 'career', 'udi-001', 'apply'])).toBe(
      true
    );
    expect(hidesFooterCta(['(pages)', '(legal)', 'terms-of-service'])).toBe(
      true
    );
    expect(hidesFooterCta(['(pages)', '(legal)', 'refund-policy'])).toBe(true);
  });

  it('keeps it on /career and every other page', () => {
    expect(hidesFooterCta(['(pages)', 'career'])).toBe(false);
    expect(hidesFooterCta(['(pages)'])).toBe(false);
    expect(hidesFooterCta(['(pages)', 'about-us'])).toBe(false);
    expect(hidesFooterCta(['(pages)', 'blog', 'northfield-logistics'])).toBe(
      false
    );
  });
});
