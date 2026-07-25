"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { queryRobot, TercihRobotUnavailableError } from "@/lib/tercih/robot-service";
import {
  INSTITUTION_KINDS,
  isRobotScoreType,
  type RobotFilters,
  type RobotResult,
} from "@/lib/tercih/types";

export type RobotState =
  | { status: "idle" }
  | {
      status: "success";
      scoreType: string;
      rank: number;
      filters: RobotFilters;
      result: RobotResult;
    }
  | { status: "error"; message: string };

/**
 * Toplu veri çekmeye karşı hız sınırı.
 *
 * Tek bir sorgunun yanıtı ekranda gösterildiği için yakalanabilir; bu engellenemez.
 * Engellenebilen şey, veri setinin TAMAMINI toplamaktır: 17 binden fazla programa
 * ulaşmak için farklı puan türü ve sıralamalarla yüzlerce sorgu atmak gerekir.
 * Bu sınır tam olarak onu pahalı hâle getirir.
 *
 * Eşik gerçek kullanıcıya göre seçildi: bir öğrenci genelde 5–10 sorgu yapar.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 30;
const buckets = new Map<string, { count: number; resetAt: number }>();

function fingerprint(requestHeaders: Headers): string {
  const forwarded = requestHeaders.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const secret = process.env.MENTORFLOW_FINGERPRINT_SECRET || "tercih-robotu";
  // Ham IP saklanmaz; yalnızca geri döndürülemez özet kullanılır.
  return createHash("sha256").update(`${secret}|${ip}`, "utf8").digest("hex").slice(0, 32);
}

function checkLimit(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size > 5000) {
      for (const [entryKey, entry] of buckets) {
        if (entry.resetAt <= now) buckets.delete(entryKey);
      }
    }
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

export async function runTercihRobot(
  _previousState: RobotState,
  formData: FormData,
): Promise<RobotState> {
  const requestHeaders = await headers();

  if (!checkLimit(fingerprint(requestHeaders))) {
    return {
      status: "error",
      message:
        "Kısa sürede çok fazla sorgulama yapıldı. Birkaç dakika sonra tekrar deneyebilir ya da WhatsApp üzerinden doğrudan görüşme talep edebilirsiniz.",
    };
  }

  const scoreType = formData.get("scoreType");
  const rawRank = formData.get("rank");

  if (!isRobotScoreType(scoreType)) {
    return { status: "error", message: "Lütfen geçerli bir puan türü seçin." };
  }

  // "125.000" ve "125000" aynı değeri ifade eder.
  const rank = Number(String(rawRank ?? "").replace(/[.\s]/g, ""));

  if (!Number.isInteger(rank) || rank < 1 || rank > 3_000_000) {
    return {
      status: "error",
      message: "Başarı sıranızı rakamlarla girin. Örnek: 125000",
    };
  }

  // Boş bırakılan filtreler null olur; sorgu o koşulu tamamen atlar.
  const text = (key: string, max: number) => {
    const value = String(formData.get(key) ?? "").trim().slice(0, max);
    return value === "" ? null : value;
  };

  const requestedKind = text("kind", 16);
  const filters: RobotFilters = {
    city: text("city", 80),
    // Bilinmeyen bir değer gelirse filtre uygulanmaz; hata verilmez.
    kind: INSTITUTION_KINDS.some((item) => item.value === requestedKind)
      ? requestedKind
      : null,
    department: text("department", 80),
  };

  try {
    const result = await queryRobot(scoreType, rank, filters);
    return { status: "success", scoreType, rank, filters, result };
  } catch (error) {
    if (error instanceof TercihRobotUnavailableError) {
      return {
        status: "error",
        message:
          "Tercih robotu şu anda kullanılamıyor. WhatsApp üzerinden doğrudan bilgi alabilirsiniz.",
      };
    }

    console.error("Tercih robotu sorgusu başarısız.", {
      message: error instanceof Error ? error.message : "bilinmeyen hata",
    });
    return {
      status: "error",
      message: "Sorgu tamamlanamadı. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }
}
