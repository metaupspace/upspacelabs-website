import type { Config } from 'tailwindcss';
import uiPreset from '@metaupspace/ui/tailwind-preset';

/**
 * Loaded by Tailwind v4 through `@config` in src/app/globals.css, mainly to
 * apply the @metaupspace design system's preset (a Tailwind v3 config) so
 * its components' classes resolve to the design tokens.
 */
const config: Config = {
  presets: [uiPreset],
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@metaupspace/ui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        condensed: ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
};

export default config;
