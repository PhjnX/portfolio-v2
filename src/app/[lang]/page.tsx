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
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage() {
  const dict = await getDictionary();

  return (
    <main>
      <Hero copy={dict.hero} scrollLabel={dict.common.scrollToExplore} />
      <About copy={dict.about} />
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
