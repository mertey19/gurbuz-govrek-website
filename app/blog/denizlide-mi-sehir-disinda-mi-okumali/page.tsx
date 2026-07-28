import type { Metadata } from "next";
import Link from "next/link";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("denizlide-mi-sehir-disinda-mi-okumali");

export const metadata: Metadata = createBlogMetadata(post);

const costItems = [
  "Barınma: evde kalmak ile yurt veya kiralık ev arasındaki fark",
  "Ulaşım: şehir içi aylık gider ile yıl boyunca şehirlerarası yol masrafı",
  "Beslenme: ev yemeği ile dışarıda yemenin aylık farkı",
  "Bir defalık giderler: taşınma, ev eşyası, depozito",
];

const academicItems = [
  "Bölümün akreditasyon durumu",
  "Öğretim üyesi başına düşen öğrenci sayısı",
  "Laboratuvar, atölye ve uygulama olanakları",
  "Erasmus ve değişim anlaşmaları",
  "Zorunlu staj yapılabilecek kurumların şehirdeki varlığı",
];

const personalItems = [
  "Kendi başına yaşamaya hazır hissediyor musunuz?",
  "Aile desteğine ne sıklıkla ihtiyaç duyuyorsunuz?",
  "Yoğun dönemlerde yalnız kalmak sizi zorlar mı?",
  "Yeni bir şehirde çevre kurmayı istiyor musunuz?",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Aynı bölüm için şehir dışına çıkmak her zaman avantajlı mıdır?",
    answer:
      "Hayır. Avantaj, bölümün o üniversitedeki niteliğine ve şehrin sunduğu staj–iş olanaklarına bağlıdır. Bu iki başlıkta belirgin bir fark yoksa, ek maliyet karşılığında kazanılan bir şey olmayabilir.",
  },
  {
    question: "Evde kalmak öğrenciyi sosyal olarak geride bırakır mı?",
    answer:
      "Kendiliğinden bırakmaz. Kampüs kulüpleri, projeler ve staj deneyimleri sosyal çevrenin büyük bölümünü oluşturur. Evde kalan öğrenci de bu ortamların içinde yer alabilir.",
  },
  {
    question: "Karar verirken taban puan tek başına yeterli bir ölçüt müdür?",
    answer:
      "Değildir. Taban puan bir programa girenlerin sıralamasını gösterir, o programda okumanın nasıl bir deneyim olduğunu göstermez. Kontenjan değişimi, akademik kadro ve şehir koşulları birlikte değerlendirilmelidir.",
  },
  {
    question: "Aile bu karara ne kadar dâhil olmalı?",
    answer:
      "Maliyet ve barınma başlıklarında ailenin görüşü belirleyicidir; çünkü yükün bir kısmını o üstlenir. Ancak bölümü okuyacak ve mesleği yapacak kişi öğrencidir, nihai karar onun olmalıdır.",
  },
  {
    question: "Kararı tercih dönemine bırakmak doğru mu?",
    answer:
      "Tercih dönemi kısa ve yoğundur. Şehir tercihini o iki hafta içinde ilk kez düşünmek acele karara yol açar. Sınavdan önce bu başlığı konuşmuş olmak listeyi kurmayı kolaylaştırır.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "YÖK Atlas — Program bazlı kontenjan, yerleşme ve öğrenci profili verileri",
    href: "https://yokatlas.yok.gov.tr/",
  },
  {
    label: "ÖSYM — Yükseköğretim programları ve kontenjanları kılavuzu",
    href: "https://osym.gov.tr/",
  },
];

