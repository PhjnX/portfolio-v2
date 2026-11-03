import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutProps = {
  copy: Dictionary["about"];
};

// TODO(day 7): scroll-revealed heading + short bio
export function About({ copy }: AboutProps) {
  return <Section id="about" index="01" copy={copy} />;
}
