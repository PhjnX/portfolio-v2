import { cn } from "@/lib/utils";

import { Container } from "./container";
import { SectionLabel } from "./section-label";

export type SectionCopy = {
  label: string;
  titleLead: string;
  titleTrail: string;
};

type SectionProps = {
  id: string;
  index: string;
  copy: SectionCopy;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Shared shell for every content section: anchor id, "01 / Label",
 * and the two-tone heading (lead in ink, trail faded).
 */
export function Section({ id, index, copy, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-line py-24 md:py-32", className)}
    >
      <Container className="space-y-8">
        <SectionLabel index={index} label={copy.label} />
        <h2 id={headingId} className="font-heading text-display-lg">
          {copy.titleLead} <span className="text-ink-faint">{copy.titleTrail}</span>
        </h2>
        {children}
      </Container>
    </section>
  );
}
