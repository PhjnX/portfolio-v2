# portfolio-v2

Personal portfolio of **Bùi Hoàng Phi** — Frontend Developer (React, Next.js, React Native, WordPress).

Editorial, dark, scroll-driven. Bilingual (Tiếng Việt / English).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- GSAP ScrollTrigger + Lenis for scroll animation _(planned)_
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
  app/[lang]/     routes + root layout (one per locale)
  app/            global styles + tokens
  components/
    ui/           small reusable primitives (Container, SectionLabel...)
    sections/     page sections (Hero, About, Work...)
  config/         site-wide config (name, links)
  i18n/           locales, dictionaries (vi.json is the source of truth)
  lib/            helpers (cn, fonts)
  proxy.ts        redirects / to /vi or /en (cookie > Accept-Language)
```

## Roadmap

- [x] Project setup, tooling, design tokens
- [x] i18n (vi / en)
- [x] Section scaffolding
- [ ] Smooth scroll + GSAP setup
- [ ] Header + Hero
- [ ] About
- [ ] Selected Work (card stack)
- [ ] Marquee
- [ ] Experience
- [ ] Tech stack + Stats
- [ ] Credentials
- [ ] Services + Contact
- [ ] Responsive / mobile motion
- [ ] Performance + accessibility (reduced motion)
- [ ] SEO + deploy
