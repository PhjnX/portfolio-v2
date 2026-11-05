import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

import { WorkStack } from "./work-stack";

type WorkProps = {
  copy: Dictionary["work"];
};

export function Work({ copy }: WorkProps) {
  return (
    // Scattered letters start off-screen; clip them instead of adding a horizontal scrollbar
    <Section id="work" index="02" copy={copy} heading="scatter" className="overflow-x-clip">
      <WorkStack copy={copy} />
    </Section>
  );
}
