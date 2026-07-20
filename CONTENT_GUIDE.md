# Bağlantı ve video ekleme rehberi

Bu işlemler için temel olarak `data/mediaArticles.ts` dosyasını düzenlemeniz yeterlidir. Her içerik `{` ile başlayıp `}` ile biten bir karttır. Bir değişiklik yaptıktan sonra dosyayı kaydedin; yerel site açıksa değişiklik otomatik görünür.

## Bir karta internet bağlantısı ekleme

İlgili karta `externalUrl` satırını ekleyin:

```ts
{
  category: "Basında",
  title: "Röportaj başlığı",
  summary: "Kartta görünecek kısa açıklama.",
  content: "İsterseniz açılır pencerede görünecek açıklamayı yazın.",
  externalUrl: "https://ornek-site.com/roportaj",
},
```

Bağlantı `https://` veya `http://` ile başlamalıdır. Geçerli bağlantı varsa kartta **Bağlantıyı Aç** butonu görünür ve sayfa yeni sekmede açılır.

## YouTube veya Vimeo videosu ekleme

İlgili karta `videoUrl` satırını ekleyin:

```ts
{
  category: "Video",
  title: "Tercih dönemi değerlendirmesi",
  summary: "Videonun kısa açıklaması.",
  content: "Videoyla ilgili ek bilgi.",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_KODU",
},
```

Normal YouTube, `youtu.be`, YouTube Shorts, YouTube Live ve Vimeo bağlantıları desteklenir. Video kartta **Videoyu İzle** butonuyla açılır. İsterseniz aynı karta bir `externalUrl` da ekleyebilirsiniz; video penceresinde **Kaynağı Aç** butonu görünür.

## Bilgisayardaki video dosyasını ekleme

1. Projede `public` klasörünün içine `videos` adlı klasör oluşturun.
2. Videoyu bu klasöre kopyalayın. Dosya adında boşluk ve Türkçe karakter kullanmayın; örnek: `tercih-semineri.mp4`.
3. Kartta aşağıdaki yolu kullanın:

```ts
videoUrl: "/videos/tercih-semineri.mp4",
```

MP4, WebM ve OGG dosyaları desteklenir. Büyük video dosyaları sitenin yüklenmesini ve yayına alınmasını zorlaştırabilir; uzun videolarda YouTube bağlantısı kullanmak daha uygundur.

## Instagram ve YouTube profil bağlantıları

`config/site.ts` dosyasındaki `contact` bölümünü bulun ve adresleri yazın:

```ts
instagram: "https://www.instagram.com/kullaniciadi/",
youtube: "https://www.youtube.com/@kanaladi",
```

Alan boş bırakılırsa ilgili ikon pasif görünür; geçerli bağlantı yazıldığında otomatik olarak tıklanabilir olur.

## Kontrol etme

Yerel siteyi açmak için:

```bash
npm run dev
```

Ardından `http://localhost:3000` adresinde Medya bölümünü kontrol edin. Yayına almadan önce son kontrol için:

```bash
npm run lint
npm run build
```

İsterseniz bağlantıları ve video adreslerini bana gönderin; kartlara sizin yerinize de ekleyebilirim.
