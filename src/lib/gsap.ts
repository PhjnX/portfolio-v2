"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register once here; components import gsap from this module, never from "gsap" directly.
gsap.registerPlugin(useGSAP, ScrambleTextPlugin, ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText, useGSAP };

/**
 * SplitText's default aria: "auto" moves the text into an aria-label on the element.
 * That is valid on headings but prohibited on <p>/<div>, where screen readers may then
 * read nothing. Lines and words keep whole words, so leave them readable there instead.
 */
export function splitAria(el: Element): "auto" | "none" {
  return /^H[1-6]$/.test(el.tagName) ? "auto" : "none";
}

/**
 * Runs `setup` inside `context` once `el` is within `margin` below the viewport, or
 * straight away if it is already above it (reload mid-page). Creating every scroll
 * tween at hydration made GSAP read computed transforms element after element,
 * forcing a layout each time; this spreads that work out as the page is scrolled.
 * Not for pinned triggers: a pin adds spacing, so it must exist before anything below it is measured.
 */
export function whenNear(el: Element, context: gsap.Context, setup: () => void, margin = "25%") {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
        observer.disconnect();
        // context.add records what setup() creates, so it still reverts with the media query
        context.add(setup);
      }
    },
    { rootMargin: `0px 0px ${margin} 0px` },
  );
  observer.observe(el);
  return () => observer.disconnect();
}
