import { put } from "@vercel/blob";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";

/**
 * Panelden görsel yükleme.
 *
 * Site Cloudflare Workers üzerinde çalışır; `sharp` gibi yerel Node modülleri
 * bu ortamda yüklenemez. Bu yüzden küçültme ve WebP'ye çevirme tarayıcıda,
 * yükleme öncesinde yapılır (`components/admin/imageUpload.ts`). Sunucuya
 * ulaşan dosya zaten optimize edilmiştir.
 *
 * Sunucu tarafında yeniden kodlama yapılamadığı için dosyanın gerçekten görsel
 * olduğu imza baytlarından doğrulanır: uzantı ve bildirilen tür kolayca
 * taklit edilir, dosyanın ilk baytları edilmez.
 */
export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024;

type Signature = { ext: string; contentType: string; matches: (bytes: Uint8Array) => boolean };

function startsWith(bytes: Uint8Array, prefix: number[], offset = 0) {
  return prefix.every((value, index) => bytes[offset + index] === value);
}

const SIGNATURES: Signature[] = [
  {
    ext: "webp",
    contentType: "image/webp",
    // "RIFF" .... "WEBP"
    matches: (b) => startsWith(b, [0x52, 0x49, 0x46, 0x46]) && startsWith(b, [0x57, 0x45, 0x42, 0x50], 8),
  },
  {
    ext: "jpg",
    contentType: "image/jpeg",
    matches: (b) => startsWith(b, [0xff, 0xd8, 0xff]),
  },
  {
    ext: "png",
    contentType: "image/png",
    matches: (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  },
  {
    ext: "avif",
    contentType: "image/avif",
    // "ftypavif" kutu başlığı 4. bayttan başlar.
    matches: (b) => startsWith(b, [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], 4),
  },
];

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Depolama yapılandırılmamış. BLOB_READ_WRITE_TOKEN tanımlı değil." },
      { status: 503 },
    );
  }

  let file: File | null = null;
  try {
    const form = await request.formData();
    const value = form.get("file");
    file = value instanceof File ? value : null;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: "Dosya seçilmedi." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Görsel en fazla ${MAX_BYTES / 1024 / 1024} MB olabilir.` },
      { status: 400 },
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const signature = SIGNATURES.find((item) => item.matches(bytes));

  if (!signature) {
    return NextResponse.json(
      { error: "Dosya görsel değil. JPEG, PNG, WebP veya AVIF yükleyin." },
      { status: 400 },
    );
  }

  try {
    const blob = await put(`yuklenen/gorsel.${signature.ext}`, file, {
      access: "public",
      contentType: signature.contentType,
      addRandomSuffix: true,
    });

    return NextResponse.json({
      url: blob.url,
      sizeKb: Math.round(bytes.length / 1024),
    });
  } catch (error) {
    console.error("Görsel yüklenemedi:", error);
    /*
      Uç yalnızca yöneticiye açık olduğu için hatanın kendisi döndürülür.
      Depolama sorunlarını ("token geçersiz", "store bulunamadı") panelde
      görmek, sunucu günlüğüne erişmeden teşhis edebilmeyi sağlıyor.
    */
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Görsel yüklenemedi: ${detail}` },
      { status: 500 },
    );
  }
}
