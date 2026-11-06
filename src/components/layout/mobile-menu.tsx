"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  items: { id: string; label: string }[];
  labels: { open: string; close: string; nav: string };
};

// Portals need document.body, which only exists after hydration
const subscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

/**
 * Full-screen menu below md. The panel is portalled to <body>: the header gets
 * backdrop-filter once scrolled, which would trap a fixed child inside its 64px box.
 * It sits under the header (z-40 vs z-50) so the toggle stays on top.
 */
export function MobileMenu({ items, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const panelId = useId();
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const main = document.querySelector("main");
    // Freeze the page and hide it from keyboard/screen readers while the menu covers it
    root.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    firstLink.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    // Rotating to a wide screen shows the desktop nav: drop the overlay
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ink uppercase md:hidden"
      >
        {open ? labels.close : labels.open}
        {/* Two bars that cross into an × */}
        <span aria-hidden className="relative block h-2.5 w-5">
          <span
            className={cn(
              "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-out-expo",
              open && "translate-y-1.25 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-out-expo",
              open && "-translate-y-1 -rotate-45",
            )}
          />
        </span>
      </button>

      {isClient &&
        createPortal(
          <div
            id={panelId}
            data-menu
            data-open={open}
            // Closed: invisible removes it from the tab order and the accessibility tree
            className={cn(
              // scheme-dark: the menu stays dark in the light theme, like the hero (globals.css)
              "group/menu fixed inset-0 z-40 flex flex-col bg-bg px-4 pt-24 pb-8 scheme-dark md:hidden",
              "invisible transition-[clip-path,visibility] duration-700 ease-out-expo [clip-path:inset(0_0_100%_0)]",
              // Opening flips visibility at once (so focus can land); closing keeps it until the clip ends
              "data-[open=true]:visible data-[open=true]:transition-[clip-path] data-[open=true]:[clip-path:inset(0)]",
              "motion-reduce:transition-none",
            )}
          >
            <nav aria-label={labels.nav} className="flex-1">
              <ol className="border-t border-line">
                {items.map((item, i) => (
                  <li key={item.id} className="overflow-hidden border-b border-line">
                    <a
                      ref={i === 0 ? firstLink : undefined}
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}
                      className={cn(
                        "flex items-baseline gap-4 py-4 transition-transform duration-700 ease-out-expo motion-reduce:transition-none",
                        "translate-y-full group-data-[open=true]/menu:translate-y-0",
                      )}
                    >
                      <span className="font-mono text-xs text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-heading text-4xl text-ink">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-xs tracking-[0.15em] text-ink-muted transition-colors hover:text-gold"
            >
              {siteConfig.email}
            </a>
          </div>,
          document.body,
        )}
    </>
  );
}
