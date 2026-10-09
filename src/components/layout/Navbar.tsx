'use client';

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Navbar as SiteNavbar, ThemeToggle } from '@metaupspace/ui';
import { AppLink } from '@/components/shared/AppLink';
import { ThemedImage } from '@/components/shared/ThemedImage';
import type { NavContent } from '@/lib/types';

interface NavbarProps {
  content: NavContent;
}

const subscribeNoop = () => () => {};

/** `true` once hydrated — next-themes only knows the stored theme in the browser. */
function useHydrated() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

/** Site header — the design system's Navbar fed with Strapi navigation content, always visible at the top. */
export function Navbar({ content }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  // Until hydrated (and for `system`) the toggle follows the `.dark` class next-themes sets, so it is right on first paint.
  const toggleValue = hydrated && theme !== 'system' ? theme : undefined;

  return (
    <SiteNavbar
      logo={
        <ThemedImage
          image={content.logo}
          sizes="147px"
          priority
          className="h-[21px] w-[147px]"
        />
      }
      logoLabel={`${content.logo.alt} home`}
      links={content.links}
      currentPath={pathname}
      cta={{ label: content.ctaText, href: content.ctaHref }}
      actions={<ThemeToggle value={toggleValue} onValueChange={setTheme} />}
      mobileActionsLabel={content.appearanceLabel}
      // Figma desktop: links and button in Medium with -2% tracking.
      classNames={{
        link: 'md:font-medium md:tracking-[-0.02em]',
        linkActive: 'md:font-medium md:tracking-[-0.02em]',
        // White text on the indigo button in dark mode too (the block switches it to black).
        cta: 'md:font-medium md:tracking-[-0.02em] dark:text-white',
        mobileCta: 'dark:text-white',
      }}
      // Sticky: stays at the top while scrolling (the block hides it on scroll down by default).
      hideOnScroll={false}
      linkComponent={AppLink}
    />
  );
}
