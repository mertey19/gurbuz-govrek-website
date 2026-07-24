import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("universite-bolum-secerken-yapilan-hatalar");

export const metadata: Metadata = createBlogMetadata(post);

const mistakes = [
  "Sadece YKS puanına bakmak",
  "Geçen yılın taban sırasını kesin sonuç sanmak",
  "Kontenjan değişikliklerini göz ardı etmek",
  "Programın özel koşullarını okumamak",
  "Bölümün ders planını incelememek",
  "Yalnızca üniversitenin adına veya popülerliğine göre karar vermek",
  "Şehri bölümden daha önemli hâle getirmek",
  "Eğitim dili ve hazırlık sınıfını araştırmamak",
  "Aile veya çevre baskısıyla istemediği bölümü yazmak",
  "Yerleştiğinde kayıt yaptırmayacağı programları listeye eklemek",
];

const replacementActions = [
  "Puan yerine ilgili puan türündeki başarı sırasını temel alın.",
  "Birkaç yılın verisini ve kontenjan hareketini birlikte inceleyin.",
  "Her programın ders planını, özel koşullarını ve kampüsünü araştırın.",
  "Mesleğin günlük çalışma biçimini ve farklı kariyer yollarını öğrenin.",
  "Bütçe, burs, barınma ve ulaşımı toplam maliyet olarak değerlendirin.",
  "Listeyi öğrencinin gerçek istek sırasına göre oluşturun.",
  "Son kontrolü güncel ÖSYM kılavuzundan yapın.",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Popüler bir bölüm seçmek hata mıdır?",
    answer:
      "Bölüm öğrencinin ilgi, yetenek ve çalışma beklentileriyle uyumluysa popüler olması sorun değildir. Hata, yalnızca popüler olduğu için ders içeriğini ve mesleğin günlük yaşamını araştırmadan karar vermektir.",
  },
  {
    question: "Üniversite adı mı, bölüm mü daha önemlidir?",
    answer:
      "Bu iki unsur birlikte değerlendirilmelidir. Bölümün ders planı, akademik kadrosu ve uygulama olanakları öğrencinin mesleki gelişimini doğrudan etkiler; üniversitenin genel olanakları ise bu deneyimi destekler.",
  },
  {
    question: "İstemediğim bir bölümü açıkta kalmamak için yazmalı mıyım?",
    answer:
      "Aday, yerleştiğinde kayıt yaptırmayı ve okumayı düşünmediği bir programı listesine eklememelidir. Tercih listesi yalnızca kabul edilebilir seçeneklerden oluşmalıdır.",
  },
  {
    question: "Bölümün iş imkânları nasıl araştırılır?",
    answer:
      "Ders planı, mezunların çalıştığı alanlar, meslek kuruluşları, staj ve uygulama fırsatları, sektör raporları ve mezunlarla yapılacak görüşmeler birlikte kullanılabilir. Tek bir maaş veya iş garantisi iddiasına dayanılmamalıdır.",
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
    label: "YÖK Atlas — Program, kontenjan ve yerleşme verileri",
    href: "https://yokatlas.yok.gov.tr/",
  },
];

