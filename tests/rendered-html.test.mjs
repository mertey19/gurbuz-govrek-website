import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("Gürbüz Gövrek ana sayfasını sunucu tarafında oluşturur", async () => {
  await Promise.all([
    "../public/favicon-96x96.png",
    "../public/favicon.ico",
    "../public/apple-touch-icon.png",
    "../public/resources/meslek-tanitim/tyt/acil-yardim-ve-afet-yoneticisi.pdf",
    "../public/resources/meslek-tanitim/soz/film-tasarimi-ve-yonetmeni.pdf",
    "../public/resources/meslek-tanitim/say/bilgisayar-muhendisi.pdf",
    "../public/resources/meslek-tanitim/ea/avukat.pdf",
    "../public/resources/meslek-tanitim/dil/ingilizce-ogretmeni.pdf",
    "../public/images/sunum-kosesi/seminer/01.webp",
    "../public/images/sunum-kosesi/seminer/10.webp",
    "../public/images/sunum-kosesi/ucak-uzay/01.webp",
    "../public/images/sunum-kosesi/ucak-uzay/10.webp",
    "../public/images/sunum-kosesi/endustri-isletme/01.webp",
    "../public/images/sunum-kosesi/endustri-isletme/10.webp",
    "../public/images/sunum-kosesi/bilgisayar-yazilim/01.webp",
    "../public/images/sunum-kosesi/bilgisayar-yazilim/10.webp",
    "../public/images/sunum-kosesi/bilgisayar-matematik/01.webp",
    "../public/images/sunum-kosesi/bilgisayar-matematik/10.webp",
    "../public/images/sunum-kosesi/mimarlik-insaat/01.webp",
    "../public/images/sunum-kosesi/mimarlik-insaat/10.webp",
    "../public/images/sunum-kosesi/makine-mekatronik/01.webp",
    "../public/images/sunum-kosesi/makine-mekatronik/10.webp",
    "../public/images/sunum-kosesi/hukuk-psikoloji/01.webp",
    "../public/images/sunum-kosesi/hukuk-psikoloji/10.webp",
    "../public/images/sunum-kosesi/ekonomi-isletme/01.webp",
    "../public/images/sunum-kosesi/ekonomi-isletme/10.webp",
    "../public/images/sunum-kosesi/tip-dis/01.webp",
    "../public/images/sunum-kosesi/tip-dis/10.webp",
    "../public/images/sunum-kosesi/tuma/01.webp",
    "../public/images/sunum-kosesi/tuma/09.webp",
    "../public/images/sunum-kosesi/kontenjan/01.webp",
    "../public/images/sunum-kosesi/kontenjan/04.webp",
    "../public/images/sunum-kosesi/yks-istatistikleri/01.webp",
    "../public/images/sunum-kosesi/yks-istatistikleri/07.webp",
    "../public/images/sunum-kosesi/molekuler-kimya-biyomuhendislik/01.webp",
    "../public/images/sunum-kosesi/molekuler-kimya-biyomuhendislik/10.webp",
    "../public/images/sunum-kosesi/siber-guvenlik-bilgi-guvenligi/01.webp",
    "../public/images/sunum-kosesi/siber-guvenlik-bilgi-guvenligi/10.webp",
    "../public/images/sunum-kosesi/bilisim-sistemleri-ybs/01.webp",
    "../public/images/sunum-kosesi/bilisim-sistemleri-ybs/10.webp",
    "../public/images/sunum-kosesi/bitki-koruma-tarla-bitkileri/01.webp",
    "../public/images/sunum-kosesi/bitki-koruma-tarla-bitkileri/10.webp",
    "../public/images/sunum-kosesi/biyolog-kimyager/01.webp",
    "../public/images/sunum-kosesi/biyolog-kimyager/10.webp",
    "../public/images/sunum-kosesi/diyetisyen-eczaci/01.webp",
    "../public/images/sunum-kosesi/diyetisyen-eczaci/10.webp",
  ].map((path) => access(new URL(path, import.meta.url))));

  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="tr"/i);
  assert.match(html, /<link[^>]+rel="icon"[^>]+href="[^"]*\/favicon-96x96\.png"[^>]*>/i);
  assert.match(html, /<link[^>]+rel="shortcut icon"[^>]+href="[^"]*\/favicon\.ico"[^>]*>/i);
  assert.doesNotMatch(html, /\[object%20Object\]/i);
  assert.match(html, /Gürbüz Gövrek \| Matematik Öğretmeni ve Tercih Uzmanı/i);
  assert.match(html, /Doğru Tercih,.*Mutlu Bir Hayat/is);
  assert.match(html, /Tarsus’tan Başlayan Çok Yönlü Bir Eğitim Yolculuğu/i);
  assert.match(html, /Yıldız Teknik Üniversitesi/i);
  assert.match(html, /Pamukkale Üniversitesi/i);
  assert.match(html, /Çukurova Üniversitesi/i);
  assert.match(html, /Her Adımda Açık, Kişisel ve Güvenilir Rehberlik/i);
  assert.match(html, /WhatsApp(?:&apos;|')tan (?:Bilgi Al|Görüş|İletişime Geç)/i);
  assert.match(html, /https:\/\/wa\.me\/905013653371/i);
  assert.match(html, /https:\/\/www\.instagram\.com\/gurbuz\.govrek\//i);
  assert.doesNotMatch(html, /\/api\/appointments|Randevu Talebi Oluştur/i);
  assert.match(html, /<form\b/i);
  assert.match(html, /Deneyiminizi Paylaşın/i);
  assert.match(html, /Yorumu Gönder/i);
  assert.match(html, /Randevu ile/i);
  assert.match(html, /WhatsApp Üzerinden İletişime Geçin/i);
  assert.match(html, /Meslek Tanıtım Köşesi/i);
  assert.match(html, /115 meslek dosyası/i);
  assert.match(html, /5 kategori/i);
  assert.match(html, /Sunum ve Seminer Köşesi/i);
  assert.match(html, /180(?:<!-- -->)? özgün görsel/i);
  assert.match(html, /19(?:<!-- -->)? ayrı içerik serisi/i);
  assert.match(html, /YKS Kontenjan Değişimi/i);
  assert.match(html, /YKS İstatistikleri/i);
  assert.match(html, /Seminer Slaytları/i);
  assert.match(html, /TÜMA 2025 Araştırması/i);
  assert.match(html, /Bilgisayar ve Yazılım Mühendisliği/i);
  assert.match(html, /Tıp ve Diş Hekimliği/i);
  assert.match(html, /Moleküler Biyoloji ve Genetik &amp; Kimya-Biyoloji Mühendisliği/i);
  assert.match(html, /Siber Güvenlik ve Bilgi Güvenliği/i);
  assert.match(html, /Bilişim Sistemleri Mühendisliği ve Yönetim Bilişim Sistemleri/i);
  assert.match(html, /Bitki Koruma ve Tarla Bitkileri/i);
  assert.match(html, /Biyolog ve Kimyager/i);
  assert.match(html, /Diyetisyenlik ve Eczacılık/i);
  assert.match(html, /Tercih Sürecinde Doğru Karar İçin Güncel Rehberler/i);
  assert.match(html, /\/blog\/denizlide-yks-tercih-danismani-nasil-secilir/i);
  assert.match(html, /Matematik Özel Ders ve Akademik Takip/i);
  assert.match(html, /href="\/matematik-ozel-ders"/i);
  assert.match(html, /Ben Kimim\?/i);
  assert.match(html, /Eğitim &amp; Danışmanlık/i);
  assert.match(html, /Matematik &amp; Özel Ders/i);
  assert.match(html, /Öğrenci Deneyimleri/i);
  assert.match(html, /Öğrenci ve Veli Yorumları/i);
  assert.match(html, /YKS Tercih Blogu/i);
  assert.match(html, /\/images\/sunum-kosesi\/kontenjan\/01\.webp/i);
  assert.match(html, /\/resources\/meslek-tanitim\/tyt\/acil-yardim-ve-afet-yoneticisi\.pdf/i);
  assert.doesNotMatch(html, /Gizlilik Politikası|KVKK Aydınlatma Metni|Kullanım Koşulları/i);
  assert.match(html, /src="\/images\/hero-gurbuz-govrek\.png"/i);
  assert.doesNotMatch(html, /\/_vinext\/image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("matematik özel ders sayfasını SEO verileriyle oluşturur", async () => {
  const response = await render("/matematik-ozel-ders");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Matematikte Ezber Değil, Anlama ve Uygulama/i);
  assert.match(html, /Ortaokul, lise ve TYT–AYT hazırlığında/i);
  assert.match(html, /Seviye ve İhtiyaç Analizi/i);
  assert.match(html, /Matematik Özel Ders Hakkında/i);
  assert.match(html, /WhatsApp’tan Bilgi Al/i);
  assert.match(html, /"@type":"Service"/i);
  assert.match(html, /"@type":"FAQPage"/i);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.xn--grbzgvrek-47a5dc\.com\.tr\/matematik-ozel-ders"/i,
  );
});

test("blog liste sayfasını ve Denizli YKS tercih yazısını sunucu tarafında oluşturur", async () => {
  const blogResponse = await render("/blog");
  assert.equal(blogResponse.status, 200);
  const blogHtml = await blogResponse.text();
  assert.match(blogHtml, /Üniversite Tercihinde Bilinçli Kararlar İçin Rehberler/i);
  assert.match(blogHtml, /Denizli YKS Tercih Danışmanlığı ile Doğru Üniversite Tercihi Nasıl Yapılır/i);
  assert.match(blogHtml, /Denizli’de YKS Tercih Danışmanı Nasıl Seçilir/i);
  assert.match(blogHtml, /Başarı Sırasına Göre Tercih Listesi Nasıl Hazırlanır/i);
  assert.match(blogHtml, /Vakıf mı Devlet Üniversitesi mi\? Karar Verirken 8 Ölçüt/i);
  assert.match(blogHtml, /Üniversite ve Bölüm Seçerken Yapılan 10 Hata/i);
  assert.match(blogHtml, /rel="canonical" href="https:\/\/www\.xn--grbzgvrek-47a5dc\.com\.tr\/blog"/i);

  const articleResponse = await render("/blog/denizli-yks-tercih-danismanligi");
  assert.equal(articleResponse.status, 200);
  const articleHtml = await articleResponse.text();
  assert.match(articleHtml, /<article\b/i);
  assert.match(articleHtml, /En Sık Yapılan Tercih Hataları/i);
  assert.match(articleHtml, /Sık Sorulan Sorular/i);
  assert.match(articleHtml, /ÖSYM — YKS duyuruları ve tercih kılavuzları/i);
  assert.match(
    articleHtml,
    /rel="canonical" href="https:\/\/www\.xn--grbzgvrek-47a5dc\.com\.tr\/blog\/denizli-yks-tercih-danismanligi"/i,
  );
  assert.match(articleHtml, /"@type":"Article"/i);
  assert.match(articleHtml, /"@type":"FAQPage"/i);

  const newArticles = [
    {
      path: "/blog/denizlide-yks-tercih-danismani-nasil-secilir",
      title: /Denizli’de YKS Tercih Danışmanı Nasıl Seçilir/i,
      content: /Danışman Seçerken Bakılması Gereken 7 Ölçüt/i,
    },
    {
      path: "/blog/basari-sirasina-gore-tercih-listesi-nasil-hazirlanir",
      title: /Başarı Sırasına Göre Tercih Listesi Nasıl Hazırlanır/i,
      content: /Tercih Listesi Hazırlamanın 7 Adımı/i,
    },
    {
      path: "/blog/vakif-mi-devlet-universitesi-mi",
      title: /Vakıf mı Devlet Üniversitesi mi\? Karar Verirken 8 Ölçüt/i,
      content: /Bursun Ayrıntılarını Yazılı Olarak Doğrulayın/i,
    },
    {
      path: "/blog/universite-bolum-secerken-yapilan-hatalar",
      title: /Üniversite ve Bölüm Seçerken Yapılan 10 Hata/i,
      content: /En Sık Karşılaşılan 10 Tercih Hatası/i,
    },
  ];

  for (const article of newArticles) {
    const response = await render(article.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, article.title);
    assert.match(html, article.content);
    assert.match(html, /"@type":"Article"/i);
    assert.match(html, /"@type":"FAQPage"/i);
    assert.match(html, new RegExp(`rel="canonical" href="https:\\/\\/www\\.xn--grbzgvrek-47a5dc\\.com\\.tr${article.path}"`, "i"));
  }
});

test("sitemap blog adreslerini yalnızca kanonik alan adıyla üretir", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.equal(locations.length, 8);
  assert.ok(locations.every((location) => location.startsWith("https://www.xn--grbzgvrek-47a5dc.com.tr/")));
  assert.ok(locations.includes("https://www.xn--grbzgvrek-47a5dc.com.tr/blog"));
  assert.ok(locations.includes("https://www.xn--grbzgvrek-47a5dc.com.tr/matematik-ozel-ders"));
  assert.ok(
    locations.includes(
      "https://www.xn--grbzgvrek-47a5dc.com.tr/blog/denizli-yks-tercih-danismanligi",
    ),
  );
  assert.ok(
    locations.includes(
      "https://www.xn--grbzgvrek-47a5dc.com.tr/blog/denizlide-yks-tercih-danismani-nasil-secilir",
    ),
  );
  assert.ok(
    locations.includes(
      "https://www.xn--grbzgvrek-47a5dc.com.tr/blog/basari-sirasina-gore-tercih-listesi-nasil-hazirlanir",
    ),
  );
  assert.ok(
    locations.includes(
      "https://www.xn--grbzgvrek-47a5dc.com.tr/blog/vakif-mi-devlet-universitesi-mi",
    ),
  );
  assert.ok(
    locations.includes(
      "https://www.xn--grbzgvrek-47a5dc.com.tr/blog/universite-bolum-secerken-yapilan-hatalar",
    ),
  );
  assert.ok(
    locations.every(
      (location) =>
        !/vercel\.app|akdenizkasabi|^http:\/\//i.test(location),
    ),
  );
});
