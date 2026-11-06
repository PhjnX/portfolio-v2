import { Section } from "@/components/ui/section";
import type { Dictionary } from "@/i18n/get-dictionary";

import { CredentialCards } from "./credential-cards";

type CredentialsProps = {
  copy: Dictionary["credentials"];
};

export function Credentials({ copy }: CredentialsProps) {
  return (
    // Papers start tilted and off to the sides; clip instead of a horizontal scrollbar
    <Section id="credentials" index="06" copy={copy} className="overflow-x-clip">
      <CredentialCards items={copy.items} />
    </Section>
  );
}
