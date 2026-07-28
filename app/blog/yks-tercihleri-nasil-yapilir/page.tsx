import type { Metadata } from "next";
import Link from "next/link";
import {
  BlogArticleLayout,
  BlogChecklist,
  type BlogFaq,
  type BlogService,
  type BlogSource,
} from "@/components/blog/BlogArticleLayout";
import { getBlogPost } from "@/data/blogPosts";
import { createBlogMetadata } from "@/lib/blogMetadata";

const post = getBlogPost("yks-tercihleri-nasil-yapilir");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  { href: "/denizli-yks-tercih-danismanligi", label: "Denizli YKS Tercih Danışmanlığı", detail: "YKS sonrası üniversite ve bölüm kararının adım adım kurulması." },
  { href: "/tercih-robotu", label: "Tercih Robotu", detail: "Sıralamanıza uyan programları şehir ve kurum türüne göre listeleyin." },
  { href: "/universite-bolum-analizi", label: "Üniversite ve Bölüm Analizi", detail: "Programların kontenjan, kadro ve olanak açısından karşılaştırılması." },
];

const balancedList = [
  "Üst sıralarda hedef bölümler yer almalıdır.",
  "Orta bölümde başarı sıralamanıza yakın programlar bulunmalıdır.",
  "Son sıralarda ise yerleşme ihtimali yüksek seçeneklere yer verilmelidir.",
  "İstemediğiniz hiçbir bölüm listeye eklenmemelidir.",
];

const universityCriteria = [
  "Akademik kadro",
  "Staj ve uygulama imkanları",
  "Mezunların iş bulma oranı",
  "Erasmus ve yurt dışı fırsatları",
  "Kampüs olanakları",
  "Şehrin yaşam koşulları",
  "Barınma seçenekleri",
  "Ulaşım kolaylığı",
];

const commonMistakes = [
  "Sadece puana göre tercih yapmak.",
  "Bölümü araştırmadan listeye eklemek.",
  "Başkalarının istekleriyle hareket etmek.",
  "Başarı sıralamasını dikkate almamak.",
  "Özel koşulları okumamak.",
  "Son güne kadar beklemek.",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "YKS tercihleri nasıl yapılır?",
    answer:
      "Tercihler, ÖSYM’nin AİS sistemi üzerinden tercih kılavuzuna uygun şekilde yapılır. Liste hazırlanırken başarı sıralaması, ilgi alanı ve bölüm araştırması birlikte değerlendirilmelidir.",
  },
  {
    question: "Kaç tercih hakkı bulunur?",
    answer:
      "ÖSYM’nin yayımladığı güncel tercih kılavuzunda belirtilen tercih hakkı kullanılabilir. Tercih dönemi başlamadan önce kılavuz mutlaka incelenmelidir.",
  },
  {
    question: "Tercih sırası önemli midir?",
    answer:
      "Evet. Sistem tercihleri yukarıdan aşağıya doğru değerlendirir. Bu nedenle en çok istediğiniz bölümü üst sıralara yazmanız gerekir.",
  },
  {
    question: "Başarı sıralaması mı, puan mı dikkate alınmalıdır?",
    answer:
      "Genellikle başarı sıralaması daha sağlıklı bir ölçüdür. Çünkü puanlar yıllara göre değişebilir. Buna karşılık başarı sıralamaları daha istikrarlı sonuç verir.",
  },
  {
    question: "İstemediğim bir bölümü yazmalı mıyım?",
    answer:
      "Hayır. Yerleşmeniz durumunda kayıt yaptırmak istemeyeceğiniz hiçbir bölümü tercih listenize eklememelisiniz.",
  },
];

const sources: readonly BlogSource[] = [
  {
    label: "ÖSYM — Yükseköğretim programları ve kontenjanları kılavuzu",
    href: "https://osym.gov.tr/",
  },
  {
    label: "YÖK Atlas — Program bazlı yerleşme ve kontenjan verileri",
    href: "https://yokatlas.yok.gov.tr/",
  },
];

export default function YksTercihleriNasilYapilirPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Üniversite hayali kuran her aday için tercih dönemi en az sınav kadar önemlidir. Çünkü doğru yapılan tercihler, yıllar sürecek eğitim hayatını doğrudan etkiler. Bu nedenle YKS tercihleri nasıl yapılır sorusunun cevabını doğru öğrenmek büyük avantaj sağlar. Ayrıca bilinçli hareket etmek, pişmanlık yaşama ihtimalini de azaltır. Bu rehberde tercih sürecini adım adım ele alacak, dikkat edilmesi gereken noktaları sade bir dille paylaşacağız."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <section aria-labelledby="tercih-sureci">
        <h2 id="tercih-sureci">
          YKS Tercihleri Nasıl Yapılır? Tercih Süreci Nereden Başlar?
        </h2>
        <p>
          Öncelikle sınav sonuçlarınızı dikkatlice inceleyin. Ardından başarı sıralamanızı
          not alın. Çünkü tercih döneminde puandan çok başarı sıralaması daha sağlıklı bir
          ölçüttür. Daha sonra ilgi alanlarınızı belirleyin. Bunun yanında yeteneklerinizi
          de göz önünde bulundurun.
        </p>
        <p>
          Bunun ardından tercih kılavuzunu detaylı şekilde okuyun. Kontenjanları inceleyin.
          Ayrıca özel koşulları mutlaka kontrol edin. Böylece son anda sürprizlerle
          karşılaşmazsınız.
        </p>
      </section>

      <section aria-labelledby="basari-siralamasi">
        <h2 id="basari-siralamasi">Başarı Sıralaması Neden Bu Kadar Önemlidir?</h2>
        <p>
          Puanlar her yıl değişebilir. Ancak başarı sıralamaları daha güvenilir bir
          karşılaştırma sunar. Bu yüzden uzmanlar tercih listesini hazırlarken başarı
          sıralamasını temel almayı önerir.
        </p>
        <p>
          Örneğin geçen yıl 40 bin başarı sıralamasıyla öğrenci alan bir bölüm, bu yıl
          benzer aralıkta öğrenci kabul edebilir. Elbette kesin sonuç garanti değildir. Buna
          rağmen sıralama üzerinden değerlendirme yapmak daha doğru olur.
        </p>
      </section>

      <section aria-labelledby="dengeli-liste">
        <h2 id="dengeli-liste">Tercih Listesi Nasıl Dengeli Hazırlanır?</h2>
        <p>
          YKS tercihleri nasıl yapılır sorusunun en önemli cevaplarından biri dengeli liste
          hazırlamaktır. Sadece yüksek hedeflere odaklanmak doğru değildir. Aynı şekilde
          yalnızca garanti bölümleri yazmak da fırsat kaybına neden olabilir.
        </p>
        <p>İdeal bir tercih listesinde şu denge bulunmalıdır:</p>
        <BlogChecklist items={balancedList} />
        <p>Bu yöntem hem riski azaltır hem de seçenekleri artırır.</p>
      </section>

      <section aria-labelledby="universite-secimi">
        <h2 id="universite-secimi">Üniversite Seçerken Nelere Dikkat Edilmeli?</h2>
        <p>
          Bölüm kadar üniversite seçimi de önemlidir. Çünkü eğitim kalitesi, kampüs yaşamı
          ve akademik imkanlar geleceğinizi etkileyebilir.
        </p>
        <p>Bu nedenle şu başlıkları değerlendirin:</p>
        <BlogChecklist items={universityCriteria} />
        <p>
          Bunun yanında üniversitenin resmi internet sitesini incelemek de faydalı
          olacaktır.
        </p>
      </section>

      <section aria-labelledby="tercih-hatalari">
        <h2 id="tercih-hatalari">Tercih Hatalarından Nasıl Kaçınılır?</h2>
        <p>
          Pek çok aday benzer hataları tekrar ediyor. Oysa küçük görünen yanlışlar büyük
          sonuçlar doğurabiliyor.
        </p>
        <p>En sık yapılan hatalar şunlardır:</p>
        <BlogChecklist items={commonMistakes} />
        <p>
          Buna karşılık araştırma yaparak ve planlı ilerleyerek bu hataların tamamını
          önleyebilirsiniz.
        </p>
      </section>

      <section aria-labelledby="tercih-robotlari">
        <h2 id="tercih-robotlari">
          YKS Tercihleri Nasıl Yapılır? Tercih Robotları Faydalı mı?
        </h2>
        <p>
          Tercih robotları fikir edinmek için oldukça kullanışlı araçlardır. Bununla birlikte
          tek başına yeterli değildir. Çünkü her adayın hedefi farklıdır.
        </p>
        <p>
          Bu nedenle tercih robotlarından yararlanırken resmi tercih kılavuzunu da mutlaka
          inceleyin. Ayrıca üniversitelerin güncel duyurularını takip edin. Böylece daha
          güvenilir karar verebilirsiniz.
        </p>
      </section>

      <section aria-labelledby="uzman-destegi">
        <h2 id="uzman-destegi">Tercih Yaparken Uzman Desteği Alınmalı mı?</h2>
        <p>
          Kararsız kalan adaylar YKS tercih danışmanlarından destek alabilir. Özellikle
          başarı sıralaması sınırında bulunan öğrenciler için uzman görüşü önemli avantaj
          sağlayabilir.
        </p>
        <p>
          Ancak son karar her zaman adaya ait olmalıdır. Çünkü eğitim hayatını yaşayacak kişi
          sizsiniz. Bu yüzden kendi ilgi alanlarınızı ön planda tutmanız uzun vadede daha
          doğru olacaktır.
        </p>
      </section>

      <p>
        Tercih dönemi, geleceğinizi şekillendiren önemli bir adımdır. Bu yüzden acele etmeyin.
        Araştırma yapın. Üniversiteleri karşılaştırın. Bölümleri detaylı inceleyin. Ayrıca
        başarı sıralamanızı doğru analiz edin. Böylece YKS tercihleri nasıl yapılır sorusuna
        sadece teorik değil, uygulamada da doğru cevabı vermiş olursunuz. Bilinçli hazırlanan
        bir tercih listesi, üniversite hayatına güvenle başlamanın en güçlü anahtarlarından
        biridir.
      </p>

      {/*
        Buradan aşağısı kaynak metne sonradan eklenmiştir. Yukarıdaki bölümler genel
        tercih ilkelerini anlatıyor; bu kısım aynı ilkeleri 2026 dönemine ait somut
        verilerle bağlar. Rakamlar Gürbüz Gövrek'in kendi tespitlerinden alınmıştır ve
        öngörü oldukları açıkça belirtilir.
      */}
      <section aria-labelledby="yil-2026">
        <h2 id="yil-2026">2026 Tercih Döneminde Durum Ne?</h2>
        <p>
          Yukarıdaki ilkeler her yıl geçerlidir. Ancak listeyi kurarken o yılın kendi
          koşullarını bilmek gerekir; çünkü sıralamaları belirleyen asıl etken kontenjan
          değişimidir.
        </p>
        <p>
          Gürbüz Gövrek’in 2026 için tespitlerine göre genel kontenjanda dikkat çekici bir
          daralma var: sayısal puan türünde yaklaşık 9 bin, eşit ağırlıkta 12 bin, sözelde
          16 bin ve dilde 3 bin civarında kontenjan azalması söz konusu. Bölüm bazında ise
          tıp fakültesi kontenjanı 85, diş hekimliği kontenjanı 761 azalmış durumda.
        </p>
        <p>
          Kontenjan azalması, aynı sırayla geçen yıl girilebilen bir programa bu yıl
          girilememesi anlamına gelebilir. Bu yüzden geçen yılın taban sırasını olduğu gibi
          kabul etmek risklidir; listeyi kurarken bir miktar pay bırakmak gerekir.
        </p>
        <p>
          Bu değerlendirmeler kesin sonuç değil, bir uzmanın veriye dayalı öngörüsüdür.
          Nihai kontenjan ve yerleşme sonuçları tercih dönemi sonunda ÖSYM tarafından
          açıklanır.
        </p>
      </section>

      <section aria-labelledby="listeyi-kurmak">
        <h2 id="listeyi-kurmak">Listeyi Somut Olarak Nasıl Kurarsınız?</h2>
        <p>
          Yazının başında anlatılan dengeli liste mantığını uygulamak için elinizde iki şey
          olmalı: sıralamanıza uyan programların gerçek listesi ve o programların yıllara
          göre nasıl hareket ettiği.
        </p>
        <p>
          <Link href="/tercih-robotu">Tercih robotu</Link> her ikisini de veriyor. Puan
          türünüzü ve başarı sıranızı girdiğinizde 17 binden fazla program arasından size
          uyanları listeler; şehir, kurum türü ve bölüm filtreleriyle daraltabilir, her
          program için 2022’den 2025’e sıralama ve 2023’ten 2026’ya kontenjan değişimini yan
          yana görebilirsiniz. Sonucu PDF olarak da alabilirsiniz.
        </p>
        <p>
          Kararı derinleştirmek için{" "}
          <Link href="/raporlar">raporlar bölümündeki</Link> belgeler işe yarar: URAP
          üniversiteleri akademik üretimle, TÜMA ise öğrenci memnuniyetiyle sıralar. İkisi
          farklı şeyleri ölçtüğü için birlikte okunduğunda daha dengeli bir tablo verir.
        </p>
      </section>

      <section aria-labelledby="sik-hata-2026">
        <h2 id="sik-hata-2026">Bu Yıl Özellikle Dikkat Edilmesi Gerekenler</h2>
        <p>
          Kontenjanın daraldığı bir yılda en sık yapılan hata, listeyi geçen yılın
          sıralamalarına göre kurup güvenli bölgeyi dar tutmaktır. Sıralama ilerlediğinde
          liste boşa düşer.
        </p>
        <p>
          İkinci hata, kontenjan artışını otomatik olarak “girmesi kolaylaştı” diye okumaktır.
          Kontenjan artan bir bölüme talep de artmışsa sıralama gerilemeyebilir. Bu yüzden
          kontenjan değişimini tek başına değil, o alandaki genel eğilimle birlikte
          değerlendirmek gerekir.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
