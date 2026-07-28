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

const post = getBlogPost("denizli-profesyonel-ogrenci-kocu");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  { href: "/denizli-ogrenci-koclugu", label: "Denizli Öğrenci Koçluğu", detail: "Haftalık program, hedef takibi ve motivasyon desteği." },
  { href: "/matematik-ozel-ders", label: "Matematik Özel Ders", detail: "Birebir konu anlatımı, eksik tamamlama ve deneme analizi." },
];

const supportAreas = [
  "Kişiye özel çalışma programı hazırlama",
  "Zaman yönetimi becerisi kazandırma",
  "Verimli ders çalışma teknikleri geliştirme",
  "Sınav kaygısını yönetme",
  "Motivasyonu artırma",
  "Hedef belirleme ve takip sistemi oluşturma",
  "Dikkat ve odaklanma becerilerini güçlendirme",
  "Düzenli performans analizi yapma",
];

const audiences = [
  "Ortaokul öğrencileri",
  "LGS hazırlık sürecindeki öğrenciler",
  "Lise öğrencileri",
  "YKS adayları",
  "Üniversite öğrencileri",
  "Ders çalışma disiplini kazanmak isteyen herkes",
];

const selectionCriteria = [
  "Eğitim geçmişi ve mesleki deneyimi",
  "Uyguladığı öğrenci takip sistemi",
  "İletişim becerisi ve güven ilişkisi kurabilmesi",
  "Düzenli geri bildirim sunması",
  "Referanslar ve öğrenci yorumları",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Öğrenci koçu ne iş yapar?",
    answer:
      "Öğrencinin hedef belirlemesine yardımcı olur. Ayrıca çalışma planı hazırlar, motivasyonu destekler ve gelişim sürecini düzenli olarak takip eder.",
  },
  {
    question: "Öğrenci koçluğu hangi yaş grubuna uygundur?",
    answer:
      "Ortaokuldan üniversiteye kadar farklı yaş gruplarındaki öğrenciler için uygundur. Her öğrenciye özel plan hazırlanır.",
  },
  {
    question: "Öğrenci koçluğu sınav başarısını artırır mı?",
    answer:
      "Doğru uygulandığında çalışma verimini yükseltir. Zaman yönetimi, motivasyon ve düzenli takip akademik süreci destekler. Sonuç, öğrencinin çalışma disiplinine ve sürece katılımına bağlıdır.",
  },
  {
    question: "Öğrenci koçu seçerken nelere dikkat edilmelidir?",
    answer:
      "Deneyim, iletişim becerisi, referanslar, uygulanan takip sistemi ve öğrenciye özel yaklaşım mutlaka değerlendirilmelidir.",
  },
  {
    question: "Öğrenci koçluğu online olarak alınabilir mi?",
    answer:
      "Evet. Yüz yüze görüşmelerin yanında online öğrenci koçluğu da uygulanabilir. Düzenli takip ve planlama sayesinde süreç uzaktan da sürdürülebilir.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "Millî Eğitim Bakanlığı — Rehberlik ve psikolojik danışma hizmetleri",
    href: "https://www.meb.gov.tr/",
  },
  {
    label: "ÖSYM — Sınav takvimi ve başvuru duyuruları",
    href: "https://osym.gov.tr/",
  },
];

