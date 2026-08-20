import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CANONICAL_SITE_URL, whatsappUrl } from "@/config/site";
import { getFieldQuotaChange } from "@/data/tercihTespitleri";

/**
 * "Tıp fakültesi tercihi" araması için özel sayfa.
 *
 * Rakamlar Gürbüz Gövrek'in 2026 tespitlerinden, saha bilgisi ise Tıpfak
 * kılavuzundan gelir. İkisi de kaynağıyla birlikte belirtilir; sayı üretilmez.
 */
const title = "Tıp Fakültesi Tercihi 2026: Kontenjan, Sıralama ve Karar Ölçütleri";
const description =
  "2026’da tıp kontenjanı 85 azaldı, diş hekimliği 761. Üç yeni tıp fakültesi açıldı. Tıp tercihinde sıralama dışında nelere bakılmalı, hangi kaynaklar okunmalı?";
const pageUrl = `${CANONICAL_SITE_URL}/tip-fakultesi-tercihi`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "article", locale: "tr_TR", url: pageUrl, title, description },
  twitter: { card: "summary_large_image", title, description },
};

const criteria = [
  {
    title: "Hastanenin durumu",
    detail:
      "Fakültenin kendi hastanesi var mı, vaka çeşitliliği nasıl? Klinik yılların niteliğini bu belirler.",
  },
  {
    title: "Şehirde yaşamak",
    detail:
      "Altı yıl uzun bir süre. Ulaşım, barınma ve sosyal olanaklar akademik performansı doğrudan etkiler.",
  },
  {
    title: "Sınav ve değerlendirme düzeni",
    detail: "Fakülteler arasında sınav sistemi ve ders yükü açısından belirgin farklar var.",
  },
  {
    title: "Akademik kadro",
    detail: "Öğretim üyesi sayısı ve profesör oranı, eğitimin yürütülme biçimini etkiler.",
  },
  {
    title: "TUS başarısı",
    detail: "Mezunların uzmanlık sınavındaki performansı, eğitimin uzun vadeli sonucunu gösterir.",
  },
];

// Rakamlar tek kaynaktan okunur; çalışma dosyası güncellendiğinde bu sayfa da güncellenir.
const tip = getFieldQuotaChange("Tıp");
const dis = getFieldQuotaChange("Diş hekimliği");

