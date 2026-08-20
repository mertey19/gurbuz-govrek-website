import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { deleteManagedReport } from "@/lib/reports/service";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  const { id } = await context.params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return NextResponse.json({ error: "Geçersiz rapor." }, { status: 400 });
  }
  return (await deleteManagedReport(numericId))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ error: "Rapor bulunamadı." }, { status: 404 });
}
