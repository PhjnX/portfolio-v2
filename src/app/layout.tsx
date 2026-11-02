import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site";
import { archivo, beVietnam, jetbrains } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // lang is hardcoded for now, moves to [locale] layout with next-intl on day 3
    <html
      lang="vi"
      className={cn(archivo.variable, beVietnam.variable, jetbrains.variable, "h-full")}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
