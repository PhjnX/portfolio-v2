export const siteConfig = {
  name: "Bùi Hoàng Phi",
  shortName: "Phi",
  role: "Frontend Developer",
  description:
    "Frontend developer building web & mobile products with React, Next.js, React Native and WordPress.",
  url: "https://phjn.vercel.app",
  // TODO: fill in contact email before the Contact section (day 16)
  email: "",
  location: "Ho Chi Minh City, Vietnam",
  links: {
    github: "https://github.com/PhjnX",
    linkedin: "https://www.linkedin.com/in/bùi-hoàng-phi-91a69b300",
  },
} as const;

export type SiteConfig = typeof siteConfig;
