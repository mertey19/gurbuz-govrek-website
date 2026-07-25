import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, FileText, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, whatsappUrl } from "@/config/site";
import { careerCategories } from "@/data/careerCategories";
import { careerResources } from "@/data/careerResources";

const title = "Meslek Tanıtım Rehberi | Puan Türüne Göre Meslekler";
const description =
  "Sayısal, eşit ağırlık, sözel, dil ve TYT puan türlerine göre gruplanmış 115 meslek tanıtım dosyası. Mesleklerin görevlerini, çalışma koşullarını ve eğitim süreçlerini tercih öncesinde inceleyin.";
const pageUrl = `${CANONICAL_SITE_URL}/meslekler`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: pageUrl,
    title,
    description,
    images: ["/og.jpg"],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function MesleklerPage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": pageUrl,
      name: title,
      description,
      url: pageUrl,
      inLanguage: "tr-TR",
      isPartOf: { "@id": `${CANONICAL_SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        name: "Puan türüne göre meslek kategorileri",
        numberOfItems: careerCategories.length,
        itemListElement: careerCategories.map((category, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: category.label,
          url: `${CANONICAL_SITE_URL}/meslekler/${category.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${CANONICAL_SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Meslek Tanıtım Köşesi", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white pt-20">
        <header className="relative overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 opacity-[0.07]" aria-hidden="true">
            <div className="absolute -top-28 -right-20 size-[30rem] rounded-full border border-gold" />
            <div className="absolute right-48 -bottom-36 size-80 rounded-full border border-white" />
          </div>
          <Container className="relative py-14 sm:py-20 lg:py-24">
            <nav aria-label="Sayfa yolu" className="text-xs text-white/55">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gold-light">Meslek Tanıtım Köşesi</li>
              </ol>
            </nav>
            <p className="eyebrow mt-10">Meslek Tanıtım Köşesi</p>
            <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] sm:text-5xl lg:text-[3.75rem]">
              Meslekleri Tercih Etmeden Önce Yakından Tanıyın
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              Bir bölümü seçmek, aslında bir mesleği ve o mesleğin günlük çalışma biçimini
              seçmektir. Puan türüne göre gruplanmış {careerResources.length} meslek tanıtım
              dosyasını inceleyerek kararınızı bilgiye dayandırabilirsiniz.
            </p>
            <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold tracking-[.1em] uppercase">
              <span className="rounded-full border border-white/18 px-4 py-2 text-gold-light">
                {careerResources.length} meslek dosyası
              </span>
              <span className="rounded-full border border-white/18 px-4 py-2 text-white/70">
                {careerCategories.length} puan türü
              </span>
            </div>
          </Container>
        </header>

        <section className="section-space bg-white">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">Nereden Başlamalı?</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Puan türünüzü seçin, o alandaki meslekleri inceleyin
              </h2>
              <p className="mt-6 text-base leading-8 text-ink/65">
                Her kategori sayfasında o puan türünün ne anlama geldiğini, tercih ederken dikkat
                edilmesi gereken noktaları ve alana ait tüm meslek dosyalarını bulacaksınız.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {careerCategories.map((category) => {
                const count = careerResources.filter(
                  (resource) => resource.category === category.key,
                ).length;
                return (
                  <Link
                    key={category.slug}
                    href={`/meslekler/${category.slug}`}
                    className="group flex flex-col rounded-sm border border-navy/10 bg-cream/55 p-7 transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_45px_rgba(7,26,51,.09)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold sm:p-8"
                  >
                    <span className="flex size-12 items-center justify-center rounded-sm bg-navy text-gold-light">
                      <Compass className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-serif text-2xl font-semibold leading-tight text-navy">
                      {category.label}
                    </h3>
                    <p className="mt-4 grow text-sm leading-7 text-ink/64">{category.lead}</p>
                    <span className="mt-6 flex items-center justify-between gap-4 text-sm font-bold text-blue-deep">
                      {count} meslek dosyası
                      <ArrowRight
                        className="size-4 shrink-0 text-gold transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="section-space bg-cream">
          <Container className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <p className="eyebrow">Neden Meslek Tanıtımı?</p>
              <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-navy sm:text-4xl">
                Tercih listesi, meslek bilgisi üzerine kurulur
              </h2>
              <div className="mt-6 grid gap-5 text-base leading-8 text-ink/68">
                <p>
                  Tercih döneminde en sık karşılaştığım durum, bölümün adının bilinmesi ama o
                  bölümün götürdüğü mesleğin günlük hâlinin bilinmemesi. Bir mühendislik dalının
                  saha mı ofis mi ağırlıklı olduğu, bir sağlık mesleğinin vardiya düzeni ya da bir
                  öğretmenlik alanının hangi kademede görev yaptığı, çoğu zaman tercih yapıldıktan
                  sonra öğreniliyor.
                </p>
                <p>
                  Oysa bu bilgiler tercih öncesinde erişilebilir durumda. Bu köşedeki dosyalar
                  mesleklerin tanımını, görevlerini, gerektirdiği özellikleri, çalışma ortamını ve
                  eğitim sürecini ayrıntılı biçimde aktarıyor.
                </p>
                <p>
                  Önerim şu: listenizdeki ilk on tercihin meslek dosyasını okuyun. Bu okuma çoğu
                  zaman sıralamayı değiştirir; bazen de listeye hiç düşünmediğiniz bir bölümü ekler.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
              <article className="rounded-sm border border-navy/10 bg-white p-7 shadow-[0_14px_40px_rgba(7,26,51,.05)]">
                <span className="flex size-10 items-center justify-center rounded-sm bg-navy text-gold-light">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy">
                  Dosyalarda ne var?
                </h3>
                <ul className="mt-4 grid gap-2 text-sm leading-7 text-ink/64">
                  <li>Mesleğin tanımı ve görevleri</li>
                  <li>Gerektirdiği genel özellikler</li>
                  <li>Çalışma ortamı ve koşulları</li>
                  <li>Meslek eğitimi ve giriş koşulları</li>
                  <li>Çalışma alanları ve iş bulma olanakları</li>
                  <li>Meslekte ilerleme yolları</li>
                </ul>
              </article>

              <p className="flex items-start gap-3 rounded-sm border border-navy/10 bg-white px-5 py-4 text-xs leading-6 text-ink/58">
                <Info className="mt-0.5 size-4 shrink-0 text-blue-deep/60" aria-hidden="true" />
                <span>
                  Meslek tanıtım dosyaları Türkiye İş Kurumu (İŞKUR) tarafından hazırlanan resmî
                  yayınlardır ve kaynak gösterilerek paylaşılmaktadır. Kontenjan, taban puan ve
                  başarı sırası gibi yıldan yıla değişen veriler için ÖSYM ve YÖK Atlas kaynaklarını
                  esas alınız.
                </span>
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="eyebrow">Meslek Seçimi Danışmanlığı</p>
                <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                  Hangi mesleğin size uyduğunu birlikte değerlendirelim
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  Meslek dosyaları tanımayı sağlar; eşleştirmeyi ise ilgi alanınız, başarı sıranız ve
                  yaşam planınız birlikte belirler. Görüşmeler randevu ile planlanır.
                </p>
              </div>
              <Button href={whatsappUrl} external variant="whatsapp" className="w-full lg:w-auto">
                <MessageCircle className="size-5" aria-hidden="true" />
                WhatsApp&apos;tan Görüş
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
