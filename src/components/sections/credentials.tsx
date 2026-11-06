import { Fragment } from "react";

import { FxLine } from "@/components/motion/fx-line";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type CredentialsProps = {
  copy: Dictionary["credentials"];
};

/**
 * Credentials as a plain ledger: year, what it is, who issued it.
 * No mock certificates: without real scans, drawn "papers" read as fake.
 */
export function Credentials({ copy }: CredentialsProps) {
  return (
    <Section id="credentials" index="06" copy={copy}>
      <ol data-fx="rows" className="divide-y divide-line border-y border-line">
        {copy.items.map((item, i) => (
          <li
            key={item.title}
            className="group relative grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-12"
          >
            <FxLine />
            <p className="font-mono text-xs tracking-[0.2em] text-ink-muted md:col-span-2">
              <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
              {item.year && (
                <>
                  <span className="mx-2 text-ink-faint">/</span>
                  {item.year}
                </>
              )}
            </p>

            <div className="space-y-3 md:col-span-7">
              <h3 className="font-heading text-[clamp(1.75rem,3.2vw,3rem)] leading-none transition-colors group-hover:text-gold">
                {/* Break only between words: browsers also wrap after a hyphen ("Front-/end") */}
                {/* The space stays outside the nowrap span, or nothing could break at all */}
                {item.title.split(" ").map((word, j) => (
                  <Fragment key={j}>
                    {j > 0 && " "}
                    <span className="whitespace-nowrap">{word}</span>
                  </Fragment>
                ))}
              </h3>
              <p className="max-w-xl text-ink-muted md:text-lg">{item.detail}</p>
            </div>

            <p className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase md:col-span-3 md:text-right">
              {item.issuer}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
