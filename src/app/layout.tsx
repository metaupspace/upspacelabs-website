import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { VerticalGuides } from '@/components/layout/VerticalGuides';
import { getLayoutContent } from '@/lib/content/navigation';

// `opsz` axis: design-system components tune DM Sans' optical size per style.
const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Upspace Labs',
    template: '%s | Upspace Labs',
  },
  description: 'Upspace Labs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nav, footer } = await getLayoutContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmSans.className}`}>
        <ThemeProvider>
          <Navbar content={nav} />
          {/* The guide lines run down the page and meet the footer's CTA card, which continues them. */}
          <div className="relative">
            <VerticalGuides />
            <main className="pb-20 md:pb-24">{children}</main>
          </div>
          <SiteFooter content={footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
