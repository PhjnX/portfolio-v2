import { FxLine } from "@/components/motion/fx-line";
import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type ServicesProps = {
  copy: Dictionary["services"];
};

/**
 * Accordion built on native <details>. Sharing `name` makes them exclusive
 * (opening one closes the others) with no JS; keyboard and screen readers
 * work out of the box. The open/close slide is CSS in globals.css.
 */
export function Services({ copy }: ServicesProps) {
  return (
    <Section id="services" index="07" copy={copy}>
      <div data-fx="rows" className="border-b border-line pt-8 md:pt-16">
        {copy.items.map((item, i) => (
          <details
            key={item.title}
            name="services"
            open={i === 0}
            className="group border-t border-line"
          >
            <summary className="relative flex cursor-pointer list-none items-center gap-6 py-8 md:gap-10 md:py-10 [&::-webkit-details-marker]:hidden">
              {/* In <summary>: anything else in <details> is hidden while it is closed */}
              <FxLine />
              <span data-fx-body className="font-mono text-xs tracking-[0.2em] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                data-fx-body
                className="flex-1 font-heading text-display-md text-ink-muted transition-colors group-open:text-ink group-hover:text-ink"
              >
                {item.title}
              </span>
              {/* Plus turns into a cross when open */}
              <span
                data-fx-body
                aria-hidden
                className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-2xl text-ink-muted transition-transform duration-500 ease-out-expo group-open:rotate-45 group-open:border-gold group-open:text-gold"
              >
                +
              </span>
            </summary>

            <div className="grid gap-6 pb-10 md:grid-cols-12 md:gap-10">
              <p className="max-w-xl text-ink-muted md:col-span-7 md:col-start-2 md:text-lg">
                {item.text}
              </p>
              <ul className="flex flex-wrap content-start gap-2 md:col-span-4">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
