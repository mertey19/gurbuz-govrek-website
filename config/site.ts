export const CANONICAL_SITE_URL = "https://www.xn--grbzgvrek-47a5dc.com.tr" as const;

export const siteConfig = {
  name: "Gürbüz Gövrek",
  title: "Gürbüz Gövrek | Matematik Öğretmeni ve Tercih Uzmanı",
  tagLine: "Matematik Öğretmeni · Tercih Uzmanı",
  description:
    "Matematik eğitimi, YKS tercih danışmanlığı, üniversite ve bölüm analizi, öğrenci koçluğu ve kişiye özel tercih yol haritası.",
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
    { label: "Hakkında", href: "/#hakkinda" },
    { label: "Özgeçmiş", href: "/#ozgecmis" },
    { label: "Hizmetler", href: "/#hizmetler" },
    { label: "Özel Ders", href: "/matematik-ozel-ders" },
    { label: "Meslekler", href: "/#meslek-kosesi" },
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
      { label: "Hakkımda", href: "/#hakkinda", description: "Eğitim yaklaşımı ve rehberlik anlayışı" },
      { label: "Özgeçmiş", href: "/#ozgecmis", description: "Eğitim ve mesleki deneyim" },
    ],
  },
  {
    label: "Eğitim & Danışmanlık",
    items: [
      { label: "Tüm Hizmetler", href: "/#hizmetler", description: "Çalışma alanlarının tamamı" },
      { label: "YKS Tercih Danışmanlığı", href: "/#danismanlik", description: "Kişiye özel tercih yol haritası" },
      { label: "Üniversite ve Bölüm Analizi", href: "/#analiz-merkezi", description: "Programları verilerle karşılaştırma" },
      { label: "Öğrenci Koçluğu", href: "/#danismanlik", description: "Hedef, planlama ve akademik takip" },
      { label: "Meslek Seçimi Danışmanlığı", href: "/#meslek-kosesi", description: "Meslekleri ve çalışma alanlarını tanıma" },
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
    label: "Kaynaklar",
    items: [
      { label: "YKS Tercih Blogu", href: "/blog", description: "Güncel rehberler ve uzman yazıları" },
      { label: "Meslek Tanıtım Köşesi", href: "/#meslek-kosesi", description: "115 meslek tanıtım dosyası" },
      { label: "Sunum ve Seminer Köşesi", href: "/#sunum-kosesi", description: "180 özgün eğitim görseli" },
      { label: "Etkinlikler", href: "/#etkinlikler", description: "Seminer ve öğrenci buluşmaları" },
      { label: "Sık Sorulan Sorular", href: "/#sss", description: "Merak edilen konuların yanıtları" },
    ],
  },
  {
    label: "İletişim",
    href: "/#iletisim",
  },
] as const;

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const stats = [
  { value: "Bire Bir", label: "Öğrenci Görüşmesi" },
  { value: "Kişisel", label: "Tercih Yol Haritası" },
  { value: "Veriye Dayalı", label: "Üniversite Analizi" },
  { value: "Bütüncül", label: "Öğrenci ve Veli İletişimi" },
] as const;
