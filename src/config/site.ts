export const siteConfig = {
  name: "Bùi Hoàng Phi",
  shortName: "Phjn",
  url: "https://phjn.vercel.app",
  email: "buihoangphi2003@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  links: {
    github: "https://github.com/PhjnX",
    linkedin: "https://www.linkedin.com/in/bùi-hoàng-phi-91a69b300",
  },
} as const;

export type SiteConfig = typeof siteConfig;
