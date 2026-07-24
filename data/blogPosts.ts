export const blogPosts = [
  {
    slug: "denizlide-yks-tercih-danismani-nasil-secilir",
    category: "Tercih Danışmanlığı",
    title: "Denizli’de YKS Tercih Danışmanı Nasıl Seçilir?",
    description:
      "Güncel verilerle çalışan, kişiye özel analiz yapan ve gerçekçi yönlendirme sunan bir YKS tercih danışmanını seçerken nelere dikkat edilmeli?",
    publishedAt: "2026-07-24",
    publishedAtLabel: "24 Temmuz 2026",
    readingTime: "7 dakika",
    image: "/images/one-to-one-consulting.png",
    imageAlt:
      "Gürbüz Gövrek öğrenciyle bire bir görüşmede üniversite tercih seçeneklerini değerlendiriyor",
  },
  {
    slug: "basari-sirasina-gore-tercih-listesi-nasil-hazirlanir",
    category: "Tercih Stratejisi",
    title: "Başarı Sırasına Göre Tercih Listesi Nasıl Hazırlanır?",
    description:
      "YKS başarı sırası, kontenjan değişimleri, geçmiş yıl eğilimleri ve kişisel hedefler birlikte değerlendirilerek dengeli tercih listesi hazırlama rehberi.",
    publishedAt: "2026-07-24",
    publishedAtLabel: "24 Temmuz 2026",
    readingTime: "8 dakika",
    image: "/images/preference-analysis.png",
    imageAlt:
      "YKS başarı sırası ve üniversite seçeneklerinin yer aldığı tercih analizi görüşmesi",
  },
  {
    slug: "vakif-mi-devlet-universitesi-mi",
    category: "Üniversite Karşılaştırması",
    title: "Vakıf mı Devlet Üniversitesi mi? Karar Verirken 8 Ölçüt",
    description:
      "Ücret ve burs koşullarından akademik kadroya, eğitim dilinden kampüs yaşamına kadar vakıf ve devlet üniversitelerini doğru ölçütlerle karşılaştırın.",
    publishedAt: "2026-07-24",
    publishedAtLabel: "24 Temmuz 2026",
    readingTime: "8 dakika",
    image: "/images/university-guidance.png",
    imageAlt:
      "Öğrencilerin devlet ve vakıf üniversitesi seçeneklerini karşılaştırdığı tercih danışmanlığı",
  },
  {
    slug: "universite-bolum-secerken-yapilan-hatalar",
    category: "Bölüm Seçimi",
    title: "Üniversite ve Bölüm Seçerken Yapılan 10 Hata",
    description:
      "Sadece puana, şehre veya popülerliğe göre karar vermek gibi yaygın tercih hatalarını ve bunların yerine uygulanabilecek doğru adımları öğrenin.",
    publishedAt: "2026-07-24",
    publishedAtLabel: "24 Temmuz 2026",
    readingTime: "7 dakika",
    image: "/images/guidance-introduction.png",
    imageAlt:
      "Üniversite ve bölüm seçimi hakkında öğrencilere rehberlik sunan Gürbüz Gövrek",
  },
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
export type BlogPostSlug = BlogPost["slug"];

export function getBlogPost(slug: BlogPostSlug): BlogPost {
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    throw new Error(`Blog yazısı bulunamadı: ${slug}`);
  }

  return post;
}
