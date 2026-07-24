export const blogPosts = [
  {
    slug: "denizli-yks-tercih-danismanligi",
    category: "YKS Tercih Rehberi",
    title: "Denizli YKS Tercih Danışmanlığı ile Doğru Üniversite Tercihi Nasıl Yapılır?",
    description:
      "Başarı sırası, kontenjanlar, bölüm olanakları ve kişisel hedefler birlikte değerlendirilerek bilinçli bir üniversite tercih listesi nasıl hazırlanır?",
    publishedAt: "2026-07-24",
    publishedAtLabel: "24 Temmuz 2026",
    readingTime: "8 dakika",
    image: "/images/preference-analysis.png",
    imageAlt:
      "Gürbüz Gövrek öğrencilerle YKS başarı sırası ve üniversite tercih seçeneklerini değerlendiriyor",
  },
] as const;

export type BlogPost = (typeof blogPosts)[number];
