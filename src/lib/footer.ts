/**
 * Pages whose footer drops the "Modern Systems for Teams" card: a single
 * role and its apply page (/career/<job>, /career/<job>/apply — not /career
 * itself) and the policy pages (the `(legal)` route group: Terms of Service,
 * Privacy Policy, Refund Policy…).
 *
 * Takes the root layout's `useSelectedLayoutSegments()`, which includes
 * route groups — e.g. ['(pages)', 'career', 'udi-001', 'apply'] or
 * ['(pages)', '(legal)', 'terms-of-service'].
 */
export function hidesFooterCta(segments: string[]): boolean {
  if (segments.includes('(legal)')) return true;
  const career = segments.indexOf('career');
  return career !== -1 && segments.length > career + 1;
}