export default function BolumSecimiHatalariPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Tercih dönemindeki en büyük hata yanlış bir sıralama tahmini yapmak değil, öğrencinin kendisine uygun olmayan bir programı yeterince araştırmadan seçmesidir."
      faqs={faqs}
      sources={sources}
    >
      <p>
        Üniversite ve bölüm seçimi; puan, şehir veya tek bir meslek unvanına indirgenemeyecek
        kadar çok boyutlu bir karardır. Öğrencinin ilgi alanı, öğrenme biçimi, ekonomik
        koşulları ve gelecekte istediği yaşam düzeni birlikte değerlendirilmelidir.
      </p>

      <section aria-labelledby="on-hata">
        <h2 id="on-hata">En Sık Karşılaşılan 10 Tercih Hatası</h2>
        <BlogChecklist items={mistakes} tone="warning" />
      </section>

      <section aria-labelledby="yalnizca-puan">
        <h2 id="yalnizca-puan">1. Yalnızca Puana veya Tek Yıla Bakmak</h2>
        <p>
          YKS puanlarının dağılımı her yıl değişebilir. Başarı sırası daha kullanışlı bir
          başlangıç noktası olsa da geçen yılın taban sırası bu yıl için garanti değildir.
          Birkaç yılın eğilimi, güncel kontenjanlar ve programa olan talep birlikte
          değerlendirilmelidir.
        </p>
      </section>

      <section aria-labelledby="kosullari-okumamak">
        <h2 id="kosullari-okumamak">2. Özel Koşulları Okumamak</h2>
        <p>
          Programın eğitim dili, hazırlık sınıfı, kampüs yeri, sağlık koşulları, burs ve
          ücret açıklamaları adayın kararını doğrudan etkileyebilir. Sıralaması uygun görünen
          bir program, özel koşulları nedeniyle öğrenci için uygun olmayabilir.
        </p>
      </section>

      <section aria-labelledby="ders-plani">
        <h2 id="ders-plani">3. Bölüm Adını Bilip Ders Planını Bilmemek</h2>
        <p>
          Aynı isimli bölümler farklı üniversitelerde farklı seçmeli dersler, uzmanlaşma
          alanları ve uygulama imkânları sunabilir. Bölümün ilk yıldan son yıla kadar ders
          planı incelenmeli; laboratuvar, staj, proje ve saha çalışmaları araştırılmalıdır.
        </p>
      </section>

      <section aria-labelledby="universite-etiketi">
        <h2 id="universite-etiketi">4. Yalnızca Üniversite Etiketine Güvenmek</h2>
        <p>
          Üniversitenin genel tanınırlığı önemli olabilir, ancak öğrencinin eğitim alacağı
          bölümün niteliğini tek başına açıklamaz. Akademik kadro, bölümün altyapısı,
          öğrenci başına düşen olanaklar ve mezunların izlediği yollar program özelinde
          araştırılmalıdır.
        </p>
      </section>

      <section aria-labelledby="sehir-merkezli">
        <h2 id="sehir-merkezli">5. Şehri Bölümün Önüne Koymak</h2>
        <p>
          Şehir, barınma ve yaşam kalitesi önemlidir; fakat öğrencinin istemediği bir
          bölümü yalnızca sevdiği şehirde olduğu için seçmesi uzun vadeli memnuniyetsizlik
          yaratabilir. Bölüm uygunluğu ve yaşam koşulları aynı değerlendirme tablosunda
          birlikte ele alınmalıdır.
        </p>
      </section>

      <section aria-labelledby="meslek-gercegi">
        <h2 id="meslek-gercegi">6. Mesleğin Günlük Gerçekliğini Araştırmamak</h2>
        <p>
          Bir mesleğin adı ile günlük çalışma biçimi aynı şey değildir. Çalışma ortamı,
          insan ilişkisi yoğunluğu, masa başı veya saha dengesi, vardiya, sürekli öğrenme
          ihtiyacı ve farklı uzmanlaşma yolları araştırılmalıdır. Mümkünse o alanda çalışan
          kişilerle görüşülmelidir.
        </p>
      </section>

      <section aria-labelledby="cevre-baskisi">
        <h2 id="cevre-baskisi">7. Kararı Tamamen Çevreye Bırakmak</h2>
        <p>
          Aile ve öğretmenlerin görüşleri değerli olabilir; fakat tercih listesinin
          merkezinde öğrenci bulunmalıdır. Başkasının beklentisini karşılamak için seçilen
          program, öğrencinin motivasyonu ve akademik devamlılığı açısından risk yaratır.
        </p>
      </section>

      <section aria-labelledby="dogru-adimlar">
        <h2 id="dogru-adimlar">Bu Hataların Yerine Ne Yapılmalı?</h2>
        <BlogChecklist items={replacementActions} />
      </section>
    </BlogArticleLayout>
  );
}
