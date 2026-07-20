import type { MediaArticle } from "@/types";

// Bir karta dış bağlantı eklemek için externalUrl, video eklemek için videoUrl
// alanını kullanın. Ayrıntılı örnekler CONTENT_GUIDE.md dosyasındadır.
export const mediaArticles: readonly MediaArticle[] = [
  {
    category: "Tercih Rehberi",
    title: "Tercih döneminde dikkat edilmesi gerekenler",
    summary: "Sıralama, özel koşullar ve hedef uyumunu aynı tabloda değerlendirmenin temel adımları.",
    content:
      "Tercih listesi yalnızca puan aralığına göre oluşturulmamalıdır. Programın eğitim içeriği, özel koşulları, kampüs yaşamı ve öğrencinin uzun vadeli hedefleri birlikte incelenmelidir. Liste; riskli, dengeli ve güvenli seçenekler arasında bilinçli bir denge kurmalıdır.",
  },
  {
    category: "Bölüm Analizi",
    title: "Bölüm seçerken yapılan yaygın hatalar",
    summary: "Popülerlikten önce yetenek, ilgi ve program içeriğine bakmak neden önemlidir?",
    content:
      "Bir bölümün yalnızca popülerliğine, taban puanına veya çevreden gelen önerilere göre seçilmesi öğrenciyi yanlış bir yola yöneltebilir. Ders planı, mesleki çalışma alanları ve öğrencinin ilgi-yetenek profili birlikte değerlendirilmelidir.",
  },
  {
    category: "Veri Okuryazarlığı",
    title: "Başarı sırası nasıl değerlendirilir?",
    summary: "Tek bir yıla bağlı kalmadan eğilimleri ve kontenjan değişimlerini okumak.",
    content:
      "Başarı sırası yorumlanırken tek bir yılın verisi yeterli değildir. Kontenjan değişimleri, programın geçmiş yıllardaki eğilimi ve adayın hedef aralığı karşılaştırılmalıdır. Veriler kesin sonuç değil, daha bilinçli karar için bir çerçeve sunar.",
  },
  {
    category: "Kampüs Yaşamı",
    title: "Üniversite seçerken kampüs neden önemlidir?",
    summary: "Öğrenme ortamı, sosyal yaşam ve şehir deneyiminin tercihe etkisi.",
    content:
      "Öğrenci üniversitede yalnızca ders programıyla değil, kampüsün sosyal ve akademik olanaklarıyla da yaşar. Ulaşım, barınma, kulüpler, laboratuvarlar ve şehir yaşamı kararın sürdürülebilirliği açısından önem taşır.",
  },
];
