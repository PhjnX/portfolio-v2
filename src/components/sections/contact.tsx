import { FxLine } from "@/components/motion/fx-line";
import { CopyButton } from "@/components/ui/copy-button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactProps = {
  copy: Dictionary["contact"];
};

export function Contact({ copy }: ContactProps) {
  const links = [
    { label: "GitHub", href: siteConfig.links.github, icon: "↗" },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: "↗" },
    { label: copy.cv, href: copy.cvHref, icon: "↓" },
  ];

  return (
    <Section
      id="contact"
      index="08"
      copy={copy}
      // No bottom padding: the wordmark sits on the very edge of the page
      className="relative isolate overflow-hidden pb-0 md:pb-0"
    >
      {/* One soft gold light from above, the same accent as the rest of the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_70%_0%,color-mix(in_oklab,var(--color-gold)_12%,transparent),transparent)]"
      />

      <div className="space-y-16 pt-4 md:space-y-24">
        <p className="inline-flex items-center gap-3 rounded-full border border-line px-4 py-2 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase">
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-gold motion-safe:animate-ping" />
            <span className="relative size-2 rounded-full bg-gold" />
          </span>
          {copy.available}
        </p>

        {/* The address gets a full row so it never wraps mid-word on desktop */}
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <a href={`mailto:${siteConfig.email}`} className="group block max-w-full">
            {/* normal-case: an address should read exactly as typed, not shouted in caps */}
            <span
              data-fx="scramble"
              className="font-heading text-[clamp(1.25rem,5vw,4.75rem)] leading-tight [overflow-wrap:anywhere] text-ink normal-case transition-colors group-hover:text-gold"
            >
              {siteConfig.email}
            </span>
            {/* Underline that draws itself in on hover */}
            <span aria-hidden className="relative mt-3 block h-px bg-line">
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            </span>
          </a>
          <CopyButton
            value={siteConfig.email}
            label={copy.copy}
            copiedLabel={copy.copied}
            className="shrink-0"
          />
        </div>

        <div className="grid gap-12 md:grid-cols-[7fr_5fr] md:items-start md:gap-20">
          <p className="max-w-lg text-ink-muted md:text-lg">{copy.lead}</p>

          <ul data-fx="rows" className="border-b border-line">
            {links.map((link) => (
              <li key={link.label} className="relative border-t border-line">
                <FxLine />
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 transition-colors hover:text-gold"
                >
                  <span className="font-heading text-2xl md:text-3xl">{link.label}</span>
                  <span
                    aria-hidden
                    className="grid size-10 place-items-center rounded-full border border-line font-mono transition-all duration-500 ease-out-expo group-hover:border-gold group-hover:bg-gold group-hover:text-bg"
                  >
                    {link.icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="flex flex-col justify-between gap-2 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase md:flex-row">
          <p>
            {/* Static on purpose: the page is prerendered, and cacheComponents rejects new Date() there */}
            © 2026 · {copy.rights} {siteConfig.name}
          </p>
          <p>{siteConfig.location}</p>
        </footer>
      </div>

      {/* Oversized signature, cut off by the bottom of the page */}
      <p
        aria-hidden
        data-fx="rise"
        className="mt-8 -mb-[0.22em] bg-linear-to-b from-gold/30 to-transparent bg-clip-text text-center font-heading text-[min(27vw,24rem)] leading-none text-transparent select-none"
      >
        {siteConfig.shortName}
      </p>
    </Section>
  );
}
