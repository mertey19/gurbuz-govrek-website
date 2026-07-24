import type { Metadata } from "next";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("vakif-mi-devlet-universitesi-mi");

export const metadata: Metadata = createBlogMetadata(post);

const comparisonCriteria = [
  "Programın ders planı ve seçmeli ders çeşitliliği",
  "Akademik kadronun uzmanlık alanları ve erişilebilirliği",
  "Toplam eğitim, barınma, ulaşım ve yaşam maliyeti",
  "Bursun kapsamı, süresi ve devam koşulları",
  "Eğitim dili ve hazırlık sınıfının yapısı",
  "Laboratuvar, staj, uygulama ve sektör iş birlikleri",
  "Kampüs, yurt, ulaşım ve öğrenci toplulukları",
  "Mezunların çalışma alanları ve lisansüstü olanakları",
];

const scholarshipQuestions = [
  "Burs yalnızca öğrenim ücretini mi kapsıyor?",
  "Hazırlık sınıfı burs süresine dâhil mi?",
  "Normal öğrenim süresi aşılırsa burs devam ediyor mu?",
  "Not ortalaması, disiplin durumu veya kayıt dondurma bursu etkiliyor mu?",
  "Ücret artış yöntemi ve sonraki yılların ödeme koşulları nasıl açıklanıyor?",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Vakıf üniversitesi özel üniversite midir?",
    answer:
      "Türkiye’de vakıflar tarafından kurulan yükseköğretim kurumları Yükseköğretim Kurulunun mevzuatı ve denetimi kapsamında faaliyet gösterir. Tercih yaparken kurumun resmî statüsü ve program bilgileri YÖK ile ÖSYM kaynaklarından kontrol edilmelidir.",
  },
  {
    question: "Devlet üniversitesi her zaman ücretsiz midir?",
    answer:
      "Öğrencinin programı, öğretim biçimi ve özel durumu gibi etkenlere göre mali yükümlülükler değişebilir. Güncel katkı payı veya ücret bilgileri için ilgili yılın resmî düzenlemeleri ve üniversite duyuruları incelenmelidir.",
  },
  {
    question: "Burslu vakıf programında burs sonradan kesilebilir mi?",
    answer:
      "Bursun kapsamı ve devam koşulları üniversiteye ve burs türüne göre değişebilir. Aday, ÖSYM kılavuzundaki açıklamaları ve üniversitenin resmî burs yönergesini tercih öncesinde mutlaka okumalıdır.",
  },
  {
    question: "İşverenler devlet veya vakıf üniversitesine mi daha çok önem verir?",
    answer:
      "Tek bir üniversite türü bütün meslekler için belirleyici değildir. Programın niteliği, öğrencinin yetkinlikleri, staj ve proje deneyimi, yabancı dil seviyesi ve mezuniyet sonrası gelişimi birlikte etkili olur.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — 2026-YKS Yükseköğretim Programları ve Kontenjanları Kılavuzu duyurusu",
    href: "https://osym.gov.tr/2026yks-yuksekogretim-programlari-ve-kontenjanlari-kilavuzunun-yayimlanmasi",
  },
  {
    label: "YÖK Atlas — Üniversite türü, program ve burs oranı filtreleri",
    href: "https://yokatlas.yok.gov.tr/",
  },
  {
    label: "Yükseköğretim Kurulu — Resmî üniversite ve mevzuat bilgileri",
    href: "https://www.yok.gov.tr/",
  },
];

export default function VakifDevletKarsilastirmaPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Doğru soru “vakıf mı, devlet mi daha iyi?” değil; “hangi program benim hedeflerime, bütçeme ve öğrenme biçimime daha uygun?” sorusudur. Üniversitenin türü tek başına eğitim deneyiminin kalitesini belirlemez."
      faqs={faqs}
      sources={sources}
    >
      <p>
        Devlet ve vakıf üniversiteleri arasında karar verirken genellemeler yerine program
        bazında karşılaştırma yapılmalıdır. Aynı üniversite içindeki iki bölümün akademik
        kadrosu, uygulama olanakları ve mezun profili bile birbirinden farklı olabilir.
      </p>

      <section aria-labelledby="sekiz-olcut">
        <h2 id="sekiz-olcut">Karar Verirken Kullanılacak 8 Ölçüt</h2>
        <BlogChecklist items={comparisonCriteria} />
      </section>

      <section aria-labelledby="akademik-uyum">
        <h2 id="akademik-uyum">1. Önce Akademik Uyumu Karşılaştırın</h2>
        <p>
          Üniversitenin adından önce bölümün ders planını inceleyin. Zorunlu ve seçmeli
          dersler öğrencinin hedeflediği çalışma alanlarıyla örtüşüyor mu? Laboratuvar,
          atölye, klinik veya uygulama dersleri yeterli mi? Akademik kadronun çalışmaları,
          öğrencinin ilgilendiği alanları kapsıyor mu?
        </p>
        <p>
          Bu sorulara verilen cevaplar, devlet–vakıf ayrımından daha doğrudan biçimde
          öğrencinin dört yıllık akademik deneyimini etkiler.
        </p>
      </section>

      <section aria-labelledby="toplam-maliyet">
        <h2 id="toplam-maliyet">2. Yalnızca Öğrenim Ücretine Bakmayın</h2>
        <p>
          Vakıf üniversitesinde ilan edilen öğrenim ücreti önemli bir kalemdir; ancak
          karar toplam maliyet üzerinden verilmelidir. Barınma, ulaşım, yemek, kitap,
          ekipman ve şehirdeki yaşam giderleri hesaba katılmalıdır. Başka şehirdeki devlet
          üniversitesi, aile yanında okunabilecek burslu bir vakıf programından daha yüksek
          toplam maliyet oluşturabilir.
        </p>
        <p>
          Ücret ve burs bilgileri değişebildiği için aday, güncel ÖSYM kılavuzunu ve
          üniversitenin resmî açıklamalarını birlikte kontrol etmelidir.
        </p>
      </section>

      <section aria-labelledby="burs-kosullari">
        <h2 id="burs-kosullari">3. Bursun Ayrıntılarını Yazılı Olarak Doğrulayın</h2>
        <p>
          “Tam burslu” veya “yüzde 50 indirimli” ifadesi tek başına bütün mali koşulları
          açıklamaz. Tercih öncesinde aşağıdaki soruların yanıtı resmî belgelerden
          doğrulanmalıdır:
        </p>
        <BlogChecklist items={scholarshipQuestions} />
      </section>

      <section aria-labelledby="egitim-dili">
        <h2 id="egitim-dili">4. Eğitim Dili ve Hazırlık Sınıfını İnceleyin</h2>
        <p>
          Yabancı dilde eğitim, öğrencinin hedeflerine uygunsa önemli bir avantaj olabilir.
          Fakat dil yeterliği düşük bir öğrenci için bölüm derslerini anlamayı zorlaştırabilir.
          Hazırlık programının niteliği, muafiyet koşulları ve öğrencinin dil öğrenmeye
          ayıracağı zaman birlikte düşünülmelidir.
        </p>
      </section>

      <section aria-labelledby="uygulama-ve-kariyer">
        <h2 id="uygulama-ve-kariyer">5. Uygulama ve Kariyer Olanaklarını Karşılaştırın</h2>
        <p>
          Staj zorunluluğu, sektör projeleri, değişim programları, kariyer merkezi ve mezun
          ağı bölümden bölüme değişir. Özellikle mühendislik, sağlık, tasarım ve uygulamalı
          sosyal bilimlerde öğrencinin gerçek proje veya saha deneyimi kazanacağı ortamlar
          ayrıntılı incelenmelidir.
        </p>
      </section>

      <section aria-labelledby="kampus-yasam">
        <h2 id="kampus-yasam">6. Kampüs ve Günlük Yaşamı Hesaba Katın</h2>
        <p>
          Kampüsün konumu, ulaşım süresi, yurt kapasitesi, kütüphane saatleri, spor ve
          öğrenci toplulukları üniversite deneyiminin sürdürülebilirliğini etkiler.
          Öğrencinin her gün yaşayacağı ortam, tanıtım günündeki kısa izlenimden daha
          önemlidir.
        </p>
      </section>

      <section aria-labelledby="karar-matrisi">
        <h2 id="karar-matrisi">7. Kendi Karar Matrisinizi Oluşturun</h2>
        <p>
          Aday, kendisi için önemli ölçütleri belirleyip her programa aynı soruları
          sormalıdır. Örneğin akademik uyum, maliyet, şehir, eğitim dili ve uygulama
          olanaklarını ayrı ayrı değerlendirmek; üniversite isimlerinin oluşturduğu ilk
          izlenimden daha dengeli bir karar sağlar.
        </p>
        <p>
          Son aşamada yalnızca öğrencinin gerçekten kayıt yaptırmayı düşüneceği programlar
          tercih listesine alınmalıdır.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
