import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("denizli-yks-ek-tercih-danismanligi");

export const metadata: Metadata = createBlogMetadata(post);

const consultingScope = [
  "Başarı sırası analizi",
  "Güncel kontenjan değerlendirmesi",
  "Üniversite ve bölüm karşılaştırmaları",
  "Kariyer hedeflerine uygun tercih planı",
  "Riskli ve güvenli tercih dengesi",
  "Yerleşme ihtimalini artıran stratejiler",
];

const advantages = [
  "Tercih hatası riski azalır.",
  "Güncel veriler doğru yorumlanır.",
  "Kariyer planı netleşir.",
  "Bölüm seçimi daha bilinçli yapılır.",
  "Yerleşme ihtimali güçlenir.",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Denizli YKS ek tercih danışmanlığı neden alınmalıdır?",
    answer:
      "Ek tercih dönemi kısa ve kritik bir süreçtir. Uzman desteği sayesinde güncel kontenjanlar doğru analiz edilir ve tercih listesi daha bilinçli hazırlanır.",
  },
  {
    question: "Ek tercih yaparken sadece puana bakmak yeterli mi?",
    answer:
      "Hayır. Başarı sırası, kontenjan durumu, bölümün geçmiş yerleşme verileri ve öğrencinin hedefleri birlikte değerlendirilmelidir.",
  },
  {
    question: "Ek tercih danışmanlığı kimlere hitap eder?",
    answer:
      "İlk tercihte yerleşemeyen adaylara, mezun öğrencilere ve tercih listesinde daha doğru planlama yapmak isteyen herkese uygundur.",
  },
  {
    question: "Ek tercih sürecinde en sık yapılan hata nedir?",
    answer:
      "En yaygın hata, araştırma yapmadan yalnızca puana göre tercih oluşturmaktır. Bölümün ders içeriği ve kariyer olanakları da mutlaka incelenmelidir.",
  },
  {
    question: "Doğru ek tercih nasıl yapılır?",
    answer:
      "Öncelikle ÖSYM'nin güncel tercih kılavuzu dikkatle incelenmelidir. Ardından başarı sırası analiz edilmeli, boş kontenjanlar değerlendirilmeli ve dengeli bir tercih listesi hazırlanmalıdır.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — Yükseköğretim Programları ve Kontenjanları Kılavuzu",
    href: "https://osym.gov.tr/",
  },
  {
    label: "YÖK Atlas — Program, kontenjan ve yerleşme istatistikleri",
    href: "https://yokatlas.yok.gov.tr/",
  },
];

export default function DenizliYksEkTercihDanismanligiPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="YKS sonuçları açıklandıktan sonra her aday için yeni bir süreç başlar. İlk tercih döneminde istediği bölüme yerleşemeyen öğrenciler ise ek tercih hakkını değerlendirir. Doğru analiz, doğru sıralama ve doğru tercih listesi bu aşamada belirleyici olur."
      faqs={faqs}
      sources={sources}
    >
      <p>
        Ek tercih süreci kısa sürer. Bu yüzden hızlı hareket etmek gerekir. Aynı zamanda
        her tercih bilinçli şekilde yapılmalıdır. Böylece boş kontenjanlar doğru
        değerlendirilir ve yerleşme ihtimali artar.
      </p>

      <section aria-labelledby="neden-onemli">
        <h2 id="neden-onemli">Ek Tercih Danışmanlığı Neden Önemlidir?</h2>
        <p>
          Ek tercih dönemi, ilk tercih sürecinden farklı dinamiklere sahiptir. Kontenjanlar
          değişir. Taban puanlar yeniden şekillenir. Ayrıca adayların tercih davranışları da
          farklılaşır. Bu nedenle ek tercih danışmanlığı güncel verilerle hareket eder ve
          öğrenciye özel bir yol haritası oluşturur.
        </p>
        <p>
          Bunun yanında yalnızca puan yeterli değildir. Başarı sırası, kontenjan durumu,
          üniversitenin geçmiş yıllardaki yerleşme verileri ve adayın hedefleri birlikte
          değerlendirilmelidir. Böylece daha isabetli tercihler yapılabilir.
        </p>
      </section>

      <section aria-labelledby="nelere-dikkat">
        <h2 id="nelere-dikkat">Ek Tercih Sürecinde Nelere Dikkat Edilmeli?</h2>
        <p>
          Ek tercih yaparken acele karar vermemek önemlidir. Öncelikle güncel tercih
          kılavuzu dikkatle incelenmelidir. Ardından boş kontenjanlar analiz edilmelidir.
          Sonrasında ise öğrencinin ilgi alanları göz önünde bulundurulmalıdır.
        </p>
        <p>Ek tercih danışmanlığı kapsamında şu konular ayrıntılı biçimde ele alınır:</p>
        <BlogChecklist items={consultingScope} />
        <p>
          Bu yaklaşım sayesinde öğrenciler yalnızca bir bölüme değil, aynı zamanda gelecek
          planlarına da yatırım yapar.
        </p>
      </section>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">Ek Tercih Danışmanlığı Kimler İçin Uygundur?</h2>
        <p>
          Her öğrencinin ihtiyaçları farklıdır. Bu nedenle danışmanlık kişiye özel
          hazırlanır. Özellikle ilk tercihlerinde yerleşemeyen adaylar için bu süreç büyük
          önem taşır. Bunun yanında tercih listesinde hata yaptığını düşünen öğrenciler de
          destek alabilir.
        </p>
        <p>
          Ayrıca mezuna kalan adaylar, puanını yeniden değerlendirmek isteyen öğrenciler ve
          bölüm değişikliği düşünen kişiler de bu süreçten yararlanabilir.
        </p>
      </section>

      <section aria-labelledby="bolum-secimi-kariyer">
        <h2 id="bolum-secimi-kariyer">Doğru Bölüm Seçimi Kariyeri Nasıl Etkiler?</h2>
        <p>
          Üniversite tercihi yalnızca birkaç yıllık eğitim anlamına gelmez. Aynı zamanda
          uzun vadeli kariyer planının temelini oluşturur. Bu nedenle bölüm seçerken sadece
          popüler mesleklere odaklanmamak gerekir. İlgi alanları, yetenekler ve sektör
          beklentileri birlikte değerlendirilmelidir.
        </p>
        <p>
          Örneğin sağlık, mühendislik, eğitim, bilişim veya sosyal bilimler alanlarında
          farklı fırsatlar bulunur. Ancak her öğrencinin hedefi aynı değildir. Bu yüzden ek
          tercih danışmanlığı, kişisel hedefleri merkeze alarak öneriler sunar.
        </p>
      </section>

      <section aria-labelledby="avantajlar">
        <h2 id="avantajlar">Profesyonel Ek Tercih Danışmanlığının Avantajları</h2>
        <p>
          Güncel ÖSYM verileri yakından takip edilir. Ayrıca geçmiş yılların yerleşme
          istatistikleri analiz edilir. Böylece öğrenciler daha bilinçli karar verir.
        </p>
        <BlogChecklist items={advantages} />
        <p>
          Üstelik öğrenci ve aile aynı süreçte doğru bilgiye ulaşır. Böylece karar süreci
          daha güvenli ilerler.
        </p>
      </section>

      <section aria-labelledby="sonuc">
        <h2 id="sonuc">Bilinçli Tercih İçin</h2>
        <p>
          Ek tercih dönemi, birçok öğrenci için ikinci bir fırsattır. Bu fırsatı doğru
          değerlendirmek ise bilinçli planlama gerektirir. Ek tercih danışmanlığı,
          öğrencinin akademik geçmişini, hedeflerini ve güncel tercih verilerini birlikte
          değerlendirir. Böylece oluşturulan tercih listesi hem gerçekçi hem de stratejik
          olur. Doğru analiz, güvenilir bilgi ve uzman desteği sayesinde öğrenciler
          geleceklerine daha sağlam adımlarla ilerleyebilir.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
