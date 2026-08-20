"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { queryRobot } from "@/lib/tercih/robot-service";
import {
  INSTITUTION_KINDS,
  isRobotScoreType,
  type RobotFilters,
  type RobotResult,
} from "@/lib/tercih/types";

const MAX_TERMS = 20;

export type RobotState =
  | { status: "idle" }
  | {
      status: "success";
      scoreType: string;
      rankFrom: number;
      rankTo: number | null;
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

  if (!isRobotScoreType(scoreType)) {
    return { status: "error", message: "Lütfen geçerli bir puan türü seçin." };
  }

  // "125.000" ve "125000" aynı değeri ifade eder.
  const toRank = (key: string) => {
    const raw = String(formData.get(key) ?? "").replace(/[.\s]/g, "");
    if (raw === "") return null;
    const value = Number(raw);
    return Number.isInteger(value) && value >= 1 && value <= 3_000_000 ? value : NaN;
  };

  const rankFrom = toRank("rankFrom");
  const rankTo = toRank("rankTo");

  if (rankFrom === null || Number.isNaN(rankFrom)) {
    return {
      status: "error",
      message: "Başlangıç sıralamasını rakamlarla girin. Örnek: 125000",
    };
  }

  if (Number.isNaN(rankTo)) {
    return {
      status: "error",
      message: "Bitiş sıralamasını rakamlarla girin ya da boş bırakın.",
    };
  }

  if (rankTo !== null && rankTo < rankFrom) {
    return {
      status: "error",
      message: "Bitiş sıralaması başlangıçtan küçük olamaz.",
    };
  }

  // Çoklu seçim: boş dizi "filtre yok" demektir.
  const list = (key: string, max: number) =>
    formData
      .getAll(key)
      .map((value) => String(value).trim().slice(0, max))
      .filter((value) => value !== "")
      .slice(0, MAX_TERMS);

  const filters: RobotFilters = {
    cities: list("city", 80),
    // Bilinmeyen değerler sessizce elenir; hata verilmez.
    kinds: list("kind", 16).filter((value) =>
      INSTITUTION_KINDS.some((item) => item.value === value),
    ),
    // Bölüm alanına virgülle birden fazla ifade yazılabilir.
    departments: list("department", 80)
      .flatMap((value) => value.split(","))
      .map((term) => term.trim())
      .filter((term) => term !== "")
      .slice(0, MAX_TERMS),
  };

  try {
    const result = await queryRobot(scoreType, rankFrom, rankTo, filters);
    return { status: "success", scoreType, rankFrom, rankTo, filters, result };
  } catch (error) {
    console.error("Tercih robotu sorgusu başarısız.", {
      message: error instanceof Error ? error.message : "bilinmeyen hata",
    });
    return {
      status: "error",
      message: "Sorgu tamamlanamadı. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }
}
