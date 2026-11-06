"use client";

import { useRef } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";

type ExperienceItem = Dictionary["experience"]["items"][number];

/** Each card sticks this much lower than the one before, so the pile shows its edges. */
const STEP_REM = 1.75;
const TOP_REM = 7;

/**
 * Timeline cards that pile up while scrolling. Stacking is plain CSS
 * (position: sticky with an increasing top); GSAP only shrinks and dims the
 * cards underneath as later ones slide over them. Below md the cards are a
 * normal list: a tall card on a short screen would never fully unstick.
 */
export function ExperienceStack({ items }: { items: ExperienceItem[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
        const last = cards.at(-1);
        if (!last) return;

        cards.slice(0, -1).forEach((card, i) => {
          // Cards deeper in the pile end up smaller
          const depth = cards.length - 1 - i;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                endTrigger: last,
                // The pile is complete once the last card reaches its sticky top
                end: () => `top ${parseFloat(getComputedStyle(last).top)}px`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(card, { scale: 1 - depth * 0.05, ease: "none" }, 0)
            .to(
              card.querySelector("[data-shade]"),
              { opacity: 0.2 + depth * 0.2, ease: "none" },
              0,
            );
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="space-y-6 pt-8 md:space-y-16 md:pt-16">
      {items.map((item, i) => (
        <li
          key={item.org}
          data-card
          className="relative origin-top md:sticky md:top-(--stack-top)"
          style={{ "--stack-top": `${TOP_REM + STEP_REM * i}rem` } as React.CSSProperties}
        >
          {/* Phones: opens from the bottom (SectionFx); desktop piles the cards instead */}
          <article
            data-fx="cover"
            className="relative grid gap-8 overflow-hidden rounded-2xl border border-line bg-surface p-6 md:grid-cols-12 md:p-10"
          >
            <header className="space-y-3 md:col-span-5">
              <p className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
                <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-ink-faint">/</span>
                {item.kind}
              </p>
              <h3 className="font-heading text-display-md">{item.org}</h3>
              <p className="text-ink">{item.role}</p>
              <p className="font-mono text-sm text-ink-muted">{item.period}</p>
            </header>

            <div className="space-y-6 md:col-span-7">
              <ul className="space-y-3 text-ink-muted">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-gold" />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Darkens the card once others pile on top */}
            <div
              data-shade
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-bg opacity-0"
            />
          </article>
        </li>
      ))}
    </ol>
  );
}
