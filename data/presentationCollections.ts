export type PresentationCategory =
  | "kontenjan"
  | "yks-istatistikleri"
  | "seminer"
  | "tuma"
  | "ucak-uzay"
  | "endustri-isletme"
  | "bilgisayar-yazilim"
  | "bilgisayar-matematik"
  | "makine-mekatronik"
  | "mimarlik-insaat"
  | "tip-dis"
  | "hukuk-psikoloji"
  | "ekonomi-isletme";

export interface PresentationSlide {
  src: string;
  alt: string;
  title: string;
}

export interface PresentationCollection {
  id: PresentationCategory;
  label: string;
  shortLabel: string;
  description: string;
  thumbnailFit?: "cover" | "contain";
  slides: readonly PresentationSlide[];
}

function createSlides(
  directory: string,
  title: string,
  altPrefix: string,
  count = 10,
): readonly PresentationSlide[] {
  return Array.from({ length: count }, (_, index) => {
    const slideNumber = index + 1;
    return {
      src: `/images/sunum-kosesi/${directory}/${String(slideNumber).padStart(2, "0")}.webp`,
      alt: `${altPrefix}, ${slideNumber}. slayt`,
      title: `${title} · Slayt ${slideNumber}`,
    };
  });
}

function createNamedSlides(
  directory: string,
  slideTitles: readonly string[],
  altPrefix: string,
): readonly PresentationSlide[] {
  return slideTitles.map((slideTitle, index) => ({
    src: `/images/sunum-kosesi/${directory}/${String(index + 1).padStart(2, "0")}.webp`,
    alt: `${altPrefix}: ${slideTitle}`,
    title: slideTitle,
  }));
}

