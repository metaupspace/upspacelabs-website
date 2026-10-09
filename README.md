# UpSpace Labs website

The marketing site for UpSpace Labs — Next.js 16 (App Router), Tailwind CSS v4 and the
`@metaupspace/ui` design system. Every page's content comes from Strapi (`cms/`); open
roles and applications come from the Job Portal backend.

## Getting started

```bash
export NODE_AUTH_TOKEN=<GitHub token with read:packages>   # @metaupspace/* come from GitHub Packages
pnpm install
cp .env.example .env.local     # then fill in (see the comments inside)
(cd cms && docker compose up -d)   # Strapi + Postgres on :1337 — see cms/README.md
pnpm dev                       # http://localhost:3000
```

Without Strapi running every page still renders, using its built-in copy.

## Scripts

| Script                         | What it does                                                                                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `pnpm dev` / `build` / `start` | Next.js dev server, production build, production server                                                  |
| `pnpm lint` / `lint:fix`       | ESLint                                                                                                   |
| `pnpm format` / `format:check` | Prettier (with the Tailwind class sorter)                                                                |
| `pnpm type-check`              | TypeScript, no output                                                                                    |
| `pnpm test` / `test:watch`     | Vitest — `tests/unit`, `tests/integration`                                                               |
| `pnpm ds:pack`                 | Try unreleased design-system changes: build `../UpspaceLabs-Design-System` into `vendor/` and install it |
| `pnpm clean`                   | Remove `.next` and build caches                                                                          |

## Design system

`@metaupspace/ui` (with `@metaupspace/icons` and `@metaupspace/design-tokens`) is installed from GitHub
Packages at pinned versions. `.npmrc` routes the `@metaupspace` scope there and reads the token from
`NODE_AUTH_TOKEN`, so export a token with `read:packages` before `pnpm install`. To try unreleased
design-system changes locally, run `pnpm ds:pack` (builds `../UpspaceLabs-Design-System` into `vendor/`
and installs the tarballs) and revert `package.json` / `pnpm-workspace.yaml` before committing. After
switching versions, restart the dev server (and clear `.next` if new Tailwind classes or animations
from the preset don't show up).

## Project structure

```
src/
  app/                         Routes (App Router)
    layout.tsx                 Root layout: navbar, page guides, footer, providers
    (pages)/                   Every public page
      page.tsx + fragments/    Home
      about-us/  blog/  career/  contact-us/
      (legal)/[slug]/          Policy pages (Terms, Privacy, Refund…) — Strapi "Legal Page" entries
      career/[slug]/           A role, and [slug]/apply its application form
    api/contact/route.ts       Contact form → Strapi (validated, rate limited, honeypot)
  components/
    layout/                    Navbar, SiteFooter, PageFrame / InnerGuideContent, VerticalGuides
    providers/                 ThemeProvider, QueryProvider (TanStack Query)
    sections/                  Sections shared by several pages (Hero, Offices, CardCarousel)
    shared/                    Small building blocks (AppLink, ThemedImage, SectionHeading…)
  hooks/                       Data hooks — useJobs, useJob, useOpenRoles, useApplication
  services/                    API clients — jobs.service.ts (Job Portal backend)
  store/                       Zustand store: slices/, selectors/, typed hooks
  lib/
    content/                   One loader per page (getXContent) + its built-in fallback copy
    strapi/                    Strapi client + mappers/ (one module per area)
    types/                     Content and API types, one file per area
    jobs/                      Application-form rules (apply.ts), job → list row (listing.ts)
    contact/                   Contact-form validation
cms/                           Strapi 5 — content types, components, seed (see cms/README.md)
tests/                         unit/ and integration/ (Vitest)
public/                        Bundled images, by page (About/, Blog/, Career/, home/…)
```

Page-specific pieces live next to their route in a `fragments/` folder; anything used by
more than one page moves to `src/components/sections` or `src/components/shared`.

## How content flows

1. A page calls its loader in `src/lib/content` (e.g. `getCareerPageContent()`), wrapped in
   React `cache` so a request fetches each entry once.
2. The loader fetches Strapi through `src/lib/strapi/client.ts` and maps the response with
   `src/lib/strapi/mappers`. Every field falls back to the built-in copy when Strapi is
   unreachable or the field is empty, so pages never render blank.
3. Sections receive typed content (`src/lib/types`) and render design-system components.

Job data skips Strapi: `services/jobs.service.ts` calls the Job Portal API, `hooks/useJobs.ts`
wraps it in TanStack Query, and the career pages prefetch on the server and hydrate the
client cache, so jobs are in the HTML and stay fresh in the browser.

## Conventions

- **Design system first.** Reusable UI belongs in `@metaupspace/ui`; add or extend it
  there (with tests, story, docs and a changeset), try it here with `pnpm ds:pack`, and bump
  the pinned version once it is published. Website-only pieces
  live in `src/components`.
- **All copy and images from Strapi**, each with a built-in fallback in `src/lib/content`.
- **Tailwind:** write class names out in full (no string building — Tailwind can't see
  them). Use arbitrary sizes with `[line-height:x]` (tailwind-merge drops `leading-*`
  that comes before a `text-[size]`).
- **Dark mode** for every section (`dark:` variants; `ThemedImage` swaps images).
- Before committing: `pnpm type-check && pnpm lint && pnpm test`. Husky runs lint-staged
  (ESLint + Prettier) on staged files.
