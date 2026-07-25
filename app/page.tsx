import { About } from "@/components/sections/About";
import { AnalysisCenter } from "@/components/sections/AnalysisCenter";
import { Biography } from "@/components/sections/Biography";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CampusVisits } from "@/components/sections/CampusVisits";
import { CareerCorner } from "@/components/sections/CareerCorner";
import { Comments } from "@/components/sections/Comments";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Counseling } from "@/components/sections/Counseling";
import { Events } from "@/components/sections/Events";
import { FAQ } from "@/components/sections/FAQ";
import { FlashAnnouncement } from "@/components/sections/FlashAnnouncement";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Mathematics } from "@/components/sections/Mathematics";
import { Media } from "@/components/sections/Media";
import { Process } from "@/components/sections/Process";
import { PresentationCorner } from "@/components/sections/PresentationCorner";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { siteConfig } from "@/config/site";
import { faqItems } from "@/data/faq";
import { services } from "@/data/services";

// Hizmet bağlantıları hem sayfa yolu (`/matematik-ozel-ders`) hem de ana sayfa
// bölüm çapası (`#kampus`) olabiliyor; her ikisi de mutlak URL'ye çevrilir.
function toAbsoluteUrl(href: string): string {
  if (href.startsWith("#")) return `${siteConfig.url}/${href}`;
  if (href.startsWith("/#")) return `${siteConfig.url}/${href.slice(1)}`;
  return `${siteConfig.url}${href}`;
}

export default function Home() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      jobTitle: "Matematik Öğretmeni ve Tercih Uzmanı",
      url: `${siteConfig.url}/gurbuz-govrek`,
      image: `${siteConfig.url}/images/hero-gurbuz-govrek.webp`,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      sameAs: [siteConfig.contact.instagram],
      worksFor: { "@id": `${siteConfig.url}/#business` },
      knowsLanguage: "tr",
      knowsAbout: [
        "Denizli Tercih Danışmanlığı",
        "Denizli Tercih Danışmanı",
        "Matematik Eğitimi",
        "YKS Tercih Danışmanlığı",
        "Üniversite ve Bölüm Analizi",
        "Öğrenci Koçluğu",
      ],
    },
    {
      "@context": "https://schema.org",
      // Fiziksel ofis adresi yayımlanmadığı için "hizmet alanı işletmesi" olarak
      // modellenir: `address` yerine `areaServed` + `serviceArea` kullanılır.
      "@type": ["ProfessionalService", "EducationalOrganization"],
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      image: `${siteConfig.url}/images/hero-gurbuz-govrek.webp`,
      logo: `${siteConfig.url}/apple-touch-icon.png`,
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      priceRange: "₺₺",
      currenciesAccepted: "TRY",
      founder: { "@id": `${siteConfig.url}/#person` },
      areaServed: [
        { "@type": "City", name: "Denizli" },
        { "@type": "Country", name: "Türkiye" },
      ],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: { "@type": "GeoCoordinates", latitude: 37.7765, longitude: 29.0864 },
        geoRadius: "60000",
      },
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: siteConfig.url,
        servicePhone: siteConfig.contact.phone,
        availableLanguage: { "@type": "Language", name: "Türkçe", alternateName: "tr" },
      },
      sameAs: [siteConfig.contact.instagram],
      serviceType: [
        "Denizli Tercih Danışmanlığı",
        "Denizli Tercih Danışmanı",
        "Matematik Eğitimi",
        "YKS Tercih Danışmanlığı",
        "Üniversite ve Bölüm Analizi",
        "Öğrenci Koçluğu",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Eğitim ve Danışmanlık Hizmetleri",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: toAbsoluteUrl(service.href),
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#sss`,
      inLanguage: "tr-TR",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      alternateName: "Gürbüz Gövrek Tercih Danışmanlığı",
      url: `${siteConfig.url}/`,
      inLanguage: "tr-TR",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
  ];

  return (
    <>
      <main id="main-content">
        <Hero />
        <FlashAnnouncement />
        <Stats />
        <About />
        <PresentationCorner />
        <Biography />
        <Services />
        <Process />
        <Mathematics />
        <Counseling />
        <AnalysisCenter />
        <CareerCorner />
        <CampusVisits />
        <SuccessStories />
        <Comments />
        <Events />
        <BlogPreview />
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