export default function TipFakultesiTercihiPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white pt-20">
      <header className="border-b border-navy/10 bg-cream py-12 sm:py-16">
        <Container className="max-w-3xl">
          <nav aria-label="Sayfa yolu" className="text-xs text-muted">
            <Link href="/" className="hover:text-navy">
              Ana Sayfa
            </Link>{" "}
            <span aria-hidden="true">/</span> Tıp Fakültesi Tercihi
          </nav>
          <h1 className="mt-5 font-serif text-3xl leading-[1.1] font-semibold text-navy sm:text-4xl">
            Tıp Fakültesi Tercihi 2026
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Tıp, altı yılı ve ardından gelen uzmanlık sürecini birlikte düşünmeyi gerektiren
            bir tercihtir. Bu sayfa 2026 dönemindeki kontenjan tablosunu ve sıralama dışında
            bakılması gereken ölçütleri bir arada veriyor.
          </p>
        </Container>
      </header>

      <div className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <section aria-labelledby="kontenjan">
            <h2 id="kontenjan" className="font-serif text-2xl font-semibold text-navy">
              2026’da kontenjan ne oldu?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Gürbüz Gövrek’in tespitlerine göre tıp fakültesi kontenjanı{" "}
              {Math.abs(tip?.change ?? 0)} kişi azaldı. Diş hekimliğindeki düşüş çok daha
              sert: {Math.abs(dis?.change ?? 0)} kontenjan. Hemşirelik dışındaki sağlık
              bölümlerinin kontenjanları da azaltıldı.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Buna karşılık üç yeni tıp fakültesi açıldı: Dokuz Eylül (İngilizce), Bitlis ve
              Burdur. Dokuz Eylül’ün ilk 5.000 içinde kendine yer bulması bekleniyor;
              Bitlis’in burs imkânı ise caydırıcı bulunuyor.
            </p>
            <div className="mt-5 border-l-2 border-gold pl-4">
              <p className="text-sm leading-7 text-muted">
                Bazı paylaşımlarda tıp kontenjanının toplamda arttığı gösteriliyor. Bölüm
                bazlı değişimi kendiniz görmek için{" "}
                <Link
                  href="/2026-kontenjan-degisimi"
                  className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
                >
                  kontenjan değişimi sayfasına
                </Link>{" "}
                bakabilirsiniz.
              </p>
            </div>
            <p className="mt-5 text-sm leading-7 text-ink">
              Diş hekimliğindeki {Math.abs(dis?.change ?? 0)}’lik düşüş özellikle önemli: bu ölçekte bir azalma ilk 50
              bindeki sıralamaları etkiler ve sıralamaların öne doğru ilerlemesi beklenir.
              Tıpla diş arasında kararsız olanların bunu hesaba katması gerekir.
            </p>
          </section>

          <section aria-labelledby="olcutler" className="mt-11">
            <h2 id="olcutler" className="font-serif text-2xl font-semibold text-navy">
              Sıralama dışında neye bakmalı?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Tıpta programlar arası fark, taban sıralamanın gösterdiğinden büyüktür. Altı yıl
              boyunca nerede okuyacağınızı belirleyen başlıklar şunlar:
            </p>
            <dl className="mt-6 grid gap-5">
              {criteria.map((item) => (
                <div key={item.title} className="border-l-2 border-gold pl-4">
                  <dt className="text-sm font-bold text-navy">{item.title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-muted">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="kaynaklar" className="mt-11">
            <h2 id="kaynaklar" className="font-serif text-2xl font-semibold text-navy">
              Hangi kaynakları okumalı?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              Bu başlıkların çoğu resmî tablolarda görünmez.{" "}
              <Link
                href="/raporlar/tip-fakulteleri"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                Tıpfak Tercih Kılavuzu
              </Link>{" "}
              tam da bu boşluğu dolduruyor: tıp fakültelerinde okuyan gönüllü öğrenci
              temsilcileri kendi fakültelerini 25 sabit soruya verdikleri yanıtlarla
              anlatıyor. Aynı sorular sorulduğu için fakülteler karşılaştırılabiliyor.
            </p>
            <p className="mt-4 text-sm leading-7 text-ink">
              Mesleğin kendisini tanımak içinse{" "}
              <Link
                href="/#sunum-kosesi"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                sunum köşesindeki
              </Link>{" "}
              pratisyen hekimlik serisi eğitim sürecini, günlük sorumlulukları, TUS eşiğini ve
              uzmanlık yollarını on slaytta anlatıyor.
            </p>
          </section>

          <section aria-labelledby="siralamaniz" className="mt-11 border-t border-navy/10 pt-8">
            <h2 id="siralamaniz" className="font-serif text-2xl font-semibold text-navy">
              Sıralamanıza hangi programlar uyuyor?
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink">
              <Link
                href="/tercih-robotu"
                className="font-bold text-blue-deep underline underline-offset-4 hover:text-navy"
              >
                Tercih robotunda
              </Link>{" "}
              puan türünü sayısal seçip başarı sıranızı girin, bölüm alanına “tıp” yazın.
              Sıralamanıza uyan tıp programlarını, her biri için 2023–2026 sıralama seyri ve
              2023–2026 kontenjan değişimiyle birlikte görürsünüz.
            </p>

            <div className="mt-7 rounded-sm border border-navy/12 bg-navy p-7 text-white sm:p-8">
              <h3 className="font-serif text-xl font-semibold sm:text-2xl">
                Tıp tercihini birlikte değerlendirelim
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/70">
                Kontenjanın daraldığı bir yılda tıp listesi kurmak dikkat ister. Sıralamanıza
                uygun riskli–güvenli dengesini birlikte çıkaralım.
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
            Kontenjan değerlendirmeleri Gürbüz Gövrek’in kendi tespitleridir; kesin sonuç
            değildir. Nihai kontenjan ve taban puanlar tercih dönemi sonunda ÖSYM tarafından
            açıklanır.
          </p>
        </Container>
      </div>
    </main>
  );
}
