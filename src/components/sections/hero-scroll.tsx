"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

/**
 * As About slides over the sticky hero, push the hero back: it shrinks and
 * dims, and the portrait drifts slower than the text (parallax).
 */
export function HeroScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top top",
            // The hero is sticky, so measure one screen of scrolling past its top
            end: () => `+=${window.innerHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        tl.to(el, { scale: 0.92, opacity: 0.3, transformOrigin: "50% 100%" }, 0).to(
          "[data-hero-portrait]",
          { yPercent: -8 },
          0,
        );
      });
    },
    { scope: ref },
  );

  return (
    // relative from the start: the scrub adds a transform, which would otherwise
    // move the containing block of the absolute portrait mid-scroll
    <div ref={ref} className="relative flex h-full items-end pt-24 pb-12 md:pb-16">
      {children}
    </div>
  );
}
