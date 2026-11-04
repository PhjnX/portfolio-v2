import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

import { ExperienceStack } from "./experience-stack";

type ExperienceProps = {
  copy: Dictionary["experience"];
};

export function Experience({ copy }: ExperienceProps) {
  return (
    <Section id="experience" index="03" copy={copy}>
      <ExperienceStack items={copy.items} />
    </Section>
  );
}
