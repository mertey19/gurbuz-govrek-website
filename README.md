# Gürbüz Gövrek — Eğitim ve Tercih Danışmanlığı

Gürbüz Gövrek için hazırlanmış; matematik eğitimi, YKS tercih danışmanlığı, üniversite ve bölüm analizi, öğrenci koçluğu, kampüs ziyaretleri ve seminerleri tek sayfada sunan responsive web sitesi.

## Projeyi çalıştırma

Gereksinimler: Node.js 22.13 veya üzeri ve npm.

```bash
npm install
npm run dev
```

Yerel adres varsayılan olarak `http://localhost:3000` olur. Production kontrolü için:

```bash
npm run lint
npm run build
npm test
```

## Görseller

Site görselleri `public/images` klasöründedir. Kaynak arşivdeki 12 dosya anlamlı İngilizce dosya adlarıyla kopyalanmıştır. Yeni bir görsel eklerken aynı en-boy oranını koruyun ve `data/gallery.ts` içindeki alt metin, başlık ve açıklamayı güncelleyin.

## İletişim bilgileri

Telefon, e-posta, çalışma saatleri, görüşme konumu ve sosyal medya alanları `config/site.ts` dosyasındaki `contact` nesnesinden yönetilir. Mevcut iletişim bilgileri `+90 501 365 33 71` ve `gurbuzgovrek@gmail.com` olarak tanımlıdır.

## WhatsApp ayarı

`.env.example` dosyasını `.env.local` adıyla kopyalayın ve numarayı ülke koduyla, boşluksuz yazın:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=905013653371
```

Numara tanımlı değilse WhatsApp öğesi kırık bağlantı açmaz ve pasif görünür.

## Görüşme ve iletişim

Sitede randevu formu bulunmaz. Tüm görüşme talepleri, sayfadaki WhatsApp butonları üzerinden `+90 501 365 33 71` numarasına yönlendirilir. Varsayılan mesaj ve numara `config/site.ts` dosyasından yönetilir.

## Alan adı ve SEO

`.env.local` dosyasında gerçek alan adını tanımlayın:

```env
NEXT_PUBLIC_SITE_URL=https://alanadiniz.com
```

Bu değer canonical URL, sitemap, robots ve JSON-LD şemalarında kullanılır.

## Deployment

1. Ortam değişkenlerini hosting paneline ekleyin.
2. `npm run build` komutunun hatasız tamamlandığını doğrulayın.
3. Üretim çıktısını Sites üzerinden yayımlayın.
4. Canlı URL üzerinde form bilgilendirmesini, sosyal bağlantıları, canonical adresi ve iletişim bilgilerini son kez kontrol edin.

## İçerik yönetimi

Bağlantı, YouTube/Vimeo videosu veya bilgisayardan video eklemek için adım adım Türkçe anlatım: [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md)

- Genel marka ve iletişim: `config/site.ts`
- Hizmetler: `data/services.ts`
- SSS: `data/faq.ts`
- Başarı hikâyeleri: `data/successStories.ts`
- Medya içerikleri: `data/mediaArticles.ts`
- Galeri: `data/gallery.ts`

Doğrulanmamış başarı yüzdesi, öğrenci sayısı, ödül veya yerleşme garantisi eklemeyin.
