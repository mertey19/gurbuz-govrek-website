export const CANONICAL_SITE_URL = "https://www.xn--grbzgvrek-47a5dc.com.tr" as const;

export const siteConfig = {
  name: "Gürbüz Gövrek",
  title: "Gürbüz Gövrek | Matematik Öğretmeni ve Tercih Uzmanı",
  tagLine: "Matematik Öğretmeni · Tercih Uzmanı",
  description:
    "Denizli tercih danışmanlığı, YKS tercih danışmanı desteği, matematik eğitimi, üniversite ve bölüm analizi, öğrenci koçluğu ve kişiye özel tercih yol haritası.",
  url: CANONICAL_SITE_URL,
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905013653371",
  whatsappMessage:
    "Merhaba Gürbüz Hocam, danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
  contact: {
    phone: "+90 501 365 33 71",
    phoneHref: "tel:+905013653371",
    email: "gurbuzgovrek@gmail.com",
    emailHref: "mailto:gurbuzgovrek@gmail.com",
    hours: "Randevu ile",
    location: "Yüz yüze ve online görüşme",
    instagram: "https://www.instagram.com/gurbuz.govrek/",
    youtube: "",
  },
  navigation: [
    { label: "Ana Sayfa", href: "/#ana-sayfa" },
    { label: "Hakkında", href: "/gurbuz-govrek" },
    { label: "Özgeçmiş", href: "/gurbuz-govrek#egitim-yolculugu" },
    { label: "Hizmetler", href: "/#hizmetler" },
    { label: "Özel Ders", href: "/matematik-ozel-ders" },
    { label: "Meslekler", href: "/meslekler" },
    { label: "Sunumlar", href: "/#sunum-kosesi" },
    { label: "Başarı Hikâyeleri", href: "/#basari" },
    { label: "Yorumlar", href: "/#yorumlar" },
    { label: "Etkinlikler", href: "/#etkinlikler" },
    { label: "Blog", href: "/blog" },
    { label: "Sık Sorulanlar", href: "/#sss" },
    { label: "İletişim", href: "/#iletisim" },
  ],
} as const;

