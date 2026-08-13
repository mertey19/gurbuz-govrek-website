import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("kale-matematik-ozel-ders");

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
    question: "1. Matematik özel ders kaçıncı sınıftan itibaren alınabilir?",
    answer:
      "İlkokul seviyesinden itibaren birebir matematik desteği alınabilir. Ders içeriği öğrencinin yaşına ve seviyesine göre planlanır.",
  },
  {
    question: "2. Matematik özel ders sınav başarısını artırır mı?",
    answer:
      "Düzenli çalışma, konu eksiklerinin giderilmesine ve soru çözme pratiğinin gelişmesine katkı sağlayabilir. Ancak başarı, öğrencinin çalışması ve ders sürecine katılımıyla birlikte değerlendirilir.",
  },
  {
    question: "3. Dersler okul konularına göre planlanabilir mi?",
    answer:
      "Evet. Öğrencinin okulda gördüğü konular takip edilir. Eksik kalan kazanımlar için ek çalışma yapılır.",
  },
  {
    question: "4. Kale Matematik özel ders seçerken neye bakılmalı?",
    answer:
      "Öğretmenin alan bilgisi, öğrenciyle iletişimi, ders planı ve öğrencinin seviyesine uygun çalışma yöntemi birlikte değerlendirilmelidir.",
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

export default function KaleMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematik bazı öğrenciler için kolay ilerler. Bazıları ise aynı konuyu birkaç kez dinlemek ister. Çünkü öğrenme hızı kişiden kişiye değişir. Bu noktada birebir çalışma önemli bir avantaj sağlar."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Kale Matematik özel ders, öğrencinin seviyesine göre şekillenen daha kişisel bir çalışma
        düzeni oluşturur.
      </p>

      <section aria-labelledby="ne-kazandirir">
        <h2 id="ne-kazandirir">Matematik Özel Ders Öğrenciye Ne Kazandırır?</h2>
        <p>
          Birebir derste öğretmen, öğrencinin çözümlerini yakından takip eder. Hangi konuda
          zorlandığını daha kolay fark eder. Ardından çalışma planını buna göre düzenler.
        </p>
        <p>
          Örneğin öğrenci kesirlerde işlem hatası yapıyorsa yalnızca yeni soru çözmek yeterli
          olmaz. Önce temel işlem becerileri güçlendirilir. Sonrasında farklı soru tiplerine
          geçilir. Böylece öğrenci, ezber yerine mantığı anlamaya başlar.
        </p>
        <p>
          Kale Matematik özel ders, öğrencinin okul programıyla uyumlu olarak ilerler. Okulda
          işlenen konu desteklenir. Bununla birlikte sınav öncesinde eksik konulara odaklanılır.
        </p>
      </section>

      <section aria-labelledby="hangi-ogrenciler">
        <h2 id="hangi-ogrenciler">Hangi Öğrenciler İçin Uygundur?</h2>
        <p>
          Matematik özel ders yalnızca düşük not alan öğrenciler için değildir. Daha yüksek
          hedefleri olan öğrenciler de birebir eğitimden yararlanabilir.
        </p>
        <p>
          İlk olarak konu eksikleri belirlenir. Daha sonra seviyeye uygun sorular seçilir. Kolay
          sorularla güven kazanılır. Ardından orta ve zor seviyeye geçilir.
        </p>
        <p>
          Özellikle sınav kaygısı yaşayan öğrencilerde düzenli tekrar faydalıdır. Çünkü öğrenci
          konuyu anladığını gördükçe derse karşı daha rahat yaklaşır.
        </p>
      </section>

      <section aria-labelledby="ders-surecinde">
        <h2 id="ders-surecinde">Ders Sürecinde Nelere Dikkat Edilir?</h2>
        <p>
          İyi bir ders yalnızca soru çözmekten oluşmaz. Öğrencinin neden hata yaptığını analiz
          edilir. Bundan dolayı yanlış sorular tekrar incelenir.
        </p>
        <p>
          Ayrıca öğretmenin anlatım dili öğrencinin yaşına uygun olarak yapılır. İlkokul
          öğrencisiyle lise öğrencisinin çalışma yöntemi aynı değildir. Kale Matematik özel ders
          de bu ayrıntıya dikkat edilir, ders verimi artırılır.
        </p>
        <p>
          Derslerin düzenli yapılır. Bir hafta yoğun çalışıp sonra uzun süre ara verilmez
          Sürdürülebilir bir program oluşturularak daha sağlıklı ilerleme sağlanır.
        </p>
      </section>

      <section aria-labelledby="guveni-gelistirmek">
        <h2 id="guveni-gelistirmek">Matematikte Güveni Adım Adım Geliştirmek</h2>
        <p>
          Matematikte başarı çoğu zaman tek bir derste ortaya çıkmaz. Küçük ilerlemeler zamanla
          güçlü bir temele dönüşür. Öğrenci çözemediği bir soruyu yeniden denediğinde önemli bir
          kazanım elde eder. Bu süreçte doğru yönlendirme, düzenli tekrar ve seviyeye uygun soru
          seçimi belirleyici olur. Kale Matematik özel ders arayışında da hedef yalnızca daha
          fazla soru çözmek değil, öğrencinin matematiği anlayarak ilerlemesini sağlamaktır.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
