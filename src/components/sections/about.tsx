import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type AboutProps = {
  copy: Dictionary["about"];
};

// TODO(day 4): short bio (heading reveal is already in Section)
export function About({ copy }: AboutProps) {
  return <Section id="about" index="01" copy={copy} />;
}
