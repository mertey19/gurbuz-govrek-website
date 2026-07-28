/**
 * Tarayıcıda görsel küçültme.
 *
 * Site Cloudflare Workers üzerinde çalıştığı için sunucuda `sharp` kullanılamaz;
 * küçültme ve WebP'ye çevirme bu yüzden yükleme öncesinde tarayıcıda yapılır.
 * Telefondan gelen 5 MB'lık bir fotoğraf ağa çıkmadan ~200 KB'a iner.
 */
const MAX_WIDTH = 1600;
const QUALITY = 0.82;

export type PreparedImage = { blob: Blob; width: number; height: number };

export async function prepareImage(file: File): Promise<PreparedImage> {
  // createImageBitmap, EXIF yönünü uygular; döndürülmüş telefon fotoğrafları düz gelir.
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Görsel işlenemedi.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/webp", QUALITY);
  });

  if (!blob) {
    throw new Error("Görsel dönüştürülemedi.");
  }

  return { blob, width, height };
}

/** Hazırlanan görseli yükler ve kalıcı adresini döndürür. */
export async function uploadImage(file: File): Promise<{ url: string; sizeKb: number }> {
  const prepared = await prepareImage(file);

  const form = new FormData();
  form.append("file", prepared.blob, "gorsel.webp");

  const response = await fetch("/api/admin/upload", { method: "POST", body: form });
  const payload = (await response.json()) as { url?: string; sizeKb?: number; error?: string };

  if (!response.ok || !payload.url) {
    throw new Error(payload.error ?? "Görsel yüklenemedi.");
  }

  return { url: payload.url, sizeKb: payload.sizeKb ?? 0 };
}
