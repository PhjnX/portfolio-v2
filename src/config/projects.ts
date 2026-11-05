import type { Dictionary } from "@/i18n/get-dictionary";

type WorkCopy = Dictionary["work"];

/** Slugs must match the keys of work.projects in the dictionaries. */
export type ProjectSlug = keyof WorkCopy["projects"];

export type Project = {
  slug: ProjectSlug;
  title: string;
  kind: keyof WorkCopy["kinds"];
  /** Short mark printed on the card cover, like a record sleeve. */
  monogram: string;
  /** Card cover colour. Dark enough for cream ink on top. */
  accent: string;
  stack: string[];
  links: { kind: keyof WorkCopy["links"]; href: string }[];
};

/** Language-neutral project data; summaries and periods live in the dictionaries. */
export const projects: Project[] = [
  {
    slug: "webie-ems-web",
    title: "Webie EMS · Web",
    kind: "client",
    monogram: "EMS.",
    accent: "#4a3699",
    stack: ["React", "TypeScript", "Vite", "Redux Toolkit", "Tailwind CSS"],
    links: [{ kind: "live", href: "https://ems.webie.com.vn/" }],
  },
  {
    slug: "webie-ems-mobile",
    title: "Webie EMS · Mobile",
    kind: "client",
    monogram: "APP.",
    accent: "#1d5f66",
    stack: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "EAS Build"],
    links: [{ kind: "demo", href: "https://youtu.be/Uz_h0ZTjmBU" }],
  },
  {
    slug: "phjn-coffee",
    title: "Phjn Coffee",
    kind: "personal",
    monogram: "PC.",
    accent: "#5e3b22",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Vitest"],
    links: [
      { kind: "live", href: "https://phjn-coffee.vercel.app" },
      { kind: "source", href: "https://github.com/PhjnX/phjn-coffee" },
    ],
  },
  {
    slug: "vietqr-checkout",
    title: "VietQR Checkout",
    kind: "personal",
    monogram: "VQR.",
    accent: "#265e3e",
    stack: ["PHP", "WooCommerce", "SePay webhook", "PHPUnit", "PHPStan"],
    links: [
      {
        kind: "playground",
        href: "https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/PhjnX/vietqr-checkout/main/blueprint.json",
      },
      { kind: "source", href: "https://github.com/PhjnX/vietqr-checkout" },
    ],
  },
];
