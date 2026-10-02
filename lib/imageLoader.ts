import variants from "./image-variants.json";

export type ImageVariant = {
  /** Üretilmiş dar sürümlerin genişlikleri, artan sırada. */
  widths: number[];
  /** Özgün dosyanın ölçüleri. */
  width: number;
  height: number;
};

const VARIANTS: Record<string, ImageVariant> = variants;

/**
 * Bir görselin dar sürümleri varsa döndürür.
 *
 * Kenarda görsel dönüştürme servisi çalışmıyor; dar sürümler derleme öncesinde
 * `npm run images:optimize` ile üretilip `image-variants.json` dosyasına
 * yazılıyor. Listede olmayan adresler (sunum slaytları, panel yüklemeleri,
 * uzak URL'ler) tek dosyayla sunulur.
 */
export function imageVariant(src: string): ImageVariant | undefined {
  return VARIANTS[src];
}

/** `/images/foo.webp` + 640 -> `/images/foo-640.webp` */
export function variantSrc(src: string, width: number): string {
  return src.replace(/\.webp$/, `-${width}.webp`);
}

/**
 * Tarayıcının cihazına uygun dosyayı seçebilmesi için `srcset` kurar.
 * Özgün dosya en geniş girdi olarak eklenir.
 */
export function buildSrcSet(src: string): string | undefined {
  const variant = imageVariant(src);
  if (!variant) return undefined;

  const entries = variant.widths.map((width) => `${variantSrc(src, width)} ${width}w`);
  entries.push(`${src} ${variant.width}w`);
  return entries.join(", ");
}
