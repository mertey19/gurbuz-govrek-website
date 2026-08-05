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

const post = getBlogPost("tyt-ayt-calisma-programi");

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

/*
  Belgedeki haftalık plan bir Word tablosu olarak geliyor. Onaltı satırlık düz
  liste yerine tablo olarak basılıyor; dar ekranda yatay kaydırma sarmalayıcısı
  var, sayfa gövdesi kaymıyor.
*/
const weeklyPlan = [
  { day: "Pazartesi", work: "TYT Matematik, Türkçe" },
  { day: "Salı", work: "AYT Matematik, Fizik" },
  { day: "Çarşamba", work: "TYT Fen, Sosyal Bilimler" },
  { day: "Perşembe", work: "AYT Kimya, Biyoloji" },
  { day: "Cuma", work: "TYT Problem, Paragraf" },
  { day: "Cumartesi", work: "Deneme Sınavı ve Analiz" },
  { day: "Pazar", work: "Konu Tekrarı ve Eksik Tamamlama" },
];

const habits = [
  "Her gün aynı saatte çalışmaya başlayın.",
  "Telefon kullanımını sınırlandırın.",
  "Çalışma ortamınızı sade tutun.",
  "Molaları düzenli verin.",
  "Günlük soru hedefi belirleyin.",
  "Haftalık gelişiminizi takip edin.",
  "Yanlış yaptığınız soruları tekrar çözün.",
  "Düzenli uyumaya özen gösterin.",
];

const audience = [
  "sınıf öğrencileri",
  "Mezun adaylar",
  "Temelini güçlendirmek isteyenler",
  "Derece hedefleyen öğrenciler",
  "Düzenli çalışmak isteyen adaylar",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "1. TYT AYT çalışma programı günde kaç saat olmalıdır?",
    answer:
      "Bu süre öğrencinin seviyesine göre değişir. Genellikle 4 ile 8 saat arasında verimli çalışma yeterli olabilir. Önemli olan süre değil, çalışma kalitesidir.",
  },
  {
    question: "2. TYT ve AYT aynı gün çalışılır mı?",
    answer:
      "Evet. Özellikle sınava yaklaşıldıkça iki oturumu birlikte çalışmak faydalıdır. Ancak ders dağılımı dengeli olmalıdır.",
  },
  {
    question: "3. Haftada kaç deneme çözmek gerekir?",
    answer:
      "Başlangıç döneminde haftada bir deneme yeterlidir. Daha sonra bu sayı iki veya üçe çıkarılabilir.",
  },
  {
    question: "4. TYT AYT çalışma programı kişiye özel hazırlanmalı mı?",
    answer:
      "Evet. Her öğrencinin eksikleri ve hedefleri farklıdır. Bu nedenle kişiye uygun plan her zaman daha başarılı sonuç verir.",
  },
  {
    question: "5. Program bozulursa ne yapılmalıdır?",
    answer:
      "Moralinizi bozmayın. Kaldığınız yerden devam edin. Ayrıca programınızı yeniden düzenleyerek sürdürülebilir hale getirin.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — TYT ve AYT konu dağılımları ile sınav takvimi",
    href: "https://osym.gov.tr/",
  },
  {
    label: "MEB — Ortaöğretim ders programları ve kazanımlar",
    href: "https://mufredat.meb.gov.tr/",
  },
];

export default function TytAytCalismaProgramiPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="TYT AYT çalışma programı, üniversite sınavına hazırlık sürecinde düzenli ilerlemek isteyen öğrenciler için en önemli araçlardan biridir. Doğru hazırlanan bir plan, zamanı verimli kullanmayı sağlar. Ayrıca motivasyonu artırır. Bunun yanında eksik konuların tamamlanmasını kolaylaştırır. Bu nedenle birçok öğrenci sınava hazırlık sürecinde kişisel bir çalışma planı oluşturmayı tercih eder."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <section aria-labelledby="neden-onemli">
        <h2 id="neden-onemli">TYT AYT Çalışma Programı Neden Önemlidir?</h2>
        <p>
          Üniversite sınavı uzun bir maratondur. Bu yüzden plansız ilerlemek ciddi zaman
          kaybına neden olabilir. Düzenli hazırlanan bir TYT AYT çalışma programı, hangi gün
          hangi dersin çalışılacağını açık şekilde gösterir. Böylece belirsizlik ortadan kalkar.
        </p>
        <p>
          Ayrıca program sayesinde tüm derslere dengeli zaman ayrılır. Bunun yanında eksik kalan
          konular daha erken fark edilir. Böylece son aylarda oluşabilecek yoğunluk önemli
          ölçüde azalır.
        </p>
      </section>

      <section aria-labelledby="nasil-hazirlanir">
        <h2 id="nasil-hazirlanir">İyi Bir TYT AYT Çalışma Programı Nasıl Hazırlanır?</h2>
        <p>
          Her öğrencinin seviyesi farklıdır. Bu nedenle herkes için tek bir plan uygun olmaz.
          Ancak başarılı bir program oluştururken bazı temel adımları takip etmek gerekir.
        </p>

        <h3>1. Mevcut Seviyenizi Belirleyin</h3>
        <p>
          Öncelikle deneme sınavı çözün. Daha sonra doğru ve yanlışlarınızı analiz edin. Böylece
          güçlü ve zayıf yönlerinizi net şekilde görebilirsiniz.
        </p>

        <h3>2. Gerçekçi Hedefler Belirleyin</h3>
        <p>
          Ulaşılması zor hedefler motivasyonu düşürür. Bunun yerine günlük ve haftalık hedefler
          oluşturun. Ardından küçük başarıları kutlayın.
        </p>

        <h3>3. Dersleri Dengeli Dağıtın</h3>
        <p>
          Sadece sevdiğiniz derslere odaklanmayın. Bunun yerine eksik olduğunuz alanlara daha
          fazla zaman ayırın. Böylece genel başarı seviyeniz yükselir.
        </p>

        <h3>4. Tekrar Günleri Ekleyin</h3>
        <p>
          Yeni öğrenilen bilgiler zamanla unutulur. Bu yüzden haftalık tekrar mutlaka
          yapılmalıdır. Ayrıca kısa konu özetleri hazırlamak da fayda sağlar.
        </p>

        <h3>5. Deneme Sınavlarını İhmal Etmeyin</h3>
        <p>
          Denemeler gerçek sınav deneyimi kazandırır. Bunun yanında zaman yönetimini geliştirir.
          Ayrıca soru çözme hızını artırır.
        </p>
      </section>

      <section aria-labelledby="haftalik-ornek">
        <h2 id="haftalik-ornek">Haftalık TYT AYT Çalışma Programı Örneği</h2>
        <p>Aşağıdaki örnek plan birçok öğrenci için yol gösterici olabilir.</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[26rem] border-collapse text-left text-[0.95rem]">
            <caption className="sr-only">
              Haftanın günlerine göre örnek TYT ve AYT çalışma içeriği
            </caption>
            <thead>
              <tr className="bg-navy text-white">
                <th scope="col" className="px-4 py-3 font-bold">
                  Gün
                </th>
                <th scope="col" className="px-4 py-3 font-bold">
                  Çalışma İçeriği
                </th>
              </tr>
            </thead>
            <tbody>
              {weeklyPlan.map((row) => (
                <tr key={row.day} className="border-b border-navy/10 even:bg-cream">
                  <th scope="row" className="px-4 py-3 font-bold text-navy">
                    {row.day}
                  </th>
                  <td className="px-4 py-3">{row.work}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6">
          Bu plan örnek niteliğindedir. Ancak kendi seviyenize göre rahatlıkla
          düzenleyebilirsiniz.
        </p>
      </section>

      <section aria-labelledby="dikkat">
        <h2 id="dikkat">TYT ve AYT Çalışırken Dikkat Edilmesi Gerekenler</h2>
        <p>
          Başarılı öğrencilerin ortak alışkanlıkları bulunur. Siz de bu alışkanlıkları günlük
          rutininize ekleyebilirsiniz.
        </p>
        <BlogChecklist items={habits} />
        <p>
          Ayrıca sağlıklı beslenmek de odaklanmayı artırır. Bunun yanında kısa yürüyüşler zihni
          dinlendirir.
        </p>
      </section>

      <section aria-labelledby="hatalar">
        <h2 id="hatalar">TYT AYT Çalışma Programı Hazırlarken Yapılan Hatalar</h2>
        <p>Bazı hatalar çalışma verimini ciddi şekilde düşürür.</p>
        <p>
          İlk olarak çok yoğun program hazırlamak önemli bir sorundur. Çünkü uygulanamayan
          planlar motivasyonu azaltır.
        </p>
        <p>
          Diğer yandan sadece konu çalışmak yeterli değildir. Bunun yanında bol soru çözmek
          gerekir.
        </p>
        <p>
          Ayrıca deneme analizlerini atlamak gelişimi yavaşlatır. Çünkü yanlışların neden
          yapıldığı mutlaka öğrenilmelidir.
        </p>
        <p>
          Son olarak düzensiz uyku çalışma performansını olumsuz etkiler. Bu nedenle günlük yaşam
          düzeni korunmalıdır.
        </p>
      </section>

      <section aria-labelledby="motivasyon">
        <h2 id="motivasyon">Motivasyonu Korumanın Etkili Yolları</h2>
        <p>Sınava hazırlık uzun sürebilir. Ancak motivasyonu korumak mümkündür.</p>
        <p>
          Küçük hedefler belirleyin. Ardından hedeflerinizi tamamladıkça kendinizi
          ödüllendirin. Ayrıca başarı hikâyeleri okuyabilirsiniz. Bunun yanında gelişiminizi
          haftalık olarak not alın. Böylece ilerlemenizi somut şekilde görebilirsiniz.
        </p>
        <p>Unutmayın, düzenli çalışan öğrenciler zamanla büyük fark oluşturur.</p>
      </section>

      <section aria-labelledby="kimler-icin">
        <h2 id="kimler-icin">TYT AYT Çalışma Programı Kimler İçin Uygundur?</h2>
        <p>Bu planlama sistemi birçok öğrenciye fayda sağlar.</p>
        <BlogChecklist items={audience} />
        <p>
          Her öğrencinin ihtiyacı farklıdır. Ancak planlı çalışma herkes için avantaj sağlar.
        </p>
      </section>

      <section aria-labelledby="kapanis">
        <h2 id="kapanis">
          TYT AYT Çalışma Programı ile Üniversite Hedefinize Bir Adım Daha Yaklaşın
        </h2>
        <p>
          Başarılı bir üniversite hazırlık süreci için TYT AYT çalışma programı oluşturmak büyük
          avantaj sağlar. Düzenli tekrar, planlı soru çözümü, deneme analizleri ve gerçekçi
          hedefler sayesinde başarı ihtimali önemli ölçüde artar. Eğer siz de sınav sürecinizi
          daha verimli geçirmek istiyorsanız, seviyenize uygun bir TYT AYT çalışma programı
          hazırlayarak disiplinli şekilde ilerleyebilir, eksiklerinizi zamanında tamamlayabilir
          ve üniversite hedefinize daha güçlü adımlarla ulaşabilirsiniz
        </p>
      </section>
    </BlogArticleLayout>
  );
}
