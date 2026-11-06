"use client";

/**
 * First tab stop: jumps past the header nav. Lenis takes over "#" links and
 * prevents the default jump, which would also skip the focus move, so move it here.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
      className="fixed top-4 left-4 z-60 -translate-y-24 rounded-full bg-gold px-5 py-3 font-mono text-xs tracking-[0.2em] text-bg uppercase focus:translate-y-0"
    >
      {label}
    </a>
  );
}
