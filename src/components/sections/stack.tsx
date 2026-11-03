import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type StackProps = {
  copy: Dictionary["stack"];
};

// TODO(day 6): grouped tech list
export function Stack({ copy }: StackProps) {
  return <Section id="stack" index="04" copy={copy} />;
}
