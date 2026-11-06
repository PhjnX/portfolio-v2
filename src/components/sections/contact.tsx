import { CopyButton } from "@/components/ui/copy-button";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactProps = {
  copy: Dictionary["contact"];
};

const linkClass =
  "font-mono text-xs tracking-[0.2em] text-ink uppercase underline decoration-gold underline-offset-8 transition-colors hover:text-gold";

export function Contact({ copy }: ContactProps) {
  return (
    <Section
      id="contact"
      index="08"
      copy={copy}
      className="relative isolate overflow-hidden pb-12 md:pb-16"
    >
      {/* Ember and violet glow drifting under the section: the only place these colours appear */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%]">
        <div className="absolute bottom-[-30%] left-[10%] size-[60vmax] rounded-full bg-ember/35 blur-[120px] motion-safe:animate-glow-drift" />
        <div className="absolute right-[0%] bottom-[-40%] size-[55vmax] rounded-full bg-violet/40 blur-[120px] motion-safe:animate-glow-drift-reverse" />
      </div>

      <div className="space-y-12 pt-4 md:space-y-16">
        <p className="max-w-xl text-ink-muted md:text-lg">{copy.lead}</p>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-10">
          <a
            href={`mailto:${siteConfig.email}`}
            // normal-case: an address should read exactly as typed, not shouted in caps
            className="font-heading text-[clamp(1.25rem,5.2vw,4.5rem)] leading-none [overflow-wrap:anywhere] text-ink normal-case transition-colors hover:text-gold"
          >
            {siteConfig.email}
          </a>
          <CopyButton value={siteConfig.email} label={copy.copy} copiedLabel={copy.copied} />
        </div>

        <ul className="flex flex-wrap gap-8">
          <li>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub ↗
            </a>
          </li>
          <li>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={copy.cvHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {copy.cv} ↓
            </a>
          </li>
        </ul>

        <footer className="flex flex-col justify-between gap-2 border-t border-line/60 pt-8 font-mono text-xs tracking-[0.2em] text-ink-muted uppercase md:flex-row">
          <p>
            {/* Static on purpose: the page is prerendered, and cacheComponents rejects new Date() there */}
            © 2026 · {copy.rights} {siteConfig.name}
          </p>
          <p>{siteConfig.location}</p>
        </footer>
      </div>
    </Section>
  );
}
