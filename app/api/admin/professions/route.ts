import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { slugify } from "@/lib/posts/service";
import {
  PROFESSION_CATEGORIES,
  createManagedProfession,
  listManagedProfessions,
} from "@/lib/professions/service";

/**
 * Panelden meslek tanıtımı yönetimi.
 *
 * Yetki, yorum panelindeki oturumla aynı çerezden doğrulanır.
 */
export const dynamic = "force-dynamic";

const MAX_TITLE = 120;
const MAX_SUMMARY = 320;
const MAX_BODY = 30000;

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  return NextResponse.json({ professions: await listManagedProfessions() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const text = (key: string) =>
    typeof payload[key] === "string" ? (payload[key] as string).trim() : "";

  const title = text("title");
  if (!title) {
    return NextResponse.json({ error: "Meslek adı gerekli." }, { status: 400 });
  }
  if (title.length > MAX_TITLE) {
    return NextResponse.json(
      { error: `Meslek adı en fazla ${MAX_TITLE} karakter olabilir.` },
      { status: 400 },
    );
  }

  const body = text("body");
  if (!body) {
    return NextResponse.json({ error: "Tanıtım metni gerekli." }, { status: 400 });
  }
  if (body.length > MAX_BODY) {
    return NextResponse.json({ error: "Metin çok uzun." }, { status: 400 });
  }

  const summary = text("summary");
  if (summary.length > MAX_SUMMARY) {
    return NextResponse.json(
      { error: `Özet en fazla ${MAX_SUMMARY} karakter olabilir.` },
      { status: 400 },
    );
  }

  const category = text("category");
  // Kategori serbest metin olamaz; listede olmayan değer sayfayı bozar.
  if (!PROFESSION_CATEGORIES.some((item) => item.value === category)) {
    return NextResponse.json({ error: "Geçersiz kategori." }, { status: 400 });
  }

  const slug = slugify(text("slug") || title);
  if (!slug) {
    return NextResponse.json(
      { error: "Meslek adından adres üretilemedi." },
      { status: 400 },
    );
  }

  // Görsel isteğe bağlı; verilirse ya yüklenen ya da sitedeki bir dosya olmalı.
  const image = text("image");
  if (image && !image.includes(".blob.vercel-storage.com") && !image.startsWith("/images/")) {
    return NextResponse.json({ error: "Geçersiz görsel adresi." }, { status: 400 });
  }

  try {
    const profession = await createManagedProfession({
      slug,
      title,
      category,
      summary,
      body,
      image,
      imageAlt: text("imageAlt") || title,
    });

    return NextResponse.json({ profession }, { status: 201 });
  } catch (error) {
    console.error("Meslek tanıtımı kaydedilemedi:", error);
    return NextResponse.json({ error: "Kaydedilemedi." }, { status: 500 });
  }
}
