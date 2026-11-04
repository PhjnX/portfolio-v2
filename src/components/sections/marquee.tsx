"use client";

import { useRef } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  copy: Dictionary["marquee"];
};

/** Base drift in % of the track per second. One copy = 50% of the track. */
const BASE_SPEED = 2;

/**
 * Endless band of words between sections. Drifts left on its own, follows the
 * scroll direction, and speeds up with scroll velocity before easing back.
 *
 * The track holds two identical copies, so wrapping x between -50% and 0 is
 * seamless. Driven by the GSAP ticker instead of a repeating tween: a tween
 * cannot run backwards past its start, a wrapped position can.
 */
export function Marquee({ copy }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const setX = gsap.quickSetter(track.current, "xPercent");
        const wrap = gsap.utils.wrap(-50, 0);
        const state = { x: 0, direction: -1, boost: 0 };
        let visible = false;

        const tick = (_time: number, deltaMs: number) => {
          if (!visible) return;
          state.x = wrap(
            state.x + state.direction * BASE_SPEED * (1 + state.boost) * (deltaMs / 1000),
          );
          setX(state.x);
        };
        gsap.ticker.add(tick);

        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (visible = self.isActive),
          onUpdate: (self) => {
            // Scrolling down pushes the words left, scrolling up pulls them right
            state.direction = self.direction === 1 ? -1 : 1;
            const velocity = Math.abs(self.getVelocity());
            gsap.to(state, {
              boost: Math.min(velocity / 150, 12),
              duration: 0.2,
              overwrite: true,
              onComplete: () =>
                void gsap.to(state, { boost: 0, duration: 1.2, ease: "power2.out" }),
            });
          },
        });

        return () => {
          gsap.ticker.remove(tick);
          trigger.kill();
        };
      });
    },
    { scope: root },
  );

  const items = (hidden: boolean) =>
    copy.items.map((item, i) => (
      <span
        key={`${hidden}-${item}`}
        aria-hidden={hidden || undefined}
        className="flex items-center"
      >
        <span className={cn(i % 2 === 1 && "text-outline")}>{item}</span>
        <span aria-hidden className="px-6 text-gold md:px-10">
          ✦
        </span>
      </span>
    ));

  return (
    // First copy is read by screen readers, the duplicate is hidden
    <div ref={root} className="overflow-hidden border-t border-line py-10 md:py-14">
      <div
        ref={track}
        className="flex w-max font-heading text-display-md whitespace-nowrap will-change-transform"
      >
        {items(false)}
        {items(true)}
      </div>
    </div>
  );
}
