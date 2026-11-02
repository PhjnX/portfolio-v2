import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

/** Small "01 / About" style label shown above each section heading. */
export function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <p className={cn("font-mono text-xs tracking-[0.2em] text-ink-muted uppercase", className)}>
      <span className="text-gold">{index}</span>
      <span className="mx-2 text-ink-faint">/</span>
      {label}
    </p>
  );
}
