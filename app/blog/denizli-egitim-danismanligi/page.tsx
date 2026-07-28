import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("denizli-egitim-danismanligi");

export const metadata: Metadata = createBlogMetadata(post);

const services = [
  "Akademik başarı analizi",
  "LGS ve YKS planlaması",
  "Doğru okul seçimi",
  "Üniversite tercih danışmanlığı",
  "Kariyer planlaması",
  "Motivasyon ve çalışma programı desteği",
  "Veli danışmanlığı",
];

const advantages = [
  "Gerçekçi hedefler belirler.",
  "Düzenli çalışma alışkanlığı kazanır.",
  "Sınav kaygısını daha kolay yönetir.",
  "Doğru kaynak seçimi yapar.",
  "Motivasyonunu daha uzun süre korur.",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Denizli Eğitim Danışmanlığı hangi öğrencilere hitap eder?",
    answer:
      "İlkokul, ortaokul, lise ve üniversite öğrencilerinin yanı sıra kariyer planlaması yapmak isteyen bireyler de bu hizmetten yararlanabilir.",
  },
  {
    question: "Eğitim danışmanlığı başarıyı artırır mı?",
    answer:
      "Evet. Doğru planlama, düzenli takip ve kişiye özel çalışma programı sayesinde akademik başarı önemli ölçüde artabilir.",
  },
  {
    question: "Üniversite tercih döneminde danışmanlık almak gerekli midir?",
    answer:
      "Tercih süreci geleceği doğrudan etkiler. Bu nedenle uzman desteği almak, daha bilinçli ve doğru karar verilmesine yardımcı olur.",
  },
  {
    question: "Denizli Eğitim Danışmanlığı okul seçiminde destek sağlar mı?",
    answer:
      "Evet. Öğrencinin akademik seviyesi, hedefleri ve beklentileri dikkate alınarak en uygun okul seçenekleri değerlendirilir.",
  },
  {
    question: "Eğitim danışmanlığı bireysel çalışma programı hazırlar mı?",
    answer:
      "Çoğu profesyonel danışmanlık hizmeti, öğrencinin seviyesine ve hedeflerine uygun kişiselleştirilmiş çalışma planları oluşturur.",
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

export default function DenizliEgitimDanismanligiPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Doğru eğitim planı, geleceği şekillendiren en önemli adımlardan biridir. Ancak seçenekler her geçen yıl artıyor. Bu nedenle karar vermek zorleşebiliyor. İşte tam bu noktada Denizli Eğitim Danışmanlığı hizmetleri öne çıkıyor. Doğru yönlendirme sayesinde öğrenciler hedeflerine daha emin adımlarla ilerliyor. Aynı zamanda aileler de süreci daha bilinçli yönetebiliyor."
      faqs={faqs}
      sources={sources}
    >
      <section aria-labelledby="neden-onemli">
        <h2 id="neden-onemli">Denizli Eğitim Danışmanlığı Neden Önemlidir?</h2>
        <p>
          Her öğrencinin öğrenme biçimi farklıdır. Ayrıca ilgi alanları ve hedefleri de
          değişiklik gösterir. Bu yüzden herkese aynı yol haritası uygun olmaz. Denizli
          Eğitim Danışmanlığı, öğrencinin akademik durumunu analiz eder. Ardından güçlü
          yönlerini belirler. Böylece kişiye özel bir plan oluşturur.
        </p>
        <p>
          Üstelik yalnızca sınav odaklı bir yaklaşım sunmaz. Kariyer planlaması, okul seçimi
          ve meslek yönlendirmesi gibi konularda da destek sağlar. Sonuç olarak öğrenci daha
          bilinçli kararlar alır.
        </p>
      </section>

      <section aria-labelledby="kapsam">
        <h2 id="kapsam">Eğitim Danışmanlığı Hangi Konuları Kapsar?</h2>
        <p>
          Eğitim danışmanlığı oldukça geniş bir hizmet alanına sahiptir. Öncelikle
          öğrencinin mevcut durumu değerlendirilir. Daha sonra hedefler netleştirilir.
          Ardından uygulanabilir bir yol haritası hazırlanır.
        </p>
        <p>Başlıca hizmetler şunlardır:</p>
        <BlogChecklist items={services} />
        <p>
          Bu süreç sayesinde hem zaman daha verimli kullanılır hem de öğrencinin potansiyeli
          daha doğru değerlendirilir.
        </p>
      </section>

      <section aria-labelledby="secim">
        <h2 id="secim">Denizli Eğitim Danışmanlığı Seçerken Nelere Dikkat Edilmeli?</h2>
        <p>
          Doğru danışmanlık hizmeti almak büyük önem taşır. Çünkü yanlış yönlendirme uzun
          vadede zaman kaybına neden olabilir. Bu nedenle seçim yaparken bazı kriterleri
          mutlaka değerlendirmek gerekir.
        </p>
        <p>
          Öncelikle danışmanların eğitim alanındaki deneyimi incelenmelidir. Ayrıca başarı
          hikâyeleri ve öğrenci geri bildirimleri de önemlidir. Bunun yanında güncel sınav
          sistemi hakkında bilgi sahibi olmaları gerekir. Düzenli takip ve birebir iletişim
          sunmaları ise süreci daha verimli hâle getirir.
        </p>
        <p>
          Kaliteli bir Denizli Eğitim Danışmanlığı hizmeti, öğrencinin yalnızca bugünkü
          başarısını değil, gelecekteki hedeflerini de destekler.
        </p>
      </section>

      <section aria-labelledby="avantajlar">
        <h2 id="avantajlar">Eğitim Danışmanlığının Öğrencilere Sağladığı Avantajlar</h2>
        <p>
          Planlı çalışan öğrenciler daha yüksek başarı elde eder. Çünkü neyi, ne zaman
          yapacaklarını bilirler. Ayrıca gereksiz zaman kaybı yaşamazlar.
        </p>
        <p>Eğitim danışmanlığı sayesinde öğrenciler:</p>
        <BlogChecklist items={advantages} />
        <p>
          Bunun yanında aileler de sürece daha bilinçli şekilde katkı sağlar. Böylece
          öğrenci kendisini daha güçlü hisseder.
        </p>
      </section>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">Denizli Eğitim Danışmanlığı Kimler İçin Uygundur?</h2>
        <p>
          Bu hizmet yalnızca sınava hazırlanan öğrenciler için değildir. İlkokuldan
          üniversiteye kadar her eğitim seviyesinde fayda sağlar. Ayrıca kariyer değişikliği
          planlayan bireyler de profesyonel destek alabilir.
        </p>
        <p>
          Özellikle hedefini netleştiremeyen öğrenciler için danışmanlık büyük avantaj
          sunar. Çünkü doğru analiz, doğru tercihlerin temelini oluşturur.
        </p>
      </section>

      <p>
        Doğru eğitim planı, başarı yolculuğunu kolaylaştırır. Bu nedenle profesyonel destek
        almak önemli bir yatırımdır. Denizli Eğitim Danışmanlığı hizmetleri, öğrencinin
        potansiyelini doğru analiz eder. Ayrıca hedeflerine ulaşması için sürdürülebilir bir
        yol haritası sunar. Böylece hem akademik başarı hem de kariyer planlaması daha
        sağlam temeller üzerine kurulur.
      </p>
    </BlogArticleLayout>
  );
}
