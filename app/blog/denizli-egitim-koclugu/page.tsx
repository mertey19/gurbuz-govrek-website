import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("denizli-egitim-koclugu");

export const metadata: Metadata = createBlogMetadata(post);

const audiences = [
  "LGS öğrencileri",
  "YKS adayları",
  "Ortaokul öğrencileri",
  "Lise öğrencileri",
  "Üniversiteye hazırlanan gençler",
  "Hedef odaklı çalışmak isteyen herkes",
];

const processSteps = [
  "Hedef belirleme",
  "Haftalık çalışma programı hazırlama",
  "Zaman yönetimi desteği",
  "Motivasyon çalışmaları",
  "Deneme sınavı analizleri",
  "Verimli ders çalışma teknikleri",
  "Aile ile düzenli iletişim",
];

const selectionCriteria = [
  "Alandaki deneyimi ve eğitim geçmişi",
  "Kullandığı öğrenci takip sistemi",
  "Öğrenciyle kurduğu iletişim",
  "Şeffaf ve yazılı bir çalışma planı sunması",
  "Düzenli geri bildirim vermesi",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Eğitim koçu ders anlatımı yapar mı?",
    answer:
      "Hayır. Eğitim koçluğu doğrudan ders anlatımından çok planlama, motivasyon, takip ve verimli çalışma becerilerine odaklanır. Konu anlatımı gerekiyorsa bu ayrı bir özel ders sürecidir.",
  },
  {
    question: "Eğitim koçluğu kaçıncı sınıftan itibaren alınabilir?",
    answer:
      "Genellikle ortaokul döneminden itibaren başlanabilir. Ancak ihtiyaç durumuna göre farklı yaş grupları da bu hizmetten yararlanabilir.",
  },
  {
    question: "Eğitim koçu sınav başarısını artırır mı?",
    answer:
      "Doğru uygulandığında düzenli takip, hedef odaklı çalışma ve etkili zaman yönetimi öğrencinin akademik performansını önemli ölçüde destekler. Sonuç, öğrencinin sürece katılımına ve çalışma disiplinine bağlıdır.",
  },
  {
    question: "Görüşmeler ne sıklıkla yapılır?",
    answer:
      "Çoğu program haftalık planlanır. Ancak öğrencinin ihtiyacına göre görüşme sıklığı artırılabilir veya yeniden düzenlenebilir.",
  },
  {
    question: "Eğitim koçluğu ile öğrenci koçluğu arasında fark var mı?",
    answer:
      "İki kavram büyük ölçüde aynı çalışmayı tanımlar. Eğitim koçluğu genellikle akademik planlama ve sınav hazırlığını öne çıkarırken, öğrenci koçluğu motivasyon ve kişisel gelişim tarafını da kapsayacak şekilde kullanılır.",
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

export default function DenizliEgitimKocluguPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Öğrencilik süreci her zaman aynı şekilde ilerlemez. Bazen motivasyon düşer, bazen de doğru çalışma yöntemi bulunamaz. İşte tam bu noktada eğitim koçluğu desteği önemli bir fark oluşturur; çünkü doğru planlama, düzenli takip ve kişiye özel rehberlik başarı yolculuğunu daha verimli hâle getirir."
      faqs={faqs}
      sources={sources}
    >
      <p>
        Bu yazıda eğitim koçluğunun ne olduğunu, kimler için uygun olduğunu, süreçte hangi
        çalışmaların yapıldığını ve doğru koçu seçerken nelere dikkat edilmesi gerektiğini
        ele alıyoruz.
      </p>

      <section aria-labelledby="egitim-koclugu-nedir">
        <h2 id="egitim-koclugu-nedir">Eğitim Koçluğu Nedir?</h2>
        <p>
          Eğitim koçluğu, öğrencinin akademik, sosyal ve kişisel gelişimini destekleyen
          profesyonel bir rehberlik hizmetidir. Amaç yalnızca notları yükseltmek değildir.
          Aynı zamanda öğrencinin hedef belirlemesini, zamanı doğru yönetmesini ve düzenli
          çalışma alışkanlığı kazanmasını sağlamaktır.
        </p>
        <p>
          Her öğrencinin öğrenme şekli farklıdır. Bu nedenle eğitim koçluğu kişiye özel
          planlanır. Böylece öğrenci kendi potansiyelini daha rahat ortaya koyabilir.
        </p>
        <p>
          Üniversite sınavına hazırlanan öğrencilerden okul başarısını yükseltmek isteyen
          bireylere kadar geniş bir kitle bu destekten yararlanır. Sınav hazırlığı, ders
          çalışma planı, motivasyon yönetimi, hedef belirleme ve verimli öğrenme teknikleri
          gibi birçok konuda somut avantaj sağlar.
        </p>
      </section>

      <section aria-labelledby="kimler-icin-uygun">
        <h2 id="kimler-icin-uygun">Eğitim Koçluğu Kimler İçin Uygundur?</h2>
        <p>
          Bu hizmet birçok öğrenciye katkı sağlar. Özellikle sınav sürecinde olan öğrenciler
          önemli avantaj elde eder. Bunun yanında dikkat dağınıklığı yaşayanlar da düzenli
          destekten faydalanabilir.
        </p>
        <BlogChecklist items={audiences} />
      </section>

      <section aria-labelledby="neden-tercih-edilmeli">
        <h2 id="neden-tercih-edilmeli">Eğitim Koçluğu Neden Tercih Edilmelidir?</h2>
        <p>
          Başarı sadece çok çalışmakla gelmez; doğru çalışmak da büyük önem taşır. Bu yüzden
          eğitim koçları öğrencinin güçlü ve gelişime açık yönlerini analiz eder. Ardından
          gerçekçi bir çalışma planı hazırlar.
        </p>
        <p>
          Bununla birlikte düzenli görüşmeler motivasyonu canlı tutar. Ayrıca hedefler
          sürekli takip edilir. Böylece öğrencinin süreci daha kontrollü ilerler.
        </p>
        <p>
          Planlı çalışmanın, düzenli geri bildirimin ve hedef takibinin akademik başarı
          üzerindeki olumlu etkisi eğitim psikolojisi alanındaki çalışmalarla ve Millî Eğitim
          Bakanlığı rehberlik uygulamalarıyla da desteklenmektedir.
        </p>
      </section>

      <section aria-labelledby="surecte-neler-yapilir">
        <h2 id="surecte-neler-yapilir">Eğitim Koçluğu Sürecinde Neler Yapılır?</h2>
        <p>
          Profesyonel bir koçluk süreci birçok aşamadan oluşur. Ancak her adım öğrencinin
          ihtiyacına göre şekillenir. Süreç genel olarak şu çalışmaları kapsar:
        </p>
        <BlogChecklist items={processSteps} />
        <p>
          Böylece öğrenci yalnızca sınava değil, gelecekteki eğitim hayatına da hazırlanır.
        </p>
      </section>

      <section aria-labelledby="koc-secimi">
        <h2 id="koc-secimi">Eğitim Koçu Seçerken Nelere Dikkat Edilmeli?</h2>
        <p>
          Doğru eğitim koçu seçmek oldukça önemlidir. Öncelikle deneyim dikkate alınmalıdır.
          Ayrıca kullanılan takip sistemi incelenmelidir. Bunun yanında öğrenciyle kurulan
          iletişim de başarıyı doğrudan etkiler.
        </p>
        <BlogChecklist items={selectionCriteria} />
        <p>
          Şeffaf çalışma planı sunan, düzenli geri bildirim veren ve bilimsel yöntemleri
          kullanan uzmanlar daha güvenilir bir süreç sunar.
        </p>
      </section>

      <section aria-labelledby="sonuc">
        <h2 id="sonuc">Sürecin Öğrenciye Kazandırdıkları</h2>
        <p>
          Eğitim koçluğu sayesinde öğrenciler düzenli çalışma alışkanlığı kazanabilir,
          motivasyonlarını koruyabilir ve sınav sürecini daha bilinçli yönetebilir. Sürecin
          nasıl ilerlediğini, kimler için uygun olduğunu ve sağladığı avantajları
          değerlendirerek kendiniz için en doğru seçeneği belirleyebilirsiniz.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
