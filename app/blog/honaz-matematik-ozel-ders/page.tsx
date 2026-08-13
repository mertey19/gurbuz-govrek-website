import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("honaz-matematik-ozel-ders");

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
    question: "Honaz’da matematik özel ders online alınabilir mi?",
    answer:
      "Evet. Honaz da online ders seçeneği mevcut. Bulunduğunuz ortamdan rahatlıkla ders alabilirsiniz.",
  },
  {
    question: "LGS öğrencisi özel derse ne zaman başlamalı?",
    answer:
      "Konu eksikleri erken fark edilirse çalışma daha rahat ilerler. Ancak sınava yakın dönemde de belirli konu ve soru tiplerine odaklanan çalışmalar yapılabilir.",
  },
  {
    question: "TYT matematik için özel ders faydalı olur mu?",
    answer:
      "Evet, özellikle temel işlem hataları, problem çözme ve süre yönetimi konusunda birebir çalışma yararlı olabilir. Öğrencinin yanlış soruları üzerinden ilerlemek çalışma sürecini somutlaştırır.",
  },
  {
    question: "Online ders mi, yüz yüze ders mi daha iyi?",
    answer:
      "Bu sorunun cevabı öğrencinin çalışma alışkanlığına bağlıdır. Evde bilgisayar başında rahat çalışan öğrenci online dersi tercih edebilir. Öğretmenle aynı ortamda çalışmayı seven öğrenci ise yüz yüze dersten yararlanabilir.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "Millî Eğitim Bakanlığı — Matematik dersi öğretim programı ve sınav takvimi",
    href: "https://www.meb.gov.tr/",
  },
  {
    label: "ÖSYM — TYT ve AYT konu dağılımları ve sınav takvimi",
    href: "https://osym.gov.tr/",
  },
];

