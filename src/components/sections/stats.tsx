import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

import { StatsBoard } from "./stats-board";

type StatsProps = {
  copy: Dictionary["stats"];
};

export function Stats({ copy }: StatsProps) {
  return (
    <Section id="stats" index="05" copy={copy}>
      <StatsBoard items={copy.items} />
    </Section>
  );
}
