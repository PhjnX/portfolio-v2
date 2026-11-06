"use client";

import { useEffect, useId, useSyncExternalStore } from "react";

import { THEME_COLOR, THEME_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const root = () => document.documentElement;
const readTheme = (): Theme => (root().dataset.theme === "light" ? "light" : "dark");

// Follow <html data-theme>, whoever changes it (this button, another tab via storage)
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const setThemeColor = (theme: Theme) =>
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);

function applyTheme(theme: Theme) {
  root().dataset.theme = theme;
  setThemeColor(theme);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode / storage blocked: the switch still works for this visit
  }
}

type ThemeToggleProps = {
  labels: { toLight: string; toDark: string };
  className?: string;
};

/**
 * Sun / moon switch. The icon is driven by CSS from <html data-theme> (light: variant),
 * so the server markup is right for either theme and nothing flips on hydration.
 * Moon (dark): a big disc with a second circle sliding in to bite a crescent, rays tucked away.
 * Sun (light): the disc shrinks, the bite slides off, the rays spin out.
 * The page itself switches with a circle growing from the button (View Transitions).
 */
export function ThemeToggle({ labels, className }: ThemeToggleProps) {
  const maskId = useId();
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  // The pre-paint script sets data-theme but runs before the meta tag exists
  useEffect(() => setThemeColor(theme), [theme]);

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      applyTheme(next);
      return;
    }

    // Grow the new theme from the button's centre to the farthest corner
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root().style.setProperty("--reveal-x", `${x}px`);
    root().style.setProperty("--reveal-y", `${y}px`);
    root().style.setProperty("--reveal-r", `${radius}px`);

    document.startViewTransition(() => applyTheme(next));
  }

  const ease = "transition-transform duration-700 ease-out-expo motion-reduce:transition-none";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? labels.toLight : labels.toDark}
      className={cn(
        "group grid size-9 place-items-center rounded-full text-ink-muted transition-colors hover:text-gold",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-5 overflow-visible" aria-hidden>
        <mask id={maskId}>
          <rect width="24" height="24" fill="white" />
          {/* The bite: over the disc in dark (crescent), slid off to the corner in light */}
          <circle
            cx="17"
            cy="7"
            r="7"
            fill="black"
            className={cn(ease, "light:translate-x-2.5 light:-translate-y-2.5")}
          />
        </mask>

        <circle
          cx="12"
          cy="12"
          r="8.5"
          fill="currentColor"
          mask={`url(#${maskId})`}
          className={cn(ease, "origin-center [transform-box:view-box] light:scale-[0.55]")}
        />

        {/* Rays: tucked in and turned while dark, spinning out in light */}
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={cn(
            ease,
            "origin-center scale-50 -rotate-90 opacity-0 [transform-box:view-box] light:scale-100 light:rotate-0 light:opacity-100",
            "transition-[transform,opacity]",
          )}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line key={deg} x1="12" y1="1.5" x2="12" y2="3.5" transform={`rotate(${deg} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
