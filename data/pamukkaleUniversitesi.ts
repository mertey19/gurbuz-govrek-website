/**
 * Pamukkale Üniversitesi rehber sayfası içeriği.
 *
 * Kural: taban puan, başarı sırası ve kontenjan gibi her yıl değişen sayısal veriler
 * BU DOSYADA TUTULMAZ. O veriler ÖSYM ve YÖK Atlas'ta güncel hâliyle bulunur; sayfa
 * bunları kopyalamak yerine doğru okumayı anlatır ve kaynağa yönlendirir.
 *
 * Yapısal bilgiler (fakülte sayısı, yerleşke, ilçe MYO'ları) pau.edu.tr üzerinden
 * doğrulanmıştır — Temmuz 2026.
 */

export const PAU_FACTS = {
  facultyCount: 19,
  instituteCount: 6,
  vocationalSchoolCount: 17,
  researchCenterCount: 45,
  mainCampus: "Kınıklı Yerleşkesi",
  campusAddress: "Kınıklı Mah. Üniversite Cad. No:11, 20160 Pamukkale / Denizli",
} as const;

/** pau.edu.tr üzerinde listelenen fakülteler. */
export const PAU_FACULTIES = [
  "Diş Hekimliği Fakültesi",
  "Eğitim Fakültesi",
  "Fen Fakültesi",
  "Fizik Tedavi ve Rehabilitasyon Fakültesi",
  "Hukuk Fakültesi",
  "İktisadi ve İdari Bilimler Fakültesi",
  "İlahiyat Fakültesi",
  "İletişim Fakültesi",
  "İnsan ve Toplum Bilimleri Fakültesi",
  "Mimarlık ve Tasarım Fakültesi",
  "Mühendislik Fakültesi",
  "Müzik ve Sahne Sanatları Fakültesi",
  "Sağlık Bilimleri Fakültesi",
  "Spor Bilimleri Fakültesi",
  "Teknoloji Fakültesi",
  "Tıp Fakültesi",
  "Turizm Fakültesi",
  "Uygulamalı Bilimler Fakültesi",
  "Ziraat Fakültesi",
] as const;

/** Merkez dışındaki ilçelerde bulunan meslek yüksekokullarının olduğu ilçeler. */
export const PAU_DISTRICT_CAMPUSES = [
  "Acıpayam",
  "Bekilli",
  "Bozkurt",
  "Buldan",
  "Çal",
  "Çameli",
  "Çardak",
  "Çivril",
] as const;

/** YÖK Atlas'ta bir programı değerlendirirken sırayla bakılacak başlıklar. */
export const ATLAS_CHECKLIST = [
  "Son üç yılın taban puanı değil, son üç yılın başarı sırası — puan her yıl farklı ölçekte oluşur, sıralama karşılaştırılabilir olandır.",
  "Kontenjanın yıllara göre değişimi: kontenjan arttıysa sıralama gerileyebilir, azaldıysa yükselebilir.",
  "Doluluk oranı: boş kalan kontenjan varsa o programa ek tercihte yerleşme ihtimali doğar.",
  "Yerleşenlerin geldiği iller — programın ne kadar bölgesel, ne kadar ülke geneli tercih edildiğini gösterir.",
  "Yerleşenlerin lise türü ve mezuniyet yılı dağılımı: mezun ağırlıklı bir programda rekabet farklı işler.",
  "Öğretim üyesi başına düşen öğrenci sayısı.",
  "Değişim programı ve yatay geçiş verileri.",
] as const;

export const STAY_OR_LEAVE_FACTORS = [
  {
    title: "Toplam maliyet farkı gerçekte ne kadar?",
    description:
      "Aile yanında okumak barınma ve yemek giderini büyük ölçüde ortadan kaldırır. Başka şehirdeki bir programı tercih etmeden önce yurt, kira, ulaşım ve yemek kalemlerini yıllık olarak hesaplayın. Bu fark çoğu zaman düşünülenden büyüktür.",
  },
  {
    title: "Program mı, şehir mi öne çıkıyor?",
    description:
      "Hedeflediğiniz bölüm PAÜ'de güçlü bir kadroyla ve uygulama olanağıyla veriliyorsa şehir değiştirmenin akademik karşılığı sınırlı kalabilir. Tersine, o bölüm burada yoksa ya da içerik hedefinizle örtüşmüyorsa kalmak bir kazanç sayılmaz.",
  },
  {
    title: "Staj ve sektör yakınlığı",
    description:
      "Denizli tekstil, mermer ve tarım-gıda sanayisiyle öne çıkar. Bu alanlara yakın bölümlerde yerelde staj ve iş bağlantısı kurmak kolaylaşır. Hedefiniz farklı bir sektörse, o sektörün yoğunlaştığı şehir bir avantaj oluşturabilir.",
  },
  {
    title: "Kişisel hazırlık",
    description:
      "Şehir değiştirmek akademik bir karar olduğu kadar kişisel bir karardır. Kendi başına yaşama hazır olmak, bütçe yönetmek ve yeni bir çevre kurmak sürecin parçasıdır. Bu konuyu aile ile açıkça konuşmak, sonradan yaşanan uyum sorunlarını azaltır.",
  },
] as const;

export const COMMON_MISTAKES = [
  "Taban puanını sıralamayla karıştırmak ve geçen yılın puanına göre karar vermek.",
  "Yalnızca üniversitenin adına bakıp bölümün ders planını hiç incelememek.",
  "Kendi şehrinde olduğu için PAÜ'yü otomatik olarak “garanti tercih” saymak.",
  "Aynı adı taşıyan farklı programları (ör. Fakülte ile Teknoloji Fakültesi mühendislikleri) aynı sanmak.",
  "İkinci öğretim, uzaktan öğretim ve KKTC programlarını ayırt etmeden listeye eklemek.",
  "Yerleşkeyi hiç görmeden karar vermek.",
] as const;
