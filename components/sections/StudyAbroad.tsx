import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SiteImage } from "@/components/ui/SiteImage";

/**
 * Yurt dışı eğitim danışmanlığı tanıtımı.
 *
 * Tanıtılan hizmet üçüncü bir tarafa (drkavas.com) aittir; metin bu yüzden
 * hizmeti sitenin kendi hizmetiymiş gibi sunmaz, tanıttığını açıkça söyler.
 *
 * Görselin üzerindeki bilgilerin tamamı piksel; Google ve ekran okuyucular
 * okuyamaz. Bu yüzden aynı bilgiler yanında gerçek metin olarak da veriliyor,
 * görsel yalnızca destekleyici öge.
 */
const TARGET_URL = "https://www.drkavas.com";

const highlights = [
  {
    title: "Almanya’da ücretsiz üniversite",
    detail:
      "Devlet üniversitelerinde lisans ve yüksek lisans, Almanca dil okulu ve hazırlık süreci.",
  },
  {
    title: "Amerika’da üniversite fırsatı",
    detail:
      "Lisans ve yüksek lisans programları, İngilizce hazırlık ve F-1 öğrenci vizesi danışmanlığı.",
  },
  {
    title: "Sağlık mezunlarına kariyer imkânı",
    detail:
      "Doktor, hemşire ve fizik tedavi mezunları için denklik süreci, dil eğitimi ve iş bulma danışmanlığı.",
  },
];

export function StudyAbroad() {
  return (
    <section aria-labelledby="yurt-disi-egitim-basligi" className="bg-cream py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <p className="text-xs font-extrabold tracking-[.16em] text-blue-deep uppercase">
              Tanıtım
            </p>

            <h2
              id="yurt-disi-egitim-basligi"
              className="mt-4 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl"
            >
              Yurt Dışında Eğitim Düşünenler İçin
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ink/70">
              Almanya’da ücretsiz devlet üniversiteleri, Amerika’da lisans ve yüksek lisans
              programları, sağlık mezunları için denklik ve kariyer süreci. Başvurudan
              vizeye, konaklamadan havalimanı karşılamaya kadar sürecin tamamı tek elden
              yürütülüyor.
            </p>

            <dl className="mt-7 grid gap-5">
              {highlights.map((item) => (
                <div key={item.title} className="border-l-2 border-gold pl-4">
                  <dt className="text-sm font-bold text-navy">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-ink/64">{item.detail}</dd>
                </div>
              ))}
            </dl>

            <a
              href={TARGET_URL}
              target="_blank"
              /* Tanıtım bağlantısı: arama motorlarına reklam olduğu bildirilir. */
              rel="sponsored noopener noreferrer"
              className="group mt-8 inline-flex min-h-12 items-center gap-2.5 rounded-sm bg-navy px-7 text-sm font-bold text-white transition hover:bg-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Detayları Görün
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="sr-only">— drkavas.com adresinde yeni sekmede açılır</span>
            </a>

            <p className="mt-4 text-xs leading-6 text-ink/50">
              Bu hizmet Gürbüz Gövrek tarafından değil, drkavas.com tarafından
              yürütülmektedir. Başvuru ve iletişim doğrudan ilgili firma üzerinden yapılır.
            </p>
          </div>

          <a
            href={TARGET_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="block overflow-hidden rounded-sm border border-navy/10 shadow-[0_18px_55px_rgba(7,26,51,.10)] transition hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy"
            aria-label="Yurt dışı eğitim danışmanlığı tanıtımı — drkavas.com adresinde yeni sekmede açılır"
          >
            <SiteImage
              src="/images/yurt-disi-egitim-danismanligi.webp"
              alt="Yurt dışı eğitim danışmanlığı tanıtımı: Almanya’da ücretsiz üniversite, Amerika’da üniversite fırsatı ve sağlık mezunlarına kariyer imkânı başlıkları"
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 45vw, 100vw"
              /* Bölüm sayfanın üst kısmında; geç yükleme burada boş alan bırakır. */
              loading="eager"
              className="h-auto w-full"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
