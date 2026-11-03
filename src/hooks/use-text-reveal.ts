"use client";

import { useRef } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export type TextRevealOptions = {
  /** "lines" slides each line up; "chars" staggers letters (hero name). */
  split?: "lines" | "chars";
  /** "scroll" waits until the element enters the viewport; "load" plays on mount. */
  trigger?: "scroll" | "load";
  delay?: number;
};

/**
 * Masked text reveal shared by every heading. The element must carry
 * `data-reveal` so CSS keeps it hidden until it has been split (no flash).
 */
export function useTextReveal<T extends HTMLElement>({
  split = "lines",
  trigger = "scroll",
  delay = 0,
}: TextRevealOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el, {
          type: split === "chars" ? "words,chars" : "lines",
          mask: split,
          linesClass: "reveal-line",
          charsClass: "reveal-char",
          // Re-split when fonts load or the line breaks change on resize
          autoSplit: true,
          // Returning the tween lets SplitText kill and resync it on every re-split
          onSplit: (self) =>
            gsap.from(split === "chars" ? self.chars : self.lines, {
              yPercent: 110,
              duration: split === "chars" ? 1 : 1.2,
              ease: "expo.out",
              stagger: split === "chars" ? 0.025 : 0.08,
              delay,
              scrollTrigger:
                trigger === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
            }),
        });
        gsap.set(el, { visibility: "visible" });
      });
    },
    { scope: ref },
  );

  return ref;
}
