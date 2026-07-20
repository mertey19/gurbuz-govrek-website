export const siteConfig = {
  name: "Gürbüz Gövrek",
  title: "Gürbüz Gövrek | Matematik Öğretmeni ve Tercih Uzmanı",
  tagLine: "Matematik Öğretmeni · Tercih Uzmanı",
  description:
    "Matematik eğitimi, YKS tercih danışmanlığı, üniversite ve bölüm analizi, öğrenci koçluğu ve kişiye özel tercih yol haritası.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  whatsappMessage:
    "Merhaba Gürbüz Hocam, danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
  contact: {
    phone: "",
    email: "",
    hours: "Randevu ile",
    location: "Yüz yüze ve online görüşme",
    instagram: "",
    youtube: "",
  },
  navigation: [
    { label: "Ana Sayfa", href: "#ana-sayfa" },
    { label: "Hakkında", href: "#hakkinda" },
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Başarı Hikâyeleri", href: "#basari" },
    { label: "Etkinlikler", href: "#etkinlikler" },
    { label: "Sık Sorulanlar", href: "#sss" },
    { label: "İletişim", href: "#iletisim" },
  ],
} as const;

export const stats = [
  { value: "Birebir", label: "Öğrenci Görüşmesi" },
  { value: "Kişisel", label: "Tercih Yol Haritası" },
  { value: "Veriye Dayalı", label: "Üniversite Analizi" },
  { value: "Bütüncül", label: "Öğrenci ve Veli İletişimi" },
] as const;
