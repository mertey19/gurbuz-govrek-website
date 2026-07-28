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

export function getForecast(scoreType: RobotScoreType): ScoreTypeForecast | undefined {
  return SCORE_TYPE_FORECASTS.find((item) => item.scoreType === scoreType);
}

/**
 * Kontenjan değişimi rakamları — TEK KAYNAK.
 *
 * Aynı sayılar birden fazla sayfada gösteriliyor. Sayfalara elle yazılırsa
 * çalışma dosyası güncellendiğinde bir kısmı eski kalır; bu yüzden hepsi
 * buradan okunur. Dosya yenilendiğinde yalnızca bu blok güncellenir.
 */
export type QuotaChange = {
  label: string;
  /** Yaklaşık değişim; negatif sayı azalmayı gösterir. */
  change: number;
  /** Rakam yerine gösterilecek metin (yuvarlanmış değerler için). */
  display: string;
};

export const SCORE_TYPE_QUOTA_CHANGES: readonly QuotaChange[] = [
  { label: "Sayısal (SAY)", change: -9000, display: "≈ 9.000 azalma" },
  { label: "Eşit Ağırlık (EA)", change: -12000, display: "≈ 12.000 azalma" },
  { label: "Sözel (SÖZ)", change: -16000, display: "≈ 16.000 azalma" },
  { label: "Dil (DİL)", change: -3000, display: "≈ 3.000 azalma" },
];

export type FieldQuotaChange = {
  field: string;
  change: number | null;
  detail: string;
};

export const FIELD_QUOTA_CHANGES: readonly FieldQuotaChange[] = [
  {
    field: "Tıp",
    change: -85,
    detail:
      "85 kontenjan azalması. Dokuz Eylül (İngilizce), Bitlis ve Burdur’da yeni fakülte açıldı.",
  },
  {
    field: "Diş hekimliği",
    change: -761,
    detail: "761 kontenjan azalması. Bu ölçekte bir düşüş ilk 50 bindeki sıralamaları etkiler.",
  },
  {
    field: "Sağlık bölümleri",
    change: null,
    detail: "Hemşirelik dışındaki sağlık bölümlerinin kontenjanları azaltıldı.",
  },
  {
    field: "Mühendislikler",
    change: null,
    detail:
      "Endüstri dışındaki eski popüler mühendisliklerin kontenjanı azaldı; yeni popüler mühendisliklerin kontenjanı artırıldı.",
  },
];

/** Bir alanın kontenjan değişimini döndürür; sayfalarda rakam elle yazılmaz. */
export function getFieldQuotaChange(field: string): FieldQuotaChange | undefined {
  return FIELD_QUOTA_CHANGES.find((item) => item.field === field);
}