export default function HonazMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematikte birkaç konu geride kaldığında, sonraki üniteler de zorlaşabilir. Özellikle problem sorularında bu durum daha net görülür. Çünkü öğrenci formülü bilse bile soruda hangi bilgiyi kullanacağını bulamayabilir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Honaz Matematik Özel Ders desteği, bu noktada öğrencinin kendi seviyesine göre
        ilerlemesine yardımcı olur.
      </p>

      <section aria-labelledby="zorlanilan-konu">
        <h2 id="zorlanilan-konu">Matematikte Zorlanılan Konu Nasıl Bulunur?</h2>
        <p>
          Bir öğrenci kesirlerde rahat olabilir. Ancak oran-orantı sorularında işlem sırasını
          karıştırabilir. Başka bir öğrenci ise denklemleri çözerken zorlanmayabilir, fakat uzun
          problemleri anlamakta güçlük çekebilir.
        </p>
        <p>
          Bu yüzden Honaz Matematik Özel Ders sürecinde yalnızca konu anlatımına odaklanmak
          yerine öğrencinin soru çözme biçimine bakmak önemlidir. Örneğin öğretmen birkaç farklı
          seviyede soru sorabilir. Sonuçta hangi aşamada hata yapıldığı daha kolay görülür.
        </p>
        <p>
          Öğrencinin yanlış yaptığı sorular da önemli ipuçları verir. Çünkü aynı hata birkaç
          farklı testte tekrar ediyorsa, sorun yalnızca dikkatsizlik olmayabilir. Temel bir konu
          eksikliği veya işlem alışkanlığı üzerinde çalışmak gerekebilir.
        </p>
      </section>

      <section aria-labelledby="okul-sinavlari">
        <h2 id="okul-sinavlari">Honaz’da Okul Sınavlarına Hazırlık</h2>
        <p>
          Honaz’daki öğrenciler için okul sınavları da özel ders planının önemli bir parçasıdır.
          Okulların 6, 7, 8, 9 ve 10. sınıflar için ortak yazılı sınav takvimi bilinmektedir.
          Matematik dersleri için farklı sınıf seviyelerinde sınav tarihleri de bilinmektedir.
        </p>
        <p>
          Bu süreçte öğrenci yalnızca konu okumakla yetinmemeli. Önceki yazılılarda çıkan soru
          tiplerine bakmak, ardından benzer sorular çözmek fayda sağlayabilir. Sonrasında yanlış
          sorular tekrar incelenebilir.
        </p>
      </section>

      <section aria-labelledby="lgs-yks">
        <h2 id="lgs-yks">LGS ve YKS Hazırlığında Özel Ders</h2>
        <p>
          Ortaokul öğrencilerinde LGS matematiği, özellikle yeni nesil sorular nedeniyle farklı
          bir çalışma düzeni gerektirir. Uzun metinler, grafikler ve günlük yaşam problemleri
          öğrenciden yalnızca işlem yapmasını istemez. Soruyu doğru okumak da gerekir.
        </p>
        <p>
          Lise öğrencilerinde ise TYT ve AYT matematik çalışmaları farklı bir tempoya sahip
          olabilir. TYT’de süre yönetimi öne çıkarken, AYT’de konu derinliği ve soru çeşitliliği
          daha fazla önem kazanır.
        </p>
        <p>
          Honaz Matematik Özel Ders de öğretmen öğrencinin gireceği sınavlara hâkimdir. Der
          planlara öğrencinin gireceği sınavlara göre planlanır.
        </p>
      </section>

      <section aria-labelledby="ders-suresi">
        <h2 id="ders-suresi">Ders Süresi Nasıl Planlanır?</h2>
        <p>
          Her öğrencinin çalışma temposu aynı değildir. Bir öğrenci haftada bir dersle okul
          konularını takip edebilir. Başka bir öğrenci sınav döneminde daha sık çalışmaya
          ihtiyaç duyabilir.
        </p>
        <p>
          Honaz Matematik Özel Ders planı hazırlanırken öğrencinin sınıfı, mevcut konu durumu ve
          sınav tarihi birlikte değerlendirilir. Örneğin yazılıya iki hafta kalan bir öğrencide
          doğrudan sınav konularına yoğunlaşılır. Temel eksikler varsa, o konuya kısa tekrarlar
          eklenir.
        </p>
      </section>

      <section aria-labelledby="ogretmen-secimi">
        <h2 id="ogretmen-secimi">Öğretmen seçerken nelere bakılmalı?</h2>
        <p>
          İyi bir öğretmen seçmek yalnızca fiyat karşılaştırması yapmakla sınırlı kalmamalı.
          Öğretmenin öğrencinin seviyesine uygun anlatım yapabilmesi önemlidir. Çünkü çok hızlı
          anlatılan bir konu, öğrencinin eksikliğini artırabilir.
        </p>
        <p>
          Bu yüzden Honaz Matematik Özel Ders öğretmenin hangi sınıflarla çalıştığı
          görüşülebilir. LGS deneyimi, TYT-AYT bilgisi, geometri anlatımı ayrıca bilgi alınır.
        </p>
        <p>
          Dersin yüz yüze mi yoksa online mı yapılacağı da konuşulmalıdır. Zaman problemi
          yaşayan başka bir öğrenci ise online dersi tercih edebilir. Önemli olan ders biçiminin
          öğrencinin çalışma düzenine uymasıdır.
        </p>
      </section>

      <section aria-labelledby="sonuc">
        <h2 id="sonuc">Sonuç olarak</h2>
        <p>
          Honaz Matematik Özel Ders, okul derslerinde zorlanan, LGS veya YKS hazırlığı yapan
          öğrenciler için birebir çalışma fırsatı sunar. Öğrencinin hangi konuda hata yaptığını
          görmek, o konuya uygun sorular çözmek ve ilerlemeyi düzenli takip etmek sürecin
          temelini oluşturur. Honaz’daki öğrenciler için öğretmen deneyimi, ders biçimi, sınıf
          seviyesi ve sınav hedefi birlikte değerlendirilerek özel ders çalışma planı
          oluşturulur.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
