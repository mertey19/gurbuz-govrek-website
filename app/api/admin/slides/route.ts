import { NextResponse, type NextRequest } from "next/server";
import { presentationCollections } from "@/data/presentationCollections";
import { isAdminRequest } from "@/lib/comment-auth";
import { slugify } from "@/lib/posts/service";
import {
  createManagedCollection,
  listManagedCollections,
  type ManagedSlide,
} from "@/lib/slides/service";

/**
 * Panelden sunum serisi yönetimi.
 *
 * Yetki, yorum panelindeki oturumla aynı çerezden doğrulanır.
 */
export const dynamic = "force-dynamic";

const MAX_LABEL = 90;
const MAX_DESCRIPTION = 400;
const MAX_SLIDES = 40;

/** Koddaki serilerle aynı kimliğin alınması, sunum köşesinde çakışma üretir. */
const RESERVED = new Set<string>(presentationCollections.map((item) => item.id));

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  return NextResponse.json({ collections: await listManagedCollections() });
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

  const label = text("label");
  if (!label) {
    return NextResponse.json({ error: "Seri başlığı gerekli." }, { status: 400 });
  }
  if (label.length > MAX_LABEL) {
    return NextResponse.json(
      { error: `Başlık en fazla ${MAX_LABEL} karakter olabilir.` },
      { status: 400 },
    );
  }

  const description = text("description");
  if (description.length > MAX_DESCRIPTION) {
    return NextResponse.json(
      { error: `Açıklama en fazla ${MAX_DESCRIPTION} karakter olabilir.` },
      { status: 400 },
    );
  }

  const slug = slugify(text("slug") || label);
  if (!slug) {
    return NextResponse.json(
      { error: "Başlıktan kimlik üretilemedi." },
      { status: 400 },
    );
  }
  if (RESERVED.has(slug)) {
    return NextResponse.json(
      { error: `“${slug}” koddaki bir seriye ait. Başlığı değiştirin.` },
      { status: 409 },
    );
  }

  const rawSlides = Array.isArray(payload.slides) ? payload.slides : [];
  if (rawSlides.length === 0) {
    return NextResponse.json({ error: "En az bir slayt gerekli." }, { status: 400 });
  }
  if (rawSlides.length > MAX_SLIDES) {
    return NextResponse.json(
      { error: `Bir seride en fazla ${MAX_SLIDES} slayt olabilir.` },
      { status: 400 },
    );
  }

  const slides: ManagedSlide[] = [];
  for (const [index, item] of rawSlides.entries()) {
    const slide = item as Record<string, unknown>;
    const url = typeof slide.url === "string" ? slide.url : "";

    // Yalnızca kendi depomuza yüklenen görseller kabul edilir.
    if (!url.startsWith("https://") || !url.includes(".blob.vercel-storage.com")) {
      return NextResponse.json(
        { error: `${index + 1}. slaytın adresi geçersiz.` },
        { status: 400 },
      );
    }

    const title = typeof slide.title === "string" ? slide.title.trim() : "";
    slides.push({
      url,
      title: title || `${label} · Slayt ${index + 1}`,
      alt: (typeof slide.alt === "string" ? slide.alt.trim() : "") || title || label,
    });
  }

  try {
    const collection = await createManagedCollection({
      slug,
      label,
      shortLabel: text("shortLabel") || label,
      description,
      slides,
    });

    return NextResponse.json({ collection }, { status: 201 });
  } catch (error) {
    console.error("Seri kaydedilemedi:", error);
    return NextResponse.json({ error: "Seri kaydedilemedi." }, { status: 500 });
  }
}
