import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type ExperienceProps = {
  copy: Dictionary["experience"];
};

// TODO(day 12-13): company cards that collect into a pile
export function Experience({ copy }: ExperienceProps) {
  return <Section id="experience" index="03" copy={copy} />;
}
