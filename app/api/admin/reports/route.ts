import { NextResponse, type NextRequest } from "next/server";
import { reports } from "@/data/reports";
import { isAdminRequest } from "@/lib/comment-auth";
import { slugify } from "@/lib/posts/service";
import { createManagedReport, listManagedReports } from "@/lib/reports/service";

export const dynamic = "force-dynamic";

const RESERVED = new Set(reports.map((report) => report.slug));

function text(payload: Record<string, unknown>, key: string, max: number) {
  return typeof payload[key] === "string" ? (payload[key] as string).trim().slice(0, max) : "";
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  return NextResponse.json({ reports: await listManagedReports() });
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const title = text(payload, "title", 180);
  const description = text(payload, "description", 500);
  const publisher = text(payload, "publisher", 160);
  const sizeLabel = text(payload, "sizeLabel", 30);
  const file = text(payload, "file", 1000);
  const intro = text(payload, "intro", 3000);
  const pages = Number(payload.pages);
  const slug = slugify(text(payload, "slug", 90) || title);

  if (!title || !description || !publisher || !sizeLabel || !intro || !slug || !Number.isInteger(pages) || pages < 1) {
    return NextResponse.json({ error: "Tüm zorunlu alanları doğru biçimde doldurun." }, { status: 400 });
  }
  if (RESERVED.has(slug)) {
    return NextResponse.json({ error: "Bu adres mevcut bir sabit rapora ait." }, { status: 409 });
  }
  try {
    const url = new URL(file);
    if (url.protocol !== "https:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Belge bağlantısı https:// ile başlamalıdır." }, { status: 400 });
  }

  const rawHighlights = Array.isArray(payload.highlights) ? payload.highlights : [];
  const highlights = rawHighlights
    .map((item) => {
      const value = item as Record<string, unknown>;
      return { title: text(value, "title", 100), detail: text(value, "detail", 500) };
    })
    .filter((item) => item.title && item.detail)
    .slice(0, 12);
  if (highlights.length < 1) {
    return NextResponse.json({ error: "En az bir içerik başlığı ekleyin." }, { status: 400 });
  }

  try {
    const report = await createManagedReport({
      slug,
      title,
      description,
      publisher,
      pages,
      sizeLabel,
      file,
      intro,
      highlights,
    });
    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error("Rapor kaydedilemedi:", error);
    return NextResponse.json({ error: "Rapor kaydedilemedi." }, { status: 500 });
  }
}
