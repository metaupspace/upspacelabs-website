import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { getNavContent } from '@/lib/content/navigation';

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
  const navContent = await getNavContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${dmSans.className}`}>
        <ThemeProvider>
          <Navbar content={navContent} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
