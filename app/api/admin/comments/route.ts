import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { listCommentsForAdmin } from "@/lib/comments-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const comments = await listCommentsForAdmin();
    return NextResponse.json(
      { comments },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Admin comments could not be loaded", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenemedi. Veritabanı bağlantısını kontrol edin." },
      { status: 503 },
    );
  }
}

