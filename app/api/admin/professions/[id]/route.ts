import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/comment-auth";
import { deleteManagedProfession } from "@/lib/professions/service";

/** Tek meslek tanıtımının silinmesi. Yetki listeleme ucuyla aynı çerezden gelir. */
export const dynamic = "force-dynamic";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const { id } = await params;
  const professionId = Number(id);

  if (!Number.isInteger(professionId) || professionId <= 0) {
    return NextResponse.json({ error: "Geçersiz kayıt." }, { status: 400 });
  }

  try {
    const deleted = await deleteManagedProfession(professionId);
    if (!deleted) {
      return NextResponse.json({ error: "Kayıt bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Meslek tanıtımı silinemedi:", error);
    return NextResponse.json({ error: "Silinemedi." }, { status: 500 });
  }
}
