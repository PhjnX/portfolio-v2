"use client";

import { useRef } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";

type StatItem = Dictionary["stats"]["items"][number];

/**
 * Numbers that count up from zero over bars that grow like a chart, the
 * first time the board scrolls into view. The real values are rendered on
 * the server, so no JS / reduced motion shows the final state.
 */
export function StatsBoard({ items }: { items: StatItem[] }) {
  const root = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });

        tl.from("[data-bar]", {
          scaleY: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: 0.15,
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el, i) => {
          const target = Number(el.dataset.count);
          const counter = { value: 0 };
          tl.to(
            counter,
            {
              value: target,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = String(Math.round(counter.value));
              },
            },
            i * 0.15,
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <dl ref={root} className="grid gap-12 pt-8 md:grid-cols-3 md:items-end md:gap-8 md:pt-16">
      {items.map((item, i) => (
        <div key={item.label} className="flex flex-col gap-6">
          <dt className="order-2 max-w-xs text-ink-muted">{item.label}</dt>
          <dd className="order-1 font-heading text-display-lg text-ink">
            {item.prefix}
            <span data-count={item.value}>{item.value}</span>
            {item.suffix}
          </dd>
          {/* Bars step up left to right, like the video's chart; purely decorative */}
          <div
            aria-hidden
            data-bar
            className="order-3 hidden origin-bottom rounded-t-md border-t-2 border-gold bg-linear-to-b from-gold/25 to-transparent md:block"
            style={{ height: `${6 + i * 5}rem` }}
          />
        </div>
      ))}
    </dl>
  );
}
