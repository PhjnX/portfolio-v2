import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type ServicesProps = {
  copy: Dictionary["services"];
};

// TODO(day 6): accordion: web / mobile / wordpress
export function Services({ copy }: ServicesProps) {
  return <Section id="services" index="07" copy={copy} />;
}
