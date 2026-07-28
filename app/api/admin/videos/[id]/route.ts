import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { deleteVideo } from "@/lib/videos/service";

/** Tek videonun silinmesi. Yetki kontrolü listeleme ucuyla aynı çerezden yapılır. */
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const videoId = Number(id);

  if (!Number.isInteger(videoId) || videoId <= 0) {
    return NextResponse.json({ error: "Geçersiz video." }, { status: 400 });
  }

  try {
    const deleted = await deleteVideo(videoId);
    if (!deleted) {
      return NextResponse.json({ error: "Video bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Video silinemedi:", error);
    return NextResponse.json({ error: "Video silinemedi." }, { status: 500 });
  }
}
