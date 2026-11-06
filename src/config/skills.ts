import type { Dictionary } from "@/i18n/get-dictionary";

/** Skill groups as on the CV. Group names are translated, tool names are not. */
export const skillGroups: { key: keyof Dictionary["stack"]["groups"]; items: string[] }[] = [
  {
    key: "frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Redux Toolkit",
      "Zustand",
      "Tailwind CSS",
    ],
  },
  { key: "mobile", items: ["React Native", "Expo", "EAS Build"] },
  { key: "wordpress", items: ["WooCommerce", "Elementor", "PHP", "ACF", "PHPUnit", "PHPStan"] },
  { key: "tools", items: ["Git", "REST API", "WebSocket", "Puppeteer", "Supabase", "Figma"] },
];
