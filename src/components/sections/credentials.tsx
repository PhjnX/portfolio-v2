import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

type CredentialsProps = {
  copy: Dictionary["credentials"];
};

// TODO(day 6): scattered certificate cards
export function Credentials({ copy }: CredentialsProps) {
  return <Section id="credentials" index="06" copy={copy} />;
}
