import { RevealText } from "@/components/motion/reveal-text";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeroProps = {
  copy: Dictionary["hero"];
  scrollLabel: string;
};

// TODO(day 7): portrait once the photo is ready
export function Hero({ copy, scrollLabel }: HeroProps) {
  const [first, ...rest] = siteConfig.name.split(" ");
  const last = rest.pop();

  return (
    <section id="top" className="flex min-h-svh items-end pt-24 pb-16">
      <Container className="space-y-8">
        <RevealText
          trigger="load"
          className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase"
        >
          {copy.eyebrow}
        </RevealText>
        <RevealText as="h1" split="chars" trigger="load" className="font-heading text-display-xl">
          {first} {rest.join(" ")}
          <br />
          <span className="text-gold">{last}</span>
        </RevealText>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealText trigger="load" delay={0.6} className="max-w-md text-ink-muted">
            {copy.tagline}
          </RevealText>
          <RevealText
            trigger="load"
            delay={0.8}
            className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase"
          >
            {scrollLabel} ↓
          </RevealText>
        </div>
      </Container>
    </section>
  );
}
