import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { hasLocale, locales } from "@/i18n/config";
import en from "@/i18n/dictionaries/en.json";
import vi from "@/i18n/dictionaries/vi.json";

export const alt = `${siteConfig.name} — Frontend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render both languages at build time instead of on every request
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const colors = { bg: "#0b0a09", ink: "#ede4d3", muted: "#8c8376", gold: "#c9a96e" };

const [first, ...rest] = siteConfig.name.split(" ");
const last = rest.pop() ?? "";
const nameLine = [first, ...rest].join(" ");
const host = new URL(siteConfig.url).host;

const asset = (path: string) => join(process.cwd(), "src/assets", path);

/*
 * ImageResponse only reads ttf/otf/woff, and next/font ships woff2. The repo keeps
 * TrueType subsets of the same fonts (uppercase Latin + Vietnamese, digits, punctuation;
 * both OFL): ~50KB instead of a full family, and no network call during the build.
 * Read once at module scope: none of this depends on the request.
 */
const [display, mono, portrait] = await Promise.all([
  readFile(asset("fonts/archivo-extrabold-caps.ttf")),
  readFile(asset("fonts/jetbrains-mono-caps.ttf")),
  readFile(asset("hero/portrait.jpg"), "base64"),
]);

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = hasLocale(lang) && lang === "en" ? en : vi;

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: colors.bg }}>
      {/* Portrait on the right, faded into the background like the hero */}
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
      <img
        src={`data:image/jpeg;base64,${portrait}`}
        alt=""
        width={630}
        height={630}
        style={{ position: "absolute", right: 0, top: 0, opacity: 0.5 }}
      />
      {/* One gradient per layer, sized explicitly: Satori ignores `inset` and gradient lists */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(to right, ${colors.bg} 45%, transparent 80%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          background: `linear-gradient(to top, ${colors.bg} 0%, transparent 40%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          padding: 72,
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: "JetBrains Mono",
            fontSize: 22,
            letterSpacing: 4,
            color: colors.muted,
          }}
        >
          {dict.hero.eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Archivo",
            fontSize: 132,
            lineHeight: 1.05,
            letterSpacing: -4,
            color: colors.ink,
          }}
        >
          <span>{nameLine.toUpperCase()}</span>
          <span style={{ color: colors.gold }}>{last.toUpperCase()}</span>
        </div>
        <div style={{ fontFamily: "JetBrains Mono", fontSize: 22, color: colors.gold }}>
          {host.toUpperCase()}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
