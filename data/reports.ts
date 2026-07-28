/**
 * Tercih dönemi rapor ve kılavuzları.
 *
 * `publisher` alanı belgeyi kimin hazırladığını gösterir. Üçüncü taraflara ait
 * yayınlar sayfada bu bilgiyle sunulur; site bunları kendi çalışmasıymış gibi
 * göstermez.
 *
 * Dosyalar yayımlanmadan önce sayfa görüntüsü olarak yeniden kodlanıp
 * küçültülmüştür; özgün metin katmanı bu sürümlerde bulunmaz.
 */
export interface SiteReport {
  slug: string;
  title: string;
  description: string;
  publisher: string;
  /** true ise belge site sahibinin kendi derlemesidir. */
  ownWork: boolean;
  pages: number;
  sizeLabel: string;
  file: string;
}

export const reports: readonly SiteReport[] = [
  {
    slug: "yks-tercih-kilavuzu-2026",
    title: "2026 YKS Tercih Kılavuzu",
    description:
      "Tercih döneminin resmî kuralları: başvuru adımları, tercih hakkı, yerleştirme esasları ve özel koşullar. Liste hazırlamadan önce okunması gereken temel belge.",
    publisher: "ÖSYM / MEB",
    ownWork: false,
    pages: 30,
    sizeLabel: "2,9 MB",
    file: "/resources/raporlar/yks-tercih-kilavuzu-2026.pdf",
  },
  {
    slug: "universite-raporu-2025-2026",
    title: "YÖK Üniversite İzleme ve Değerlendirme Raporu 2025",
    description:
      "YÖK’ün üniversiteleri eğitim-öğretim, araştırma-geliştirme, uluslararasılaşma, sürdürülebilirlik ve topluma hizmet başlıklarında değerlendirdiği resmî izleme raporu.",
    publisher: "YÖK — Üniversite İzleme ve Değerlendirme Komisyonu",
    ownWork: false,
    pages: 251,
    sizeLabel: "21,0 MB",
    file: "/resources/raporlar/universite-raporu-2025-2026.pdf",
  },
  {
    slug: "tip-fakulteleri",
    title: "Tıp Fakülteleri Tercih Kılavuzu 2025",
    description:
      "Tıp fakültelerinde okuyan gönüllü öğrenci temsilcilerinin kendi fakültelerini 25 sabit soruyla anlattığı saha rehberi: eğitim kalitesi, şehir yaşamı, ulaşım, sosyal olanaklar ve sınav sistemi.",
    publisher: "Tıpfak — Tıp Doktorları ve Öğrencileri Platformu",
    ownWork: false,
    pages: 220,
    sizeLabel: "28,6 MB",
    file: "/resources/raporlar/tip-fakulteleri.pdf",
  },
  {
    slug: "tuma-2025-2026",
    title: "2025-2026 TÜMA Araştırması",
    description:
      "Türkiye Üniversite Memnuniyet Araştırması: öğrencilerin kendi üniversitelerini eğitim, kampüs ve akademik destek başlıklarında değerlendirdiği çalışma.",
    publisher: "ÜniAr — Üniversite Araştırmaları Laboratuvarı",
    ownWork: false,
    pages: 53,
    sizeLabel: "6,1 MB",
    file: "/resources/raporlar/tuma-2025-2026.pdf",
  },
  {
    slug: "urap-2025-2026",
    title: "2025-2026 URAP Sıralaması",
    description:
      "Üniversitelerin akademik performansını yayın, atıf ve proje üretimi üzerinden ölçen ulusal sıralama çalışması.",
    publisher: "ODTÜ URAP Araştırma Laboratuvarı",
    ownWork: false,
    pages: 31,
    sizeLabel: "1,0 MB",
    file: "/resources/raporlar/urap-2025-2026.pdf",
  },
];
