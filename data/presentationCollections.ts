export type PresentationCategory = "seminer" | "ucak-uzay" | "endustri-isletme";

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
  slides: readonly PresentationSlide[];
}

function createSlides(
  directory: string,
  title: string,
  altPrefix: string,
): readonly PresentationSlide[] {
  return Array.from({ length: 10 }, (_, index) => {
    const slideNumber = index + 1;
    return {
      src: `/images/sunum-kosesi/${directory}/${String(slideNumber).padStart(2, "0")}.webp`,
      alt: `${altPrefix}, ${slideNumber}. slayt`,
      title: `${title} · Slayt ${slideNumber}`,
    };
  });
}

export const presentationCollections: readonly PresentationCollection[] = [
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
];
