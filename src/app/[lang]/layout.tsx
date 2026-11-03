import type { Metadata, Viewport } from "next";

import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { archivo, beVietnam, jetbrains } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "../globals.css";

// Required with cacheComponents: every root param needs at least one value.
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${dict.meta.role}`,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    // suppressHydrationWarning: browser extensions (custom cursor, ColorZilla...) inject
    // attributes into <html>/<body> before React hydrates. Only silences these two tags.
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(archivo.variable, beVietnam.variable, jetbrains.variable, "h-full")}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {/* Text reveals hide [data-reveal] until JS splits it; without JS, show it as is */}
        <noscript>
          <style>{"[data-reveal]{visibility:visible!important}"}</style>
        </noscript>
        <SmoothScroll />
        <Header locale={locale} dict={dict} />
        {children}
      </body>
    </html>
  );
}
