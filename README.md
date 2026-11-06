# portfolio-v2

Personal portfolio of **Bùi Hoàng Phi** — Frontend Developer (React, Next.js, React Native, WordPress).

Editorial, dark, scroll-driven. Bilingual (Tiếng Việt / English).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- GSAP (ScrollTrigger, SplitText) + Lenis for scroll animation
- i18n with Next.js built-ins: `[lang]` root segment, JSON dictionaries, `proxy.ts` locale detection
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Script                 | What it does              |
| ---------------------- | ------------------------- |
| `npm run dev`          | Start dev server          |
| `npm run build`        | Production build          |
| `npm run lint`         | ESLint                    |
| `npm run format`       | Prettier (write)          |
| `npm run format:check` | Prettier (check only, CI) |
| `npm run typecheck`    | `tsc --noEmit`            |

## Project structure

```
src/
  app/[lang]/     routes, root layout and OG image (one per locale)
  app/            global styles + tokens, icon, robots, sitemap
  assets/         images (hero, project covers) and OG font subsets
  components/
    layout/       header, mobile menu, skip link
    motion/       text reveals, scrub/scatter text, stagger
    ui/           small reusable primitives (Container, SectionLabel...)
    sections/     page sections (Hero, About, Work...)
  config/         site-wide config (name, links)
  i18n/           locales, dictionaries (vi.json is the source of truth)
  hooks/          useTextReveal
  lib/            helpers (cn, fonts, gsap setup + lazy scroll helpers)
  proxy.ts        redirects / to /vi or /en (cookie > Accept-Language)
```

## Roadmap

- [x] Project setup, tooling, design tokens
- [x] i18n (vi / en)
- [x] Section scaffolding
- [x] Smooth scroll + GSAP setup
- [x] Header + Hero
- [x] About
- [x] Selected Work (card stack)
- [x] Marquee
- [x] Experience
- [x] Tech stack + Stats
- [x] Credentials
- [x] Services + Contact
- [x] Hero portrait + mobile menu
- [x] Performance + accessibility (reduced motion)
- [x] SEO (Open Graph image, sitemap, robots, JSON-LD)
- [ ] Deploy

## Notes

- **Motion is progressive.** Every section is readable without JS, and `prefers-reduced-motion` turns off Lenis, reveals, pins and the marquee.
- **Scroll animations set up lazily** (`whenNear`, lazy `useTextReveal`): creating them all at hydration forced a layout per element. Pinned sections stay eager because their spacing must exist before anything below is measured.
- **Lighthouse** (production build, mobile with devtools throttling): accessibility, best practices and SEO 100; performance ~80 with LCP ~2.8s and TBT ~0.4s. Desktop performance 99.
