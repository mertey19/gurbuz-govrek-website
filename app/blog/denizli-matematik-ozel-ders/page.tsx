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

const post = getBlogPost("denizli-matematik-ozel-ders");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  { href: "/matematik-ozel-ders", label: "Matematik Özel Ders", detail: "Birebir konu anlatımı, eksik tamamlama ve deneme analizi." },
  { href: "/denizli-ogrenci-koclugu", label: "Denizli Öğrenci Koçluğu", detail: "Haftalık program, hedef takibi ve motivasyon desteği." },
];

const advantages = [
  "Konu eksikleri sistemli şekilde tamamlanır",
  "Soru çözme becerisi gelişir",
  "Yeni nesil soru mantığı daha kolay kavranır",
  "Sınav kaygısı zamanla azalır",
  "Düzenli çalışma alışkanlığı kazanılır",
  "Öğrencinin motivasyonu sürekli desteklenir",
];

const selectionCriteria = [
  "Öğretmenin deneyimi ve ders verdiği seviyeler",
  "Hazırlanan ders planı ve kullanılan kaynaklar",
  "Düzenli geri bildirim süreci",
  "Öğrencinin seviyesine uygun hedef belirlenmesi",
  "Uyumu değerlendirmek için deneme dersi imkânı",
];

const studyTips = [
  "Ders dışında düzenli tekrar yapmak",
  "Her gün belirli sayıda soru çözmek",
  "Yanlış yapılan soruları mutlaka analiz etmek",
  "Öğretmenin hazırladığı çalışma planına sadık kalmak",
  "Motivasyonu korumak için kısa vadeli hedefler belirlemek",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Matematik özel ders kimler için uygundur?",
    answer:
      "İlkokul, ortaokul, lise ve üniversite sınavına hazırlanan tüm öğrenciler için uygundur. Ayrıca matematik temelini güçlendirmek isteyen yetişkinler de bu eğitimden yararlanabilir.",
  },
  {
    question: "Haftada kaç saat matematik özel dersi alınmalıdır?",
    answer:
      "Öğrencinin hedeflerine göre süre değişebilir. Ancak çoğu öğrenci için haftada 2 ila 4 saat düzenli çalışma etkili sonuç verir.",
  },
  {
    question: "Online matematik özel dersi verimli olur mu?",
    answer:
      "Evet. Doğru materyaller ve düzenli iletişim sayesinde online dersler de yüz yüze eğitim kadar verimli olabilir.",
  },
  {
    question: "Matematik özel ders başarıyı artırır mı?",
    answer:
      "Düzenli çalışma, doğru öğretmen ve planlı takip bir araya geldiğinde başarı oranı belirgin şekilde yükselir. Özellikle bireysel eksiklere odaklanılması öğrenme sürecini hızlandırır.",
  },
  {
    question: "Matematikte gelişim ne kadar sürede görülür?",
    answer:
      "Bu süre öğrencinin mevcut seviyesine ve çalışma düzenine bağlıdır. Ancak istikrarlı bir program uygulandığında ilk gelişmeler genellikle birkaç hafta içinde fark edilir.",
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

export default function DenizliMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik, düzenli çalışmayla gelişen bir derstir. Ancak her öğrencinin öğrenme hızı farklıdır. Bu nedenle birebir matematik özel ders desteği, eksikleri doğru şekilde tamamlamak isteyen öğrenciler için önemli bir avantaj sunar; öğrenci kendi hızında ilerler, hem konu eksikleri kapanır hem de özgüven artar."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        İlkokul, ortaokul, LGS, TYT ve AYT düzeylerine uygun birebir veya online matematik
        özel ders seçenekleri, öğrencinin eksik olduğu konulara odaklanmasını sağlar. Düzenli
        çalışma planı, soru çözüm teknikleri ve kişiye özel eğitim yaklaşımı sayesinde
        matematik başarısını artırmak daha sürdürülebilir hâle gelir.
      </p>

      <section aria-labelledby="neden-tercih-edilir">
        <h2 id="neden-tercih-edilir">Matematik Özel Ders Neden Tercih Edilir?</h2>
        <p>
          Sınıf ortamında her öğrenciye aynı süre ayrılır. Buna karşılık özel derste tüm ilgi
          tek öğrenciye yönelir. Bu sayede anlaşılmayan konular kısa sürede netleşir. Ayrıca
          öğretmen, öğrencinin seviyesine uygun bir çalışma planı hazırlar.
        </p>
        <p>
          Programlar ilkokuldan üniversite hazırlık sürecine kadar farklı seviyelere hitap
          eder. Bunun yanında TYT, AYT, LGS ve okul sınavlarına yönelik çalışmalar da planlı
          şekilde yürütülür. Düzenli takip sayesinde gelişim somut olarak görülebilir.
        </p>
      </section>

      <section aria-labelledby="avantajlar">
        <h2 id="avantajlar">Matematik Özel Dersinin Sağladığı Avantajlar</h2>
        <p>
          Birebir eğitim birçok önemli fayda sağlar. Özellikle doğru yöntemlerle çalışan
          öğrenciler daha kısa sürede ilerleme kaydeder.
        </p>
        <BlogChecklist items={advantages} />
        <p>
          Bunun yanında yapılan deneme analizleri sayesinde yanlışların nedeni kolayca
          belirlenir. Ardından eksik kazanımlar üzerinde tekrar çalışılır. Böylece öğrenme
          süreci daha verimli hâle gelir.
        </p>
      </section>

      <section aria-labelledby="ogretmen-secimi">
        <h2 id="ogretmen-secimi">Matematik Özel Ders Seçerken Nelere Dikkat Edilmeli?</h2>
        <p>
          Doğru öğretmeni seçmek büyük önem taşır; çünkü başarılı bir eğitim süreci yalnızca
          bilgiyle sınırlı değildir. Aynı zamanda iletişim, planlama ve öğrenci takibi de
          gerekir.
        </p>
        <BlogChecklist items={selectionCriteria} />
        <p>
          Deneme dersinin bulunması önemli bir avantaj sağlar. Böylece öğrenci ve öğretmen
          uyumu daha sağlıklı şekilde değerlendirilebilir.
        </p>
      </section>

      <section aria-labelledby="kimler-alabilir">
        <h2 id="kimler-alabilir">Kimler Matematik Özel Ders Alabilir?</h2>
        <p>
          Matematikte zorlanan öğrenciler bu eğitimden faydalanabilir. Bunun yanında başarılı
          öğrenciler de netlerini yükseltmek amacıyla özel ders alabilir. Ayrıca sınav
          hazırlığında zamanını daha verimli kullanmak isteyen adaylar için birebir eğitim
          önemli bir destek sunar.
        </p>
        <p>
          Özellikle LGS, TYT ve AYT hazırlık döneminde düzenli tekrar yapılması başarıyı
          olumlu yönde etkiler. Aynı zamanda okul yazılılarına hazırlanan öğrenciler de kısa
          sürede eksiklerini tamamlayabilir.
        </p>
      </section>

      <section aria-labelledby="oneriler">
        <h2 id="oneriler">Başarılı Bir Matematik Eğitimi İçin Öneriler</h2>
        <p>
          Ders dışında yapılan tekrarlar öğrenmeyi kalıcı hâle getirir. Hata analizi ise
          gelişimin temel parçalarından biridir; bu yüzden yanlış yapılan sorular mutlaka
          gözden geçirilmelidir.
        </p>
        <BlogChecklist items={studyTips} />
        <p>
          Matematik özel ders seçerken yalnızca öğretmeni değil, uygulanacak eğitim planını da
          değerlendirmek gerekir. Öğrencinin seviyesine göre hazırlanan programlar, düzenli
          konu takibi ve hedef odaklı soru çözümü sayesinde okul başarısını ve sınav
          performansını destekleyen daha verimli bir öğrenme süreci sunar.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
