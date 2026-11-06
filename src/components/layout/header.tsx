import { Container } from "@/components/ui/container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

import { HeaderShell } from "./header-shell";
import { MobileMenu } from "./mobile-menu";

// Page order, so the nav reads top to bottom like the page
const navItems = ["about", "work", "experience", "credentials", "services", "contact"] as const;

type HeaderProps = {
  locale: Locale;
  dict: Pick<Dictionary, "nav" | "common">;
};

export function Header({ locale, dict }: HeaderProps) {
  const items = navItems.map((id) => ({ id, label: dict.nav[id] }));

  return (
    <HeaderShell>
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="font-heading text-xl text-ink">
          {siteConfig.shortName}
          <span className="text-gold">.</span>
        </a>

        <nav aria-label={dict.common.mainNav} className="hidden md:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-mono text-xs tracking-[0.2em] text-ink-muted uppercase transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <LanguageSwitcher current={locale} label={dict.common.language} />
            <ThemeToggle labels={{ toLight: dict.common.toLight, toDark: dict.common.toDark }} />
          </div>
          <MobileMenu
            items={items}
            labels={{ open: dict.common.menu, close: dict.common.close, nav: dict.common.mainNav }}
          />
        </div>
      </Container>
    </HeaderShell>
  );
}
