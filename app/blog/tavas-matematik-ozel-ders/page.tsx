import type { Metadata } from "next";
import {
  BlogArticleLayout,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("tavas-matematik-ozel-ders");

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
    question: "Tavas'ta matematik özel dersi hangi seviyeler için alınabilir?",
    answer:
      "İlkokul, ortaokul ve lise öğrencileri için seçenekler bulunuyor. LGS, TYT ve AYT hazırlığı yapan öğrenciler de kendi sınav düzeylerine göre özel ders alabilirler.",
  },
  {
    question: "Matematikte temeli zayıf olan öğrenci özel derse başlayabilir mi?",
    answer:
      "Evet. Hatta birebir dersin önemli avantajlarından biri, eksik konunun doğrudan fark edilmesidir. Öğretmen öğrencinin çözemediği soruyu inceleyerek problemin bilgi eksikliğinden mi, işlem hatasından mı, yoksa soru yorumlamadan mı kaynaklandığını belirleyebilir.",
  },
  {
    question: "Haftada kaç saat matematik dersi alınmalı?",
    answer:
      "Bu süre öğrencinin seviyesine göre belirlenir. Konu eksiği fazla olan bir öğrenci için haftalık iki ders gerekebilir. Okul desteği alan bir öğrenci için haftada bir ders yeterli olabilir.",
  },
  {
    question: "Tavas'ta online matematik dersi alınabilir mi?",
    answer:
      "Evet. Tavas için online matematik dersi alabilirsiniz. Online olarak ortaokuldan YKS seviyesine kadar farklı gruplara özel ders verilmektedir.",
  },
  {
    question: "Online matematik dersi verimli olur mu?",
    answer:
      "Öğrenci derste aktif soru çözüyor ve öğretmenle sürekli iletişim kuruyorsa online ders verimli olabilir. Özellikle ulaşım süresi sorun olan öğrenciler için pratik bir seçenek oluşturur.",
  },
  {
    question: "Özel ders alırken veli sürece dahil olmalı mı?",
    answer:
      "Veli, öğrencinin ders düzenini takip edebilir. Ancak ders sırasında sürekli müdahale etmek yerine öğretmenden belirli aralıklarla bilgi almak daha sağlıklı olabilir. Özellikle çalışma düzeni, ödev takibi ve sınav sonuçları hakkında kısa geri bildirimler yeterli olabilir.",
  },
  {
    question: "Tavas'ta matematik öğretmeni seçerken ilk görüşmede ne sorulmalı?",
    answer:
      "Öğrencinin seviyesini nasıl belirlediğini, hangi kaynaklarla çalıştığını ve ders sonrasında nasıl takip yaptığını sorabilirsiniz. Bununla beraber öğretmenin LGS, TYT veya AYT gibi hedeflenen sınavla ilgili deneyimini öğrenmek de faydalıdır.",
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

export default function TavasMatematikOzelDersPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Matematikte bazı konular sınıfta anlaşılır, bazıları ise birkaç soru sonra karışır. Özellikle problem çözme, denklem, fonksiyon ve geometri konularında küçük bir eksik sonraki konuları da zorlaştırabilir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Tavas Matematik Özel Ders seçeneği, öğrencinin takıldığı noktayı doğrudan ele alma
        fırsatı sunar. Ders sürecinde öğrencinin hangi sorularda zaman kaybettiği, hangi
        konuları karıştırdığı ve nerede desteğe ihtiyaç duyduğu daha net görülebilir.
      </p>

      <section aria-labelledby="ders-plani">
        <h2 id="ders-plani">Öğrencinin Seviyesine Göre Ders Planı Nasıl Oluşur?</h2>
        <p>
          Bir öğrencinin dört işlemde zorlanmasıyla TYT problemlerinde süre yetiştirememesi aynı
          sorun değildir. Bu yüzden Tavas Matematik Özel Ders sürecinde öğrencinin mevcut
          seviyesini görmek ilk adımlardan biri olmalıdır.
        </p>
        <p>
          Örneğin 8. sınıfta bir öğrenci yeni nesil sorularda işlem hatası yapıyorsa yalnızca
          daha fazla soru çözmek yeterli olmayabilir. Soru kökünü parçalara ayırmak, verilenleri
          işaretlemek ve çözüm yolunu kısa adımlara bölmek daha işlevli olabilir. Lise
          öğrencisinde ise fonksiyonlar veya ikinci derece denklemler için önce temel kavramların
          kontrol edilmesi gerekebilir.
        </p>
      </section>

      <section aria-labelledby="ogretmen-secimi">
        <h2 id="ogretmen-secimi">
          Tavas&#39;ta Özel Ders Öğretmeni Seçerken Neye Bakılmalı?
        </h2>
        <p>
          Öğretmenin yalnızca matematik bilgisine bakmak yeterli değildir. Öğrencinin seviyesine
          uygun anlatım yapabilmesi de önemlidir.
        </p>
        <p>
          Tavas Matematik Özel Ders araştırırken yalnızca ders ücretine bakmak yeterli değildir.
          Öğretmenin hangi sınıflarla çalıştığı sorulmalıdır. Daha sonra LGS, TYT veya AYT
          deneyimi öğrenilebilir. Derslerin nerede yapılacağı, haftalık ders süresi ve ders
          sonrasında soru takibinin bulunup bulunmadığı da netleştirilebilir.
        </p>
      </section>

      <section aria-labelledby="ders-sikligi">
        <h2 id="ders-sikligi">Ders Sıklığı Nasıl Belirlenir?</h2>
        <p>
          Haftada kaç saat ders alınacağı öğrencinin hedefiyle bağlantılıdır. Okul sınavlarında
          zorlanan bir öğrenci için haftada bir ders ve düzenli soru çözümü yeterli olabilir. LGS
          veya YKS hazırlığında olan öğrencinin ise daha sık konu takibine ihtiyacı bulunabilir.
        </p>
        <p>
          Ders dışında çözülen sorular da önemlidir. Örneğin bir öğrenci derste 20 soru çözüp
          hepsini doğru yapabilir. Ancak ertesi gün benzer sorularda zorlanıyorsa konu henüz
          kalıcı hale gelmemiş olabilir. Bu yüzden sonraki derste kısa bir kontrol yapılması
          faydalıdır.
        </p>
      </section>

      <section aria-labelledby="fiyat-degerlendirme">
        <h2 id="fiyat-degerlendirme">
          Tavas Matematik Özel Ders Fiyatları Nasıl Değerlendirilmeli?
        </h2>
        <p>
          Ücret, öğretmenin deneyimine, öğrencinin seviyesine, ders süresine ve dersin yüz yüze
          ya da online yapılmasına göre farklılaşır. Bu yüzden yalnızca saat ücretine bakmak
          yerine dersin kapsamını sormak gerekir. Öğretmen soru takibi yapıyor mu? Ders
          sonrasında çalışma öneriyor mu? Deneme sonuçlarını değerlendiriyor mu? Öğrencinin
          eksiklerini kayıt altında tutuyor mu? Bu sorular, ücret karşılığında alınan desteğin
          kapsamını anlamayı kolaylaştırır.
        </p>
      </section>

      <p>
        Tavas Matematik Özel Ders seçiminde asıl mesele yalnızca bir öğretmen bulmak değildir.
        Öğrencinin mevcut seviyesini, okul programını ve sınav hedefini birlikte değerlendirmek
        gerekir. Dersin nasıl ilerleyeceği baştan konuşulursa hem öğrenci hem veli ne
        bekleyeceğini bilir.
      </p>
    </BlogArticleLayout>
  );
}
