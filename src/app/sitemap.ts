import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { defaultLocale, locales } from "@/i18n/config";

/** One entry per language, each pointing at its translations (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`]));

  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
