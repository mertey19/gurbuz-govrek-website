import type { CSSProperties } from "react";
import { buildSrcSet, imageVariant } from "@/lib/imageLoader";

/**
 * Site genelinde kullanılan görsel bileşeni.
 *
 * Doğrudan `<img>` basar. next/image bu kurulumda responsive `srcset`
 * üretemiyordu: kenarda görsel dönüştürme servisi yok, `unoptimized` modunda
 * bütün `srcset` girdileri aynı dosyayı gösteriyor, özel yükleyici ise vinext
 * tarafından yok sayılıyordu. Sonuçta telefon da masaüstü boyutundaki dosyayı
 * indiriyordu.
 *
 * Dar sürümler `npm run images:optimize` ile üretilir; burada yalnızca listeye
 * göre `srcset` kurulur. Yerleşim davranışı next/image'ın bastığı işaretlemeyle
 * aynı tutulur: `fill` mutlak konumlanır, diğerleri `width`/`height` taşır, bu
 * yüzden yerleşim kayması oluşmaz.
 */
type SiteImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
  /** Kapsayıcıyı doldurur; kapsayıcı konumlandırılmış olmalıdır. */
  fill?: boolean;
  /** İlk ekrandaki görsel: geç yükleme kapatılır, öncelik yükseltilir. */
  priority?: boolean;
  loading?: "eager" | "lazy";
};

const FILL_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export function SiteImage({
  src,
  alt,
  sizes,
  className,
  style,
  width,
  height,
  fill,
  priority,
  loading,
}: SiteImageProps) {
  const variant = imageVariant(src);

  return (
    /*
      Kural next/image öneriyor; bu kurulumda tam tersi geçerli. next/image
      burada responsive `srcset` üretemiyor (yukarıdaki açıklama), dolayısıyla
      görseli doğrudan basmak daha az bayt indiriyor.
    */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={buildSrcSet(src)}
      sizes={sizes}
      alt={alt}
      // `fill` kapsayıcıdan ölçü aldığı için öz ölçü yazılmaz.
      width={fill ? undefined : (width ?? variant?.width)}
      height={fill ? undefined : (height ?? variant?.height)}
      loading={loading ?? (priority ? "eager" : "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={fill ? { ...FILL_STYLE, ...style } : style}
    />
  );
}
