import type { RobotScoreType } from "@/lib/tercih/types";

/**
 * Gürbüz Gövrek'in 2026 tercih dönemine ilişkin öngörüleri.
 *
 * ÖNEMLİ: Bunlar veri değil, kişisel değerlendirmedir. Arayüzde her zaman
 * "öngörüdür, kesin değildir" uyarısıyla birlikte gösterilir. Kaynak, Gürbüz
 * Gövrek'in kendi tercih çalışma dosyasındaki "TESPİTLER" notlarıdır.
 */
export const FORECAST_YEAR = 2026;

export type ScoreTypeForecast = {
  scoreType: RobotScoreType;
  headline: string;
  notes: readonly string[];
};

export const SCORE_TYPE_FORECASTS: readonly ScoreTypeForecast[] = [
  {
    scoreType: "SAY",
    headline: "Sayısalda kontenjan azaldı, sıralamalar öne gidebilir",
    notes: [
      "Sayısalda toplamda 12.500 civarı kontenjan azalması var. En büyük azalmalar sağlık bölümlerinde ve elektrik-elektronik mühendisliğinde.",
      "Tıp kontenjanı artarken diş hekimliği kontenjanı belirgin biçimde azaldı.",
      "İlk 20 binlerde sıralamalarda büyük değişiklik beklemiyorum.",
      "20-50 bin aralığında diş kontenjanlarındaki azalma nedeniyle sıralamaların öne doğru ilerleyeceğini düşünüyorum.",
    ],
  },
  {
    scoreType: "EA",
    headline: "Eşit ağırlıkta tercih aralığını geniş tutun",
    notes: [
      "Eşit ağırlıkta toplamda 25 bin civarı kontenjan azalması oldu; en büyük azalma hukuk, işletme ve iktisat bölümlerinde.",
      "Kontenjan azalması fazla olduğu için sıralamalarda değişiklik büyük olabilir; tercih aralığını geniş tutmak gerekir.",
      "Eşit ağırlık bölümlerinin genel olarak ilerleme durumunda olacağını tahmin ediyorum.",
    ],
  },
  {
    scoreType: "SÖZ",
    headline: "Sözelde kontenjan azalması sıralamaları ileri taşıyabilir",
    notes: [
      "Sözelde toplamda 7.500 civarı kontenjan azalması oldu.",
      "180 puanı geçen öğrenci sayısı sözelde 200 bin civarı azaldı.",
      "Kontenjan azalmasının sıralamaları ileri götüreceğini düşünüyorum.",
    ],
  },
  {
    scoreType: "DİL",
    headline: "Dil alanında tercih aralığını dengeli kurun",
    notes: [
      "Dil alanında program sayısı sınırlı olduğu için tercih listesi kurarken güvenli ve hedef tercihlerin dengesi daha da önemli hâle gelir.",
      "Genel kontenjan azalmasının bu alanı da etkilemesi beklenebilir.",
    ],
  },
  {
    scoreType: "TYT",
    headline: "İki yıllık programlarda listeyi çok geniş tutun",
    notes: [
      "İki yıllık ön lisans kontenjanları 130 bin civarı azaltıldı.",
      "Bu nedenle iki yıllık sıralamaların çok ileri gideceğini düşünüyorum; tercih listesi geniş tutulmalı.",
    ],
  },
];

/** Sınav geneline dair, gerçekleşmiş tespitler. */
export const GENERAL_FINDINGS: readonly string[] = [
  "TYT matematik soruları 2021 sonrasının en düşük ortalamasını verecek kadar zordu.",
  "AYT matematikte ortalama beklenenden biraz yüksek çıktı; AYT fen branşlarında ortalamalar yükseldi.",
  "Sınava giren öğrenci sayısı TYT'de 500 bin, AYT'de 200 bin civarı azaldı.",
  "Öğrenci sayısı azalmasına rağmen 180 puanı geçen öğrenci sayısı çok değişmedi.",
  "180 puanı geçen öğrenci sayısı sayısalda 90 bin arttı; eşit ağırlıkta 100 bin, sözelde 200 bin azaldı.",
];

export function getForecast(scoreType: RobotScoreType): ScoreTypeForecast | undefined {
  return SCORE_TYPE_FORECASTS.find((item) => item.scoreType === scoreType);
}
