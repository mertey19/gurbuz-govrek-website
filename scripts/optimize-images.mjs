/**
 * Görsel optimizasyon boru hattı.
 *
 * 1. `public/images` altındaki bölüm görsellerini WebP'ye çevirir (PNG kaynak
 *    bırakılmışsa siler). Fotoğrafik içerikte WebP, palet PNG'ye göre ~%80 daha küçük.
 * 2. Sosyal kartı JPEG üretir — WhatsApp ve bazı Twitter/Facebook tarayıcıları
 *    WebP OG görsellerini güvenilir şekilde işlemez, bu yüzden burada WebP kullanılmaz.
 * 3. Sunum köşesi slaytları için 480px küçük resim (`*-thumb.webp`) üretir; ızgara
 *    bunları kullanır, büyütme penceresi tam boyutlu dosyayı kullanır.
 * 4. Bölüm görsellerinin dar sürümlerini (`*-640.webp` gibi) ve bunları listeleyen
 *    `lib/image-variants.json` dosyasını üretir. Kenarda görsel dönüştürme servisi
 *    çalışmadığı için `srcset` bu dosyalardan kuruluyor; aksi hâlde telefon da
 *    masaüstü boyutundaki dosyayı indiriyordu.
 *
 * Çalıştırma: `npm run images:optimize` (yeni görsel eklendiğinde tekrarlanabilir).
 */
import { readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_DIRECTORY = path.resolve("public/images");
const PRESENTATION_DIRECTORY = path.join(IMAGE_DIRECTORY, "sunum-kosesi");
const BLOG_COVER_DIRECTORY = path.join(IMAGE_DIRECTORY, "blog-kapak");
const THUMBNAIL_SUFFIX = "-thumb.webp";
const THUMBNAIL_SIZE = 480;

/*
  Üretilen genişlikler. next/image'ın istediği genişliğe eşit ya da ondan büyük
  en küçük dosya seçilir; listede yoksa özgün dosya kullanılır. Telefonlarda
  ağırlığı belirleyen 640 ve 828; daha geniş değerler tablet ve 3x ekranlar için.
*/
const VARIANT_WIDTHS = [384, 640, 828, 1080];
const VARIANT_MANIFEST = path.resolve("lib/image-variants.json");

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

/** Türetilmiş dosya kaynaktan yeniyse yeniden üretmeye gerek yoktur. */
async function isUpToDate(derivedPath, sourcePath) {
  try {
    const [derived, source] = await Promise.all([stat(derivedPath), stat(sourcePath)]);
    return derived.mtimeMs >= source.mtimeMs;
  } catch {
    return false;
  }
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
// Kaynak önce belleğe alınır: sharp dosyayı açık tutarken aynı yola yazmak
// Windows'ta EUNKNOWN veriyor ve betiğin tamamını durduruyordu.
const socialCard = await sharp(await readFile(socialSource))
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
    const slidePath = path.join(collectionPath, slide);
    const thumbnailPath = path.join(
      collectionPath,
      `${slide.replace(/\.webp$/, "")}${THUMBNAIL_SUFFIX}`,
    );

    // Güncel küçük resim yeniden üretilmez: 400'ü aşkın dosyayı her çalıştırmada
    // yeniden yazmak hem yavaş hem de Windows'ta dosya kilidi hatası veriyordu.
    if (await isUpToDate(thumbnailPath, slidePath)) continue;

    // Kaynak belleğe alınır; sharp dosyayı açık tutarken aynı klasöre yazmak
    // Windows'ta araya giren dosya tutamakları yüzünden EUNKNOWN verebiliyor.
    const source = await readFile(slidePath);
    const thumbnail = await sharp(source)
      .resize({ width: THUMBNAIL_SIZE, height: THUMBNAIL_SIZE, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    await writeFile(thumbnailPath, thumbnail);
    thumbnailCount += 1;
  }
}

console.log(`${thumbnailCount} sunum küçük resmi üretildi.`);

// 4) Bölüm ve blog kapağı görselleri için dar sürümler ve srcset listesi
const isVariantName = (name) =>
  new RegExp(`-(${VARIANT_WIDTHS.join("|")})\\.webp$`).test(name);

async function collectSources(directory) {
  return (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.webp$/i.test(entry.name))
    .map((entry) => entry.name)
    // Üretilmiş dar sürümler yeniden işlenmesin.
    .filter((name) => !isVariantName(name));
}

/*
  Sunum slaytları listeye alınmaz: 400'ü aşkın dosya için dört sürüm üretmek
  depoya binlerce dosya ekler. Onlar zaten 480px küçük resimle sunuluyor.
*/
const variantSources = [
  ...(await collectSources(IMAGE_DIRECTORY)).map((name) => ({ directory: IMAGE_DIRECTORY, prefix: "/images", name })),
  ...(await collectSources(BLOG_COVER_DIRECTORY)).map((name) => ({ directory: BLOG_COVER_DIRECTORY, prefix: "/images/blog-kapak", name })),
];

const manifest = {};
let variantCount = 0;

for (const { directory, prefix, name } of variantSources) {
  const source = await readFile(path.join(directory, name));
  const { width: sourceWidth, height: sourceHeight } = await sharp(source).metadata();
  const base = name.replace(/\.webp$/i, "");
  const widths = [];

  for (const width of VARIANT_WIDTHS) {
    // Kaynaktan geniş sürüm üretmek dosyayı büyütür, kaliteyi artırmaz.
    if (!sourceWidth || width >= sourceWidth) continue;

    const optimized = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toBuffer();

    await writeFile(path.join(directory, `${base}-${width}.webp`), optimized);
    widths.push(width);
    variantCount += 1;
  }

  if (widths.length > 0) {
    manifest[`${prefix}/${name}`] = {
      widths,
      // Özgün ölçüler `srcset`'in en geniş girdisi ve oran hesabı için gerekir.
      width: sourceWidth,
      height: sourceHeight,
    };
  }
}

await writeFile(VARIANT_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(
  `${variantCount} dar sürüm üretildi; ${Object.keys(manifest).length} görsel srcset listesine yazıldı.`,
);
