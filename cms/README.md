# Upspace Labs CMS (Strapi 5)

Content for the upspacelabs.com website. The Next.js app in the parent folder reads it over the public REST API and falls back to built-in content whenever Strapi is unreachable or a field is empty.

## Run it locally

Requires Docker Desktop. Strapi and Postgres both run in containers, so your local Node version doesn't matter (Strapi itself needs Node 20–24).

1. Create `cms/.env` from the template and replace every `tobemodified` value with a random secret:

   ```sh
   cp .env.example .env
   node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"   # one per secret
   ```

   `APP_KEYS` takes four comma-separated values. Leave the `CF_R2_*` placeholders as they are to store uploads locally (see [Media](#media)).

2. Start Postgres and Strapi:

   ```sh
   docker compose up -d --build   # first run, or after package.json changes
   docker compose up -d           # afterwards
   ```

   The first start seeds the Navigation and Landing Page entries and makes them publicly readable.

3. Create your admin account at <http://localhost:1337/admin>, or from the terminal:

   ```sh
   docker compose exec strapi npx strapi admin:create-user --email=you@metaupspace.com --password='…' --firstname=… --lastname=…
   ```

4. Point the website at it. In the parent folder's `.env.local`:

   ```sh
   STRAPI_URL=http://localhost:1337
   ```

   Then run `pnpm dev` there. Strapi responses are cached for 5 minutes, so edits can take that long to show up. To see them immediately, stop `pnpm dev`, delete `.next/` and start it again.

## Day to day

| Task                            | Command                                                |
| ------------------------------- | ------------------------------------------------------ |
| Start / stop                    | `docker compose up -d` / `docker compose stop`         |
| Logs                            | `docker compose logs -f strapi`                        |
| After changing `package.json`   | `docker compose up -d --build`                         |
| Wipe all content and start over | `docker compose down -v` (deletes the database volume) |

`src/`, `config/` and `database/` are mounted into the container, so schema and code changes reload automatically in `strapi develop`.

## Media

Uploads go to Cloudflare R2 when all `CF_R2_*` variables hold real values. Otherwise Strapi stores them in `public/uploads`, which git ignores. The R2 public URL is also allowed in the admin panel's content security policy so previews load.

## Content types

| Strapi entry             | Website                                     |
| ------------------------ | ------------------------------------------- |
| Navigation (single type) | Navbar links and CTA                        |
| Landing Page → Hero      | Home page hero, including the product image |
