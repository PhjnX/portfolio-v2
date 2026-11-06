"use client";

import { Fragment, useRef } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, useGSAP } from "@/lib/gsap";

type Credential = Dictionary["credentials"]["items"][number];

/** Where each paper starts: tossed on a desk, tilted and off its spot. */
const SCATTER = [
  { x: -60, y: 140, rotation: -14 },
  { x: 0, y: 220, rotation: 9 },
  { x: 60, y: 120, rotation: -6 },
];

/**
 * Credentials drawn as paper certificates. They start scattered and settle
 * into a neat row as the section scrolls in (scrubbed, so it reverses).
 */
export function CredentialCards({ items }: { items: Credential[] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-paper]").forEach((paper, i) => {
          gsap.from(paper, {
            ...SCATTER[i % SCATTER.length],
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "top 30%",
              scrub: 0.8,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="grid gap-6 pt-8 md:grid-cols-3 md:gap-8 md:pt-16">
      {items.map((item) => (
        <li
          key={item.title}
          data-paper
          className="relative flex aspect-4/3 flex-col justify-between gap-6 overflow-hidden rounded-md bg-ink p-6 text-bg shadow-2xl shadow-black/60 md:aspect-5/4 md:p-8"
        >
          {/* Thin inner rule, like the border printed on a certificate */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-3 rounded-sm border border-bg/15"
          />

          <p className="relative font-mono text-xs tracking-[0.2em] text-bg/60 uppercase">
            {item.issuer}
          </p>

          <div className="relative space-y-3">
            <h3 className="font-heading text-[clamp(1.5rem,2.4vw,2.25rem)] leading-none">
              {/* Break only between words: browsers also wrap after a hyphen ("Front-/end") */}
              {/* The space stays outside the nowrap span, or nothing could break at all */}
              {item.title.split(" ").map((word, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className="whitespace-nowrap">{word}</span>
                </Fragment>
              ))}
            </h3>
            <p className="text-sm text-bg/70">{item.detail}</p>
          </div>

          <div className="relative flex items-end justify-between">
            <p className="font-mono text-xs tracking-[0.2em] text-bg/60">{item.year}</p>
            {/* Seal */}
            <div
              aria-hidden
              className="grid size-14 place-items-center rounded-full border-2 border-gold-soft text-gold-soft"
            >
              <span className="text-lg">✦</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
