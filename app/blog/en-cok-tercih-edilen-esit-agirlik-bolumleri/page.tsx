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

const post = getBlogPost("en-cok-tercih-edilen-esit-agirlik-bolumleri");

export const metadata: Metadata = createBlogMetadata(post);

const relatedServices: readonly BlogService[] = [
  {
    href: "/universite-bolum-analizi",
    label: "Üniversite ve Bölüm Analizi",
    detail: "Programların kontenjan, kadro ve olanak açısından karşılaştırılması.",
  },
  {
    href: "/denizli-tercih-danismanligi",
    label: "Denizli Tercih Danışmanlığı",
    detail: "Başarı sıranıza göre kişiye özel tercih listesi ve bire bir görüşme.",
  },
  {
    href: "/tercih-robotu",
    label: "Tercih Robotu",
    detail: "Sıralamanıza uyan programları şehir ve kurum türüne göre listeleyin.",
  },
];

const hukuk = [
  "Avukat",
  "Hakim",
  "Savcı",
  "Hukuk danışmanı",
  "Arabulucu",
  "Kamu kurumlarında hukuk uzmanı",
];

const isletme = [
  "Bankalar",
  "Özel şirketler",
  "İnsan kaynakları departmanları",
  "Finans kuruluşları",
  "Pazarlama ve satış ekipleri",
  "Uluslararası firmalar",
];

const iktisat = [
  "Bankacılık",
  "Finans sektörü",
  "Dış ticaret şirketleri",
  "Denetim firmaları",
  "Kamu kurumları",
  "Ekonomi danışmanlığı",
];

const psikoloji = [
  "Hastaneler",
  "Rehabilitasyon merkezleri",
  "Eğitim kurumları",
  "Danışmanlık merkezleri",
  "İnsan kaynakları departmanları",
];

const psikologFark = [
  "Psikolog, 4 yıllık Psikoloji lisans programını tamamlar.",
  "Psikiyatrist, 6 yıllık Tıp Fakültesi eğitiminin ardından psikiyatri uzmanlığı almış hekimdir.",
];

const pdr = [
  "Devlet okulları",
  "Özel eğitim kurumları",
  "Danışmanlık merkezleri",
  "Rehberlik merkezleri",
  "Aile danışmanlığı merkezleri",
];

const uluslararasi = [
  "Dışişleri Bakanlığı",
  "Büyükelçilikler",
  "Konsolosluklar",
  "Uluslararası kuruluşlar",
  "İhracat firmaları",
  "Çok uluslu şirketler",
];

const siyaset = [
  "Hukuk",
  "Kamu yönetimi",
  "Siyaset bilimi",
  "İktisat",
  "Tarih",
  "Yönetim bilimleri",
];

const ybsDersler = [
  "Veri analizi",
  "Yazılım temelleri",
  "Veri tabanı yönetimi",
  "Web teknolojileri",
  "İşletme yönetimi",
  "Dijital dönüşüm",
];

const ybsIs = [
  "Yazılım şirketleri",
  "E-ticaret firmaları",
  "Bankalar",
  "Teknoloji şirketleri",
  "ERP danışmanlığı",
  "Veri analistliği",
];

const icMimarlikDersler = [
  "Teknik çizim",
  "3D modelleme",
  "Malzeme bilgisi",
  "Mobilya tasarımı",
  "Mekan planlama",
  "Aydınlatma tasarımı",
];

const icMimarlikIs = [
  "Mimarlık ofisleri",
  "İnşaat şirketleri",
  "Mobilya sektörü",
  "Dekorasyon firmaları",
  "Kendi tasarım ofisleri",
];

const grafikDersler = [
  "Tipografi",
  "İllüstrasyon",
  "Kurumsal kimlik tasarımı",
  "Web tasarımı",
  "Reklam tasarımı",
  "Dijital medya",
];

const grafikIs = [
  "Reklam ajansları",
  "Dijital pazarlama şirketleri",
  "Medya kuruluşları",
  "Yayıncılık sektörü",
  "Sosyal medya ajansları",
  "Freelance tasarım hizmetleri",
];

