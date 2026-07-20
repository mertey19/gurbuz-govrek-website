import { About } from "@/components/sections/About";
import { AnalysisCenter } from "@/components/sections/AnalysisCenter";
import { CampusVisits } from "@/components/sections/CampusVisits";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Counseling } from "@/components/sections/Counseling";
import { Events } from "@/components/sections/Events";
import { FAQ } from "@/components/sections/FAQ";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Mathematics } from "@/components/sections/Mathematics";
import { Media } from "@/components/sections/Media";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { siteConfig } from "@/config/site";

export default function Home() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: "Matematik Öğretmeni ve Tercih Uzmanı",
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      serviceType: [
        "Matematik Eğitimi",
        "YKS Tercih Danışmanlığı",
        "Üniversite ve Bölüm Analizi",
        "Öğrenci Koçluğu",
      ],
    },
  ];

  return (
    <>
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        <Mathematics />
        <Counseling />
        <AnalysisCenter />
        <CampusVisits />
        <SuccessStories />
        <Events />
        <Media />
        <Gallery />
        <FAQ />
        <ContactCTA />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
