import type { Metadata } from "next";
import { ImageBoard, type BoardImage } from "@/components/gallery/ImageBoard";
import { CANONICAL_SITE_URL } from "@/config/site";

const title = "2026 Kontenjan Analizleri";
const description =
  "Sayısal, eşit ağırlık ve sözel alanlarda kontenjanı artan ve azalan bölümlerin; mühendislik, sağlık, eğitim, iletişim ve turizm başlıklarında karşılaştırması.";
const pageUrl = `${CANONICAL_SITE_URL}/kontenjan-analizleri`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

const SERIES = [
  {
    directory: "kontenjan-kiyas-sayisal",
    titles: [
      "Sayısal Kontenjanı Artan Bölümler",
      "Sayısal Kontenjanı Azalan Bölümler",
      "Mühendislikte Kontenjanı Artan Bölümler",
      "Mühendislikte Kontenjanı Azalan Bölümler",
      "Sağlık Bölümlerinde Kontenjan Değişimi",
      "Yapay Zekâ ve Bilişim Bölümlerinde Kontenjan",
    ],
  },
  {
    directory: "kontenjan-kiyas-esit-agirlik",
    titles: [
      "Eşit Ağırlıkta Kontenjanı Artan Bölümler",
      "Eşit Ağırlıkta Kontenjanı Azalan Bölümler",
      "İİBF Bölümlerinde Kontenjan Değişimi",
      "Eğitim Fakültelerinde Kontenjan Değişimi",
      "Turizm Bölümlerinde Kontenjan Değişimi",
    ],
  },
  {
    directory: "kontenjan-kiyas-sozel",
    titles: [
      "Sözelde Kontenjanı Artan Bölümler",
      "Sözelde Kontenjanı Azalan Bölümler",
      "Eğitim Fakültelerinde Kontenjan Değişimi",
      "Fen-Edebiyat Bölümlerinde Kontenjan Değişimi",
      "İletişim Bölümlerinde Kontenjan Değişimi",
      "Radyo, Televizyon ve Sinemada Kontenjan",
    ],
  },
] as const;

const images: readonly BoardImage[] = SERIES.flatMap((series) =>
  series.titles.map((slideTitle, index) => {
    const base = `/images/sunum-kosesi/${series.directory}/${String(index + 1).padStart(2, "0")}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      title: slideTitle,
      alt: `${slideTitle} — Gürbüz Gövrek kontenjan analizi tablosu`,
    };
  }),
);

export default function KontenjanAnalizleriPage() {
  return (
    <ImageBoard
      title={title}
      breadcrumb="Kontenjan Analizleri"
      lead="Kontenjan, başarı sıralamalarını belirleyen en güçlü etkenlerden biridir. Bu tablolar sayısal, eşit ağırlık ve sözel programlardaki değişimi alan ve bölüm bazında karşılaştırıyor."
      images={images}
      footnote="Tablolar Gürbüz Gövrek tarafından hazırlanmıştır. 2026 sütunları tercih dönemi başındaki kontenjanları yansıtır; nihai kontenjan ve taban puanlar tercih dönemi sonunda ÖSYM tarafından açıklanır."
    />
  );
}
