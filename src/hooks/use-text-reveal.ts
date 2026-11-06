"use client";

import { useRef } from "react";

import { gsap, splitAria, SplitText, useGSAP } from "@/lib/gsap";

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
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const reveal = () => {
          SplitText.create(el, {
            type: split === "chars" ? "words,chars" : "lines",
            aria: splitAria(el),
            mask: split,
            linesClass: "reveal-line",
            charsClass: "reveal-char",
            // Re-split when fonts load or the line breaks change on resize
            autoSplit: true,
            // Returning the tween lets SplitText kill and resync it on every re-split
            onSplit: (self) =>
              gsap.from(split === "chars" ? self.chars : self.lines, {
                yPercent: 110,
                // Lines swing up from a tilt; letters (hero name) only rise
                rotation: split === "chars" ? 0 : 4,
                transformOrigin: "0% 100%",
                duration: split === "chars" ? 1 : 1.2,
                ease: "expo.out",
                stagger: split === "chars" ? 0.025 : 0.08,
                delay,
              }),
          });
          gsap.set(el, { visibility: "visible" });
        };

        if (trigger === "load") {
          reveal();
          return;
        }

        // Split lazily. Splitting into lines forces a layout per element, and doing
        // every heading on the page at hydration cost ~0.5s of main thread on a
        // throttled phone. Wait until the element reaches 85% of the viewport instead.
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              observer.disconnect();
              // context.add: record what reveal() creates, so it reverts with the media query
              context.add(reveal);
            } else if (entry.boundingClientRect.top < 0) {
              // Already scrolled past (reload mid-page): show it, no animation
              observer.disconnect();
              gsap.set(el, { visibility: "visible" });
            }
          },
          { rootMargin: "0px 0px -15% 0px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
      });
    },
    { scope: ref },
  );

  return ref;
}
