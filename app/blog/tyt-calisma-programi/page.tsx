import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("tyt-calisma-programi");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  {
    href: "/denizli-ogrenci-koclugu",
    label: "Denizli Öğrenci Koçluğu",
    detail: "Haftalık program, hedef takibi ve motivasyon desteği.",
  },
  {
    href: "/matematik-ozel-ders",
    label: "Matematik Özel Ders",
    detail: "Birebir konu anlatımı, eksik tamamlama ve deneme analizi.",
  },
];

const planSteps = [
  "Günlük çalışma sürenizi belirleyin.",
  "Her derse dengeli zaman ayırın.",
  "Konu tekrarı için düzenli vakit bırakın.",
  "Haftalık deneme sınavı çözün.",
  "Yanlış yaptığınız soruları tekrar inceleyin.",
  "Dinlenme molalarını ihmal etmeyin.",
];

const morning = ["Türkçe: 60 dakika", "Matematik: 90 dakika"];
const afternoon = ["Fen Bilimleri: 60 dakika", "Sosyal Bilimler: 45 dakika"];
const evening = [
  "Konu tekrarı: 45 dakika",
  "Soru çözümü: 60 dakika",
  "Yanlış analizleri: 30 dakika",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "TYT Çalışma Programı günde kaç saat olmalıdır?",
    answer:
      "Bu süre öğrencinin seviyesine göre değişir. Genellikle 4 ila 8 saat arasında planlı çalışma yeterli olabilir. Önemli olan süre değil, verimli çalışmaktır.",
  },
  {
    question: "TYT Çalışma Programı her gün aynı mı olmalıdır?",
    answer:
      "Hayır. Haftalık değerlendirmelere göre program güncellenmelidir. Böylece eksik konulara daha fazla zaman ayrılabilir.",
  },
  {
    question: "TYT Çalışma Programı deneme sınavlarını içermeli mi?",
    answer:
      "Evet. Haftada en az bir, sınava yakın dönemde ise daha sık deneme çözmek gelişimi ölçmek açısından önemlidir.",
  },
  {
    question: "TYT Çalışma Programı sadece konu çalışmaktan mı oluşmalıdır?",
    answer:
      "Hayır. Konu anlatımı, soru çözümü, tekrar ve deneme analizi birlikte planlanmalıdır. Bu denge başarı ihtimalini artırır.",
  },
  {
    question: "TYT Çalışma Programı kişiye özel hazırlanmalı mı?",
    answer:
      "Evet. Her öğrencinin bilgi seviyesi, hedefi ve çalışma temposu farklıdır. Bu nedenle kişiye özel hazırlanan programlar daha yüksek verim sağlar.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — TYT konu dağılımları ve sınav takvimi",
    href: "https://osym.gov.tr/",
  },
  {
    label: "Millî Eğitim Bakanlığı — Rehberlik ve psikolojik danışma hizmetleri",
    href: "https://www.meb.gov.tr/",
  },
];