export const siteNavigationGroups = [
  {
    label: "Ben Kimim?",
    items: [
      { label: "Hakkımda", href: "/gurbuz-govrek", description: "Eğitim yaklaşımı ve rehberlik anlayışı" },
      { label: "Özgeçmiş", href: "/gurbuz-govrek#egitim-yolculugu", description: "Eğitim ve mesleki deneyim" },
    ],
  },
  {
    label: "Eğitim & Danışmanlık",
    items: [
      { label: "Tüm Hizmetler", href: "/#hizmetler", description: "Çalışma alanlarının tamamı" },
      { label: "Denizli Tercih Danışmanlığı", href: "/denizli-tercih-danismanligi", description: "Üniversite tercih süreci için kişisel yol haritası" },
      { label: "Denizli Tercih Danışmanı", href: "/denizli-tercih-danismani", description: "Tercih danışmanı seçerken dikkat edilecek ölçütler" },
      { label: "YKS Tercih Danışmanlığı", href: "/denizli-yks-tercih-danismanligi", description: "Kişiye özel tercih yol haritası" },
      { label: "Üniversite ve Bölüm Analizi", href: "/universite-bolum-analizi", description: "Programları verilerle karşılaştırma" },
      { label: "Tercih Robotu", href: "/tercih-robotu", description: "Başarı sıranıza uygun programları sorgulayın" },
      { label: "Pamukkale Üniversitesi Rehberi", href: "/pamukkale-universitesi", description: "Denizli'de üniversite okumak ve PAÜ tercihi" },
      { label: "Öğrenci Koçluğu", href: "/denizli-ogrenci-koclugu", description: "Hedef, planlama ve akademik takip" },
      { label: "Meslek Seçimi Danışmanlığı", href: "/meslekler", description: "Meslekleri ve çalışma alanlarını tanıma" },
    ],
  },
  {
    label: "Matematik & Özel Ders",
    items: [
      { label: "Matematik Özel Ders", href: "/matematik-ozel-ders", description: "Ortaokul, lise ve TYT–AYT" },
      { label: "Matematik Eğitimi", href: "/#matematik", description: "Konu anlatımı ve soru stratejileri" },
      { label: "Akademik Takip", href: "/matematik-ozel-ders#calisma-sistemi", description: "Kişisel plan ve düzenli geri bildirim" },
    ],
  },
  {
    label: "Öğrenci Deneyimleri",
    items: [
      { label: "Öğrenci ve Veli Yorumları", href: "/#yorumlar", description: "Paylaşılan gerçek deneyimler" },
      { label: "Başarı Hikâyeleri", href: "/#basari", description: "Öğrencilerin gelişim yolculukları" },
      { label: "Kampüs Ziyaretleri", href: "/#kampus", description: "Üniversiteleri yerinde tanıma" },
    ],
  },
  {
    label: "Blog",
    items: [
      { label: "Blog", href: "/blog", description: "Güncel rehberler ve uzman yazıları" },
      { label: "İlçe Rehberleri", href: "/blog/ilceler", description: "Merkezefendi ve Pamukkale için ilçe yazıları" },
      { label: "Meslek Tanıtım Köşesi", href: "/meslekler", description: "115 meslek tanıtım dosyası" },
      { label: "2026 Kontenjan Değişimi", href: "/2026-kontenjan-degisimi", description: "Puan türü ve alan bazında kontenjan azalması" },
      { label: "Kontenjan Analizleri", href: "/kontenjan-analizleri", description: "Bölüm bazında artan ve azalan kontenjan tabloları" },
      { label: "Meslek Görselleri", href: "/meslek-gorselleri", description: "Bilgisayar ve kimya mühendisliği tanıtım serileri" },
      { label: "2026 YKS İstatistikleri", href: "/2026-yks-istatistikleri", description: "Test ortalamaları ve sıralamalara etkisi" },
      { label: "Tıp Fakültesi Tercihi", href: "/tip-fakultesi-tercihi", description: "Kontenjan, sıralama ve karar ölçütleri" },
      { label: "Raporlar ve Kılavuzlar", href: "/raporlar", description: "Tercih kılavuzu, üniversite ve tıp raporları" },
      { label: "Tercih Videoları", href: "/tercih-videolari", description: "Tercih, meslek ve üniversite video anlatımları" },
      { label: "Sunum ve Seminer Köşesi", href: "/#sunum-kosesi", description: "283 özgün eğitim görseli" },
      { label: "Etkinlikler", href: "/#etkinlikler", description: "Seminer ve öğrenci buluşmaları" },
      { label: "Sık Sorulan Sorular", href: "/#sss", description: "Merak edilen konuların yanıtları" },
    ],
  },
  {
    label: "İletişim",
    href: "/#iletisim",
  },
] as const;

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = buildWhatsappUrl(siteConfig.whatsappMessage);

/**
 * Blog yazılarındaki WhatsApp butonu.
 *
 * Ortak mesaj hangi yazıdan yazıldığını göstermiyordu; başlık metne girince
 * gelen mesajdan konu doğrudan anlaşılıyor. Satır sonu `%0A` olarak kodlanır,
 * WhatsApp bunu alt satır olarak basar.
 */
export function blogWhatsappMessage(title: string) {
  return `Merhaba\n${title} hakkında bilgi alabilir miyim?`;
}

export function blogWhatsappUrl(title: string) {
  return buildWhatsappUrl(blogWhatsappMessage(title));
}

export const stats = [
  { value: "Bire Bir", label: "Öğrenci Görüşmesi" },
  { value: "Kişisel", label: "Tercih Yol Haritası" },
  { value: "Veriye Dayalı", label: "Üniversite Analizi" },
  { value: "Bütüncül", label: "Öğrenci ve Veli İletişimi" },
] as const;
