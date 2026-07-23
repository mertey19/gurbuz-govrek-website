# Yorum sistemini etkinleştirme

Yorum arayüzü, API ve yönetim paneli hazırdır. Canlı ortamda çalışması için
Vercel projesine bir Postgres veritabanı ve iki gizli ortam değişkeni
bağlanmalıdır.

## 1. Neon Postgres bağla

1. Vercel Dashboard'da site projesini aç.
2. `Storage` veya `Marketplace` bölümünden `Neon` entegrasyonunu ekle.
3. Ücretsiz planı seç ve aynı Vercel projesine bağla.
4. Entegrasyonun `DATABASE_URL` ortam değişkenini oluşturduğunu doğrula.

Tablo, yorum API'sine gelen ilk istekte güvenli biçimde otomatik oluşturulur.
İstenirse `db/comments.sql` Neon SQL Editor üzerinden elle de çalıştırılabilir.

## 2. Yönetim sırlarını ekle

Vercel projesinde `Settings > Environment Variables` bölümüne ekle:

- `COMMENTS_ADMIN_PASSWORD`: Yönetim ekranına girmek için güçlü ve benzersiz
  parola.
- `COMMENTS_COOKIE_SECRET`: En az 32 karakterlik rastgele ve benzersiz değer.

Bu değerleri kaynak koda, GitHub'a veya ziyaretçilere açık bir yere yazma.
Production, Preview ve Development ortamları için gerekli kutuları seç.

## 3. Yeniden deploy et

Ortam değişkenleri eklendikten sonra son deployment'ı yeniden deploy et.

- Ziyaretçi yorum alanı: ana sayfadaki `#yorumlar` bölümü
- Yönetim ekranı: `/yorum-yonetimi`

Gönderilen yorumlar varsayılan olarak `Onay bekliyor` durumundadır. Yönetim
ekranında `Yayınla` seçilmeden ana sayfada görünmez.

