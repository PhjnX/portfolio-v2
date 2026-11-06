"use client";

import { useEffect, useRef } from "react";

/** Wait for the name reveal to land before the wave starts */
const START_DELAY_MS = 900;

/**
 * The portrait waves hello: a short clip whose first and last frames match the
 * still poster underneath, so it can appear and stop without a visible jump.
 *
 * - The still (next/image) is the LCP; the clip only loads after mount.
 * - Plays once on arrival, then rests on its last frame. Hovering the portrait
 *   (desktop) or coming back to the top of the page waves again.
 * - Reduced motion, or a browser that refuses autoplay (data saver, iOS low
 *   power mode), simply keeps the still.
 */
export function HeroGreeting({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const wave = () => {
      if (!visible || !video.paused) return;
      video.currentTime = 0;
      video
        .play()
        .then(() => (video.dataset.shown = "true"))
        .catch(() => {
          // Autoplay refused: the still stays, nothing to undo
        });
    };

    const timer = window.setTimeout(() => {
      video.src = src;
      wave();
    }, START_DELAY_MS);

    // Pause if the hero is covered mid-wave, and greet again on the way back up
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.intersectionRatio > 0.5;
        if (!visible) video.pause();
        else if (!wasVisible && video.src) wave();
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(video);

    // The portrait sits under the (transparent) text layer, so it never gets pointer
    // events itself. Watch the whole hero and wave when the pointer moves onto the portrait.
    const hero = video.closest("section");
    const portrait = video.closest("[data-hero-portrait]");
    let inside = false;
    const onMove = (e: PointerEvent) => {
      if (!portrait || e.pointerType !== "mouse") return;
      const r = portrait.getBoundingClientRect();
      const now =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (now && !inside) wave();
      inside = now;
    };
    hero?.addEventListener("pointermove", onMove);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      hero?.removeEventListener("pointermove", onMove);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      playsInline
      preload="none"
      // Hidden until it actually plays, so a slow load never shows a black box over the still
      className="absolute inset-0 size-full object-cover object-[57%_30%] opacity-0 transition-opacity duration-300 data-[shown=true]:opacity-100 md:object-[55%_35%]"
    />
  );
}
