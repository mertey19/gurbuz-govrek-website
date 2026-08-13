import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("saraykoy-matematik-ozel-ders");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  {
    href: "/matematik-ozel-ders",
    label: "Matematik Özel Ders",
    detail: "Birebir konu anlatımı, eksik tamamlama ve deneme analizi.",
  },
  {
    href: "/denizli-ogrenci-koclugu",
    label: "Denizli Öğrenci Koçluğu",
    detail: "Haftalık program, hedef takibi ve motivasyon desteği.",
  },
];

const faqs: readonly BlogFaq[] = [
  {
    question: "1. Sarayköy Matematik özel ders hangi seviyelere uygundur?",
    answer:
      "İlkokul, ortaokul ve lise seviyelerinde uygulanabilir. Ders içeriği öğrencinin sınıfına ve hedeflerine göre belirlenebilir.",
  },
  {
    question: "2. Matematik özel ders haftada kaç gün yapılmalı?",
    answer:
      "Bu durum öğrencinin seviyesine ve sınav hedeflerine göre değişir. Konu eksiği fazla olan öğrencilerde daha sık çalışma tercih edilebilir.",
  },
  {
    question: "3. Özel derste yalnızca konu anlatımı mı yapılır?",
    answer:
      "Hayır. Konu anlatımının yanında soru çözümü, yanlış analizi ve tekrar çalışmaları da yapılabilir.",
  },
  {
    question: "4. Matematik özel ders sınav başarısını artırır mı?",
    answer:
      "Düzenli çalışma, doğru soru seçimi ve eksiklerin tamamlanması başarıyı destekler. Ancak sonuç, öğrencinin çalışma düzenine de bağlıdır.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "Millî Eğitim Bakanlığı — Matematik dersi öğretim programı",
    href: "https://www.meb.gov.tr/",
  },
  {
    label: "ÖSYM — TYT ve AYT konu dağılımları ve sınav takvimi",
    href: "https://osym.gov.tr/",
  },
];

export default function SaraykoyMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik bazı öğrenciler için zor görünebilir. Ancak doğru anlatım, bu algıyı kısa sürede değiştirebilir. Özellikle konu eksikleri birikmişse, birebir çalışma daha verimli ilerler. Çünkü öğrenci kendi hızında soru sorabilir. Üstelik anlamadığı noktaya yeniden dönebilir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Sarayköy Matematik özel ders desteği, öğrencinin mevcut seviyesine göre planlanabilir.
        Böylece ders süresi daha verimli kullanılabilir. Ayrıca öğretmen, öğrencinin zorlandığı
        konuları doğrudan fark eder. Sonrasında çalışma planı bu ihtiyaçlara göre şekillenir.
      </p>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">Matematik Özel Ders Kimler İçin Uygun?</h2>
        <p>
          Matematik özel ders yalnızca düşük not alan öğrenciler için değildir. Başarısını
          yükseltmek isteyen öğrenciler de birebir eğitimden yararlanabilir. Örneğin sınavlarda
          süre sorunu yaşayan bir öğrenci, soru çözme hızına odaklanabilir.
        </p>
        <p>
          Bunun yanında temel konularda eksik yaşayan öğrenciler için konu tekrarı yapılabilir.
          Ardından kolay sorulardan başlanabilir. Daha sonra orta ve ileri seviyedeki sorulara
          geçilebilir. Böylece öğrenci, konuyu adım adım öğrenir.
        </p>
      </section>

      <section aria-labelledby="nelere-odaklanilir">
        <h2 id="nelere-odaklanilir">
          Sarayköy&#39;de Matematik Derslerinde Nelere Odaklanılır?
        </h2>
        <p>
          Ders sürecinde yalnızca soru çözmek yeterli değildir. Öncelikle öğrencinin mevcut
          durumu belirlenir. Ardından konu eksikleri sıralanır. Sonrasında hedefe uygun bir
          çalışma düzeni oluşturulur.
        </p>
        <p>
          Örneğin bir öğrenci problemler konusunda zorlanıyorsa, önce problem okuma becerisi ele
          alınabilir. Daha sonra işlem adımları çalışılabilir. Son olarak farklı soru tipleri
          üzerinde pratik yapılabilir.
        </p>
        <p>
          Sarayköy Matematik özel ders sürecinde bu yaklaşım, öğrencinin konuyu ezberlemek
          yerine anlamasına yardımcı olur. Ayrıca düzenli tekrar, öğrenilen bilgilerin daha uzun
          süre korunmasını destekler.
        </p>
      </section>

      <section aria-labelledby="birebir-avantaj">
        <h2 id="birebir-avantaj">Sınav Başarısı İçin Birebir Çalışmanın Avantajı Nedir?</h2>
        <p>
          Birebir dersin en önemli avantajlarından biri kişiye özel ilerlemedir. Öğrenci derste
          daha fazla soru çözebilir. Ayrıca yanlış yaptığı sorular hemen incelenebilir.
        </p>
        <p>
          Bunun yanında sınav kaygısı yaşayan öğrenciler, düzenli pratik sayesinde kendini daha
          hazır hissedebilir. Çünkü soru çeşitleri arttıkça karşılaşılan yeni sorular azalır.
          Böylece sınav sırasında zaman yönetimi de gelişebilir.
        </p>
      </section>

      <section aria-labelledby="nasil-planlanmali">
        <h2 id="nasil-planlanmali">Sarayköy Matematik Özel Ders Nasıl Planlanmalı?</h2>
        <p>
          Ders sıklığı öğrencinin hedefiyle bağlantılı olarak belirlenir. Örneğin okul sınavına
          hazırlanan bir öğrenci için kısa süreli yoğun tekrar planlanabilir. YKS veya LGS
          hazırlığında ise daha uzun soluklu bir program tercih edilebilir.
        </p>
        <p>
          Ayrıca ders dışında soru çözümü için zaman ayrılmalıdır. Çünkü kalıcı öğrenme yalnızca
          ders saatinde gerçekleşmez. Düzenli tekrar, yanlış analizi ve soru pratiği süreci
          tamamlar.
        </p>
      </section>

      <section aria-labelledby="dogru-calisma-duzeni">
        <h2 id="dogru-calisma-duzeni">
          Sarayköy Matematik Özel Ders Arayan Öğrenciler İçin Doğru Çalışma Düzeni
        </h2>
        <p>
          Sarayköy&#39;de matematik desteği arayan öğrenciler için ders seçerken yalnızca ders
          saatine bakmak yeterli değildir. Öğretmenin öğrencinin seviyesini analiz etmesi, konu
          eksiklerini belirlemesi ve soru çözüm sürecini takip etmesi önemlidir. Bununla
          birlikte LGS, TYT, AYT veya okul sınavı gibi farklı hedeflere uygun çalışma
          yapılmalıdır. Böylece Sarayköy Matematik özel ders süreci, öğrencinin gerçek
          ihtiyaçlarına göre ilerler. Düzenli takip, yanlışların incelenmesi ve seviyeye uygun
          soru çözümü ise matematikte daha sağlam bir temel oluşturabilir.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
