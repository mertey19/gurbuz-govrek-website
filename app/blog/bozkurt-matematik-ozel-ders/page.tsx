import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("bozkurt-matematik-ozel-ders");

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
    question: "1. Bozkurt Matematik özel ders kimler için uygundur?",
    answer:
      "İlkokul, ortaokul ve lise öğrencileri için planlanabilir. Ayrıca LGS ve YKS hazırlığında da tercih edilebilir.",
  },
  {
    question: "2. Özel derste öğrencinin seviyesi belirlenir mi?",
    answer:
      "Evet. Öncelikle öğrencinin konu bilgisi ve soru çözme durumu değerlendirilir.",
  },
  {
    question: "3. Dersler sınava yönelik olabilir mi?",
    answer:
      "Evet. Ders programı öğrencinin sınav hedeflerine göre şekillendirilebilir.",
  },
  {
    question: "4. Matematikte temel eksiği olan öğrenciler destek alabilir mi?",
    answer:
      "Elbette. Öncelikle temel konular güçlendirilir. Ardından daha ileri seviyedeki konulara geçilir.",
  },
  {
    question: "5. Bozkurt Matematik özel ders başarıyı artırır mı?",
    answer:
      "Düzenli çalışma, doğru yönlendirme ve öğrencinin çabası birlikte ilerlediğinde matematik başarısına katkı sağlayabilir.",
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

export default function BozkurtMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik bazı öğrenciler için zor görünebilir. Ancak doğru anlatım, bu algıyı kısa sürede değiştirebilir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Bozkurt Matematik özel ders, öğrencinin seviyesine uygun bir çalışma düzeni oluşturur.
        Böylece eksikler daha kolay fark edilir. Ayrıca öğrenci, anlamadığı konuları rahatça
        sorabilir.
      </p>

      <section aria-labelledby="neden-onemli">
        <h2 id="neden-onemli">Bozkurt Matematik Özel Ders Neden Önemlidir?</h2>
        <p>
          Her öğrencinin öğrenme hızı farklıdır. Bu nedenle tek tip ders anlatımı yeterli
          olmayabilir. Özel ders sürecinde öğretmen, öğrencinin mevcut seviyesini değerlendirir.
          Ardından kişiye uygun bir çalışma planı hazırlar.
        </p>
        <p>
          Örneğin öğrenci temel işlemlerde zorlanıyorsa önce temel bilgiler güçlendirilir.
          Sonrasında problem çözme becerilerine geçilir. Böylece konu eksikleri birikmeden
          giderilir.
        </p>
        <p>
          Bozkurt Matematik özel ders aynı zamanda düzenli takip avantajı sağlar. Öğrencinin
          gelişimi belirli aralıklarla değerlendirilir. Ayrıca yanlış yapılan sorular yeniden
          ele alınır. Böylece öğrenci sadece doğru cevabı öğrenmez. Soruyu nasıl çözmesi
          gerektiğini de kavrar.
        </p>
      </section>

      <section aria-labelledby="dogru-yaklasim">
        <h2 id="dogru-yaklasim">Matematik Başarısını Artırmak İçin Doğru Yaklaşım</h2>
        <p>
          Matematikte başarı yalnızca çok soru çözmekle oluşmaz. Doğru yöntem de büyük önem
          taşır. Öncelikle konu anlaşılmalıdır. Ardından farklı soru tipleri üzerinde uygulama
          yapılmalıdır.
        </p>
        <p>
          Bu süreçte öğrencinin çekinmeden soru sorması önemlidir. Çünkü küçük bir konu eksiği,
          ilerleyen konuları etkileyebilir. Özellikle sınav dönemlerinde bu durum öğrencinin
          özgüvenini azaltabilir.
        </p>
        <p>
          Bozkurt Matematik özel ders desteği, öğrencinin kendisini daha rahat ifade etmesine
          yardımcı olabilir. Ayrıca birebir iletişim sayesinde öğrenme süreci daha odaklı
          ilerler. Bunun yanında düzenli tekrar, soru çözümü ve geri bildirim süreci başarıyı
          destekler.
        </p>
      </section>

      <section aria-labelledby="lgs-yks">
        <h2 id="lgs-yks">LGS ve YKS İçin Matematik Özel Ders</h2>
        <p>
          Sınav hazırlığında zaman yönetimi oldukça önemlidir. LGS ve YKS öğrencileri, farklı
          soru tarzlarıyla karşılaşır. Bu nedenle yalnızca konu anlatımı yeterli olmayabilir.
        </p>
        <p>
          Öncelikle öğrencinin hedefi belirlenmelidir. Daha sonra konu eksikleri sıralanmalıdır.
          Ardından soru çözüm temposu geliştirilmelidir. Deneme sonuçları da düzenli olarak
          değerlendirilmelidir.
        </p>
        <p>
          Bozkurt Matematik özel ders süreci, sınav hedeflerine göre şekillendirilebilir.
          Böylece öğrenci hem konu bilgisini geliştirir hem de sınav pratiği kazanır.
        </p>
      </section>

      <p>
        Bozkurt&#39;ta matematik başarısını geliştirmek isteyen öğrenciler için Bozkurt
        Matematik özel ders seçeneği, kişiselleştirilmiş çalışma imkanı sunar. Öğrencinin
        seviyesine göre konu anlatımı yapılır. Ayrıca soru çözümü ve eksik konu takibi düzenli
        şekilde yürütülür. Böylece matematiğe karşı oluşan kaygının azalması ve öğrencinin
        kendine güven kazanması desteklenir. Doğru planlanan özel ders süreci, okul başarısının
        yanı sıra LGS ve YKS hazırlığına da katkı sağlayabilir.
      </p>
    </BlogArticleLayout>
  );
}
