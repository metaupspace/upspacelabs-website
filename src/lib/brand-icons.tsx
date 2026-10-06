import type { ComponentType } from 'react';
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from '@metaupspace/icons';
import type { SocialPlatform } from '@/lib/types';

type IconComponent = ComponentType<{
  className?: string;
  'aria-hidden'?: boolean;
}>;

/** Footer social icons (the design's outline style), keyed by the Strapi `platform` value. */
export const SOCIAL_ICONS: Record<SocialPlatform, IconComponent> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
};
