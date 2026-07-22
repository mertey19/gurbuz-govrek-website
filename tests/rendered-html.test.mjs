import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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
  assert.doesNotMatch(html, /<form\b|\/api\/appointments|Randevu Talebi Oluştur/i);
  assert.match(html, /Randevu ile/i);
  assert.match(html, /WhatsApp Üzerinden İletişime Geçin/i);
  assert.match(html, /Meslek Tanıtım Köşesi/i);
  assert.match(html, /115 meslek dosyası/i);
  assert.match(html, /5 kategori/i);
  assert.match(html, /Sunum ve Seminer Köşesi/i);
  assert.match(html, /109(?:<!-- -->)? özgün görsel/i);
  assert.match(html, /11(?:<!-- -->)? ayrı içerik serisi/i);
  assert.match(html, /Tercihler 2026/i);
  assert.match(html, /TÜMA 2025 Araştırması/i);
  assert.match(html, /Bilgisayar ve Yazılım Mühendisliği/i);
  assert.match(html, /Tıp ve Diş Hekimliği/i);
  assert.match(html, /\/images\/sunum-kosesi\/seminer\/01\.webp/i);
  assert.match(html, /\/resources\/meslek-tanitim\/tyt\/acil-yardim-ve-afet-yoneticisi\.pdf/i);
  assert.doesNotMatch(html, /Gizlilik Politikası|KVKK Aydınlatma Metni|Kullanım Koşulları/i);
  assert.match(html, /src="\/images\/hero-gurbuz-govrek\.png"/i);
  assert.doesNotMatch(html, /\/_vinext\/image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});
