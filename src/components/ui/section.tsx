import { RevealText } from "@/components/motion/reveal-text";
import { ScatterText } from "@/components/motion/scatter-text";
import { SectionFx } from "@/components/motion/section-fx";
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
  /** "reveal" slides lines up (default); "scatter" flies letters in from all over. */
  heading?: "reveal" | "scatter";
  className?: string;
  children?: React.ReactNode;
};

/**
 * Shared shell for every content section: anchor id, "01 / Label",
 * and the two-tone heading (lead in ink, trail faded).
 */
export function Section({
  id,
  index,
  copy,
  heading = "reveal",
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const title = (
    <>
      {copy.titleLead} <span className="text-ink-faint">{copy.titleTrail}</span>
    </>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-line py-24 md:py-32", className)}
    >
      <Container className="space-y-8">
        {/* Entrance effects for everything below, declared with data-fx attributes */}
        <SectionFx>
          <SectionLabel index={index} label={copy.label} />
          {heading === "scatter" ? (
            <ScatterText id={headingId} className="font-heading text-display-lg">
              {title}
            </ScatterText>
          ) : (
            <RevealText as="h2" id={headingId} className="font-heading text-display-lg">
              {title}
            </RevealText>
          )}
          {children}
        </SectionFx>
      </Container>
    </section>
  );
}
