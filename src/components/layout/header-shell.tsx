"use client";

import { useRef } from "react";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Hides the header while scrolling down and brings it back on scroll up.
 * Writes data attributes instead of state, so scrolling never re-renders React.
 */
export function HeaderShell({ className, children }: React.ComponentProps<"header">) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        el.dataset.scrolled = String(y > 16);
        el.dataset.hidden = String(self.direction === 1 && y > 120);
      },
    });
  });

  return (
    <header
      ref={ref}
      // Keep it reachable for keyboard users even while hidden
      onFocusCapture={() => ref.current?.setAttribute("data-hidden", "false")}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[translate,background-color,border-color] duration-500 ease-out-expo motion-reduce:transition-none",
        "data-[hidden=true]:-translate-y-full",
        "data-[scrolled=true]:border-line/60 data-[scrolled=true]:bg-bg/75 data-[scrolled=true]:backdrop-blur-md",
        className,
      )}
    >
      {children}
    </header>
  );
}