const enCokTercih = [
  "Hukuk",
  "Psikoloji",
  "İşletme",
  "İktisat (Ekonomi)",
  "Yönetim Bilişim Sistemleri",
  "Uluslararası İlişkiler",
  "Siyaset Bilimi ve Kamu Yönetimi",
  "Rehberlik ve Psikolojik Danışmanlık (PDR)",
  "İç Mimarlık ve Çevre Tasarımı",
  "Grafik Tasarım",
];

const faqs: readonly BlogFaq[] = [
  {
    question: "Psikolog ile psikiyatrist arasındaki fark nedir?",
    answer:
      "Psikolog, 4 yıllık Psikoloji lisans programını tamamlar. Psikiyatrist ise 6 yıllık Tıp Fakültesi eğitiminin ardından psikiyatri uzmanlığı almış hekimdir.",
  },
  {
    question: "Klinik psikolog olmak için ne gerekiyor?",
    answer:
      "Klinik psikolog olmak isteyenlerin Klinik Psikoloji alanında yüksek lisans yapmaları gerekir.",
  },
  {
    question: "Uluslararası İlişkiler bölümünde yabancı dil ne kadar önemli?",
    answer:
      "Yabancı dil bilgisi bu bölüm mezunları için önemli bir avantaj sağlar.",
  },
  {
    question: "Siyaset Bilimi ve Kamu Yönetimi mezunları kamuda nasıl görev alır?",
    answer:
      "KPSS ile kamu kurumlarında uzman, müfettiş, denetçi veya idari personel olarak görev yapma imkanı bulunmaktadır.",
  },
  {
    question: "Bölüm seçerken yalnızca taban puana bakmak yeterli mi?",
    answer:
      "Yeterli değildir. Üniversite tercihi yaparken yalnızca taban puanlarını değil, bölümün ders içeriklerini, kişisel ilgi alanlarınızı ve mezuniyet sonrası kariyer hedeflerinizi de mutlaka değerlendirmelisiniz.",
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

export default function EsitAgirlikBolumleriPage() {
  return (
    <BlogArticleLayout
      post={post}
      lead="Üniversite tercihi yapacak adayların en çok araştırdığı konuların başında en çok tercih edilen eşit ağırlık bölümleri gelir. Eşit ağırlık puan türüyle öğrenci alan bölümler; sözel ve sayısal becerileri birlikte kullanmayı gerektirdiği için geniş bir meslek yelpazesi sunar. Özellikle iş imkanı yüksek eşit ağırlık bölümleri, mezuniyet sonrasında kamu ve özel sektörde kariyer fırsatları sağlaması nedeniyle yoğun ilgi görmektedir."
      faqs={faqs}
      sources={sources}
      services={relatedServices}
    >
      <p>
        Bu yazımızda, 4 yıllık eşit ağırlık bölümleri, çalışma alanları, kariyer olanakları
        ve bölüm içerikleri hakkında detaylı bilgiler bulabilirsiniz.
      </p>

      <section aria-labelledby="dort-yillik">
        <h2 id="dort-yillik">4 Yıllık Eşit Ağırlık Bölümleri</h2>
        <p>
          Türkiye’deki üniversitelerde en fazla tercih edilen 4 yıllık eşit ağırlık bölümleri
          arasında Hukuk, İşletme, İktisat, Psikoloji, Uluslararası İlişkiler ve Yönetim
          Bilişim Sistemleri gibi bölümler yer alır. İşte en popüler bölümler ve sundukları
          kariyer fırsatları.
        </p>
      </section>

      <section aria-labelledby="hukuk">
        <h2 id="hukuk">Hukuk Bölümü</h2>
        <p>
          Hukuk, her yıl en çok tercih edilen eşit ağırlık bölümleri arasında ilk sıralarda
          yer alır. Hukuk Fakültesi’nde öğrenciler; anayasa hukuku, ceza hukuku, medeni
          hukuk, ticaret hukuku ve idare hukuku gibi temel alanlarda eğitim alırlar. Eğitim
          sürecinde seçmeli derslerle deniz hukuku, uluslararası hukuk veya bilişim hukuku
          gibi alanlarda uzmanlaşmak mümkündür.
        </p>
        <h3>Hukuk Mezunları Nerelerde Çalışabilir?</h3>
        <p>Hukuk fakültesinden mezun olanlar;</p>
        <BlogChecklist items={hukuk} />
        <p>
          olarak görev yapabilir. Gerekli şartları sağlayan mezunlar kendi hukuk bürolarını
          açarak serbest avukatlık da yapabilirler.
        </p>
      </section>

      <section aria-labelledby="isletme">
        <h2 id="isletme">İşletme Bölümü</h2>
        <p>
          İşletme bölümü, İktisadi ve İdari Bilimler Fakültesi’nin en geniş kariyer
          seçeneklerine sahip programlarından biridir. Eğitim sürecinde pazarlama, finans,
          muhasebe, insan kaynakları, yönetim, girişimcilik ve lojistik gibi birçok farklı
          alanda dersler verilir.
        </p>
        <p>Bu geniş eğitim sayesinde mezunlar ilgi duydukları alanda uzmanlaşabilir.</p>
        <h3>İşletme Mezunlarının İş İmkanları</h3>
        <p>İşletme mezunları;</p>
        <BlogChecklist items={isletme} />
        <p>gibi birçok sektörde çalışma fırsatı yakalayabilir.</p>
      </section>

      <section aria-labelledby="iktisat">
        <h2 id="iktisat">İktisat (Ekonomi) Bölümü</h2>
        <p>
          İktisat veya bazı üniversitelerdeki adıyla Ekonomi Bölümü, ekonomik sistemleri
          analiz etmeyi öğreten köklü bölümlerden biridir. Eğitim boyunca mikro ekonomi,
          makro ekonomi, uluslararası ticaret, finans ve para politikaları üzerine dersler
          alınır.
        </p>
        <h3>İktisat Mezunları Nerede Çalışır?</h3>
        <p>İktisat mezunları;</p>
        <BlogChecklist items={iktisat} />
        <p>gibi alanlarda kariyer yapabilir.</p>
      </section>

      <section aria-labelledby="psikoloji">
        <h2 id="psikoloji">Psikoloji Bölümü</h2>
        <p>
          Psikoloji bölümü insan davranışlarını bilimsel yöntemlerle inceleyen bir sosyal
          bilim dalıdır. Bölüm yalnızca sözel bilgiye değil, aynı zamanda istatistik,
          araştırma yöntemleri ve analitik düşünme becerilerine de önem verir. Bu nedenle
          eşit ağırlık öğrencileri için ideal seçeneklerden biridir.
        </p>
        <h3>Psikoloji Mezunlarının Çalışma Alanları</h3>
        <p>Psikoloji mezunları;</p>
        <BlogChecklist items={psikoloji} />
        <p>gibi birçok kurumda görev alabilir.</p>
        <p>
          Klinik Psikolog olmak isteyenlerin ise Klinik Psikoloji alanında yüksek lisans
          yapmaları gerekir.
        </p>

        <h3>Psikolog ile Psikiyatrist Arasındaki Fark</h3>
        <p>Sıkça karıştırılan bu iki meslek aslında farklı eğitim süreçlerine sahiptir.</p>
        <BlogChecklist items={psikologFark} />
      </section>

      <section aria-labelledby="pdr">
        <h2 id="pdr">Rehberlik ve Psikolojik Danışmanlık (PDR)</h2>
        <p>
          PDR bölümü, bireylerin akademik, sosyal ve psikolojik gelişimlerini desteklemeyi
          amaçlayan uzmanlar yetiştirir.
        </p>
        <h3>Mezunların Çalışabileceği Alanlar</h3>
        <BlogChecklist items={pdr} />
        <p>
          PDR mezunları öğrencilerin eğitim süreçlerine rehberlik ederken aynı zamanda
          bireysel danışmanlık hizmetleri de sunabilir.
        </p>
      </section>

      <section aria-labelledby="uluslararasi-iliskiler">
        <h2 id="uluslararasi-iliskiler">Uluslararası İlişkiler Bölümü</h2>
        <p>
          Uluslararası İlişkiler bölümü; diplomasi, dış politika, uluslararası hukuk, ekonomi
          ve siyaset alanlarını birlikte ele alır.
        </p>
        <h3>Mezunlar Nerelerde Çalışabilir?</h3>
        <BlogChecklist items={uluslararasi} />
        <p>Yabancı dil bilgisi bu bölüm mezunları için önemli bir avantaj sağlar.</p>
      </section>

      <section aria-labelledby="siyaset-bilimi">
        <h2 id="siyaset-bilimi">Siyaset Bilimi ve Kamu Yönetimi</h2>
        <p>
          Siyaset Bilimi ve Kamu Yönetimi bölümü, kamu yönetiminin işleyişi ile siyasi
          sistemleri inceleyen disiplinler arası bir programdır.
        </p>
        <p>Öğrenciler eğitim süresince;</p>
        <BlogChecklist items={siyaset} />
        <p>alanlarında eğitim alırlar.</p>
        <p>
          KPSS ile kamu kurumlarında uzman, müfettiş, denetçi veya idari personel olarak
          görev yapma imkanı bulunmaktadır.
        </p>
      </section>

      <section aria-labelledby="ybs">
        <h2 id="ybs">Yönetim Bilişim Sistemleri (YBS)</h2>
        <p>
          Son yılların yükselen bölümlerinden biri olan Yönetim Bilişim Sistemleri, teknoloji
          ile işletme yönetimini bir araya getirir.
        </p>
        <p>Bölümde;</p>
        <BlogChecklist items={ybsDersler} />
        <p>gibi dersler okutulur.</p>
        <h3>YBS Mezunlarının İş İmkanları</h3>
        <BlogChecklist items={ybsIs} />
        <p>gibi birçok farklı alanda çalışma fırsatı sunar.</p>
      </section>

      <section aria-labelledby="ic-mimarlik">
        <h2 id="ic-mimarlik">İç Mimarlık ve Çevre Tasarımı</h2>
        <p>
          İç Mimarlık ve Çevre Tasarımı bölümü; yaşam alanlarının estetik, işlevsel ve
          ergonomik şekilde tasarlanmasını amaçlar.
        </p>
        <p>Öğrenciler;</p>
        <BlogChecklist items={icMimarlikDersler} />
        <p>konularında eğitim alırlar.</p>
        <h3>Mezunların Çalışma Alanları</h3>
        <BlogChecklist items={icMimarlikIs} />
      </section>

      <section aria-labelledby="grafik-tasarim">
        <h2 id="grafik-tasarim">Grafik Tasarım Bölümü</h2>
        <p>
          Grafik Tasarım bölümü, görsel iletişim alanında uzman tasarımcılar yetiştirir.
          Eğitim sürecinde hem dijital hem de basılı medya için tasarım üretimi öğretilir.
        </p>
        <h3>Alınan Dersler</h3>
        <BlogChecklist items={grafikDersler} />
        <h3>Grafik Tasarım Mezunları Nerelerde Çalışabilir?</h3>
        <BlogChecklist items={grafikIs} />
      </section>

      <section aria-labelledby="ozet">
        <h2 id="ozet">En Çok Tercih Edilen Eşit Ağırlık Bölümleri Hangileri?</h2>
        <p>
          Tercih dönemlerinde adayların en fazla yöneldiği eşit ağırlık bölümleri genel
          olarak şunlardır:
        </p>
        <BlogChecklist items={enCokTercih} />
        <p>
          Bu bölümler hem geniş kariyer seçenekleri sunmaları hem de kamu ve özel sektörde
          istihdam imkanlarının bulunması nedeniyle her yıl binlerce öğrenci tarafından
          tercih edilmektedir. Üniversite tercihi yaparken yalnızca taban puanlarını değil,
          bölümün ders içeriklerini, kişisel ilgi alanlarınızı ve mezuniyet sonrası kariyer
          hedeflerinizi de mutlaka değerlendirmelisiniz.
        </p>
      </section>
    </BlogArticleLayout>
  );
}
