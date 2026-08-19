import type { Metadata } from "next";
import { ImageBoard, type BoardImage } from "@/components/gallery/ImageBoard";
import { CANONICAL_SITE_URL } from "@/config/site";

const title = "Meslek Slaytları";
const description =
  "Mühendislik, sağlık, ekonomi ve tasarım alanlarını görevler, eğitim, çalışma ortamı ve kariyer olanaklarıyla karşılaştıran meslek slaytları.";
const pageUrl = `${CANONICAL_SITE_URL}/meslek-gorselleri`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

const LEGACY_STEPS = [
  "Meslek ve Temel Görevler",
  "Eğitim ve Kişilik Uyumu",
  "Çalışma Alanları",
  "İstihdam ve Maaş",
  "Gelecek, Yapay Zeka ve Kariyer",
];

const legacyImages: readonly BoardImage[] = ["Bilgisayar Mühendisliği", "Kimya Mühendisliği"]
  .flatMap((profession, group) =>
    LEGACY_STEPS.map((step, step_index) => {
      const number = group * LEGACY_STEPS.length + step_index + 1;
      const base = `/images/meslek-gorselleri/${String(number).padStart(2, "0")}`;
      return {
        src: `${base}.webp`,
        thumb: `${base}-thumb.webp`,
        title: `${profession} · ${step}`,
        alt: `${profession}: ${step} — Gürbüz Gövrek meslek tanıtım görseli`,
      };
    }),
  );

const ATTACHED_SERIES = [
  { directory: "biyomedikal-biyosistem", title: "Biyomedikal ve Biyosistem Mühendisliği" },
  { directory: "diyetisyen-eczaci", title: "Diyetisyenlik ve Eczacılık" },
  { directory: "ebe-hemsire-fizyoterapi", title: "Ebelik, Hemşirelik ve Fizyoterapi" },
  { directory: "ekonomi-finans-uzmanligi", title: "Ekonomi ve Finans Uzmanlığı" },
  { directory: "fizyoterapi-ergoterapi", title: "Fizyoterapi ve Ergoterapi" },
  { directory: "maden-malzeme-nano-teknoloji", title: "Maden, Malzeme ve Nanoteknoloji Mühendisliği" },
  { directory: "mimarlik-peyzaj-mimarligi", title: "Mimarlık ve Peyzaj Mimarlığı" },
  { directory: "optisyenlik-odyometri", title: "Optisyenlik ve Odyometri" },
  { directory: "ucak-elektronik-govde-motor", title: "Uçak Elektroniği, Gövde ve Motor" },
] as const;

const attachedImages: readonly BoardImage[] = ATTACHED_SERIES.flatMap((series) =>
  Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    const base = `/images/sunum-kosesi/${series.directory}/${number}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      title: `${series.title} · Slayt ${index + 1}`,
      alt: `${series.title} meslek tanıtımı, ${index + 1}. slayt`,
    };
  }),
);

const images: readonly BoardImage[] = [...legacyImages, ...attachedImages];

export default function MeslekGorselleriPage() {
  return (
    <ImageBoard
      title={title}
      breadcrumb="Meslek Slaytları"
      lead="Meslekleri tek tek ve karşılaştırmalı serilerle inceleyin. Görevler, eğitim süreci, kişilik uyumu, çalışma alanları, istihdam ve kariyer olanakları her seri içinde adım adım anlatılıyor."
      images={images}
      footnote="Slaytlar Gürbüz Gövrek tarafından hazırlanmıştır. Maaş ve istihdam bilgileri piyasa gözlemine dayanır, kesin değer değildir; deneyim, kurum ve şehre göre değişebilir."
    />
  );
}