export default function DenizliProfesyonelOgrenciKocuPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Akademik başarı yalnızca ders çalışmakla sınırlı değildir. Doğru planlama, etkili zaman yönetimi ve güçlü motivasyon da sürecin önemli parçalarıdır. Her öğrencinin öğrenme biçimi farklı olduğu için kişiye özel hazırlanan çalışma planları daha verimli sonuç verir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Doğru rehberlik sayesinde öğrenci hem akademik hem de kişisel gelişim alanında daha
        sağlam adımlar atar. Bu yazıda öğrenci koçluğunun ne olduğunu, hangi konularda
        destek sağladığını ve doğru koçu seçerken nelere dikkat edilmesi gerektiğini ele
        alıyoruz.
      </p>

      <section aria-labelledby="ogrenci-koclugu-nedir">
        <h2 id="ogrenci-koclugu-nedir">Öğrenci Koçluğu Nedir?</h2>
        <p>
          Öğrenci koçu, öğrencilerin hedeflerine daha planlı şekilde ulaşmasına yardımcı
          olan kişidir. Ancak bu süreç yalnızca ders programı hazırlamakla sınırlı kalmaz.
          Aynı zamanda öğrencinin güçlü yönleri belirlenir. Ardından gelişime açık alanlar
          değerlendirilir. Böylece her öğrenci için özel bir yol haritası oluşturulur.
        </p>
        <p>
          Bunun yanında öğrenci, düzenli takip sistemi sayesinde ilerlemesini net şekilde
          görebilir. Bu durum motivasyonu artırırken hedefe bağlı kalmayı da kolaylaştırır.
        </p>
      </section>

      <section aria-labelledby="destek-alanlari">
        <h2 id="destek-alanlari">Öğrenci Koçu Hangi Konularda Destek Sağlar?</h2>
        <p>
          Birçok öğrenci ders çalışmasına rağmen istediği başarıyı elde edemeyebilir. Bunun
          temel nedeni çoğu zaman yanlış çalışma yöntemidir. Tam da bu nedenle öğrenci
          koçluğu aşağıdaki alanlarda katkı sunar:
        </p>
        <BlogChecklist items={supportAreas} />
        <p>
          Böylece öğrenci sadece sınavlara değil, gelecekteki eğitim hayatına da daha güçlü
          hazırlanır.
        </p>
      </section>

      <section aria-labelledby="kimler-icin-uygun">
        <h2 id="kimler-icin-uygun">Öğrenci Koçluğu Kimler İçin Uygundur?</h2>
        <p>
          Öğrenci koçluğu yalnızca sınav dönemindeki öğrenciler için değildir. Aksine farklı
          yaş gruplarında etkili sonuçlar sunar:
        </p>
        <BlogChecklist items={audiences} />
        <p>
          Özellikle sınav dönemlerinde doğru yönlendirme büyük fark oluşturur. Bunun yanında
          ailelerin sürece bilinçli şekilde dâhil olması da başarıyı destekler.
        </p>
      </section>

      <section aria-labelledby="koc-secimi">
        <h2 id="koc-secimi">Öğrenci Koçu Seçerken Nelere Dikkat Edilmelidir?</h2>
        <p>
          Doğru koç seçimi başarı sürecini doğrudan etkiler. Bu nedenle bazı ölçütlere
          dikkat etmek gerekir:
        </p>
        <BlogChecklist items={selectionCriteria} />
        <p>
          İletişim becerisi özellikle önemlidir; çünkü güven ilişkisi başarılı koçluğun
          temelidir. Düzenli geri bildirim sunulması ise sürecin izlenebilir kalmasını
          sağlar.
        </p>
      </section>

      <section aria-labelledby="basariya-etkisi">
        <h2 id="basariya-etkisi">Öğrenci Koçluğu Akademik Başarıyı Nasıl Destekler?</h2>
        <p>
          Başarı rastlantıyla oluşmaz. Düzenli çalışma ve doğru strateji gerektirir. Öğrenci
          koçluğu bu noktada sistemli bir yaklaşım sunar.
        </p>
        <p>
          Öncelikle öğrencinin mevcut seviyesi analiz edilir. Ardından gerçekçi hedefler
          belirlenir. Sonrasında haftalık çalışma planları hazırlanır. Düzenli görüşmeler
          sayesinde eksikler hızlı şekilde tespit edilir. Böylece zaman kaybı azalır. Aynı
          zamanda öğrencinin özgüveni de güçlenir.
        </p>
        <p>
          Üstelik kazanım yalnızca notlarla sınırlı kalmaz. Problem çözme becerisi gelişir.
          Sorumluluk bilinci artar. Planlı yaşam alışkanlığı kalıcı hâle gelir.
        </p>
      </section>

      <section aria-labelledby="aileler-icin">
        <h2 id="aileler-icin">Aileler İçin Öğrenci Koçluğunun Önemi</h2>
        <p>
          Başarılı bir eğitim süreci yalnızca öğrencinin çabasıyla ilerlemez. Ailenin desteği
          de büyük önem taşır. Bu nedenle öğrenci koçluğunda aile ile düzenli iletişim
          kurularak süreç daha sağlıklı yönetilir.
        </p>
        <p>
          Böylece ebeveynler çocuklarını daha doğru şekilde destekler. Gereksiz baskı azalır.
          Ev ortamındaki iletişim güçlenir. Sonuç olarak öğrenci kendini daha güvende
          hisseder.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
