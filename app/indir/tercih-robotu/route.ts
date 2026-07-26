import { NextResponse } from "next/server";
import { DOWNLOAD_SLUGS, recordDownload } from "@/lib/downloads/service";

/**
 * Excel dosyasının sayılan indirme adresi.
 *
 * İstek önce sayaca işlenir, ardından `public/` altındaki gerçek dosyaya
 * yönlendirilir. Sayaç yazılamazsa indirme yine de tamamlanır; sayı tutmak
 * dosyaya erişimin önüne geçmemelidir.
 */
const FILE_PATH = "/2026-tercih-robotu-gurbuz-govrek.xlsx";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await recordDownload(DOWNLOAD_SLUGS.tercihRobotuExcel);
  } catch (error) {
    console.error("İndirme sayacı yazılamadı:", error);
  }

  return NextResponse.redirect(new URL(FILE_PATH, request.url), 302);
}
