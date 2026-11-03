"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const localePrefix = new RegExp(`^/(${locales.join("|")})(?=/|$)`);

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  className?: string;
};

export function LanguageSwitcher({ current, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const hrefFor = (locale: Locale) => pathname.replace(localePrefix, `/${locale}`) || `/${locale}`;

  return (
    <nav aria-label={label} className={cn("flex items-center gap-1 font-mono text-xs", className)}>
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-faint">/</span>}
          <Link
            href={hrefFor(locale)}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "tracking-[0.2em] uppercase transition-colors",
              locale === current ? "text-gold" : "text-ink-muted hover:text-ink",
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </nav>
  );
}
