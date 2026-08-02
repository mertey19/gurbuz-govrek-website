import type { Metadata } from "next";
import { ImageBoard, type BoardImage } from "@/components/gallery/ImageBoard";
import { CANONICAL_SITE_URL } from "@/config/site";

const title = "2026 Kontenjan Analizleri";
const description =
  "Sayısalda kontenjanı en çok artan ve azalan bölümler, mühendislik ve sağlık alanlarındaki kontenjan değişimi, kontenjanın sıralamaya gerçekleşen ve tahmini etkisi.";
const pageUrl = `${CANONICAL_SITE_URL}/kontenjan-analizleri`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

const TITLES = [
  "Kontenjan Değişiminin Sıralamaya Gerçekleşen Etkisi (2025)",
  "Kontenjan Değişiminin Sıralamaya Tahmini Etkisi (2026)",
  "Sayısalda Kontenjanı En Çok Artan Bölümler",
  "Sayısalda Kontenjanı En Çok Azalan Bölümler",
  "Kontenjanı En Çok Artan Mühendislikler",
  "Kontenjanı En Çok Azalan Mühendislikler",
  "Sağlık Bölümleri Kontenjan Değişimi",
  "Bilgisayar, Bilişim ve Yapay Zeka Bölümleri Kontenjan Değişimi",
];

const images: readonly BoardImage[] = TITLES.map((slideTitle, index) => {
  const base = `/images/kontenjan-analizleri/${String(index + 1).padStart(2, "0")}`;
  return {
    src: `${base}.webp`,
    thumb: `${base}-thumb.webp`,
    title: slideTitle,
    alt: `${slideTitle} — Gürbüz Gövrek kontenjan analizi tablosu`,
  };
});

export default function KontenjanAnalizleriPage() {
  return (
    <ImageBoard
      title={title}
      breadcrumb="Kontenjan Analizleri"
      lead="Kontenjan, başarı sıralamalarını belirleyen en güçlü etkenlerden biridir. Bu tablolar 2025 ve 2026 kontenjanlarını bölüm bazında karşılaştırıyor ve değişimin sıralamalara nasıl yansıdığını gösteriyor."
      images={images}
      footnote="Tablolar Gürbüz Gövrek tarafından hazırlanmıştır. 2026 sütunları tercih dönemi başındaki kontenjanları yansıtır; nihai kontenjan ve taban puanlar tercih dönemi sonunda ÖSYM tarafından açıklanır."
    />
  );
}
