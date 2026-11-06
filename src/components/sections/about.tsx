import { RevealText } from "@/components/motion/reveal-text";
import { FxLine } from "@/components/motion/fx-line";
import { ScrubText } from "@/components/motion/scrub-text";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutProps = {
  copy: Dictionary["about"];
};

export function About({ copy }: AboutProps) {
  return (
    // Opaque, rounded and above the sticky hero: this is the sheet that slides over it
    <Section
      id="about"
      index="01"
      copy={copy}
      className="relative z-10 rounded-t-[2rem] bg-bg shadow-[0_-30px_60px_var(--shadow-sheet)] md:rounded-t-[3rem]"
    >
      <div className="grid gap-12 pt-8 md:grid-cols-12 md:gap-10 md:pt-16">
        <div className="space-y-8 md:col-span-8">
          <ScrubText className="text-2xl leading-snug font-medium text-ink md:text-4xl md:leading-tight">
            {copy.bio}
          </ScrubText>
          <RevealText className="max-w-xl text-ink-muted md:text-lg">{copy.more}</RevealText>
        </div>

        <dl
          data-fx="rows"
          className="divide-y divide-line border-y border-line md:col-span-4 md:self-end"
        >
          {copy.facts.map((fact) => (
            <div key={fact.label} className="relative flex flex-col gap-1 py-4">
              <FxLine />
              <dt className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
                {fact.label}
              </dt>
              <dd className="text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
