import type {
  CtaLink,
  HeroContent,
  LandingPageContent,
  NavContent,
  NavLink,
} from '@/lib/types';

// ─── Shared ────────────────────────────────────────────────────────────────

interface RawCta {
  label: string;
  href: string;
}

const mapCta = (c: RawCta): CtaLink => ({ label: c.label, href: c.href });

// ─── Navigation ────────────────────────────────────────────────────────────

interface RawNavLink {
  label: string;
  href: string;
}

export interface RawNavigation {
  navLinks: RawNavLink[];
  ctaText: string;
  ctaHref: string;
}

const mapNavLink = (l: RawNavLink): NavLink => ({
  label: l.label,
  href: l.href,
});

export function mapNavContent(raw: RawNavigation): NavContent {
  return {
    links: raw.navLinks.map(mapNavLink),
    ctaText: raw.ctaText,
    ctaHref: raw.ctaHref,
  };
}

// ─── Landing Page ──────────────────────────────────────────────────────────

interface RawHero {
  headline: string;
  subtitle: string;
  primaryCta: RawCta;
  secondaryCta?: RawCta | null;
}

export interface RawLandingPage {
  hero: RawHero;
}

export function mapHeroContent(raw: RawHero): HeroContent {
  return {
    headline: raw.headline,
    subtitle: raw.subtitle,
    primaryCta: mapCta(raw.primaryCta),
    secondaryCta: raw.secondaryCta ? mapCta(raw.secondaryCta) : null,
  };
}

export function mapLandingPageContent(raw: RawLandingPage): LandingPageContent {
  return { hero: mapHeroContent(raw.hero) };
}
