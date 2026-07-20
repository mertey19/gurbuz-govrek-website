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
    "../public/resources/meslek-tanitim/tyt/acil-yardim-ve-afet-yoneticisi.pdf",
    "../public/resources/meslek-tanitim/soz/film-tasarimi-ve-yonetmeni.pdf",
    "../public/resources/meslek-tanitim/say/bilgisayar-muhendisi.pdf",
    "../public/resources/meslek-tanitim/ea/avukat.pdf",
    "../public/resources/meslek-tanitim/dil/ingilizce-ogretmeni.pdf",
  ].map((path) => access(new URL(path, import.meta.url))));

  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="tr"/i);
  assert.match(html, /Gürbüz Gövrek \| Matematik Öğretmeni ve Tercih Uzmanı/i);
  assert.match(html, /Doğru Tercih,.*Güçlü Bir Gelecek/is);
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
  assert.match(html, /\/resources\/meslek-tanitim\/tyt\/acil-yardim-ve-afet-yoneticisi\.pdf/i);
  assert.doesNotMatch(html, /Gizlilik Politikası|KVKK Aydınlatma Metni|Kullanım Koşulları/i);
  assert.match(html, /src="\/images\/hero-gurbuz-govrek\.png"/i);
  assert.doesNotMatch(html, /\/_vinext\/image/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});
