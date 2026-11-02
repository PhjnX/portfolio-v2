# portfolio-v2

Personal portfolio of **Bùi Hoàng Phi** — Frontend Developer (React, Next.js, React Native, WordPress).

Editorial, dark, scroll-driven. Bilingual (Tiếng Việt / English).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- GSAP ScrollTrigger + Lenis for scroll animation _(planned)_
- next-intl for i18n _(planned)_
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
  app/            routes, layout, global styles + tokens
  components/
    ui/           small reusable primitives (Container, SectionLabel...)
    sections/     page sections (Hero, About, Work...)
  config/         site-wide config (name, links)
  lib/            helpers (cn, fonts)
```

## Roadmap

- [x] Project setup, tooling, design tokens
- [ ] i18n (vi / en)
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
