"use server";

import { queryRobot, TercihRobotUnavailableError } from "@/lib/tercih/robot-service";
import { isRobotScoreType, type RobotResult } from "@/lib/tercih/types";

export type RobotState =
  | { status: "idle" }
  | { status: "success"; scoreType: string; rank: number; result: RobotResult }
  | { status: "error"; message: string };

/**
 * Tercih robotu sorgusu.
 *
 * Hız sınırı bilinçli olarak KALDIRILMIŞTIR (2026-07-25, site sahibinin kararı).
 * Robot artık eşleşen programların tamamını ve tüm sütunları açık biçimde sunar;
 * bu nedenle sorgu sayısını kısıtlamanın koruyucu bir karşılığı kalmamıştır.
 */
export async function runTercihRobot(
  _previousState: RobotState,
  formData: FormData,
): Promise<RobotState> {
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
