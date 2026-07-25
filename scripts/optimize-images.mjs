/**
 * Görsel optimizasyon boru hattı.
 *
 * 1. `public/images` altındaki bölüm görsellerini WebP'ye çevirir (PNG kaynak
 *    bırakılmışsa siler). Fotoğrafik içerikte WebP, palet PNG'ye göre ~%80 daha küçük.
 * 2. Sosyal kartı JPEG üretir — WhatsApp ve bazı Twitter/Facebook tarayıcıları
 *    WebP OG görsellerini güvenilir şekilde işlemez, bu yüzden burada WebP kullanılmaz.
 * 3. Sunum köşesi slaytları için 480px küçük resim (`*-thumb.webp`) üretir; ızgara
 *    bunları kullanır, büyütme penceresi tam boyutlu dosyayı kullanır.
 *
 * Çalıştırma: `npm run images:optimize` (yeni görsel eklendiğinde tekrarlanabilir).
 */
import { readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_DIRECTORY = path.resolve("public/images");
const PRESENTATION_DIRECTORY = path.join(IMAGE_DIRECTORY, "sunum-kosesi");
const THUMBNAIL_SUFFIX = "-thumb.webp";
const THUMBNAIL_SIZE = 480;

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

// 1) Bölüm görselleri: PNG/JPEG -> WebP
const sectionSources = (await readdir(IMAGE_DIRECTORY)).filter((name) =>
  /\.(png|jpe?g)$/i.test(name),
);

for (const name of sectionSources) {
  const sourcePath = path.join(IMAGE_DIRECTORY, name);
  const targetPath = path.join(IMAGE_DIRECTORY, `${name.replace(/\.(png|jpe?g)$/i, "")}.webp`);
  const optimized = await sharp(sourcePath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer();
  await writeFile(targetPath, optimized);
  const { size: originalSize } = await stat(sourcePath);
  await rm(sourcePath);
  console.log(`${name} ${formatKb(originalSize)} -> ${path.basename(targetPath)} ${formatKb(optimized.length)}`);
}

// 2) Sosyal kart: her zaman JPEG
const socialSource = path.resolve("public/og.jpg");
const socialCard = await sharp(socialSource)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 86, progressive: true, mozjpeg: true })
  .toBuffer();
await writeFile(socialSource, socialCard);
console.log(`og.jpg -> ${formatKb(socialCard.length)}`);

// 3) Sunum slaytları için küçük resimler
const collectionDirectories = await readdir(PRESENTATION_DIRECTORY, { withFileTypes: true });
let thumbnailCount = 0;

for (const entry of collectionDirectories) {
  if (!entry.isDirectory()) continue;
  const collectionPath = path.join(PRESENTATION_DIRECTORY, entry.name);
  const slides = (await readdir(collectionPath)).filter(
    (name) => name.endsWith(".webp") && !name.endsWith(THUMBNAIL_SUFFIX),
  );

  for (const slide of slides) {
    const thumbnail = await sharp(path.join(collectionPath, slide))
      .resize({ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    await writeFile(
      path.join(collectionPath, `${slide.replace(/\.webp$/, "")}${THUMBNAIL_SUFFIX}`),
      thumbnail,
    );
    thumbnailCount += 1;
  }
}

console.log(`${thumbnailCount} sunum küçük resmi üretildi.`);
