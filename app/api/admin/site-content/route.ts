import { NextResponse, type NextRequest } from "next/server";
import { managedContentDefaults } from "@/data/managedContentDefaults";
import { isAdminRequest } from "@/lib/comment-auth";
import {
  getManagedSiteContent,
  saveManagedSiteContent,
} from "@/lib/site-content/service";
import type {
  ManagedAnnouncement,
  ManagedEventsContent,
  ManagedFaqItem,
  ManagedSiteContentKey,
} from "@/lib/site-content/types";

export const dynamic = "force-dynamic";

const KEYS = new Set<ManagedSiteContentKey>(["announcement", "faq", "events"]);

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validHref(value: string) {
  return value.startsWith("/") || /^https:\/\//i.test(value);
}

function validateAnnouncement(payload: unknown): ManagedAnnouncement | null {
  const value = payload as Record<string, unknown>;
  const result: ManagedAnnouncement = {
    isActive: value?.isActive === true,
    badge: text(value?.badge, 24),
    title: text(value?.title, 120),
    description: text(value?.description, 400),
    ctaLabel: text(value?.ctaLabel, 50),
    ctaHref: text(value?.ctaHref, 500),
  };
  return result.badge && result.title && result.description && result.ctaLabel && validHref(result.ctaHref)
    ? result
    : null;
}

function validateFaq(payload: unknown): ManagedFaqItem[] | null {
  if (!Array.isArray(payload) || payload.length < 1 || payload.length > 30) return null;
  const items = payload.map((item) => {
    const value = item as Record<string, unknown>;
    return {
      question: text(value?.question, 180),
      answer: text(value?.answer, 1200),
    };
  });
  return items.every((item) => item.question && item.answer) ? items : null;
}

function validateEvents(payload: unknown): ManagedEventsContent | null {
  const value = payload as Record<string, unknown>;
  const rawItems = Array.isArray(value?.items) ? value.items : [];
  const result: ManagedEventsContent = {
    eyebrow: text(value?.eyebrow, 70),
    title: text(value?.title, 160),
    description: text(value?.description, 500),
    items: rawItems.map((item) => text(item, 120)).filter(Boolean).slice(0, 20),
  };
  return result.eyebrow && result.title && result.description && result.items.length > 0
    ? result
    : null;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  const key = request.nextUrl.searchParams.get("section") as ManagedSiteContentKey | null;
  if (!key || !KEYS.has(key)) {
    return NextResponse.json({ error: "Geçersiz içerik bölümü." }, { status: 400 });
  }

  const content = await getManagedSiteContent();
  return NextResponse.json({ content: content[key] ?? managedContentDefaults[key] });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz." }, { status: 401 });
  }

  let payload: { section?: unknown; content?: unknown };
  try {
    payload = (await request.json()) as { section?: unknown; content?: unknown };
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const key = payload.section as ManagedSiteContentKey;
  if (!KEYS.has(key)) {
    return NextResponse.json({ error: "Geçersiz içerik bölümü." }, { status: 400 });
  }

  const content =
    key === "announcement"
      ? validateAnnouncement(payload.content)
      : key === "faq"
        ? validateFaq(payload.content)
        : validateEvents(payload.content);

  if (!content) {
    return NextResponse.json(
      { error: "Zorunlu alanları doldurun ve bağlantı biçimini kontrol edin." },
      { status: 400 },
    );
  }

  try {
    await saveManagedSiteContent(key, content as never);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Site içeriği kaydedilemedi:", error);
    return NextResponse.json({ error: "İçerik kaydedilemedi." }, { status: 500 });
  }
}
