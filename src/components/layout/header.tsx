import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { HeaderShell } from "./header-shell";

// Page order, so the nav reads top to bottom like the page
const navItems = ["about", "work", "experience", "credentials", "services", "contact"] as const;

type HeaderProps = {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "common">;
};

// TODO(day 7): mobile menu — below md only the logo and language switcher show
export function Header({ locale, dict }: HeaderProps) {
  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="font-heading text-xl text-ink">
          {siteConfig.shortName}
          <span className="text-gold">.</span>
        </a>

        <nav aria-label={dict.common.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase transition-colors hover:text-ink"
                >
                  {dict.nav[item]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher current={locale} label={dict.common.language} />
      </Container>
    </HeaderShell>
  );
}
