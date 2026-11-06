"use client";

import { useRef } from "react";

import { gsap, splitAria, SplitText, useGSAP, whenNear } from "@/lib/gsap";

type ScatterTextProps = React.ComponentProps<"h2">;

/**
 * Heading whose letters start scattered around the section and fly into
 * place as it scrolls up the viewport. Scrubbed, so scrolling back scatters
 * them again. Reduced motion shows the heading as-is.
 */
export function ScatterText(props: ScatterTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", (context) =>
        whenNear(el, context, () => {
          SplitText.create(el, {
            type: "words,chars",
            aria: splitAria(el),
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.chars, {
                // Function values: each letter gets its own random start
                x: () => gsap.utils.random(-0.5, 0.5) * window.innerWidth,
                y: () => gsap.utils.random(-200, 300),
                rotation: () => gsap.utils.random(-90, 90),
                opacity: 0,
                ease: "power3.out",
                stagger: { each: 0.02, from: "random" },
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 35%", scrub: 0.6 },
              }),
          });
        }),
      );
    },
    { scope: ref },
  );

  return <h2 ref={ref} {...props} />;
}
