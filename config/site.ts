export const siteConfig = {
  name: "Gürbüz Gövrek",
  title: "Gürbüz Gövrek | Matematik Öğretmeni ve Tercih Uzmanı",
  tagLine: "Matematik Öğretmeni · Tercih Uzmanı",
  description:
    "Matematik eğitimi, YKS tercih danışmanlığı, üniversite ve bölüm analizi, öğrenci koçluğu ve kişiye özel tercih yol haritası.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905013653371",
  whatsappMessage:
    "Merhaba Gürbüz Hocam, danışmanlık hizmetleriniz hakkında bilgi almak istiyorum.",
  contact: {
    phone: "+90 501 365 33 71",
    phoneHref: "tel:+905013653371",
    email: "gurbuzgovrek@gmail.com",
    emailHref: "mailto:gurbuzgovrek@gmail.com",
    hours: "WhatsApp üzerinden",
    location: "Yüz yüze ve online görüşme",
    instagram: "https://www.instagram.com/gurbuz.govrek/",
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

export const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const stats = [
  { value: "Birebir", label: "Öğrenci Görüşmesi" },
  { value: "Kişisel", label: "Tercih Yol Haritası" },
  { value: "Veriye Dayalı", label: "Üniversite Analizi" },
  { value: "Bütüncül", label: "Öğrenci ve Veli İletişimi" },
] as const;
