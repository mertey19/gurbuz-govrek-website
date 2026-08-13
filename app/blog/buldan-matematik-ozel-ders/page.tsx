import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("buldan-matematik-ozel-ders");

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
    question: "1. Matematik özel derse hangi sınıflar katılabilir?",
    answer:
      "İlkokuldan lise son sınıfa kadar farklı seviyelerde birebir matematik desteği alınabilir. Program öğrencinin seviyesine göre düzenlenir.",
  },
  {
    question: "2. Özel derste sadece konu anlatımı mı yapılır?",
    answer:
      "Hayır. Konu anlatımının yanında soru çözümü, yanlış analizi ve tekrar çalışmaları yapılır.",
  },
  {
    question: "3. Matematik özel ders sınav başarısını artırır mı?",
    answer:
      "Düzenli çalışma, doğru kaynak kullanımı ve eksiklerin tamamlanması başarıyı destekler. Ancak sonuç öğrencinin çalışma düzenine de bağlıdır.",
  },
  {
    question: "4. Ders programı öğrencinin seviyesine göre hazırlanabilir mi?",
    answer:
      "Evet. Öğrencinin mevcut bilgisi, hedefi ve zorlandığı konular dikkate alınarak çalışma planı oluşturulur.",
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

export default function BuldanMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik bazı öğrenciler için zorlayıcı olabilir. Özellikle konu eksikleri arttıkça sorular daha karmaşık görünür. Ancak doğru çalışma yöntemiyle bu durum değişebilir. Düzenli destek alan öğrenci, hangi konularda zorlandığını daha net fark eder. Böylece çalışma süreci daha planlı ilerler."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Buldan Matematik özel ders, öğrencinin seviyesine uygun bir çalışma düzeni oluşturmayı
        amaçlar. Ders sırasında yalnızca konu anlatımına odaklanmaz. Öğrencinin soru çözme
        biçimi de incelenir. Çünkü aynı soruda zorlanan iki öğrencinin eksiği farklı olabilir.
      </p>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">Buldan’da Matematik Özel Ders Kimler İçin Uygun?</h2>
        <p>
          Matematik özel ders yalnızca başarısı düşük öğrenciler için değildir. Konuları iyi
          olan öğrenciler de destek alabilir. Örneğin sınavlarda zaman sorunu yaşayan bir
          öğrenci, farklı soru çözüm teknikleriyle hız kazanabilir.
        </p>
        <p>
          Bununla birlikte temel konularda eksik yaşayan öğrenciler için birebir çalışma daha
          kontrollü ilerler. Öğretmen, öğrencinin anlamadığı noktada durabilir. Ardından farklı
          bir örnek üzerinden konuyu açıklayabilir.
        </p>
      </section>

      <section aria-labelledby="hangi-konular">
        <h2 id="hangi-konular">Matematik Özel Derste Hangi Konular Çalışılır?</h2>
        <p>
          Çalışma programı öğrencinin sınıfına ve hedeflerine göre hazırlanır. İlköğretim
          seviyesinde temel işlemler, kesirler, problemler ve geometri öne çıkabilir. Lise
          seviyesinde ise denklem, fonksiyon, polinom, trigonometri ve analitik geometri gibi
          konular ele alınabilir.
        </p>
        <p>
          Özellikle sınava hazırlanan öğrenciler için soru çözümü büyük önem taşır. Çünkü
          yalnızca konu öğrenmek, sınav başarısını tek başına garanti etmez. Konuyu farklı soru
          tiplerinde uygulamak gerekir.
        </p>
      </section>

      <section aria-labelledby="daha-verimli">
        <h2 id="daha-verimli">Buldan Matematik Özel Ders Nasıl Daha Verimli Olur?</h2>
        <p>
          Verimli bir ders için öğrencinin mevcut seviyesini belirlemek iyi bir başlangıçtır.
          Ardından eksik konular öncelik sırasına alınır. Her dersin sonunda kısa bir soru
          değerlendirmesi yapılır.
        </p>
        <p>
          Ayrıca öğrencinin yanlış yaptığı sorular kaydedilir. Sonraki derslerde bu sorular
          yeniden ele alınır. Böylece aynı hatanın tekrarlanması önlenir.
        </p>
        <p>
          Buldan Matematik özel ders de veliler için öğretmenin iletişim biçimi de önemlidir.
          Öğrencinin soru sormaktan çekinmediği bir ders ortamı öğrenmeyi kolaylaştırır. Öğrenci
          kendini rahat hissettiğinde matematiğe karşı yaklaşımı da olumlu yönde değişir.
        </p>
      </section>

      <section aria-labelledby="dogru-calisma-duzeni">
        <h2 id="dogru-calisma-duzeni">
          Buldan Matematik Özel Ders Arayanlar İçin Doğru Çalışma Düzeni
        </h2>
        <p>
          Buldan’da matematik desteği arayan öğrenciler için birebir ders, kişisel eksiklere
          odaklanma fırsatı sunar. İlk dersten önce konu seviyesinin belirlenmesi, sonraki
          çalışmaların daha verimli ilerlemesine yardımcı olur. Özellikle sınava hazırlanan
          öğrencilerde düzenli soru çözümü, yanlış analizi ve haftalık tekrarlar çalışma
          disiplinini güçlendirir. Buldan Matematik özel ders sürecinde amaç yalnızca daha fazla
          soru çözmek değil, öğrencinin soruyu nasıl analiz edeceğini öğrenmesini sağlamaktır.
          Bu yaklaşım, matematikte kalıcı öğrenme ve daha kontrollü bir sınav hazırlığı için
          güçlü bir temel oluşturur.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
