# Architecture

Personal portfolio for Elias. Editorial, image-led, multi-route. Next.js 16 App
Router, React 19, TypeScript, Tailwind v4, `motion/react`.

Business Bots Solutions appears as a founder credential and delivery structure —
never as the site identity.

---

## Routes

| Route | Rendering | Purpose |
|---|---|---|
| `/` | static | Seven sections: Hero, Perspective, Selected Work, Capabilities, Industries, About Preview, Proof |
| `/work` | static | Featured grid (asymmetric) + secondary grid |
| `/work/[slug]` | SSG via `generateStaticParams` | Adaptive case study |
| `/about` | static | Narrative, capabilities, relationships |
| `/contact` | static | Enquiry journey + direct channels |
| `/archive` | static | Full project table + visual material |
| `/sitemap.xml`, `/robots.txt` | static | SEO |
| `not-found` | static | 404 |

18 prerendered routes total.

---

## Source layout

```
src/
├── app/
│   ├── layout.tsx            Root shell, font CDN links, Person JSON-LD
│   ├── page.tsx              Home composition (server, 7 imports)
│   ├── globals.css           Tokens, @utility, keyframes, reduced-motion
│   ├── work/page.tsx
│   ├── work/[slug]/page.tsx  Adaptive case study, 13 guarded parts
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── archive/page.tsx
│   ├── sitemap.ts  robots.ts  not-found.tsx
│
├── components/
│   ├── layout/     header, footer
│   ├── sections/   hero, perspective, selected-work, capabilities,
│   │               industries, about-preview, proof
│   ├── projects/   project-card (ProjectCard + ProjectRow)
│   ├── contact/    enquiry (client, 7-step journey)
│   ├── motion/     mask-text, reveal, pixel-image, marquee, word-rotate,
│   │               ripple-button, shine-border, hexagon, share-button, carousel
│   └── ui/         section, local-time
│
├── data/           site, projects, clients, testimonials, assets, capabilities
├── lib/            cloudinary, motion, metadata, utils
└── types/          portfolio.ts
```

Server components by default. `"use client"` only where motion state, browser
APIs or interaction require it.

---

## Data model

`types/portfolio.ts` defines `Project`. Required: `id`, `slug`, `title`,
`client`, `category`, `tier`, `status`, `year`, `industries`, `disciplines`,
`summary`, `cover`.

Optional (drives adaptive rendering): `overview`, `challenge`, `response`,
`contribution`, `outcome`, `deliverables`, `metrics`, `collaborators`,
`credits`, `gallery`, `location`, `externalUrl`, `externalUnavailableReason`.

**Every case-study section is guarded.** A project with only `overview` and
`deliverables` renders a complete page — no placeholders, no empty headings.
Nothing is claimed that has not been confirmed.

### Assets

`data/assets.ts` carries metadata per asset, not bare URLs: `src`, `alt`,
`origin`, `projectId`, `ratio`, `focus`, `credit`. Origin distinguishes original
work, client-provided, operational, licensed stock and reference. Stock appears
only in industry context and never implies a client relationship.

Cloudinary clouds: `ddjl4shzl` (primary), `dxhef6dju` (portrait),
`dspv9l3vn` (stock). Transformations are applied by a global `next/image` loader
registered through `images.loaderFile` — responsive widths, `f_auto`, `q_auto`,
DPR and focal cropping.

### Relationships

`data/clients.ts` distinguishes clients, collaborations, employers and
businesses supported. Not every organisation is called a client.

`data/testimonials.ts` is intentionally empty. Only verified, identifiable
people belong there. The Proof section renders quotes conditionally, so until
real ones exist the evidence is the work itself.

---

## Design system

No user-facing theme toggle. One art direction, composed per section via a
`data-scheme` attribute on `<Section>` that flips CSS custom properties:

- `light` — warm off-white editorial
- `paper` — secondary tone for adjacent sections
- `dark` — deep graphite for project and hero surfaces

Accent is muted bronze, used sparingly. No neon, no SaaS gradients.

Tailwind v4 with an `@theme {}` block in `globals.css` — no config file. The
`--text-*` and `--font-*` namespaces auto-generate utilities (`text-display`,
`text-title`, `text-lead`, `text-headline`, `font-display`).

Type: Switzer (display, Fontshare), Geist (body), Geist Mono (labels). Loaded by
CDN `<link>` so the build never depends on a font fetch.

---

## Motion

Animated, never restless. Each primitive has one job:

| Component | Used for |
|---|---|
| `MaskText` | Page and section headlines |
| `Reveal` | Passages and grid items, staggered by index |
| `PixelImage` | Portrait only — deterministic (`i * 37 % 64`), viewport-triggered |
| `Marquee` | Relationship chips, CSS keyframe driven |
| `WordRotate` | Industries |
| `RippleButton` | Meaningful actions only |
| `ShineBorder` | Max 1–2 per page: availability, primary CTA |
| `Hexagon` | AI and automation contexts only |
| `Carousel` | Galleries and secondary collections — native scroll-snap |
| `ShareButton` | Case studies |

`prefers-reduced-motion` is honoured per-component via `useReducedMotion()` and
globally in `globals.css`.

---

## Enquiry

`components/contact/enquiry.tsx` replaces every previous third-party form. Seven
steps, one question each, no backend. Answers are assembled into a message the
visitor reviews before it is handed to WhatsApp or `mailto:`. Nothing is stored
or transmitted elsewhere. A direct WhatsApp link is offered as the faster path.

---

## SEO

`lib/metadata.ts` exposes `buildMetadata()` and JSON-LD builders. Every route —
including each case study — has a unique title, description, canonical URL and
OG image derived from real project data. No placeholder metadata is published.

---

## Commands

```bash
npm run dev
npm run build      # next build --webpack
npx tsc --noEmit   # fast type check; prefer for iteration
```

Next 16 removed `next lint`; run `npx eslint src` directly.
