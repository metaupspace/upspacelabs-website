'use client';

import Link from 'next/link';
import type { Route } from 'next';
import type { LinkComponentProps } from '@metaupspace/ui';

/**
 * next/link for the design system's `linkComponent` prop, so every link a
 * @metaupspace/ui component renders gets client-side navigation and
 * prefetching. Hrefs come from Strapi, hence the cast for typed routes.
 */
export function AppLink({ href, ...props }: LinkComponentProps) {
  return <Link href={href as Route} {...props} />;
}