export default function TytCalismaProgramiPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Üniversite hayali kuran her öğrenci için doğru plan büyük fark oluşturur. Bu yüzden TYT Çalışma Programı, zamanı verimli kullanmanın en etkili yollarından biridir. Ancak her program herkese uygun olmaz. Çünkü her öğrencinin seviyesi, eksikleri ve öğrenme hızı farklıdır. Bu nedenle kişisel ihtiyaçlara göre hazırlanan bir plan her zaman daha başarılı sonuç verir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <section aria-labelledby="neden-onemli">
        <h2 id="neden-onemli">TYT Çalışma Programı Neden Önemlidir?</h2>
        <p>
          Başarılı bir sınav süreci tesadüfen oluşmaz. Aksine düzenli çalışma ve doğru
          planlama gerekir. TYT Çalışma Programı, hangi derse ne kadar zaman ayırmanız
          gerektiğini gösterir. Böylece zaman kaybı azalır. Aynı zamanda motivasyon artar.
          Bunun yanında ilerlemenizi takip etmek de kolaylaşır.
        </p>
        <p>
          Plansız çalışan öğrenciler çoğu zaman hangi konuya öncelik vereceklerini bilemez.
          Buna karşılık programlı çalışanlar eksiklerini daha erken fark eder. Sonuç olarak
          sınava daha hazır hisseder.
        </p>
      </section>

      <section aria-labelledby="nasil-hazirlanir">
        <h2 id="nasil-hazirlanir">Etkili Bir TYT Çalışma Programı Nasıl Hazırlanır?</h2>
        <p>
          İyi bir TYT Çalışma Programı hazırlarken önce mevcut seviyenizi belirlemelisiniz.
          Ardından güçlü ve zayıf olduğunuz dersleri listeleyin. Daha sonra günlük çalışma
          saatlerinizi gerçekçi şekilde planlayın.
        </p>
        <p>Plan hazırlarken şu adımları takip edebilirsiniz:</p>
        <BlogChecklist items={planSteps} />
        <p>Böylece hem veriminiz artar hem de tükenmişlik hissi azalır.</p>
      </section>

      <section aria-labelledby="sik-hatalar">
        <h2 id="sik-hatalar">TYT Çalışma Programı Hazırlarken En Sık Yapılan Hatalar</h2>
        <p>
          Birçok öğrenci çok yoğun programlar hazırlar. Ancak sürdürülemeyen planlar kısa
          sürede bırakılır. Bu yüzden ulaşılabilir hedefler belirlemek daha doğru olur.
        </p>
        <p>
          Ayrıca yalnızca sevilen derslere odaklanmak da önemli bir hatadır. Çünkü TYT puanı
          tüm testlerin ortak katkısıyla oluşur. Bunun yanında tekrar yapmamak öğrenilen
          bilgilerin unutulmasına neden olabilir. Bu nedenle düzenli tekrar alışkanlığı
          kazanmanız gerekir.
        </p>
      </section>

      <section aria-labelledby="ornek-plan">
        <h2 id="ornek-plan">Günlük TYT Çalışma Programı Örneği</h2>
        <p>Aşağıdaki örnek plan birçok öğrenci için iyi bir başlangıç olabilir.</p>

        <h3>Sabah</h3>
        <BlogChecklist items={morning} />

        <h3>Öğleden Sonra</h3>
        <BlogChecklist items={afternoon} />

        <h3>Akşam</h3>
        <BlogChecklist items={evening} />

        <p>
          Elbette bu TYT Çalışma Programı kişisel ihtiyaçlarınıza göre değişebilir. Önemli
          olan programın sürdürülebilir olmasıdır.
        </p>
      </section>

      <section aria-labelledby="motivasyon">
        <h2 id="motivasyon">TYT Çalışma Programı ile Motivasyon Nasıl Korunur?</h2>
        <p>
          Uzun bir sınav maratonunda motivasyon zaman zaman düşebilir. Fakat küçük hedefler
          belirlemek bu süreci kolaylaştırır. Örneğin günlük soru hedefinizi tamamladığınızda
          kendinizi ödüllendirebilirsiniz.
        </p>
        <p>
          Bunun yanında başarı grafiğinizi takip etmek de motive edici olur. Ayrıca
          çözdüğünüz deneme sınavlarını analiz etmek gelişiminizi net şekilde görmenizi
          sağlar. Böylece eksiklerinizi kapatırken moralinizi de koruyabilirsiniz.
        </p>
      </section>

      <section aria-labelledby="ders-dagilimi">
        <h2 id="ders-dagilimi">
          TYT Çalışma Programı Hazırlarken Ders Dağılımı Nasıl Olmalı?
        </h2>
        <p>
          Her ders aynı ağırlıkta çalışılmamalıdır. Çünkü öğrencilerin eksikleri farklıdır.
          Bununla birlikte temel dersler ihmal edilmemelidir.
        </p>
        <p>
          Örneğin matematikte zorlanıyorsanız bu derse daha fazla süre ayırabilirsiniz. Buna
          karşılık Türkçe netleriniz yüksekse mevcut seviyeyi koruyacak tekrarlar yeterli
          olabilir. Böylece çalışma süreniz daha verimli kullanılır.
        </p>
      </section>

      <section aria-labelledby="son-30-gun">
        <h2 id="son-30-gun">
          Sınava Son 30 Gün Kala TYT Çalışma Programı Nasıl Değişmeli?
        </h2>
        <p>
          Sınava yaklaşıldıkça yeni konu öğrenmek yerine tekrar yapmak daha faydalıdır. Aynı
          zamanda deneme sınavlarının sayısı artırılmalıdır. Bunun yanında yanlış sorular
          mutlaka analiz edilmelidir.
        </p>
        <p>
          Son haftalarda uyku düzenini korumak da önemlidir. Ayrıca gerçek sınav saatlerinde
          deneme çözmek biyolojik ritminizi sınava hazırlar. Böylece sınav günü daha rahat
          hissedersiniz.
        </p>
      </section>

      <p>
        Doğru hazırlanan bir TYT Çalışma Programı, yalnızca ders çalışmayı kolaylaştırmaz.
        Aynı zamanda zamanı daha bilinçli kullanmanıza yardımcı olur. Düzenli tekrar, kaliteli
        soru çözümü ve doğru analiz alışkanlığı ise başarıyı destekleyen en önemli unsurlar
        arasında yer alır. Sabırlı ve istikrarlı ilerlediğiniz sürece hedefinize her gün biraz
        daha yaklaşabilirsiniz.
      </p>
    </BlogArticleLayout>
  );
}