export const presentationCollections: readonly PresentationCollection[] = [
  {
    id: "kontenjan",
    label: "YKS Kontenjan Değişimi",
    shortLabel: "Kontenjan",
    description:
      "YKS kontenjanlarının 2023–2026 yılları arasındaki değişimini genel, sayısal, eşit ağırlık ve sözel puan türleri üzerinden karşılaştıran güncel görsel seri.",
    thumbnailFit: "contain",
    slides: createNamedSlides(
      "kontenjan",
      [
        "Genel Kontenjan Değişimi",
        "Sayısal Kontenjan Değişimi I",
        "Sayısal Kontenjan Değişimi II",
        "Eşit Ağırlık ve Sözel Kontenjan Değişimi",
      ],
      "Gürbüz Gövrek YKS kontenjan değişimi",
    ),
  },
  {
    id: "yks-istatistikleri",
    label: "YKS İstatistikleri",
    shortLabel: "İstatistikler",
    description:
      "2021–2026 YKS verilerini test ortalamaları, puan aralıkları ve puan türlerine göre yığınsal dağılımlarla karşılaştıran 7 görsellik veri serisi.",
    slides: createNamedSlides(
      "yks-istatistikleri",
      [
        "YKS Testlerinin Ortalamaları",
        "180 Puan Üstü Aday Sayıları",
        "TYT Puanı Yığınsal Dağılım",
        "Sayısal Puan Yığınsal Dağılım",
        "Eşit Ağırlık Puanı Yığınsal Dağılım",
        "Sözel Puan Yığınsal Dağılım",
        "Dil Puanı Yığınsal Dağılım",
      ],
      "Gürbüz Gövrek YKS istatistikleri",
    ),
  },
  {
    id: "seminer",
    label: "Seminer Slaytları",
    shortLabel: "Seminer",
    description:
      "Tercihler 2026 sunumundan; doğru tercih, üniversite seçimi ve gelecek planlamasına yönelik görsel anlatımlar.",
    slides: createSlides(
      "seminer",
      "Tercihler 2026",
      "Gürbüz Gövrek Tercihler 2026 seminer sunumu",
    ),
  },
  {
    id: "tuma",
    label: "TÜMA 2025 Araştırması",
    shortLabel: "TÜMA 2025",
    description:
      "Türkiye Üniversite Memnuniyet Araştırması 2025 sonuçlarını; öğrenci deneyimi ve üniversite memnuniyeti başlıklarıyla özetleyen 9 görsellik seri.",
    slides: createSlides(
      "tuma",
      "TÜMA 2025 Araştırması",
      "Türkiye Üniversite Memnuniyet Araştırması 2025 sunumu",
      9,
    ),
  },
  {
    id: "ucak-uzay",
    label: "Uçak ve Uzay Mühendisliği",
    shortLabel: "Uçak & Uzay",
    description:
      "Havacılık ve uzay mühendisliğinin görevlerini, eğitim yolunu ve kariyer olanaklarını anlatan 10 bölümlük seri.",
    slides: createSlides(
      "ucak-uzay",
      "Uçak ve Uzay Mühendisliği",
      "Uçak ve Uzay Mühendisliği meslek tanıtım sunumu",
    ),
  },
  {
    id: "endustri-isletme",
    label: "Endüstri ve İşletme Mühendisliği",
    shortLabel: "Endüstri & İşletme",
    description:
      "Endüstri ve işletme mühendisliğini çalışma alanları, yetkinlikler ve kariyer yolları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "endustri-isletme",
      "Endüstri ve İşletme Mühendisliği",
      "Endüstri ve İşletme Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "bilgisayar-yazilim",
    label: "Bilgisayar ve Yazılım Mühendisliği",
    shortLabel: "Bilgisayar & Yazılım",
    description:
      "Bilgisayar ve yazılım mühendisliğini odak alanları, eğitim içerikleri ve kariyer seçenekleri üzerinden karşılaştıran seri.",
    slides: createSlides(
      "bilgisayar-yazilim",
      "Bilgisayar ve Yazılım Mühendisliği",
      "Bilgisayar ve Yazılım Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "bilgisayar-matematik",
    label: "Bilgisayar ve Matematik Mühendisliği",
    shortLabel: "Bilgisayar & Matematik",
    description:
      "Bilgisayar ve matematik mühendisliğinin problem çözme yaklaşımlarını, derslerini ve çalışma alanlarını karşılaştıran seri.",
    slides: createSlides(
      "bilgisayar-matematik",
      "Bilgisayar ve Matematik Mühendisliği",
      "Bilgisayar ve Matematik Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "makine-mekatronik",
    label: "Makine ve Mekatronik Mühendisliği",
    shortLabel: "Makine & Mekatronik",
    description:
      "Makine ve mekatronik mühendisliğini eğitim yolculuğu, temel yetkinlikler ve kariyer alanları açısından anlatan seri.",
    slides: createSlides(
      "makine-mekatronik",
      "Makine ve Mekatronik Mühendisliği",
      "Makine ve Mekatronik Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "mimarlik-insaat",
    label: "Mimarlık ve İnşaat Mühendisliği",
    shortLabel: "Mimarlık & İnşaat",
    description:
      "Mimarlık ile inşaat mühendisliğinin tasarım, teknik sorumluluk, eğitim ve çalışma alanlarını karşılaştıran seri.",
    slides: createSlides(
      "mimarlik-insaat",
      "Mimarlık ve İnşaat Mühendisliği",
      "Mimarlık ve İnşaat Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "tip-dis",
    label: "Tıp ve Diş Hekimliği",
    shortLabel: "Tıp & Diş",
    description:
      "Tıp doktorluğu ve diş hekimliğini eğitim süresi, çalışma düzeni, uzmanlaşma ve kariyer seçenekleriyle karşılaştıran seri.",
    slides: createSlides(
      "tip-dis",
      "Tıp ve Diş Hekimliği",
      "Tıp ve Diş Hekimliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "hukuk-psikoloji",
    label: "Hukuk ve Psikoloji",
    shortLabel: "Hukuk & Psikoloji",
    description:
      "Hukuk ve psikolojiyi çalışma biçimleri, insanla kurdukları ilişki, eğitim süreci ve kariyer yollarıyla ele alan seri.",
    slides: createSlides(
      "hukuk-psikoloji",
      "Hukuk ve Psikoloji",
      "Hukuk ve Psikoloji karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "ekonomi-isletme",
    label: "Çalışma Ekonomisi ve İşletme",
    shortLabel: "Ekonomi & İşletme",
    description:
      "Çalışma ekonomisi ile işletme bölümlerini dersler, yetkinlikler ve mezuniyet sonrası kariyer rotaları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "ekonomi-isletme",
      "Çalışma Ekonomisi ve İşletme",
      "Çalışma Ekonomisi ve İşletme karşılaştırmalı bölüm tanıtım sunumu",
    ),
  },
];

export const presentationSlideCount = presentationCollections.reduce(
  (total, collection) => total + collection.slides.length,
  0,
);
