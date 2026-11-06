import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Services } from "@/components/sections/services";
import { Stack } from "@/components/sections/stack";
import { Stats } from "@/components/sections/stats";
import { Work } from "@/components/sections/work";
import { siteConfig } from "@/config/site";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export default async function HomePage() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  // Structured data so search engines can show a person card for the name
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: `${siteConfig.url}/${locale}`,
    jobTitle: dict.meta.role,
    description: dict.meta.description,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ho Chi Minh City",
      addressCountry: "VN",
    },
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    // tabIndex: lets the skip link move focus here, not only scroll
    <main id="main" tabIndex={-1} className="outline-none">
      <script
        type="application/ld+json"
        // Escape "<" so no string in the data can close the script tag early
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      {/* The hero sticks inside this wrapper only, so it un-pins once About has covered it */}
      <div>
        <Hero copy={dict.hero} scrollLabel={dict.common.scrollToExplore} />
        <About copy={dict.about} />
      </div>
      <Marquee copy={dict.marquee} />
      <Work copy={dict.work} />
      <Experience copy={dict.experience} />
      <Stack copy={dict.stack} />
      <Stats copy={dict.stats} />
      <Credentials copy={dict.credentials} />
      <Services copy={dict.services} />
      <Contact copy={dict.contact} />
    </main>
  );
}
