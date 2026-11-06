import { FxLine } from "@/components/motion/fx-line";
import { Section } from "@/components/ui/section";
import { skillGroups } from "@/config/skills";
import type { Dictionary } from "@/i18n/get-dictionary";

type StackProps = {
  copy: Dictionary["stack"];
};

export function Stack({ copy }: StackProps) {
  return (
    <Section id="stack" index="04" copy={copy}>
      <div data-fx="rows" className="divide-y divide-line border-y border-line">
        {skillGroups.map((group, i) => (
          <div
            key={group.key}
            className="relative grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-10 md:py-10"
          >
            <FxLine />
            <p className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase md:col-span-3">
              <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="mx-2 text-ink-faint">/</span>
              {copy.groups[group.key]}
            </p>
            {/* Each technology rises out of a blur, one after another */}
            <ul
              data-fx="words"
              className="flex flex-wrap gap-x-3 gap-y-2 text-2xl font-medium md:col-span-9 md:text-4xl"
            >
              {group.items.map((item, j) => (
                <li key={item} className="text-ink transition-colors hover:text-gold">
                  {item}
                  {/* Separator dot, hidden from screen readers so the list reads cleanly */}
                  {j < group.items.length - 1 && (
                    <span aria-hidden className="ml-3 text-ink-faint">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
