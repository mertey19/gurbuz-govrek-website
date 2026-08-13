import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("civril-matematik-ozel-ders");

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
    question: "1. Çivril Matematik Özel Ders nasıl planlanır?",
    answer:
      "Öğrencinin seviyesi ve hedefleri dikkate alınır. Daha sonra uygun konu ve soru çözüm programı oluşturulur.",
  },
  {
    question: "2. Matematik özel ders hangi seviyelere uygundur?",
    answer:
      "İlkokuldan lise seviyesine kadar farklı ihtiyaçlara göre çalışma yapılabilir. TYT ve AYT hazırlığı da bu kapsama girebilir.",
  },
  {
    question: "3. Özel ders matematik başarısını artırır mı?",
    answer:
      "Düzenli çalışma ve doğru takip, öğrencinin eksiklerini görmesine yardımcı olabilir. Ancak başarı öğrencinin devamlılığına ve çalışma disiplinine de bağlıdır.",
  },
  {
    question: "4. Matematikte temel eksikler nasıl giderilir?",
    answer:
      "Öncelikle eksik konular belirlenir. Sonrasında temel kazanımlar üzerinden ilerlenir. Ardından soru seviyeleri kademeli olarak artırılır.",
  },
  {
    question: "5. Çivril Matematik özel ders sınava hazırlıkta faydalı olur mu?",
    answer:
      "Evet, sınav hedefi doğrultusunda planlandığında konu takibini ve soru çözüm çalışmalarını destekleyebilir.",
  },
  {
    question: "6. Özel derste sadece konu anlatımı yapılır mı?",
    answer:
      "Hayır. Konu anlatımının yanında soru çözümü, yanlış analizi ve eksik konu çalışmaları da sürece dahil edilebilir.",
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

export default function CivrilMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik bazı öğrenciler için zorlayıcı olabilir. Ancak doğru anlatım fark oluşturur. Düzenli çalışma ise öğrenmeyi kolaylaştırır. Bu nedenle kişiye uygun bir çalışma planı önem taşır."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Çivril Matematik özel ders seçenekleri, öğrencinin ihtiyaçlarına göre ilerlemek isteyen
        aileler için hazırlanmıştır. Öğrencinin mevcut seviyesi belirlenir. Eksik konular
        tespit edilir. Ardından çalışma süreci daha planlı hale gelir.
      </p>

      <section aria-labelledby="neden-tercih-edilir">
        <h2 id="neden-tercih-edilir">Çivril Matematik Özel Ders Neden Tercih Edilir?</h2>
        <p>
          Her öğrencinin matematik öğrenme şekli aynı değildir. Bazı öğrenciler temel konularda
          zorlanır. Bazıları ise soru çözümünde zaman kaybeder. Ayrıca sınav kaygısı da
          performansı etkileyebilir.
        </p>
        <p>
          Özel ders sürecinde öğrenci kendi seviyesine göre çalışabilir. Böylece anlaşılmayan
          konular üzerinde daha fazla durulabilir. Bunun yanında öğrencinin güçlü olduğu
          konular da geliştirilebilir.
        </p>
        <p>
          Özellikle TYT ve AYT hazırlığında konu takibi önemlidir. Çünkü matematikte konular
          birbirine bağlıdır. Temel eksikler ilerleyen konuları da etkileyebilir. Bu nedenle
          çalışma sürecinin düzenli takip edilmesi avantaj sağlar.
        </p>
      </section>

      <section aria-labelledby="surecte-dikkat">
        <h2 id="surecte-dikkat">Çivril Matematik Özel Ders Sürecinde Nelere Dikkat Ediyoruz?</h2>
        <p>
          Öncelikle öğrencinin hedefi belirlenir. Sonrasında mevcut matematik seviyesi
          değerlendirilir. Ardından haftalık çalışma programı oluşturulur.
        </p>
        <p>
          Derslerde yalnızca konu anlatımına odaklanmak yeterli olmaz. Çünkü soru çözme
          becerisi de geliştirilir. Bu nedenle farklı soru tipleri üzerinde çalışmak gerekir.
        </p>
        <p>
          Ayrıca yanlış yapılan sorular mutlaka analiz edilir. Öğrenci hatasının nedenini
          gördüğünde daha kalıcı öğrenme sağlayabilir. Böylece zaman içinde özgüveni de
          güçlenebilir.
        </p>
        <p>
          Çivril Matematik özel ders arayışında öğrencilerle güçlü iletişim kurulmaktadır.
          Öğrencinin soru sormaktan çekinmez. Rahatlıkla tüm soruları sorma öz güveni
          oluşturulur. Ayrıca öğrencinin gelişimi düzenli olarak takip edilir.
        </p>
      </section>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">Çivril Matematik Özel Ders Kimler İçin Uygundur?</h2>
        <p>
          Matematik temelini güçlendirmek isteyen öğrenciler matematik özel ders seçeneğini
          değerlendirmeli. Ayrıca yazılı sınavlarına hazırlanan öğrenciler için de faydalı bir
          durumdur.
        </p>
        <p>
          TYT matematik netlerini artırmak isteyen öğrenciler de özel ders desteğini göz ardı
          etmemelidir. Bunun yanında AYT matematik konularında daha sistemli ilerlemek isteyen
          öğrenciler için kişiselleştirilmiş çalışma yapılmaktadır.
        </p>
        <p>
          Burada önemli olan öğrencinin hedefidir. Çünkü doğru plan, gereksiz konu tekrarlarını
          azaltabilir. Böylece çalışma süresi daha verimli kullanılabilir.
        </p>
      </section>

      <section aria-labelledby="dogru-calisma-plani">
        <h2 id="dogru-calisma-plani">
          Çivril Matematik Özel Ders Arayan Öğrenciler İçin Doğru Çalışma Planı
        </h2>
        <p>
          Matematikte başarı yalnızca daha fazla soru çözmekle gelmez. Öncelikle öğrencinin
          hangi konularda zorlandığını bilmek gerekir. Sonrasında seviyeye uygun bir program
          hazırlanmalıdır. Çivril Matematik özel ders arayan öğrenciler için bireysel hedeflerin
          belirlenmesi bu açıdan önemlidir. Düzenli konu tekrarı, seviyeye uygun soru çözümü ve
          yanlışların analiz edilmesi öğrenme sürecini güçlendirebilir. Özellikle TYT ve AYT
          hazırlığında planlı ilerlemek, zamanın daha verimli kullanılmasına yardımcı olur.
          Doğru çalışma düzeni sayesinde öğrenci matematiğe karşı daha güvenli ve kontrollü
          yaklaşabilir.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
