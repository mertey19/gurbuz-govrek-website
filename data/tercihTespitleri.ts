import type { RobotScoreType } from "@/lib/tercih/types";

/**
 * Gürbüz Gövrek'in 2026 tercih dönemine ilişkin öngörüleri.
 *
 * ÖNEMLİ: Bunlar veri değil, kişisel değerlendirmedir. Arayüzde her zaman
 * "öngörüdür, kesin değildir" uyarısıyla birlikte gösterilir.
 *
 * Kaynak: çalışma dosyasının "TESPİTLER" sayfası. Bu metinler dosya her
 * güncellendiğinde YENİDEN OKUNMALIDIR — sayfa aynı adı taşısa da içeriği
 * değişir ve eski tahminler bir sonraki sürümde geçersiz kalır.
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
    headline: "Sağlıkta ilerleme devam edecek gözüküyor",
    notes: [
      "Sayısal puanda genel kontenjan 9 bin civarı azaldı.",
      "Tıp fakültesi kontenjanı 85 kişi azaldı. Diş hekimliği kontenjanı 761 azaldı; bu, hem ön hem arka sıraları etkiler. Hemşirelik dışındaki sağlık bölümlerinin kontenjanları da azaltıldı.",
      "Dokuz Eylül Tıp (İngilizce), Bitlis ve Burdur'da yeni tıp fakülteleri açıldı. Bitlis'in burs imkânı caydırıcı; Dokuz Eylül ilk 5.000'de kendine yer bulur.",
      "Sağlık bölümleri önceki beş yıl düşüş trendindeydi, geçen sene gerçek anlamda ilerledi. Bu sene de ilerlemenin devam edeceği gözüküyor.",
      "Diş kontenjanlarındaki azalma ilk 50 binde sıralamaları etkiler; sıralamaların öne doğru ilerleyeceğini düşünüyorum.",
      "Mühendisliklerde bazıları yükselir, bazıları düşmeye devam edebilir. Endüstri dışındaki eski popüler mühendisliklerin kontenjanı azaldı, yeni popüler mühendisliklerin kontenjanı artırıldı.",
      "Bütün eğitim fakülteleri geçen sene atama sayısı nedeniyle çok düşmüştü; kontenjanlar azalmasına rağmen bu sene de düşme devam edebilir.",
    ],
  },
  {
    scoreType: "EA",
    headline: "Genelde ilerleme bekliyorum, yine de temkinli olun",
    notes: [
      "Eşit ağırlıkta genel kontenjan 12 bin civarı azaldı.",
      "Kontenjan azalması geçen seneye göre daha az; bu sene sıralamalardaki değişiklik geçen seneki gibi olmaz. Yine de temkinli olmak gerekir.",
      "Eşit ağırlık ve sözel bölümlerde kontenjan nedeniyle genelde ilerleme olacaktır.",
      "Devlet hukuk fakültesi 30-35 binler seviyesine ilerleyebilir.",
      "Bütün eğitim fakülteleri geçen sene atama sayısı nedeniyle çok düşmüştü; bu sene de düşme devam edebilir.",
    ],
  },
  {
    scoreType: "SÖZ",
    headline: "Kontenjan azalması sıralamaları ileri taşıyacak",
    notes: [
      "Sözel puanda genel kontenjan 16 bin civarı azaldı; dört puan türü içinde en büyük azalma burada.",
      "Eşit ağırlık ve sözel bölümlerde kontenjan nedeniyle genelde ilerleme olacaktır.",
      "Bütün eğitim fakülteleri geçen sene atama sayısı nedeniyle çok düşmüştü; bu sene de düşme devam edebilir.",
    ],
  },
  {
    scoreType: "DİL",
    headline: "Kontenjan azalması sınırlı, listeyi dengeli kurun",
    notes: [
      "Dil puanında genel kontenjan 3 bin civarı azaldı; azalma diğer puan türlerine göre daha sınırlı.",
      "Program sayısı az olduğu için güvenli ve hedef tercihlerin dengesi bu alanda daha da önemlidir.",
    ],
  },
];

/** Sınav geneline dair, gerçekleşmiş tespitler. */
export const GENERAL_FINDINGS: readonly string[] = [
  "TYT matematik soruları genelde zaman alıcıydı; ortalama beklentinin altında kaldı ve 2025 TYT'ye yakın çıktı.",
  "AYT matematikte çok zorlayıcı, eleyici nitelikte orijinal soru yoktu. Bir tane vardı, o da iptal edildi; buna rağmen ortalama yükseldi.",
  "Soru iptal olmasaydı matematikte son yılların en yüksek ortalaması tutturulabilirdi. Bu sonuca da yansıdı: sıralamalar 2023'ten bile kötü geldi. Bunu ben de tahmin edememiştim.",
  "AYT fende bütün branşlarda ortalamalar yükseldi. Edebiyat ortalaması yükseldi; tarih ve coğrafya ortalamaları düştü.",
  "Sınava giren öğrenci sayısındaki azalma oranında, 180 puanı geçen öğrenci sayısı da azaldı.",
  "Kontenjan değişimini yapay zekâya sordurarak öğrenmeye çalışmayın; ben de denedim, tutarsız ve yanlış sayılar verdi. Bölüm bazlı kontenjan değişimi ayrı listede incelenmelidir.",
];

export function getForecast(scoreType: RobotScoreType): ScoreTypeForecast | undefined {
  return SCORE_TYPE_FORECASTS.find((item) => item.scoreType === scoreType);
}
