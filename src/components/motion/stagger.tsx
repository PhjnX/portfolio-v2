"use client";

import { useRef } from "react";

import { gsap, useGSAP, whenNear } from "@/lib/gsap";

type StaggerProps = React.ComponentProps<"div"> & {
  /** Seconds between each item. */
  each?: number;
};

/**
 * Fades up every `[data-stagger]` descendant in turn the first time the
 * wrapper scrolls into view. Markup stays server-rendered; this only adds motion.
 */
export function Stagger({ each = 0.06, ...props }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", (context) =>
        whenNear(el, context, () => {
          gsap.from("[data-stagger]", {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            stagger: each,
            scrollTrigger: { trigger: el, start: "top 80%", once: true },
          });
        }),
      );
    },
    { scope: ref },
  );

  return <div ref={ref} {...props} />;
}
