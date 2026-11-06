import Image from "next/image";

import { RevealText } from "@/components/motion/reveal-text";
import { Container } from "@/components/ui/container";
import portrait from "@/assets/hero/portrait.jpg";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

import { HeroMotion } from "./hero-motion";

type HeroProps = {
  copy: Dictionary["hero"];
  scrollLabel: string;
};

/**
 * Full-screen intro: portrait bleeding in from the right, the name in two huge
 * lines over it. The section is sticky, so About slides up over it (see page.tsx).
 */
export function Hero({ copy, scrollLabel }: HeroProps) {
  const [first, ...rest] = siteConfig.name.split(" ");
  const last = rest.pop();

  return (
    <section id="top" className="sticky top-0 isolate h-svh min-h-[36rem] overflow-hidden">
      <HeroMotion>
        {/* Illustrated portrait, faded into the page at the bottom (and left on desktop).
            Its own dark backdrop and gold rim light already match the palette: no filters. */}
        <div
          data-hero-portrait
          className="absolute inset-x-0 top-0 -z-10 h-[80%] [mask-image:linear-gradient(to_top,transparent_0%,black_50%)] motion-safe:animate-portrait-in md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[62%] md:[mask-image:linear-gradient(to_top,transparent_0%,black_35%),linear-gradient(to_right,transparent_0%,black_40%)] md:[mask-composite:intersect]"
        >
          {/* Idle layer (breathing, mouse parallax). Oversized so shifting it never shows an edge */}
          <div data-portrait-float className="absolute -inset-[3%]">
            <Image
              src={portrait}
              alt={siteConfig.name}
              fill
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 62vw, 100vw"
              className="object-cover object-[60%_30%] md:object-[50%_30%]"
            />
          </div>
          {/* Rim light behind the shoulder, pulsing slowly like a lamp */}
          <div
            data-portrait-glow
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(40%_35%_at_92%_42%,color-mix(in_oklab,var(--color-gold)_45%,transparent),transparent)] opacity-60 mix-blend-screen"
          />
        </div>

        <Container className="relative w-full space-y-8">
          <RevealText
            trigger="load"
            className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase"
          >
            {copy.eyebrow}
          </RevealText>
          <RevealText
            as="h1"
            split="chars"
            trigger="load"
            className="font-heading text-display-xl drop-shadow-[0_4px_24px_rgb(0_0_0/0.5)]"
          >
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
              className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase"
            >
              {scrollLabel} ↓
            </RevealText>
          </div>
        </Container>
      </HeroMotion>
    </section>
  );
}
