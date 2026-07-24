import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  BlogSteps,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("basari-sirasina-gore-tercih-listesi-nasil-hazirlanir");

export const metadata: Metadata = createBlogMetadata(post);

const preparationSteps = [
  "Sonuç belgesindeki ilgili puan türü ve başarı sırasını doğru kaydedin.",
  "Gerçekten okumak istediğiniz bölüm ve üniversitelerden bir aday havuzu oluşturun.",
  "Programların geçmiş yıllardaki taban sıralarını ve kontenjan değişimlerini karşılaştırın.",
  "Özel koşullar, eğitim dili, hazırlık sınıfı, burs ve ücret bilgilerini kontrol edin.",
  "Seçenekleri erişmesi zor, dengeli ve daha güvenli aralıklar hâlinde çeşitlendirin.",
  "Yalnızca kayıt yaptırmayı düşüneceğiniz programları istek sıranıza göre listeleyin.",
  "Program kodlarını ve listenin son hâlini güncel ÖSYM kılavuzundan kontrol edin.",
];

const finalChecks = [
  "Her programın kodu ve adı güncel kılavuzla aynı mı?",
  "Başarı sırası doğru puan türünden mi değerlendirildi?",
  "Kontenjan artışı veya azalışı incelendi mi?",
  "Özel koşul ve açıklamalar tek tek okundu mu?",
  "Eğitim dili, hazırlık ve kampüs bilgisi biliniyor mu?",
  "Vakıf programlarında burs oranı, ücret ve devam koşulları doğrulandı mı?",
  "Listedeki her programa yerleşildiğinde kayıt yaptırma isteği var mı?",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Tercih listesi yalnızca başarı sırasına göre mi hazırlanmalı?",
    answer:
      "Hayır. Başarı sırası önemli bir başlangıç verisidir; ancak kontenjanlar, bölüm içeriği, özel koşullar, eğitim dili, şehir, bütçe ve öğrencinin kariyer hedefi de birlikte değerlendirilmelidir.",
  },
  {
    question: "Geçen yılın taban sırası bu yıl için garanti midir?",
    answer:
      "Değildir. Taban sıralar adayların tercih davranışlarına, kontenjanlara ve programlara olan talebe göre değişebilir. Geçmiş veriler yön gösterir fakat kesin sonuç vermez.",
  },
  {
    question: "Sıralamamdan daha yüksek programları yazabilir miyim?",
    answer:
      "Aday, koşullarını sağladığı ve gerçekten okumak istediği programları listesine ekleyebilir. Ancak listeyi yalnızca erişmesi zor seçeneklerden oluşturmak yerine farklı olasılık aralıklarında çeşitlendirmek daha dengeli olur.",
  },
  {
    question: "Tercih sırası önemli midir?",
    answer:
      "Liste, öğrencinin gerçek istek sırasını yansıtmalıdır. Aday yalnızca yerleştiğinde kayıt yaptırmayı düşüneceği programları yazmalı ve en çok istediği seçeneği daha yukarıda değerlendirmelidir.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — 2026-YKS Yükseköğretim Programları ve Kontenjanları Kılavuzu duyurusu",
    href: "https://osym.gov.tr/2026yks-yuksekogretim-programlari-ve-kontenjanlari-kilavuzunun-yayimlanmasi",
  },
  {
    label: "ÖSYM — YKS kılavuz ve tercih duyuruları",
    href: "https://www.osym.gov.tr/yks/sinav_kilavuzu/",
  },
  {
    label: "YÖK Atlas — Lisans ve ön lisans tercih verileri",
    href: "https://yokatlas.yok.gov.tr/",
  },
];

