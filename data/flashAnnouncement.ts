/**
 * Ana sayfadaki flaş duyuru.
 *
 * Tek yerden yönetilir: metni değiştirmek ya da duyuruyu kaldırmak için bu dosya
 * düzenlenir. `isActive` false yapıldığında bileşen hiç render edilmez.
 *
 * Kalıcı bir tanıtım alanı değildir; tercih dönemi gibi zamanı belirli duyurular
 * içindir. Dönem bitince `isActive` kapatılmalıdır.
 */
export const flashAnnouncement = {
  isActive: true,
  badge: "Yeni",
  title: "Tercih Robotu yayında",
  description:
    "Puan türünüzü ve başarı sıranızı girin; sıralamanıza uyan programların tamamını, kontenjan ve akademik kadro bilgileriyle birlikte anında görün.",
  ctaLabel: "Tercih Robotunu Aç",
  ctaHref: "/tercih-robotu",
} as const;
