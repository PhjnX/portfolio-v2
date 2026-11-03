import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type StatsProps = {
  copy: Dictionary["stats"];
};

// TODO(day 6): count-up numbers with growing bars
export function Stats({ copy }: StatsProps) {
  return <Section id="stats" index="05" copy={copy} />;
}
