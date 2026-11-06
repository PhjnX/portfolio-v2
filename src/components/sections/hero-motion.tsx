"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Hero motion besides the text reveals and the greeting clip (HeroGreeting):
 * - mouse (desktop): the portrait leans gently towards the pointer for depth
 * - scroll: as About slides over the sticky hero, the hero shrinks and dims
 *   while the portrait drifts slower than the text (parallax)
 * All of it is skipped for prefers-reduced-motion.
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
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

      // Only with a real pointer: on touch there is no hover to follow
      mm.add(
        "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          // quickTo reuses one tween per axis instead of creating one per mousemove
          const toX = gsap.quickTo("[data-portrait-float]", "x", { duration: 1.2, ease: "power3" });
          const toY = gsap.quickTo("[data-portrait-float]", "y", { duration: 1.2, ease: "power3" });
          const toTilt = gsap.quickTo("[data-portrait-float]", "rotation", {
            duration: 1.2,
            ease: "power3",
          });

          const onMove = (e: PointerEvent) => {
            // -0.5..0.5 from the centre of the window
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            toX(nx * 24);
            toY(ny * 16);
            toTilt(nx * 1.2);
          };

          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        },
      );
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
