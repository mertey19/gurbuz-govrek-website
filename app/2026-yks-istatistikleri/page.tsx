import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, whatsappUrl } from "@/config/site";

/**
 * "2026 YKS istatistikleri" araması için özel sayfa.
 *
 * İçerik Gürbüz Gövrek'in sınav sonrası tespitlerinden gelir. Ortalama ve aday
 * sayısı gibi değerler için uydurma rakam yazılmaz; yalnızca tespitlerde geçen
 * yönler ve karşılaştırmalar aktarılır.
 */
const title = "2026 YKS İstatistikleri: Test Ortalamaları ve Sıralamalara Etkisi";
const description =
  "2026 YKS’de AYT Matematik ortalaması yükseldi, Tarih ve Coğrafya düştü. Sınava giren aday sayısı azaldı. Bu değişimlerin başarı sıralamalarına nasıl yansıdığı.";
const pageUrl = `${CANONICAL_SITE_URL}/2026-yks-istatistikleri`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "article", locale: "tr_TR", url: pageUrl, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const testResults = [
  {
    test: "TYT Matematik",
    finding:
      "Sorular genelde zaman alıcıydı; ortalama beklentinin altında kaldı. 2025 TYT’ye yakın bir ortalama geldi.",
  },
  {
    test: "AYT Matematik",
    finding:
      "Çok zorlayıcı, eleyici nitelikte orijinal soru yoktu. Bir soru iptal edilmesine rağmen ortalama yükseldi.",
  },
  {
    test: "AYT Fen bilimleri",
    finding: "Bütün branşlarda ortalamalar yükseldi.",
  },
  {
    test: "AYT Edebiyat",
    finding: "Ortalama yükseldi.",
  },
  {
    test: "AYT Tarih ve Coğrafya",
    finding: "Ortalamalar düştü.",
  },
];

export default function YksIstatistikleriPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-3xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> 2026 YKS İstatistikleri
          </nav>
          <h1 className="mt-5 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            2026 YKS İstatistikleri
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Sınav ortalamaları, tercih listesi kurarken kontenjan kadar belirleyicidir.
            Ortalamanın yükseldiği bir testte aynı net daha düşük bir sıralama getirir. Bu
            sayfa 2026 sınavında testlerin nasıl geçtiğini ve bunun sıralamalara nasıl
            yansıdığını özetliyor.
          </p>
        </Container>
      </header>

      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <section aria-labelledby="test-ortalamalari">
            <h2
              id="test-ortalamalari"
              className="font-serif text-2xl font-semibold text-navy"
            >
              Testler nasıl geçti?
            </h2>
            <div className="mt-6 overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full border-collapse bg-white text-sm">
                <caption className="sr-only">
                  2026 YKS testlerinin ortalama değerlendirmesi
                </caption>
                <thead>
                  <tr className="bg-cream text-left text-xs font-bold tracking-wider text-blue-deep uppercase">
                    <th scope="col" className="px-5 py-3">
                      Test
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Değerlendirme
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testResults.map((row) => (
                    <tr key={row.test} className="border-t border-navy/8 align-top">
                      <th
                        scope="row"
                        className="px-5 py-3 text-left font-semibold whitespace-nowrap text-navy"
                      >
                        {row.test}
                      </th>
                      <td className="px-5 py-3 leading-6 text-ink">{row.finding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="matematik" className="mt-11">
            <h2 id="matematik" className="font-serif text-2xl font-semibold text-navy">
              AYT Matematik: beklenmedik sonuç
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Bu yılın en dikkat çekici başlığı AYT Matematik. Sınavda eleyici nitelikte
              orijinal soru yoktu; olan tek soru da iptal edildi. Buna rağmen ortalama
              yükseldi.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Gürbüz Gövrek’in değerlendirmesine göre soru iptal edilmeseydi matematik son
              yılların en yüksek ortalamasına ulaşabilirdi. Sonuç sıralamalara da yansıdı:
              sayısal sıralamalar 2023’tekinden bile daha sert geldi.
            </p>
            <div className="mt-5 border-l-2 border-gold pl-4">
              <p className="text-sm leading-7 text-muted">
                Pratik anlamı şu: aynı net sayısıyla geçen yıl elde edilen sıralama bu yıl
                elde edilemeyebilir. Geçmiş yılların taban sıralarına bakarken bu farkı hesaba
                katmak gerekir.
              </p>
            </div>
          </section>

          <section aria-labelledby="aday-sayisi" className="mt-11">
            <h2 id="aday-sayisi" className="font-serif text-2xl font-semibold text-navy">
              180 puan barajını geçen aday sayısı
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Sınava giren öğrenci sayısı azaldı; buna paralel olarak 180 puanı geçen aday
              sayısı da düştü. Bu, tercih havuzunun daraldığı anlamına gelir.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Ancak aday sayısındaki azalma tek başına “girmek kolaylaştı” demek değildir. Aynı
              yıl kontenjanlar da daraldıysa iki etki birbirini dengeler, hatta kontenjan
              düşüşü daha baskın çıkabilir.{" "}
              <Link
                href="/2026-kontenjan-degisimi"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                2026 kontenjan değişimi sayfasında
              </Link>{" "}
              bu tarafı ayrıntılı bulabilirsiniz.
            </p>
          </section>

          <section aria-labelledby="gorseller" className="mt-11">
            <h2 id="gorseller" className="font-serif text-2xl font-semibold text-navy">
              Yığınsal dağılım tabloları
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Puan aralıklarına göre kaç adayın bulunduğunu gösteren yığınsal dağılım
              tabloları, kendi sıranızın hangi yoğunluk bölgesine düştüğünü anlamanızı
              sağlar. TYT, sayısal, eşit ağırlık, sözel ve dil için ayrı ayrı hazırlanmış yedi
              görsellik seri{" "}
              <Link
                href="/#sunum-kosesi"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                sunum köşesinde
              </Link>{" "}
              yer alıyor.
            </p>
          </section>

          <section
            aria-labelledby="ne-yapmali"
            className="mt-11 border-t border-navy/10 pt-8"
          >
            <h2 id="ne-yapmali" className="font-serif text-2xl font-semibold text-navy">
              Bu tablo tercihinizi nasıl etkilemeli?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Ortalamaların yükseldiği ve kontenjanların daraldığı bir yılda, geçmiş yılın
              taban sıralarını olduğu gibi kabul etmek en riskli yaklaşımdır. Listeyi kurarken
              güvenli bölgeyi geniş tutmak gerekir.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Kendi sıralamanıza uyan programları ve o programların yıllara göre nasıl hareket
              ettiğini{" "}
              <Link
                href="/tercih-robotu"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                tercih robotunda
              </Link>{" "}
              yan yana görebilirsiniz.
            </p>

            <div className="mt-7 rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-8">
              <h3 className="font-serif text-xl font-semibold sm:text-2xl">
                Sıralamanızı birlikte yorumlayalım
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
                Aynı sıralama her yıl aynı anlama gelmez. Bu yılın koşullarında sizin
                sıranızın nereye denk düştüğünü konuşalım.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-gold px-7 text-sm font-bold text-navy transition hover:bg-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
              >
                WhatsApp’tan İletişime Geçin
              </a>
            </div>
          </section>

          <p className="mt-9 border-t border-navy/10 pt-6 text-xs leading-6 text-muted">
            Buradaki değerlendirmeler Gürbüz Gövrek’in sınav sonrası tespitleridir. Resmî
            sayısal veriler için ÖSYM’nin yayımladığı sınav sonuç istatistiklerini esas
            alın.
          </p>
        </Container>
      </div>
    </main>
  );
}
