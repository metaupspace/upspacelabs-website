'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Navbar as SiteNavbar, ThemeToggle } from '@metaupspace/ui';
import { AppLink } from '@/components/shared/AppLink';
import type { NavContent } from '@/lib/types';

interface NavbarProps {
  content: NavContent;
}

function Logo() {
  return (
    <>
      <Image
        src="/Navbar/logo.png"
        alt="UpSpace Labs"
        width={147}
        height={21}
        priority
        className="h-[21px] w-[147px] dark:hidden"
      />
      <Image
        src="/Navbar/logo-white.png"
        alt="UpSpace Labs"
        width={147}
        height={21}
        priority
        className="hidden h-[21px] w-[147px] dark:block"
      />
    </>
  );
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

/** Site header — the design system's Navbar fed with Strapi navigation content. */
export function Navbar({ content }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  // Until hydrated (and for `system`) the toggle follows the `.dark` class next-themes sets, so it is right on first paint.
  const toggleValue = hydrated && theme !== 'system' ? theme : undefined;

  return (
    <SiteNavbar
      logo={<Logo />}
      logoLabel="UpSpace Labs home"
      links={content.links}
      currentPath={pathname}
      cta={{ label: content.ctaText, href: content.ctaHref }}
      actions={<ThemeToggle value={toggleValue} onValueChange={setTheme} />}
      mobileActionsLabel="Appearance"
      linkComponent={AppLink}
    />
  );
}
