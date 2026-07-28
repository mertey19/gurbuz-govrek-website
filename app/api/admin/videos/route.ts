import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import {
  VIDEO_CATEGORIES,
  createVideo,
  extractYoutubeId,
  listVideos,
} from "@/lib/videos/service";

/**
 * Video yönetimi.
 *
 * Yetki, yorum panelindeki oturumla aynı çerezden doğrulanır; ikinci bir parola
 * sistemi kurmak saldırı yüzeyini genişletirdi. Yetkisiz istekler 401 alır ve
 * hiçbir veri dönmez.
 */
export const dynamic = "force-dynamic";

const MAX_TITLE = 120;
const MAX_DESCRIPTION = 600;

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  return NextResponse.json({ videos: await listVideos() });
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

  const rawUrl = typeof payload.url === "string" ? payload.url : "";
  const youtubeId = extractYoutubeId(rawUrl);

  if (!youtubeId) {
    return NextResponse.json(
      { error: "YouTube adresi tanınmadı. Videonun bağlantısını yapıştırın." },
      { status: 400 },
    );
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "Başlık gerekli." }, { status: 400 });
  }
  if (title.length > MAX_TITLE) {
    return NextResponse.json(
      { error: `Başlık en fazla ${MAX_TITLE} karakter olabilir.` },
      { status: 400 },
    );
  }

  const description =
    typeof payload.description === "string" ? payload.description.trim() : "";
  if (description.length > MAX_DESCRIPTION) {
    return NextResponse.json(
      { error: `Açıklama en fazla ${MAX_DESCRIPTION} karakter olabilir.` },
      { status: 400 },
    );
  }

  const category = typeof payload.category === "string" ? payload.category : "";
  // Kategori serbest metin olamaz; listede olmayan bir değer sayfayı bozar.
  if (!VIDEO_CATEGORIES.some((item) => item.value === category)) {
    return NextResponse.json({ error: "Geçersiz kategori." }, { status: 400 });
  }

  try {
    const video = await createVideo({ youtubeId, title, description, category });
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Video eklenemedi:", error);
    return NextResponse.json({ error: "Video eklenemedi." }, { status: 500 });
  }
}
