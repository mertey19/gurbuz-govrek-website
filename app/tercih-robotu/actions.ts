"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { queryRobot, TercihRobotUnavailableError } from "@/lib/tercih/robot-service";
import { isRobotScoreType, type RobotResult } from "@/lib/tercih/types";

export type RobotState =
  | { status: "idle" }
  | { status: "success"; scoreType: string; rank: number; result: RobotResult }
  | { status: "error"; message: string };

/**
 * Süreç içi sabit pencereli sınırlayıcı.
 *
 * Amaç, art arda isteklerle veri setinin toplanmasını zorlaştırmaktır. Asıl koruma
 * servis katmanındaki sonuç sınırıdır (sayfalama yok, en fazla 5 kayıt döner);
 * bu katman kaba kuvvet denemelerini ucuza filtreler.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 12;
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
        "Çok fazla sorgulama yaptınız. Kişiye özel tercih listesi için WhatsApp üzerinden görüşme talep edebilirsiniz.",
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

  try {
    const result = await queryRobot(scoreType, rank);
    return { status: "success", scoreType, rank, result };
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
