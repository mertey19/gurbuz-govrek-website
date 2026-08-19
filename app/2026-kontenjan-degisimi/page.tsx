import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, whatsappUrl } from "@/config/site";
import {
  FIELD_QUOTA_CHANGES,
  SCORE_TYPE_QUOTA_CHANGES,
} from "@/data/tercihTespitleri";

/**
 * "2026 kontenjan değişimi" araması için özel sayfa.
 *
 * Rakamlar Gürbüz Gövrek'in kendi tespitlerinden gelir ve öngörü oldukları
 * sayfada açıkça belirtilir. Uydurma veri eklenmez; burada yazan her sayı
 * `data/tercihTespitleri.ts` içindeki değerlendirmelerle aynıdır.
 */
const title = "2026 YKS Kontenjan Değişimi: Hangi Alanda Ne Kadar Azaldı?";
const description =
  "2026 YKS kontenjanları sayısalda 9 bin, eşit ağırlıkta 12 bin, sözelde 6 bin, dilde 3 bin civarında azaldı. Tıp 85, diş hekimliği 761 kontenjan kaybetti. Bu değişimin sıralamalara etkisi.";
const pageUrl = `${CANONICAL_SITE_URL}/2026-kontenjan-degisimi`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "article", locale: "tr_TR", url: pageUrl, title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function KontenjanDegisimiPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-3xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> 2026 Kontenjan Değişimi
          </nav>
          <h1 className="mt-5 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            2026 YKS Kontenjan Değişimi
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Kontenjan, sıralamaları belirleyen en güçlü etkenlerden biridir. Bir bölümün
            kontenjanı azaldığında aynı sırayla geçen yıl girilebilen programa bu yıl
            girilemeyebilir. Aşağıda 2026 dönemindeki değişim, puan türü ve alan bazında
            özetleniyor.
          </p>
        </Container>
      </header>

      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <section aria-labelledby="puan-turu">
            <h2 id="puan-turu" className="font-serif text-2xl font-semibold text-navy">
              Puan türüne göre değişim
            </h2>
            <div className="mt-6 overflow-x-auto rounded-sm border border-navy/10">
              <table className="w-full border-collapse bg-white text-sm">
                <caption className="sr-only">
                  2026 YKS genel kontenjanının puan türlerine göre değişimi
                </caption>
                <thead>
                  <tr className="bg-cream text-left text-xs font-bold tracking-wider text-blue-deep uppercase">
                    <th scope="col" className="px-5 py-3">
                      Puan türü
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Genel kontenjan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCORE_TYPE_QUOTA_CHANGES.map((row) => (
                    <tr key={row.label} className="border-t border-navy/8">
                      <th scope="row" className="px-5 py-3 text-left font-semibold text-navy">
                        {row.label}
                      </th>
                      <td className="px-5 py-3 text-ink">{row.display}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted">
              Dört puan türünde de daralma var. En sert düşüş sözelde; oransal etkisi
              nedeniyle bu alanda sıralamaların ilerlemesi bekleniyor.
            </p>
          </section>

          <section aria-labelledby="alan-bazli" className="mt-11">
            <h2 id="alan-bazli" className="font-serif text-2xl font-semibold text-navy">
              Alan bazında öne çıkanlar
            </h2>
            <dl className="mt-6 grid gap-5">
              {FIELD_QUOTA_CHANGES.map((item) => (
                <div key={item.field} className="border-l-2 border-gold pl-4">
                  <dt className="text-sm font-bold text-navy">{item.field}</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="ne-anlama-geliyor" className="mt-11">
            <h2
              id="ne-anlama-geliyor"
              className="font-serif text-2xl font-semibold text-navy"
            >
              Bu değişim sıralamalara nasıl yansır?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Kontenjan azaldığında, o programa yerleşen son kişinin başarı sırası
              genellikle öne doğru ilerler. Yani geçen yıl 60 bininci sırayla girilen bir
              bölüm, bu yıl 55 bininci sırayı gerektirebilir.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Ancak bu ilişki mekanik değildir. Kontenjan artan bir bölüme talep de artmışsa
              sıralama gerilemeyebilir. Bu yüzden kontenjan değişimini tek başına değil, o
              alandaki genel eğilimle birlikte okumak gerekir.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Pratik sonuç şudur: tercih listesini yalnızca geçen yılın taban sıralarına göre
              kurmak bu yıl risklidir. Güvenli bölgeyi biraz geniş tutmak gerekir.
            </p>
          </section>

          <section aria-labelledby="kendi-listeniz" className="mt-11 border-t border-navy/10 pt-8">
            <h2 id="kendi-listeniz" className="font-serif text-2xl font-semibold text-navy">
              Kendi sıralamanızda ne anlama geliyor?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Genel tablo bir fikir verir ama karar sizin sıralamanıza göre değişir.{" "}
              <Link
                href="/tercih-robotu"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                Tercih robotunda
              </Link>{" "}
              puan türünüzü ve başarı sıranızı girdiğinizde, size uyan programların 2023–2026
              kontenjan değişimini ve 2022–2025 sıralama seyrini yan yana görebilirsiniz.
            </p>

            <div className="mt-7 rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-8">
              <h3 className="font-serif text-xl font-semibold sm:text-2xl">
                Listenizi birlikte kuralım
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
                Kontenjanın daraldığı bir yılda dengeli liste kurmak, tek başına tabloya
                bakmaktan zordur. Sıralamanıza uygun riskli–güvenli dağılımı birlikte
                çıkaralım.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-sm bg-whatsapp px-7 text-sm font-bold text-navy transition hover:bg-whatsapp-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                WhatsApp’tan İletişime Geçin
              </a>
            </div>
          </section>

          <p className="mt-9 border-t border-navy/10 pt-6 text-xs leading-6 text-muted">
            Buradaki değerlendirmeler Gürbüz Gövrek’in kendi tespitleridir; kesin sonuç
            değildir. Nihai kontenjan ve taban puanlar tercih dönemi sonunda ÖSYM tarafından
            açıklanır. Ayrıntılı veriler için{" "}
            <Link href="/raporlar" className="underline underline-offset-4 hover:text-navy">
              raporlar bölümüne
            </Link>{" "}
            bakabilirsiniz.
          </p>
        </Container>
      </div>
    </main>
  );
}
