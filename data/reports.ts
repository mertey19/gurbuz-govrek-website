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
  /** Site üzerinde barındırılan dosya. Yeniden yayımı yasak belgelerde boştur. */
  file?: string;
  /**
   * Belge sitede barındırılamıyorsa yayıncının kendi adresi. YÖK raporu gibi
   * yeniden yayımı açıkça yasaklanmış kaynaklar burada tanıtılır, kopyalanmaz.
   */
  externalUrl?: string;
  /** Barındırmama gerekçesi; kartta ziyaretçiye gösterilir. */
  externalNote?: string;
  /** Tanıtım sayfasının giriş paragrafı. */
  intro: string;
  /** Belgede gerçekten yazan başlıklar; uydurma veri eklenmez. */
  highlights: readonly { title: string; detail: string }[];
}

export const reports: readonly SiteReport[] = [
  {
    slug: "yks-tercih-kilavuzu-2026",
    title: "2026 YKS Tercih Süreci Öğrenci ve Veli Bilgilendirme Kılavuzu",
    description:
      "MEB’in öğrenci ve velilere yönelik rehberlik kılavuzu: karar verme basamakları, kendini tanıma, üniversite seçim ölçütleri ve mesleklerle ilgili doğru bilinen yanlışlar.",
    publisher: "Millî Eğitim Bakanlığı",
    ownWork: false,
    pages: 30,
    sizeLabel: "2,9 MB",
    file: "/resources/raporlar/yks-tercih-kilavuzu-2026.pdf",
    intro:
      "Bu kılavuz bir program kataloğu değil; tercih sürecini bir karar verme süreci olarak ele alan rehberlik belgesidir. Öğrencinin kendini tanımasından aile içi iletişime, burs olanaklarından mesleklerle ilgili yanlış bilinenlere kadar sürecin insani tarafını anlatır.",
    highlights: [
      { title: "Karar verme basamakları", detail: "Tercih sürecinin adım adım nasıl yürütüleceği ve her adımda hangi soruların sorulması gerektiği." },
      { title: "Kendini tanımak", detail: "Doğru tercihin ilk adımı olarak ilgi, yetenek ve değerlerin değerlendirilmesi." },
      { title: "Rehberlik servisiyle iş birliği", detail: "Okuldaki rehberlik ve psikolojik danışma servisinin süreçte nasıl kullanılacağı." },
      { title: "Üniversite seçim ölçütleri", detail: "Bölüm dışında dikkate alınabilecek ölçütler ve başvurulabilecek bilgi kaynakları." },
      { title: "Puan türleri ve başarı sırası alt sınırı", detail: "Yükseköğretim programlarının puan türleri ve başvuru için gereken en düşük başarı sıralamaları." },
      { title: "Doğru bilinen yanlışlar", detail: "Meslekler hakkında yaygın olan ama gerçeği yansıtmayan kabuller." },
    ],
  },
  {
    slug: "universite-raporu-2025-2026",
    title: "YÖK Üniversite İzleme ve Değerlendirme Raporu 2025",
    description:
      "YÖK’ün üniversiteleri eğitim-öğretim, araştırma-geliştirme, uluslararasılaşma, sürdürülebilirlik ve topluma hizmet başlıklarında değerlendirdiği resmî izleme raporu.",
    publisher: "YÖK — Üniversite İzleme ve Değerlendirme Komisyonu",
    ownWork: false,
    pages: 251,
    sizeLabel: "",
    externalUrl: "https://www.yok.gov.tr/",
    externalNote:
      "Raporun künyesi, YÖK’ten izin alınmadan yeniden yayımlanmasını yasaklamaktadır. Bu nedenle burada barındırılmıyor; belgeye YÖK’ün kendi sitesinden ulaşabilirsiniz.",
    intro:
      "YÖK’ün üniversiteleri her yıl beş ana başlıkta değerlendirdiği resmî izleme raporu. Bir üniversitenin yalnızca eğitimini değil, araştırma üretimini, uluslararası bağlantılarını ve topluma dönük çalışmalarını da kapsar.",
    highlights: [
      { title: "A. Eğitim ve öğretim", detail: "Programlar, öğrenci ve öğretim üyesi verileri." },
      { title: "B. Araştırma-geliştirme, proje ve yayın", detail: "Bilimsel üretim ve proje performansı." },
      { title: "C. Uluslararasılaşma", detail: "Uluslararası öğrenci, iş birliği ve değişim programları." },
      { title: "D. Sürdürülebilirlik", detail: "Kurumsal sürdürülebilirlik uygulamaları." },
      { title: "E. Topluma hizmet ve sosyal sorumluluk", detail: "Üniversitelerin toplumsal katkı çalışmaları." },
    ],
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
    intro:
      "Bu kılavuzu bir kurum değil, tıp fakültelerinde okuyan öğrenciler hazırladı. Türkiye’nin dört bir yanındaki gönüllü temsilciler kendi fakültelerini 25 sabit soruya verdikleri yanıtlarla anlattı. Sıralama tablolarında görünmeyen şeyleri — şehirde yaşamanın nasıl olduğunu, hastanenin durumunu, sınav sistemini — okuyabileceğiniz tek kaynak türü budur.",
    highlights: [
      { title: "25 sabit soru", detail: "Her fakülte aynı sorulara yanıt verdiği için karşılaştırma yapılabiliyor." },
      { title: "Sahadan birinci elden bilgi", detail: "Yanıtlar o fakültede okuyan öğrencilerden geliyor, tanıtım broşüründen değil." },
      { title: "Akademik yapının ötesi", detail: "Eğitim kalitesi kadar şehir yaşamı, ulaşım, sosyal olanaklar ve barınma da ele alınıyor." },
      { title: "Sınav sistemi", detail: "Fakültelerin sınav ve değerlendirme düzenlerindeki farklar." },
      { title: "Hazırlayan", detail: "Tıp Doktorları ve Öğrencileri Platformu (Tıpfak) temsilcileri ve editör ekibi." },
    ],
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
    intro:
      "TÜMA, üniversiteleri akademik yayın sayısıyla değil, orada okuyan öğrencilerin memnuniyetiyle sıralar. 2016’dan bu yana ÜniAr tarafından yürütülüyor. Kritik bir yöntem tercihi var: istatistiksel normalleştirme yapılmıyor, öğrencilerin verdiği puanlar olduğu gibi kullanılıyor.",
    highlights: [
      { title: "Öğrenci beyanı esas", detail: "Sıralama, öğrencilerin kendi memnuniyet puanlarına dayanır." },
      { title: "Normalleştirme yok", detail: "İstatistiksel düzeltme uygulanmaz; ham beyan korunur." },
      { title: "2016’dan bu yana", detail: "Araştırma ilk kez 2016’da yapıldı, düzenli olarak tekrarlanıyor." },
      { title: "Bağımsız laboratuvar", detail: "ÜniAr, yükseköğretim üzerine çalışan bağımsız bir araştırma kuruluşudur." },
      { title: "İki temel hedef", detail: "Öğrenci deneyimini zenginleştirmek ve üniversite yönetimlerine veri sağlamak." },
    ],
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
    intro:
      "URAP, üniversiteleri anketle değil, yayın ve atıf verisiyle sıralar. Kâr amacı gütmeyen bir kurumdur ve ekip çalışmayı gönüllü yürütür. 2025-2026 sıralaması 19 Ekim 2025’te açıklandı.",
    highlights: [
      { title: "15 gösterge", detail: "2009’dan beri kullanılan 9 göstergeye geçen yıl 6 yenisi eklendi." },
      { title: "TÜBİTAK proje sayısı", detail: "Yeni göstergelerden biri; üniversitelerin proje üretimini ölçüyor." },
      { title: "Ortak makale sayısı", detail: "Yurt içi ve uluslararası ortak yayınlar da göstergelere girdi." },
      { title: "Veri kaynağı", detail: "Clarivate Analytics/InCites ve YÖK’ün yayımladığı veriler kullanılıyor." },
      { title: "Neden anket yok", detail: "URAP, ankete dayalı sıralamalarda üniversitelerin kısa sürede yüzlerce sıra oynadığına dikkat çekiyor." },
      { title: "Makale ölçütü", detail: "SCI, SSCI ve AHCI taramalarında ilk %75’lik dilimdeki dergilerde basılan makaleler sayılıyor." },
    ],
  },
];

export type ReportSlug = (typeof reports)[number]["slug"];

/** Slug'ı bilinen bir raporu döndürür; bulunamazsa derleme yerine çalışma anında patlar. */
export function getReport(slug: string): SiteReport {
  const report = reports.find((item) => item.slug === slug);

  if (!report) {
    throw new Error(`Rapor bulunamadı: ${slug}`);
  }

  return report;
}
