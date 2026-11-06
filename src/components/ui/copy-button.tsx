"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

/** Copies `value` to the clipboard and confirms for two seconds. */
export function CopyButton({ value, label, copiedLabel, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the mailto link still works
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "rounded-full border border-line px-4 py-2 font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:border-gold hover:text-gold",
        copied ? "border-gold text-gold" : "text-ink-muted",
        className,
      )}
    >
      {/* Announce the change to screen readers */}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