export default function BasariSirasinaGoreListePage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Başarı sırası, tercih listesinin pusulasıdır; fakat tek başına rota değildir. Sağlıklı bir liste için sıralama verisinin kontenjanlar, program koşulları ve öğrencinin gerçek istekleriyle birlikte okunması gerekir."
      faqs={faqs}
      sources={sources}
    >
      <p>
        YKS puanları sınavın güçlüğüne ve adayların performansına göre yıldan yıla
        değişebilir. Başarı sırası ise adayın aynı puan türündeki diğer adaylar arasındaki
        konumunu gösterdiği için programları karşılaştırmada daha kullanışlı bir başlangıç
        sağlar. Yine de geçen yılın sıralamasını bu yılın kesin sonucu gibi görmek doğru
        değildir.
      </p>

      <section aria-labelledby="puan-ve-sira">
        <h2 id="puan-ve-sira">Puan ile Başarı Sırası Arasındaki Fark</h2>
        <p>
          Puan, adayın sınav performansından hesaplanan sayısal değerdir. Başarı sırası ise
          aynı puan türündeki adaylar arasındaki yerini ifade eder. Farklı yıllardaki puanlar
          doğrudan karşılaştırıldığında sınavın zorluk düzeyi yanıltıcı olabilir. Bu yüzden
          tercih araştırmasına başarı sırasıyla başlamak daha sağlıklı bir çerçeve sunar.
        </p>
        <p>
          Ancak taban başarı sırası da geçmiş yılın sonucudur. Kontenjanın değişmesi, yeni
          programların açılması, burs oranları veya adayların ilgisi yeni yılda farklı bir
          tablo oluşturabilir.
        </p>
      </section>

      <section aria-labelledby="liste-adimlari">
        <h2 id="liste-adimlari">Tercih Listesi Hazırlamanın 7 Adımı</h2>
        <BlogSteps items={preparationSteps} />
      </section>

      <section aria-labelledby="gecmis-veri">
        <h2 id="gecmis-veri">Geçmiş Yıl Verileri Nasıl Okunmalı?</h2>
        <p>
          Tek bir yılın taban sırasına bakmak yerine mümkün olduğunda birkaç yılın eğilimi
          birlikte incelenmelidir. Programın sıralaması düzenli biçimde yükseliyor mu,
          dalgalanıyor mu, yoksa kontenjan değişikliği nedeniyle farklılaşıyor mu? Bu
          sorular, sayının arkasındaki hareketi anlamaya yardımcı olur.
        </p>
        <p>
          YÖK Atlas karşılaştırma için güçlü bir referans sağlar; ancak nihai kontrol her
          zaman güncel ÖSYM kılavuzundan yapılmalıdır. Program kodu, kontenjan ve özel
          koşullar son yayımlanan kılavuzla aynı olmalıdır.
        </p>
      </section>

      <section aria-labelledby="dengeli-liste">
        <h2 id="dengeli-liste">Dengeli Tercih Listesi Ne Demektir?</h2>
        <p>
          Dengeli liste, yalnızca sıralamanın çok üstündeki programlardan veya yalnızca
          daha düşük taban sıralı seçeneklerden oluşmaz. Öğrencinin gerçekten istediği
          programlar; ulaşılması daha zor, geçmiş verilerle uyumlu ve daha güvenli görünen
          seçenekler olarak çeşitlendirilir.
        </p>
        <p>
          Bu gruplar kesin yerleşme garantisi değildir. Ama listenin tek bir olasılığa
          bağımlı kalmasını önler. Her seçeneğin öğrenci için akademik ve kişisel açıdan
          kabul edilebilir olması temel koşuldur.
        </p>
      </section>

      <section aria-labelledby="kontenjan-etkisi">
        <h2 id="kontenjan-etkisi">Kontenjan Değişimi Neden Önemlidir?</h2>
        <p>
          Bir programın kontenjanı azaldığında geçmiş taban sırası aynı kalsa bile rekabet
          yapısı değişebilir. Kontenjan artışı da programın mutlaka daha düşük sırayla
          kapatacağı anlamına gelmez; talep aynı anda yükselebilir. Bu nedenle kontenjan,
          geçmiş sıralama ve programa olan ilgi birlikte yorumlanmalıdır.
        </p>
      </section>

      <section aria-labelledby="ozel-kosullar">
        <h2 id="ozel-kosullar">Özel Koşullar Atlanmamalı</h2>
        <p>
          Tercih kılavuzundaki özel koşullar; hazırlık sınıfı, eğitim dili, sağlık şartı,
          kampüs yeri, ücret, burs veya uygulama yükümlülükleri gibi kritik bilgiler
          içerebilir. Sıralaması uygun görünen bir program, bu koşullar nedeniyle öğrenci
          için uygun olmayabilir.
        </p>
      </section>

      <section aria-labelledby="son-kontrol">
        <h2 id="son-kontrol">Listeyi Göndermeden Önce Son Kontrol</h2>
        <BlogChecklist items={finalChecks} />
      </section>
    </BlogArticleLayout>
  );
}
