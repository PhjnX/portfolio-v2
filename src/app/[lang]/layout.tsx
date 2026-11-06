import type { Metadata, Viewport } from "next";

import { Header } from "@/components/layout/header";
import { SkipLink } from "@/components/layout/skip-link";
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

  const title = `${siteConfig.name} — ${dict.meta.role}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: title, template: `%s — ${siteConfig.name}` },
    description: dict.meta.description,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/" },
    },
    // The image itself comes from [lang]/opengraph-image.tsx; Next adds og:image and twitter:image
    openGraph: {
      type: "profile",
      siteName: siteConfig.name,
      title,
      description: dict.meta.description,
      url: `/${locale}`,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
    },
    twitter: { card: "summary_large_image", title, description: dict.meta.description },
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
        <SkipLink label={dict.common.skip} />
        <SmoothScroll />
        <Header locale={locale} dict={dict} />
        {children}
      </body>
    </html>
  );
}
