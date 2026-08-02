import type { Metadata } from "next";
import { ImageBoard, type BoardImage } from "@/components/gallery/ImageBoard";
import { CANONICAL_SITE_URL } from "@/config/site";

const title = "Meslek Görselleri";
const description =
  "Bilgisayar mühendisliği ve kimya mühendisliğini temel görevler, eğitim ve kişilik uyumu, çalışma alanları, istihdam ve maaş ile gelecek başlıklarında anlatan görsel seriler.";
const pageUrl = `${CANONICAL_SITE_URL}/meslek-gorselleri`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pageUrl },
  openGraph: { type: "website", locale: "tr_TR", url: pageUrl, title, description },
};

const STEPS = [
  "Meslek ve Temel Görevler",
  "Eğitim ve Kişilik Uyumu",
  "Çalışma Alanları",
  "İstihdam ve Maaş",
  "Gelecek, Yapay Zeka ve Kariyer",
];

const images: readonly BoardImage[] = ["Bilgisayar Mühendisliği", "Kimya Mühendisliği"]
  .flatMap((profession, group) =>
    STEPS.map((step, step_index) => {
      const number = group * STEPS.length + step_index + 1;
      const base = `/images/meslek-gorselleri/${String(number).padStart(2, "0")}`;
      return {
        src: `${base}.webp`,
        thumb: `${base}-thumb.webp`,
        title: `${profession} · ${step}`,
        alt: `${profession}: ${step} — Gürbüz Gövrek meslek tanıtım görseli`,
      };
    }),
  );

export default function MeslekGorselleriPage() {
  return (
    <ImageBoard
      title={title}
      breadcrumb="Meslek Görselleri"
      lead="Her meslek beş başlıkta anlatılıyor: mesleğin ne yaptığı, eğitim süreci ve kimlere uyduğu, çalışma alanları, istihdam ve kazanç tablosu, yapay zekânın etkisiyle birlikte kariyer basamakları."
      images={images}
      footnote="Görseller Gürbüz Gövrek tarafından hazırlanmıştır. Maaş ve istihdam bilgileri piyasa gözlemine dayanır, kesin değer değildir; deneyim ve şehre göre değişir."
    />
  );
}
