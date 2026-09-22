# The Cine Films — Website

A cinematic, dark-themed Next.js 14 (App Router) site for **The Cine Films**, a video production house in Pokhara, Nepal. Preloader, sticky nav, full-screen hero, brand marquee, services bento grid, filterable portfolio with lightbox, scroll-driven process timeline, why-us section, animated stats, testimonial carousel, team grid, and a Cal.com booking section — with a film-grain overlay, custom crosshair cursor, and Framer Motion / Lenis scroll animations throughout.

Content (portfolio, clients, team, testimonials, site-wide settings) is managed through a custom **/admin content dashboard**, backed by PostgreSQL — no third-party CMS.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom cinematic theme: `ink` / `charcoal` / `gold` / `electric`)
- Framer Motion (scroll reveals, page/menu transitions, magnetic buttons)
- Lenis (smooth scroll)
- PostgreSQL + Prisma ORM
- Custom admin authentication (bcrypt-hashed passwords, signed session cookie via `jose`)
- Local-filesystem media storage (`lib/services/media.ts`), swappable for S3/R2/Vercel Blob later without touching the rest of the app
- Zod (server-side validation on every admin mutation)
- Cal.com embed (booking, replaces a traditional contact form — see "Contact" below)
- lucide-react (icons)
- Fonts: Clash Display (Fontshare, display headings) + Inter (body) + JetBrains Mono (labels/accents)

## Getting started

### 1. Database

This project targets PostgreSQL. For local development, the easiest path is Prisma's built-in local Postgres server — no Docker or manual install required:

```bash
npx prisma dev
```

Leave that running in its own terminal. It prints a `DATABASE_URL` and `SHADOW_DATABASE_URL` — copy both into `.env.local` (see `.env.local.example`). For a real deployment, point `DATABASE_URL` at a managed Postgres instance (Neon, Supabase, RDS, etc.) instead.

### 2. Install, migrate, seed

```bash
npm install
cp .env.local.example .env.local   # fill in DATABASE_URL, AUTH_SECRET, and the admin seed credentials
npx prisma migrate dev              # creates the schema
npm run db:seed                     # creates the first admin account + migrates the original placeholder content
```

`npm run db:seed` is idempotent — safe to re-run.

### 3. Run

```bash
npm run dev
```

Visit `http://localhost:3000` for the site, or `http://localhost:3000/admin/login` for the content dashboard — sign in with the `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` from your `.env.local`, then change the password immediately from **Admin Account** in the sidebar.

## Content Dashboard (`/admin`)

The site has a built-in, custom-built content dashboard — no third-party CMS, no separate login provider. Once you're signed in at `/admin`, you can:

- **Site Settings** — logo, tagline, contact info, social links, the hero showreel video/link, hero stats, and SEO defaults (title, description, OG image).
- **Portfolio** — create/edit/delete projects, reorder them, and set each to Draft or Published (only Published projects appear on the live site). Each project takes an uploaded thumbnail/video or a YouTube/Vimeo link.
- **Clients** — the scrolling logo marquee. Add/edit/delete, reorder, mark active/inactive.
- **Team** — team member cards. Add/edit/delete, reorder, mark active/inactive.
- **Testimonials** — the testimonial carousel. Add/edit/delete, reorder, Draft/Published, star rating.
- **Media Library** — every uploaded image/video in one place, reusable across the modules above.
- **Admin Account** — change your password.

**Not CMS-managed** (still edited in `lib/data.ts`, since they change rarely): the 12 services, the 6-step process, and the "Why Us" points. Nothing prevents moving these into the dashboard later the same way the sections above were, but there's no evidence yet that they need to be editable without a code change.

## Media

Uploads (logos, photos, thumbnails, videos) are validated (type + size) and stored under `public/uploads/` with a content-addressed filename, so a re-upload of the same file reuses the same URL and the immutable 1-year cache header is always safe. `lib/services/media.ts` is the only file that touches the filesystem — swapping in S3/R2/Vercel Blob later means rewriting that one file, not the admin UI or the database schema (`MediaAsset` just stores a URL + metadata).

## Contact

The "Let's Create" section is a **Cal.com booking embed** (`components/CalEmbed.tsx`), not a traditional contact form — the booking link is set in that file. There's no message inbox; a real form with stored submissions would be new functionality, not something migrated from an earlier version of the site.

## Authentication

`/admin/*` is protected by a signed, httpOnly session cookie (`lib/auth/session.ts`), checked both at the edge (`middleware.ts`, fast redirect) and on the server for every page and every mutating action (`lib/auth/guard.ts`) — hiding a button in the UI is never the only thing standing between a visitor and a mutation. Passwords are hashed with bcrypt. There's a single `ADMIN` role today; nothing in the current scope needs multiple roles, but the schema (`AdminUser.role`) leaves room to add them later without a rewrite.

## Deployment

Built for **Vercel**:

```bash
vercel
```

Before going live:

1. Point `DATABASE_URL` at a managed Postgres instance and run `npx prisma migrate deploy`.
2. Set `AUTH_SECRET` to a freshly generated value (never reuse the one from `.env.local.example` or your dev `.env.local`).
3. Run `npm run db:seed` once against production to create the real admin account, then log in and change the password immediately.
4. Connect the `thecinefilms.com` domain in Vercel and enable HTTPS (automatic).
5. Fill in **Site Settings** in `/admin` — logo, real phone number, SEO title/description, and an OG image (1200×630) — before sharing the site anywhere.
6. Note: uploaded media is stored on local disk (`public/uploads/`) by default, which does **not** persist across Vercel deployments/serverless instances. Swap `lib/services/media.ts`'s storage provider for S3/R2/Vercel Blob before relying on uploads in production.
7. Add Google Analytics 4 + Meta Pixel snippets (e.g. via `next/script` in `app/layout.tsx`) if wanted — not included.
8. Verify the site in Google Search Console and submit `/sitemap.xml` (generated via `app/sitemap.ts`).
9. Test on real mobile devices, especially hero video autoplay/loop behavior on slow connections.

## Scripts

```bash
npm run dev           # start dev server
npm run build          # production build (runs `prisma generate` first)
npm run start           # run the production build
npm run lint             # ESLint
npm run db:migrate        # create/apply a migration in development
npm run db:deploy          # apply migrations in production (non-interactive)
npm run db:seed              # seed/re-seed placeholder content + admin account
npm run db:studio             # Prisma Studio (visual DB browser)
```
