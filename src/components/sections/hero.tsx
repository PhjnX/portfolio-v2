import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

type HeroProps = {
  copy: Dictionary["hero"];
  scrollLabel: string;
};

// TODO(day 5-6): split-letter name animation + 3D portrait
export function Hero({ copy, scrollLabel }: HeroProps) {
  const [first, ...rest] = siteConfig.name.split(" ");
  const last = rest.pop();

  return (
    <section id="top" className="flex min-h-svh items-end pb-16">
      <Container className="space-y-8">
        <p className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
          {copy.eyebrow}
        </p>
        <h1 className="font-heading text-display-xl">
          {first} {rest.join(" ")}
          <br />
          <span className="text-gold">{last}</span>
        </h1>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-md text-ink-muted">{copy.tagline}</p>
          <p className="font-mono text-xs tracking-[0.2em] text-ink-faint uppercase">
            {scrollLabel} ↓
          </p>
        </div>
      </Container>
    </section>
  );
}
