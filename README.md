# The Cine Films — Website

A cinematic, dark-themed Next.js 14 (App Router) site for **The Cine Films**, a video production house in Pokhara, Nepal. Built from the design brief: preloader, sticky nav, full-screen hero, brand marquee, services bento grid, filterable portfolio with lightbox, scroll-driven process timeline, why-us section, animated stats, equipment showcase, testimonial carousel, team grid, and a contact form — with a film-grain overlay, custom crosshair cursor, and Framer Motion / Lenis scroll animations throughout.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (custom cinematic theme: `ink` / `charcoal` / `gold` / `electric`)
- Framer Motion (scroll reveals, page/menu transitions, magnetic buttons)
- Lenis (smooth scroll)
- react-countup (animated stats)
- lucide-react (icons)
- Sanity (headless CMS, embedded content dashboard at `/studio`)
- Fonts: Clash Display (Fontshare, display headings) + Inter (body) + JetBrains Mono (labels/accents)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start        # serve the production build
```

## ⚠️ This launches with placeholder content — most of it you now upload via the dashboard

Every video, photo, logo, and testimonial in this build starts as a **placeholder** so the structure, layout, and animations can be reviewed today. Most of it is now replaceable through the **Content Dashboard** at `/studio` (see below) — no code editing needed. A couple of one-time brand assets are still code/file-based:

| What | How to add it |
|---|---|
| Showreel video, portfolio clips/thumbnails, client logos, team photos, testimonials | Upload via the **Content Dashboard** (`/studio`) — see below |
| Phone, email, address, social links, hero stats, stats counters | Edit in **Site Settings** inside the Content Dashboard |
| Brand logo (SVG) in the nav/footer | `/public/images/logo.svg` — `components/Nav.tsx`, `components/Footer.tsx` |
| Open Graph image | `/public/images/og-cover.jpg` — `app/layout.tsx` |
| Favicon | `/app/favicon.ico` — already present (default) — replace with real mark |

Services, process steps, and equipment list still live in **`lib/data.ts`** — edit that file to update them (see "Not yet CMS-managed" below).

## Contact form

The form in `components/Contact.tsx` currently simulates a submission client-side. To make it functional, wire it to **Resend** or **EmailJS** as specified in the brief:

- **Resend**: create an `app/api/contact/route.ts` POST handler that calls the Resend API, then replace the `setTimeout` in `handleSubmit` with a `fetch("/api/contact", { method: "POST", body: ... })` call.
- **EmailJS**: install `@emailjs/browser` and call `emailjs.send(...)` directly inside `handleSubmit`.

You'll need an API key/service ID from whichever provider you choose — store it in `.env.local` (never commit it).

## Content Dashboard (CMS)

The site has a built-in content dashboard powered by **Sanity** — a free, hosted CMS with its own login. Once it's connected, you (the company owner) can log in at `yoursite.com/studio` and add/edit content directly, no code required:

- **Portfolio Projects (Our Work)** — title, category, client, year, thumbnail image, and either an uploaded video file or a YouTube/Vimeo link.
- **Clients / Brand Logos** — the scrolling marquee near the top of the site.
- **Team Members** — name, role, photo, Instagram link.
- **Testimonials** — quote, name, role, company, star rating, photo.
- **Site Settings** — phone, email, address, social links, the showreel video, the 3 hero stats, and the 6-number stats section.

### One-time setup

1. Go to **sanity.io** and sign up for a free account (email login, no credit card).
2. Create a new project — call it "The Cine Films" — and note the **Project ID** it gives you.
3. In the project folder, copy `.env.local.example` to a new file named `.env.local`, and fill in:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. Also add your local dev URL as an allowed origin: in the Sanity dashboard, go to **API → CORS Origins** and add `http://localhost:3000` (and later your live domain, e.g. `https://thecinefilms.com`), both with "Allow credentials" checked.
5. Run `npm run dev` and open `http://localhost:3000/studio` — log in with the same account you used to sign up, and you'll see the dashboard described above.

That's it — once you add content in `/studio`, it appears on the live site automatically (content refreshes within about a minute; no rebuild needed).

**How it stays safe:** every section on the site falls back to the built-in placeholder content in `lib/data.ts` if the CMS is empty, not yet connected, or briefly unreachable — the live site can never end up blank or broken because of a CMS issue.

**Not yet CMS-managed** (still edited in `lib/data.ts`, since they change rarely): the 12 services, the 6-step process, the "Why Us" points, and the equipment list. These can be moved into the CMS later the same way the sections above were, if you'd like.

## Deployment

Built for **Vercel**:

```bash
vercel
```

Before going live:

1. Connect the `thecinefilms.com` domain in Vercel and enable HTTPS (automatic).
2. Add Google Analytics 4 + Meta Pixel snippets (e.g. via `next/script` in `app/layout.tsx`).
3. Verify the site in Google Search Console and submit `/sitemap.xml` (already generated via `app/sitemap.ts`).
4. Swap the placeholder `metadataBase` URL in `app/layout.tsx` if the final domain differs.
5. Replace all placeholder assets per the table above.
6. Test on real mobile devices, especially hero video autoplay/loop behavior on slow connections (a poster image fallback slot is already wired in).

## Notes on fidelity to the brief

- Some brief items were intentionally simplified for this first-pass scaffold: no Three.js/Spline 3D scene, no live EmailJS/Resend integration for the contact form, no GA4/Meta Pixel snippets yet — these need real API keys/accounts from The Cine Films to configure safely. The content dashboard (Sanity) is fully wired up — see "Content Dashboard (CMS)" above.
- Custom cursor, film grain, marquee, scroll-triggered reveals, magnetic buttons, count-up stats, and `prefers-reduced-motion` handling are all implemented and working.
