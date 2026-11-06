"use client";

import { useRef } from "react";

import { gsap, useGSAP, whenNear } from "@/lib/gsap";

/** Glyphs the scramble cycles through before landing: a terminal-ish decode */
const GLYPHS = "01<>/_#*+=";
const ROW_STAGGER = 0.12;

/**
 * Entrance effects for everything inside a section, declared in markup:
 *
 * - `data-fx="scramble"`  text decodes from random glyphs (labels, email)
 * - `data-fx="rows"`      each child row: a gold line runs across its top, then the
 *                         content wipes in left to right; rows need a `data-fx-line` span
 * - `data-fx="words"`     each child rises out of a blur, one after another
 * - `data-fx="cover"`     (mobile) opens from the bottom while its image settles from a zoom
 * - `data-fx="rise"`      scrubbed: drifts up into place as the page reaches it
 *
 * Without JS, or with reduced motion, nothing is hidden: every effect animates
 * *from* a state set here, and the markup's resting state is the final one.
 * Each element sets up only when it nears the viewport (whenNear), not at hydration.
 */
export function SectionFx({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const lazy =
        (selector: string, setup: (el: HTMLElement) => void) => (context: gsap.Context) => {
          const stops = gsap.utils
            .toArray<HTMLElement>(selector, root)
            .map((el) => whenNear(el, context, () => setup(el)));
          return () => stops.forEach((stop) => stop());
        };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const stops = [
          lazy('[data-fx="scramble"]', scramble)(context),
          lazy('[data-fx="rows"]', rows)(context),
          lazy('[data-fx="words"]', words)(context),
          lazy('[data-fx="rise"]', rise)(context),
        ];
        return () => stops.forEach((stop) => stop());
      });

      // Desktop already has pins and stacks for these; phones get a reveal of their own
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        lazy('[data-fx="cover"]', cover),
      );
    },
    { scope: ref },
  );

  // display: contents keeps the wrapper out of the layout; it only scopes the queries
  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}

const once = (trigger: Element, start = "top 85%") => ({ trigger, start, once: true });

function scramble(el: HTMLElement) {
  // Mid-decode the string is shorter than the real one; hold the final width so
  // whatever sits next to it (the Copy button) doesn't jump around
  const width = el.getBoundingClientRect().width;

  gsap.to(el, {
    duration: 1.1,
    scrambleText: { text: el.textContent ?? "", chars: GLYPHS, speed: 0.5, revealDelay: 0.25 },
    ease: "none",
    scrollTrigger: once(el, "top 92%"),
    onStart: () => gsap.set(el, { display: "inline-block", minWidth: width }),
    onComplete: () => gsap.set(el, { clearProps: "display,minWidth" }),
  });
}

function rows(list: HTMLElement) {
  const items = Array.from(list.children) as HTMLElement[];
  const tl = gsap.timeline({ scrollTrigger: once(list, "top 90%") });

  items.forEach((row, i) => {
    const line = row.querySelector<HTMLElement>("[data-fx-line]");
    // Rows can name the parts to wipe (e.g. <details>, where the line lives in <summary>);
    // otherwise every child except the line
    const marked = gsap.utils.toArray<HTMLElement>("[data-fx-body]", row);
    const body = marked.length
      ? marked
      : (Array.from(row.children) as HTMLElement[]).filter((c) => c !== line);
    const at = i * ROW_STAGGER;

    if (line) {
      tl.fromTo(
        line,
        { scaleX: 0, opacity: 1 },
        { scaleX: 1, duration: 0.9, ease: "expo.inOut" },
        at,
      ).to(line, { opacity: 0, duration: 0.8, ease: "power1.out" }, at + 0.9);
    }
    tl.from(
      body,
      {
        // Vertical overflow left open: stacked diacritics sit above the box
        clipPath: "inset(-30% 100% -30% 0%)",
        x: -24,
        duration: 1,
        ease: "expo.out",
        clearProps: "clipPath",
      },
      at + 0.25,
    );
  });
}

function words(list: HTMLElement) {
  gsap.from(list.children, {
    yPercent: 70,
    opacity: 0,
    filter: "blur(10px)",
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.05,
    clearProps: "filter",
    scrollTrigger: once(list),
  });
}

function cover(el: HTMLElement) {
  const tl = gsap.timeline({ scrollTrigger: once(el, "top 88%") });
  tl.from(el, {
    clipPath: "inset(100% 0% 0% 0% round 1rem)",
    duration: 1.2,
    ease: "expo.out",
    clearProps: "clipPath",
  });
  const img = el.querySelector("img");
  if (img) tl.from(img, { scale: 1.3, duration: 1.6, ease: "expo.out" }, 0);
}

function rise(el: HTMLElement) {
  gsap.from(el, {
    yPercent: 45,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true },
  });
}