export default function DenizlideMiSehirDisindaMiOkumaliPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Denizli’de yaşayan bir öğrenci için tercih dönemi çoğu zaman iki soruyla başlar: hangi bölüm ve hangi şehir. İkincisi genellikle sonraya bırakılır, oysa dört yılın nasıl geçeceğini belirleyen asıl karar odur. Bu yazı, aynı bölümü Denizli’de veya başka bir şehirde okumak arasında kalanlar için yedi ölçüt sunuyor."
      faqs={faqs}
      sources={sources}
    >
      <p>
        Peşinen bir uyarı: bu sorunun herkes için geçerli tek bir doğru yanıtı yok. Aynı
        bölüm, aynı puanla, iki farklı öğrenci için iki farklı kararı gerektirebilir.
        Aşağıdaki ölçütler bir sıralama değil, üzerinden geçilecek bir kontrol listesidir.
      </p>

      <section aria-labelledby="olcut-1">
        <h2 id="olcut-1">1. Bölüm mü, şehir mi önce geliyor?</h2>
        <p>
          Sıralama önemlidir. Önce bölüme karar verip sonra şehri konuşmak, tersinden
          ilerlemekten daha sağlıklı sonuç verir. Çünkü meslek ömür boyu sürer, şehir ise
          dört yıllıktır.
        </p>
        <p>
          Buna karşılık bazı bölümlerde şehir doğrudan eğitimin parçasıdır. Turizm, denizcilik
          ya da belirli mühendislik alanlarında sektörün nerede yoğunlaştığı, staj ve iş
          bulma imkânını değiştirir. Bu tür bölümlerde şehir ikincil bir başlık değildir.
        </p>
      </section>

      <section aria-labelledby="olcut-2">
        <h2 id="olcut-2">2. Gerçek maliyet nedir?</h2>
        <p>
          Şehir dışında okumanın maliyeti çoğu zaman yalnızca kira üzerinden hesaplanır.
          Oysa fark kalemleri daha geniştir:
        </p>
        <BlogChecklist items={costItems} />
        <p>
          Bu kalemleri dört yıla yayarak hesaplamak faydalıdır. Ortaya çıkan rakam, kararın
          maddi ağırlığını somutlaştırır. Burs ya da yurt imkânı varsa tablo belirgin şekilde
          değişebilir; bu yüzden hesabı burs sonucu belli olmadan kesinleştirmemek gerekir.
        </p>
      </section>

      <section aria-labelledby="olcut-3">
        <h2 id="olcut-3">3. Bölümün niteliği iki yerde aynı mı?</h2>
        <p>
          Asıl soru şudur: ek maliyet karşılığında akademik olarak ne kazanılıyor? Yanıt
          vermek için iki programı aynı başlıklarda karşılaştırın:
        </p>
        <BlogChecklist items={academicItems} />
        <p>
          Bu bilgilerin çoğu YÖK Atlas’ta ve üniversitelerin kendi sayfalarında açık şekilde
          yer alır.{" "}
          <Link href="/raporlar">Raporlar bölümündeki</Link> URAP ve TÜMA çalışmaları da
          akademik üretim ile öğrenci memnuniyetini iki ayrı açıdan gösterir.
        </p>
        <p>
          Fark belirginse ek maliyet anlamlıdır. Fark yoksa, aynı diplomayı daha düşük
          maliyetle almak akılcı bir tercihtir.
        </p>
      </section>

      <section aria-labelledby="olcut-4">
        <h2 id="olcut-4">4. Staj ve iş deneyimi nerede mümkün?</h2>
        <p>
          Mezuniyet sonrası iş bulmayı en çok etkileyen şey çoğu zaman diploma değil,
          okurken edinilen deneyimdir. Bu yüzden şehrin sektörel yapısı önemlidir.
        </p>
        <p>
          Bölümünüzün çalışacağı kurumlar şehirde var mı? Zorunlu stajı nerede yapacaksınız?
          Dönem içinde yarı zamanlı çalışma imkânı bulunuyor mu? Bu soruların yanıtı, iki
          seçenek arasındaki farkı akademik ölçütlerden daha net ortaya koyabilir.
        </p>
      </section>

      <section aria-labelledby="olcut-5">
        <h2 id="olcut-5">5. Kendinizi tanıyor musunuz?</h2>
        <p>
          Bu ölçüt tablolarla ölçülmez ama diğerleri kadar belirleyicidir. Kendinize dürüst
          yanıt verin:
        </p>
        <BlogChecklist items={personalItems} />
        <p>
          Şehir dışına çıkmak bazı öğrenciler için hızlı bir olgunlaşma dönemidir. Bazıları
          içinse ilk yılın büyük bölümü uyum sağlamakla geçer ve akademik performans bundan
          etkilenir. İkisi de olağandır; önemli olan hangisine daha yakın olduğunuzu önceden
          bilmektir.
        </p>
      </section>

      <section aria-labelledby="olcut-6">
        <h2 id="olcut-6">6. Geri dönüş planınız var mı?</h2>
        <p>
          Kararlar geri alınabilir olduğunda daha rahat verilir. Yatay geçiş koşulları,
          çift anadal ve yandal olanakları, gerekirse ikinci kez sınava girme ihtimali —
          bunları önceden bilmek baskıyı azaltır.
        </p>
        <p>
          Yatay geçişin not ortalaması ve kontenjan koşullarına bağlı olduğunu, garanti
          olmadığını da unutmamak gerekir. Yine de bir çıkış yolunun varlığını bilmek, kararı
          felaket senaryosu olmaktan çıkarır.
        </p>
      </section>

      <section aria-labelledby="olcut-7">
        <h2 id="olcut-7">7. Karar kimin?</h2>
        <p>
          Maliyeti aile üstlendiği için ailenin sürece katılması doğaldır. Ancak bölümü
          okuyacak, sınavlara girecek ve mesleği yapacak kişi öğrencidir.
        </p>
        <p>
          En sağlıklı yol, ölçütleri birlikte konuşup her birinde nerede durulduğunu açıkça
          ortaya koymaktır. Anlaşmazlık genellikle farklı şeyleri önemsemekten doğar; bunu
          görünür kılmak çoğu tartışmayı çözer.
        </p>
      </section>

      <section aria-labelledby="nasil-karar">
        <h2 id="nasil-karar">Karara nasıl bağlanır?</h2>
        <p>
          Yedi ölçütü tek tek geçtikten sonra çoğu öğrenci için tablo netleşir. Netleşmiyorsa
          bu da bir bilgidir: iki seçenek gerçekten yakın demektir ve o durumda daha düşük
          maliyetli olanı seçmek savunulabilir bir karardır.
        </p>
        <p>
          Sıralamanıza hangi programların uyduğunu görmek için{" "}
          <Link href="/tercih-robotu">tercih robotunu</Link> kullanabilir, şehir ve kurum
          türü filtreleriyle iki seçeneği yan yana koyabilirsiniz. Kararı tercih dönemine
          bırakmamak ise en pratik tavsiyedir; o iki hafta liste kurmaya zar zor yeter.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
