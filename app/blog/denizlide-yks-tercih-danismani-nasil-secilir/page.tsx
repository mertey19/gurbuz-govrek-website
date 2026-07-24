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

const post = getBlogPost("denizlide-yks-tercih-danismani-nasil-secilir");

export const metadata: Metadata = createBlogMetadata(post);

const selectionCriteria = [
  "Görüşmeye öğrenciyi ve hedeflerini tanımaya yönelik sorularla başlar.",
  "Güncel ÖSYM kılavuzunu ve YÖK Atlas verilerini birlikte kullanır.",
  "Hazır liste vermek yerine başarı sırası, ilgi alanı ve beklentilere göre analiz yapar.",
  "Programların özel koşullarını, eğitim dilini, burs ve ücret açıklamalarını kontrol eder.",
  "Tercihleri öğrenci adına dayatmaz; seçeneklerin artılarını ve risklerini açıklar.",
  "Kesin yerleşme veya kesin başarı garantisi vermez.",
  "Listenin son hâlini öğrenciyle birlikte yeniden kontrol eder.",
];

const questions = [
  "Tercih listesini hazırlarken hangi resmî kaynakları kullanıyorsunuz?",
  "Başarı sıramı ve son yıllardaki kontenjan değişimlerini nasıl yorumlayacaksınız?",
  "Bölüm içerikleri, eğitim dili, burslar ve özel koşullar ayrıca incelenecek mi?",
  "Görüşme sonunda bana yalnızca liste mi, yoksa karar gerekçelerini de sunacak mısınız?",
  "Tercih listesinin son kontrolünü birlikte yapacak mıyız?",
];

const warningSigns = [
  "Öğrenciyi tanımadan kısa sürede hazır bir liste sunulması",
  "Yalnızca puana bakılıp başarı sırası ve kontenjanların göz ardı edilmesi",
  "Her öğrenciye aynı üniversite veya bölümlerin önerilmesi",
  "Kesin yerleşme, kesin burs veya kesin meslek başarısı sözü verilmesi",
  "Programın özel koşulları ve ücret bilgilerinin kontrol edilmemesi",
  "Öğrencinin istemediği bölümlerin listeye eklenmesi",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "YKS tercih danışmanı kesin yerleşme garantisi verebilir mi?",
    answer:
      "Hayır. Yerleştirme ÖSYM’nin merkezî sistemi tarafından yapılır. Danışman, güncel verileri doğru yorumlamaya ve daha bilinçli bir tercih listesi hazırlamaya yardımcı olabilir; kesin sonuç garanti edemez.",
  },
  {
    question: "Tercih danışmanlığı yüz yüze mi, online mı olmalı?",
    answer:
      "Her iki yöntem de verimli olabilir. Önemli olan görüşmenin öğrenciyi tanımaya yeterli süre ayırması, kullanılan verilerin ekranda veya belgelerle paylaşılması ve listenin birlikte kontrol edilmesidir.",
  },
  {
    question: "Danışmanlık görüşmesine veli de katılmalı mı?",
    answer:
      "Öğrencinin onayıyla velinin sürece katılması bütçe, şehir ve yaşam koşulları gibi başlıkların açık konuşulmasını sağlayabilir. Ancak nihai tercih öğrencinin isteği ve hedefleri merkezde tutularak oluşturulmalıdır.",
  },
  {
    question: "Danışmana gitmeden önce hangi bilgiler hazırlanmalı?",
    answer:
      "YKS sonuç belgesi, düşünülen bölümler, istenen veya istenmeyen şehirler, bütçe ve burs beklentisi, eğitim dili tercihi ve öğrencinin kariyer hedefleri hazırlanmalıdır.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — 2026-YKS Yükseköğretim Programları ve Kontenjanları Kılavuzu duyurusu",
    href: "https://osym.gov.tr/2026yks-yuksekogretim-programlari-ve-kontenjanlari-kilavuzunun-yayimlanmasi",
  },
  {
    label: "ÖSYM — 2026 YKS kılavuz ve duyuruları",
    href: "https://www.osym.gov.tr/yks/sinav_kilavuzu/",
  },
  {
    label: "YÖK Atlas — Üniversite ve program verileri",
    href: "https://yokatlas.yok.gov.tr/",
  },
];

export default function TercihDanismaniSecimiPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="İyi bir tercih danışmanı öğrencinin yerine karar vermez; öğrencinin kendisi için doğru kararı verebilmesi amacıyla verileri açıklar, seçenekleri karşılaştırır ve riskleri görünür hâle getirir."
      faqs={faqs}
      sources={sources}
    >
      <p>
        YKS tercih dönemi kısa, seçenekler ise çok fazladır. Bu yoğunluk içinde danışman
        seçerken yalnızca tanınırlığa veya sosyal medya paylaşımlarına bakmak yeterli
        değildir. Çalışma yöntemi, kullandığı kaynaklar ve öğrenciye yaklaşımı birlikte
        değerlendirilmelidir.
      </p>

      <section aria-labelledby="iyi-danisman-ne-yapar">
        <h2 id="iyi-danisman-ne-yapar">İyi Bir Tercih Danışmanı Ne Yapar?</h2>
        <p>
          Danışmanın ilk işi tercih sıralamak değil, öğrenciyi tanımaktır. Öğrencinin
          akademik verileri kadar hangi derslerden keyif aldığı, nasıl bir çalışma ortamı
          istediği, şehir ve bütçe sınırları ile uzun vadeli meslek beklentileri de
          konuşulmalıdır.
        </p>
        <p>
          Ardından güncel ÖSYM kılavuzu, YÖK Atlas program verileri ve üniversitelerin
          resmî açıklamaları incelenir. Bu kaynaklar bir araya getirildiğinde, yalnızca
          “geçen yıl kaçla kapattı?” sorusundan daha sağlıklı bir değerlendirme yapılabilir.
        </p>
      </section>

      <section aria-labelledby="secim-olcutleri">
        <h2 id="secim-olcutleri">Danışman Seçerken Bakılması Gereken 7 Ölçüt</h2>
        <BlogChecklist items={selectionCriteria} />
      </section>

      <section aria-labelledby="ilk-gorusme-sorulari">
        <h2 id="ilk-gorusme-sorulari">İlk Görüşmede Sorulabilecek Sorular</h2>
        <p>
          Görüşmeye başlamadan önce yöntemi anlamak, öğrenci ve veli için belirsizliği
          azaltır. Aşağıdaki sorular danışmanın çalışma biçimini görmeye yardımcı olur:
        </p>
        <BlogSteps items={questions} />
      </section>

      <section aria-labelledby="kisisel-analiz">
        <h2 id="kisisel-analiz">Kişiye Özel Analiz Neden Önemlidir?</h2>
        <p>
          Aynı başarı sırasına sahip iki öğrenci aynı listeye ihtiyaç duymaz. Bir öğrenci
          için büyük şehirde İngilizce eğitim öncelikliyken, diğeri ailesine yakınlık veya
          uygulamalı eğitim olanaklarını öne çıkarabilir. Bütçe, burs koşulları, hazırlık
          sınıfı ve barınma seçenekleri de kişiden kişiye değişir.
        </p>
        <p>
          Bu nedenle danışmanın “herkes için iyi üniversite” aramak yerine “bu öğrenci için
          uygun program” sorusuna cevap vermesi gerekir. Tercih listesi ancak öğrencinin
          gerçek sınırlarını ve beklentilerini yansıttığında anlamlı olur.
        </p>
      </section>

      <section aria-labelledby="kirmizi-bayraklar">
        <h2 id="kirmizi-bayraklar">Dikkat Edilmesi Gereken Uyarı İşaretleri</h2>
        <BlogChecklist items={warningSigns} tone="warning" />
        <p>
          Özellikle “kesin yerleşirsin” türü ifadeler gerçekçi değildir. Kontenjanlar,
          aday davranışları ve programların sıralamaları yıldan yıla değişebilir. Sağlıklı
          danışmanlık, belirsizliği saklamak yerine öğrenciye açıkça anlatır.
        </p>
      </section>

      <section aria-labelledby="denizli-ve-online">
        <h2 id="denizli-ve-online">Denizli’de veya Online Danışmanlık Arasında Seçim</h2>
        <p>
          Denizli’de yüz yüze görüşme, öğrenci ve velinin aynı ortamda ayrıntılı konuşmasını
          kolaylaştırabilir. Online görüşme ise farklı şehirlerdeki üniversiteleri araştıran
          öğrenciler için belge ve ekran paylaşımı açısından pratiktir. Yöntemden daha
          önemli olan; görüşmenin planlı ilerlemesi, kullanılan kaynakların paylaşılması ve
          son listenin öğrenci tarafından anlaşılmasıdır.
        </p>
      </section>

      <section aria-labelledby="gorusme-hazirligi">
        <h2 id="gorusme-hazirligi">Görüşmeden Önce Hazırlanacak Kısa Liste</h2>
        <BlogChecklist
          items={[
            "YKS sonuç belgesi ve ilgili puan türlerindeki başarı sıraları",
            "İlgi duyulan ve kesinlikle düşünülmeyen bölümler",
            "Şehir, barınma, ulaşım ve bütçe sınırları",
            "Devlet, vakıf, burs ve eğitim dili tercihleri",
            "Öğrencinin güçlü yönleri ve meslekten beklentileri",
          ]}
        />
      </section>
    </BlogArticleLayout>
  );
}
