import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type ContactProps = {
  copy: Dictionary["contact"];
};

// TODO(day 6): gradient glow + email CTA
export function Contact({ copy }: ContactProps) {
  return <Section id="contact" index="08" copy={copy} />;
}
