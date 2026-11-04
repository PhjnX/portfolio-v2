"use client";

import { useRef } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type ScrubTextProps = React.ComponentProps<"p">;

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport. Tied to scroll position (scrub), not time, so reading speed
 * follows the reader. Reduced motion keeps the text fully lit.
 */
export function ScrubText(props: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(el, {
          type: "words",
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.15 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.1,
                scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
              },
            ),
        });
      });
    },
    { scope: ref },
  );

  return <p ref={ref} {...props} />;
}
