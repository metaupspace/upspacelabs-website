'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { Route } from 'next';
import { Button } from '@/components/ui/Button';
import type { NavContent } from '@/lib/types';

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l-1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const chipActive = 'text-primary bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]';
const chipActiveDark = 'dark:bg-[#3F3F46] dark:text-[#A8B4F7] dark:shadow-none';
const chipIdle = 'text-[#C3C3C7] hover:text-[#71717A]';
const chipIdleDark =
  'dark:bg-transparent dark:text-[#A1A1AA] dark:shadow-none dark:hover:text-[#D4D4D8]';

/**
 * Segmented light / dark switch — the active option sits on a raised chip.
 * Active styling is driven by the `dark` class (not JS state) so it is
 * correct on first paint, before hydration.
 */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  const isDark = isClient && resolvedTheme === 'dark';

  const options = [
    {
      value: 'light',
      label: 'Light theme',
      icon: <SunIcon />,
      active: !isDark,
      className: `${chipActive} ${chipIdleDark}`,
    },
    {
      value: 'dark',
      label: 'Dark theme',
      icon: <MoonIcon />,
      active: isDark,
      className: `${chipIdle} ${chipActiveDark}`,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex h-[38px] w-[70px] items-center rounded-full border border-[#ECECEE] bg-[#F4F4F5] p-[2px] dark:border-[#3F3F46] dark:bg-[#27272A]"
    >
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.active}
          aria-label={option.label}
          onClick={() => setTheme(option.value)}
          className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${option.className}`}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}

interface NavbarProps {
  content: NavContent;
}

export function Navbar({ content }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  useEffect(() => {
    if (!menuOpen) return;

    const getFocusable = () =>
      Array.from(
        navRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter(element => element.getClientRects().length > 0);
    const firstDrawerItem = mobileMenuRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    firstDrawerItem?.focus();

    function onMenuKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onMenuKeyDown);
    return () => document.removeEventListener('keydown', onMenuKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 64rem)');
    const closeMobileMenu = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener('change', closeMobileMenu);
    return () => desktopQuery.removeEventListener('change', closeMobileMenu);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      setScrolled(y > 10);
      setHidden(y > lastY && y > 80);

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || !menuOpen) return;
      menuButtonRef.current?.focus();
      setMenuOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 z-50 w-full border-b border-[#E5E5E5] transition-all duration-300 dark:border-[#404040] ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled
          ? 'bg-(--color-background)/90 backdrop-blur-md'
          : 'bg-(--color-background)'
      }`}
    >
      {/* Content sits between the page's vertical guides */}
      <div className="mx-auto w-full max-w-[160rem] px-6 md:grid md:grid-cols-[6.5625%_1px_minmax(0,1fr)_1px_6.5625%] md:px-0">
        <div className="relative flex h-21.5 items-center justify-between md:col-start-3 md:px-1.5">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
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
          </Link>

          {/* Desktop links — centred on the bar, independent of side widths */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[46px] lg:flex">
            {content.links.map(link => (
              <Link
                key={link.href}
                href={link.href as Route}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="text-sm font-semibold whitespace-nowrap text-(--color-foreground) transition-colors hover:text-(--color-primary)"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <ThemeToggle />

            <Button
              href={content.ctaHref}
              className="h-10 rounded-[6px] px-6 font-normal dark:text-black"
            >
              {content.ctaText}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            className="flex h-9 w-9 items-center justify-center rounded-[6px] text-(--color-foreground) lg:hidden"
            onClick={() => setMenuOpen(open => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-navigation"
          className="max-h-[calc(100dvh-5.375rem)] overflow-y-auto overscroll-contain border-t border-[#E5E5E5] bg-(--color-background) px-6 py-4 lg:hidden dark:border-[#404040]"
        >
          <div className="flex flex-col gap-4">
            {content.links.map(link => (
              <Link
                key={link.href}
                href={link.href as Route}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="text-sm font-semibold"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center justify-between gap-3 border-t border-[#E5E5E5] pt-4 dark:border-[#404040]">
              <ThemeToggle />

              <Button
                href={content.ctaHref}
                className="h-10 rounded-[6px] px-6 font-normal dark:text-black"
              >
                {content.ctaText}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
