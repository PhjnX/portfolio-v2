import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type WorkProps = {
  copy: Dictionary["work"];
};

// TODO(day 5): scattered letters + project card stack
export function Work({ copy }: WorkProps) {
  return <Section id="work" index="02" copy={copy} />;
}
