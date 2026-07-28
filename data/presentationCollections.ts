export type PresentationCategory =
  | "kontenjan"
  | "yks-istatistikleri"
  | "seminer"
  | "tuma"
  | "ucak-uzay"
  | "endustri-isletme"
  | "bilgisayar-yazilim"
  | "bilgisayar-matematik"
  | "makine-mekatronik"
  | "mimarlik-insaat"
  | "tip-dis"
  | "hukuk-psikoloji"
  | "ekonomi-isletme"
  | "molekuler-kimya-biyomuhendislik"
  | "siber-guvenlik-bilgi-guvenligi"
  | "bilisim-sistemleri-ybs"
  | "bitki-koruma-tarla-bitkileri"
  | "biyolog-kimyager"
  | "diyetisyen-eczaci"
  | "pratisyen-hekim"
  | "bilgisayar-muhendisligi-kariyer"
  | "elektrik-elektronik-muhendisligi"
  | "endustri-muhendisligi"
  | "kimya-muhendisligi"
  | "gemi-insaati-gemi-makineleri"
  | "hukuk"
  | "eczacilik"
  | "universite-siralamalari"
  | "yks-tercih-rehberi-2026";

export interface PresentationSlide {
  src: string;
  /**
   * 480px kenarlı küçük resim. Izgara slaytları ~%20 genişlikte gösterdiği için
   * tam boyutlu (1254px) dosyayı indirmek gereksiz; büyütme penceresi `src` kullanır.
   */
  thumb: string;
  alt: string;
  title: string;
}

export interface PresentationCollection {
  /*
    Koddaki seriler sabit kimlik kullanır; panelden eklenenler serbest slug
    taşır. `(string & {})` bilinen değerlerin önerilmeye devam etmesini
    sağlarken serbest metne de izin verir.
  */
  id: PresentationCategory | (string & {});
  label: string;
  shortLabel: string;
  description: string;
  thumbnailFit?: "cover" | "contain";
  slides: readonly PresentationSlide[];
}

function createSlides(
  directory: string,
  title: string,
  altPrefix: string,
  count = 10,
): readonly PresentationSlide[] {
  return Array.from({ length: count }, (_, index) => {
    const slideNumber = index + 1;
    const base = `/images/sunum-kosesi/${directory}/${String(slideNumber).padStart(2, "0")}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      alt: `${altPrefix}, ${slideNumber}. slayt`,
      title: `${title} · Slayt ${slideNumber}`,
    };
  });
}

function createNamedSlides(
  directory: string,
  slideTitles: readonly string[],
  altPrefix: string,
): readonly PresentationSlide[] {
  return slideTitles.map((slideTitle, index) => {
    const base = `/images/sunum-kosesi/${directory}/${String(index + 1).padStart(2, "0")}`;
    return {
      src: `${base}.webp`,
      thumb: `${base}-thumb.webp`,
      alt: `${altPrefix}: ${slideTitle}`,
      title: slideTitle,
    };
  });
}

export const presentationCollections: readonly PresentationCollection[] = [
  {
    id: "kontenjan",
    label: "YKS Kontenjan Değişimi",
    shortLabel: "Kontenjan",
    description:
      "YKS kontenjanlarının 2023–2026 yılları arasındaki değişimini genel, sayısal, eşit ağırlık ve sözel puan türleri üzerinden karşılaştıran güncel görsel seri.",
    thumbnailFit: "contain",
    slides: createNamedSlides(
      "kontenjan",
      [
        "Genel Kontenjan Değişimi",
        "Sayısal Kontenjan Değişimi I",
        "Sayısal Kontenjan Değişimi II",
        "Eşit Ağırlık ve Sözel Kontenjan Değişimi",
      ],
      "Gürbüz Gövrek YKS kontenjan değişimi",
    ),
  },
  {
    id: "yks-istatistikleri",
    label: "YKS İstatistikleri",
    shortLabel: "İstatistikler",
    description:
      "2021–2026 YKS verilerini test ortalamaları, puan aralıkları ve puan türlerine göre yığınsal dağılımlarla karşılaştıran 7 görsellik veri serisi.",
    slides: createNamedSlides(
      "yks-istatistikleri",
      [
        "YKS Testlerinin Ortalamaları",
        "180 Puan Üstü Aday Sayıları",
        "TYT Puanı Yığınsal Dağılım",
        "Sayısal Puan Yığınsal Dağılım",
        "Eşit Ağırlık Puanı Yığınsal Dağılım",
        "Sözel Puan Yığınsal Dağılım",
        "Dil Puanı Yığınsal Dağılım",
      ],
      "Gürbüz Gövrek YKS istatistikleri",
    ),
  },
  {
    id: "seminer",
    label: "Seminer Slaytları",
    shortLabel: "Seminer",
    description:
      "Tercihler 2026 sunumundan; doğru tercih, üniversite seçimi ve gelecek planlamasına yönelik görsel anlatımlar.",
    slides: createSlides(
      "seminer",
      "Tercihler 2026",
      "Gürbüz Gövrek Tercihler 2026 seminer sunumu",
    ),
  },
  {
    id: "tuma",
    label: "TÜMA 2025 Araştırması",
    shortLabel: "TÜMA 2025",
    description:
      "Türkiye Üniversite Memnuniyet Araştırması 2025 sonuçlarını; öğrenci deneyimi ve üniversite memnuniyeti başlıklarıyla özetleyen 9 görsellik seri.",
    slides: createSlides(
      "tuma",
      "TÜMA 2025 Araştırması",
      "Türkiye Üniversite Memnuniyet Araştırması 2025 sunumu",
      9,
    ),
  },
  {
    id: "ucak-uzay",
    label: "Uçak ve Uzay Mühendisliği",
    shortLabel: "Uçak & Uzay",
    description:
      "Havacılık ve uzay mühendisliğinin görevlerini, eğitim yolunu ve kariyer olanaklarını anlatan 10 bölümlük seri.",
    slides: createSlides(
      "ucak-uzay",
      "Uçak ve Uzay Mühendisliği",
      "Uçak ve Uzay Mühendisliği meslek tanıtım sunumu",
    ),
  },
  {
    id: "endustri-isletme",
    label: "Endüstri ve İşletme Mühendisliği",
    shortLabel: "Endüstri & İşletme",
    description:
      "Endüstri ve işletme mühendisliğini çalışma alanları, yetkinlikler ve kariyer yolları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "endustri-isletme",
      "Endüstri ve İşletme Mühendisliği",
      "Endüstri ve İşletme Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "bilgisayar-yazilim",
    label: "Bilgisayar ve Yazılım Mühendisliği",
    shortLabel: "Bilgisayar & Yazılım",
    description:
      "Bilgisayar ve yazılım mühendisliğini odak alanları, eğitim içerikleri ve kariyer seçenekleri üzerinden karşılaştıran seri.",
    slides: createSlides(
      "bilgisayar-yazilim",
      "Bilgisayar ve Yazılım Mühendisliği",
      "Bilgisayar ve Yazılım Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "bilgisayar-matematik",
    label: "Bilgisayar ve Matematik Mühendisliği",
    shortLabel: "Bilgisayar & Matematik",
    description:
      "Bilgisayar ve matematik mühendisliğinin problem çözme yaklaşımlarını, derslerini ve çalışma alanlarını karşılaştıran seri.",
    slides: createSlides(
      "bilgisayar-matematik",
      "Bilgisayar ve Matematik Mühendisliği",
      "Bilgisayar ve Matematik Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "makine-mekatronik",
    label: "Makine ve Mekatronik Mühendisliği",
    shortLabel: "Makine & Mekatronik",
    description:
      "Makine ve mekatronik mühendisliğini eğitim yolculuğu, temel yetkinlikler ve kariyer alanları açısından anlatan seri.",
    slides: createSlides(
      "makine-mekatronik",
      "Makine ve Mekatronik Mühendisliği",
      "Makine ve Mekatronik Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "mimarlik-insaat",
    label: "Mimarlık ve İnşaat Mühendisliği",
    shortLabel: "Mimarlık & İnşaat",
    description:
      "Mimarlık ile inşaat mühendisliğinin tasarım, teknik sorumluluk, eğitim ve çalışma alanlarını karşılaştıran seri.",
    slides: createSlides(
      "mimarlik-insaat",
      "Mimarlık ve İnşaat Mühendisliği",
      "Mimarlık ve İnşaat Mühendisliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "tip-dis",
    label: "Tıp ve Diş Hekimliği",
    shortLabel: "Tıp & Diş",
    description:
      "Tıp doktorluğu ve diş hekimliğini eğitim süresi, çalışma düzeni, uzmanlaşma ve kariyer seçenekleriyle karşılaştıran seri.",
    slides: createSlides(
      "tip-dis",
      "Tıp ve Diş Hekimliği",
      "Tıp ve Diş Hekimliği karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "hukuk-psikoloji",
    label: "Hukuk ve Psikoloji",
    shortLabel: "Hukuk & Psikoloji",
    description:
      "Hukuk ve psikolojiyi çalışma biçimleri, insanla kurdukları ilişki, eğitim süreci ve kariyer yollarıyla ele alan seri.",
    slides: createSlides(
      "hukuk-psikoloji",
      "Hukuk ve Psikoloji",
      "Hukuk ve Psikoloji karşılaştırmalı meslek tanıtım sunumu",
    ),
  },
  {
    id: "ekonomi-isletme",
    label: "Çalışma Ekonomisi ve İşletme",
    shortLabel: "Ekonomi & İşletme",
    description:
      "Çalışma ekonomisi ile işletme bölümlerini dersler, yetkinlikler ve mezuniyet sonrası kariyer rotaları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "ekonomi-isletme",
      "Çalışma Ekonomisi ve İşletme",
      "Çalışma Ekonomisi ve İşletme karşılaştırmalı bölüm tanıtım sunumu",
    ),
  },
  {
    id: "molekuler-kimya-biyomuhendislik",
    label: "Moleküler Biyoloji ve Genetik & Kimya-Biyoloji Mühendisliği",
    shortLabel: "Moleküler & Kimya-Biyoloji",
    description:
      "Moleküler biyoloji ve genetik ile kimya-biyoloji mühendisliğini eğitim içeriği, laboratuvar çalışmaları, üretim süreçleri ve kariyer alanları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "molekuler-kimya-biyomuhendislik",
      "Moleküler Biyoloji ve Genetik & Kimya-Biyoloji Mühendisliği",
      "Moleküler Biyoloji ve Genetik ile Kimya-Biyoloji Mühendisliği karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "siber-guvenlik-bilgi-guvenligi",
    label: "Siber Güvenlik ve Bilgi Güvenliği",
    shortLabel: "Siber & Bilgi Güvenliği",
    description:
      "Siber güvenlik ve bilgi güvenliği alanlarını görevler, teknik yetkinlikler, eğitim yolları ve dijital dünyadaki kariyer fırsatlarıyla ele alan seri.",
    slides: createSlides(
      "siber-guvenlik-bilgi-guvenligi",
      "Siber Güvenlik ve Bilgi Güvenliği",
      "Siber Güvenlik ve Bilgi Güvenliği karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "bilisim-sistemleri-ybs",
    label: "Bilişim Sistemleri Mühendisliği ve Yönetim Bilişim Sistemleri",
    shortLabel: "Bilişim Sistemleri & YBS",
    description:
      "Bilişim sistemleri mühendisliği ile yönetim bilişim sistemlerini teknoloji, iş süreçleri, analiz, strateji ve mezuniyet sonrası kariyer seçenekleriyle karşılaştıran seri.",
    slides: createSlides(
      "bilisim-sistemleri-ybs",
      "Bilişim Sistemleri Mühendisliği ve Yönetim Bilişim Sistemleri",
      "Bilişim Sistemleri Mühendisliği ve Yönetim Bilişim Sistemleri karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "bitki-koruma-tarla-bitkileri",
    label: "Bitki Koruma ve Tarla Bitkileri",
    shortLabel: "Bitki Koruma & Tarla",
    description:
      "Bitki koruma ve tarla bitkileri bölümlerini eğitim, üretim, koruma, çalışma alanları ve geleceğin tarım teknolojileri açısından karşılaştıran seri.",
    slides: createSlides(
      "bitki-koruma-tarla-bitkileri",
      "Bitki Koruma ve Tarla Bitkileri",
      "Bitki Koruma ve Tarla Bitkileri karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "biyolog-kimyager",
    label: "Biyolog ve Kimyager",
    shortLabel: "Biyolog & Kimyager",
    description:
      "Biyolog ve kimyager mesleklerini eğitim süreci, laboratuvar ortamı, araştırma alanları ve kariyer yolları üzerinden karşılaştıran seri.",
    slides: createSlides(
      "biyolog-kimyager",
      "Biyolog ve Kimyager",
      "Biyolog ve Kimyager karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "diyetisyen-eczaci",
    label: "Diyetisyenlik ve Eczacılık",
    shortLabel: "Diyetisyen & Eczacı",
    description:
      "Diyetisyenlik ve eczacılığı eğitim, uzmanlık, çalışma ortamı, insan sağlığına katkı ve kariyer seçenekleri açısından karşılaştıran seri.",
    slides: createSlides(
      "diyetisyen-eczaci",
      "Diyetisyenlik ve Eczacılık",
      "Diyetisyenlik ve Eczacılık karşılaştırmalı kariyer sunumu",
    ),
  },
  {
    id: "pratisyen-hekim",
    label: "Pratisyen Hekimlik (Tıp Doktorluğu)",
    shortLabel: "Pratisyen Hekim",
    description:
      "Tıp fakültesine girişten pratisyen hekimliğe, oradan TUS ve uzmanlık yollarına uzanan kariyer haritası; günlük sorumluluklar, çalışma koşulları ve kazanç dinamikleriyle birlikte.",
    slides: createNamedSlides(
      "pratisyen-hekim",
      [
        "Pratisyen Hekim (Tıp Doktoru): Kariyer Haritası",
        "Tıp Dünyasına Giriş Kapısı",
        "6 Yıllık Metamorfoz: Eğitim Süreci",
        "Sağlık Sisteminin Temel Taşı",
        "Kimlik Döngüsü: Günlük Sorumluluklar",
        "Çalışma Gerçekliği: Ortam ve Koşullar",
        "Büyük Eşik: Tıpta Uzmanlık Sınavı (TUS)",
        "Hangi Uzmanlık Yolu Size Uygun?",
        "Kariyer Pazarı ve Kazanç Dinamikleri",
        "Bir Hekimin Anatomisi: Gereken Özellikler",
      ],
      "Pratisyen hekimlik kariyer rehberi sunumu",
    ),
  },
  {
    id: "bilgisayar-muhendisligi-kariyer",
    label: "Bilgisayar Mühendisliği Kariyer Haritası",
    shortLabel: "Bilgisayar Müh.",
    description:
      "Bilgisayar mühendisliğini mesleğin çalışma mantığından eğitim koşullarına, çalışma ortamından yazılım, donanım ve veri güvenliği uzmanlıklarına kadar izleyen seri.",
    slides: createNamedSlides(
      "bilgisayar-muhendisligi-kariyer",
      [
        "Bilgisayar Mühendisliği: Geleceği Kodlayanların Kariyer Haritası",
        "Mesleğin DNA’sı: Sorundan Çözüme Sistem Mimarisi",
        "Bir Mühendisin Anatomisi",
        "Çalışma Ortamı ve Ekosistem",
        "Eğitim Boru Hattı: Giriş Koşulları",
        "Akademik Mimari: 4 Yıllık Teknoloji Yığını",
        "Kariyer Yolları Matrisi",
        "Uzmanlık 1: Yazılım ve Sistem Dönüşümü",
        "Uzmanlık 2: Donanım Mimarisi ve Fiziksel Üretim",
        "Uzmanlık 3: Veri Güvenliği ve Altyapı",
      ],
      "Bilgisayar mühendisliği kariyer haritası sunumu",
    ),
  },
  {
    id: "elektrik-elektronik-muhendisligi",
    label: "Elektrik-Elektronik Mühendisliği",
    shortLabel: "Elektrik-Elektronik",
    description:
      "Enerji santrallerinden mikroişlemcilere uzanan elektrik-elektronik mühendisliğini; disiplinin iki ana odağı, eğitim süreci, çalışma alanları ve sektör yörüngesi üzerinden anlatan seri.",
    slides: createNamedSlides(
      "elektrik-elektronik-muhendisligi",
      [
        "Elektrik-Elektronik Mühendisliği: 10 Slaytta Kariyer Yolculuğu",
        "Sistemin Kapsamı: Makrodan Mikroya",
        "Bir Mühendisin Anatomisi",
        "Mühendisin Donanım Çantası",
        "İki Ana Odak, Tek Disiplin",
        "Çalışma Ortamı Koordinatları",
        "Sisteme Giriş: Eğitim Algoritması",
        "Çekirdek Müfredat Mimarisi",
        "Kariyer Yörüngesi ve Sektörler",
        "Geleceği Tasarlayan Sistem",
      ],
      "Elektrik-elektronik mühendisliği kariyer rehberi sunumu",
    ),
  },
  {
    id: "endustri-muhendisligi",
    label: "Endüstri Mühendisliği Kariyer Rehberi",
    shortLabel: "Endüstri Müh.",
    description:
      "Verimlilik, sistem tasarımı ve problem çözme odaklı endüstri mühendisliğini; temel yetkinlikler, müfredat, sektörler ve ilerleme olanakları üzerinden anlatan seri.",
    slides: createNamedSlides(
      "endustri-muhendisligi",
      [
        "Endüstri Mühendisliği: Verimlilik, Sistem Tasarımı ve Problem Çözme",
        "Endüstri Mühendisi Ne Yapar?",
        "Temel Yetkinlikler",
        "Çalışma Ortamı",
        "Eğitim Yolculuğu",
        "Bölümde Hangi Dersler Var?",
        "Hangi Sektörlerde Çalışılır?",
        "Neden Geleceği Güçlü?",
        "Kariyer ve İlerleme Olanakları",
        "Bu Bölüm Sana Uygun mu?",
      ],
      "Endüstri mühendisliği kariyer rehberi sunumu",
    ),
  },
  {
    id: "kimya-muhendisligi",
    label: "Kimya Mühendisliği",
    shortLabel: "Kimya Müh.",
    description:
      "Laboratuvardaki bilgiyi fabrikadaki üretime dönüştüren kimya mühendisliğini; mühendisin dört ana rolü, çalışma alanları, piyasa gerçekliği ve mezuniyet sonrası rotalarla ele alan seri.",
    slides: createNamedSlides(
      "kimya-muhendisligi",
      [
        "Kimya Mühendisliği: Bilimi Endüstriye Dönüştüren Güç",
        "Mikrodan Makroya: Kimya Mühendisliği Ne Yapar?",
        "Kimya Mühendisinin 4 Ana Rolü",
        "Kimya Mühendisliği Kimler İçin Uygun?",
        "Nerede Çalışırlar?",
        "Akademik Rota",
        "Etki Alanının Sınırları Yoktur",
        "Piyasa Gerçekliği",
        "Mezuniyet Sonrası Rotalar",
        "Kazanç, Alternatifler ve Sonuç",
      ],
      "Kimya mühendisliği kariyer rehberi sunumu",
    ),
  },
  {
    id: "gemi-insaati-gemi-makineleri",
    label: "Gemi İnşaatı ve Gemi Makineleri Mühendisliği",
    shortLabel: "Gemi İnşaatı",
    description:
      "Uluslararası sularda yüzen devasa sistemlerin tasarımını, inşasını ve işletmesini kapsayan mühendislik alanını; iki disiplinin buluşması, müfredat ve tersane ekosistemi üzerinden tanıtan seri.",
    slides: createNamedSlides(
      "gemi-insaati-gemi-makineleri",
      [
        "Denizlerin Mimarları: Gemi İnşaatı ve Gemi Makineleri Mühendisliği",
        "Temel Görev Tanımı: Sistemi İnşa Etmek",
        "İki Disiplin, Tek Mühendislik",
        "İdeal Adayın Bilişsel Profili",
        "Mühendisin Takım Çantası",
        "Akademik Temel: Eğitim Süreci",
        "Kuramdan Pratiğe: Müfredatın Evrimi",
        "Operasyonel Döngü: Planla, İnşa Et, İşlet",
        "Çalışma Ortamları ve Koşulları",
        "Sektörün Omurgası: Ekosistem Merkezi",
      ],
      "Gemi inşaatı ve gemi makineleri mühendisliği sunumu",
    ),
  },
  {
    id: "hukuk",
    label: "Hukuk Fakültesi ve Hukukçuluk",
    shortLabel: "Hukuk",
    description:
      "Hukukun ne olduğundan başlayıp eğitim süreci, gerekli yetenekler, çalışma alanları, uzmanlık dalları ve mesleğin zorluklarına uzanan on slaytlık meslek rehberi.",
    slides: createNamedSlides(
      "hukuk",
      [
        "Hukuk Nedir?",
        "Temel Görev: Adaleti Sağlamak",
        "Hukuk Eğitimi Nasıldır?",
        "Gerekli Yetenekler",
        "Çalışma Alanları",
        "Uzmanlık Alanları",
        "Kariyer Yolu",
        "Neden Hukuk?",
        "Zorluklar",
        "Geleceğin Hukukçusu Sen Ol!",
      ],
      "Hukuk fakültesi ve hukukçuluk meslek rehberi sunumu",
    ),
  },
  {
    id: "eczacilik",
    label: "Eczacılık Meslek Rehberi",
    shortLabel: "Eczacılık",
    description:
      "İlacın keşfinden hastaya ulaşmasına kadar geçen süreci yöneten eczacılığı; temel görevler, araştırma ve denetim rolleri, beş yıllık eğitim ve sektörel kazanç dinamikleriyle anlatan seri.",
    slides: createNamedSlides(
      "eczacilik",
      [
        "Eczacı: Meslek Rehberi",
        "Bilim ve Sağlık Arasındaki Köprü",
        "Kimler Eczacı Olmalı?",
        "Reçeteden Tedaviye: Temel Görevler",
        "Vitrinin Arkası: Araştırma ve Denetim",
        "Çalışma Ortamı ve Koşulları",
        "5 Yıllık Akademik Yolculuk",
        "Kariyer Yolları ve Sektör Karşılaştırması",
        "Sektörel Gerçekler ve Kazanç",
        "Meslekte İlerleme ve Gelecek",
      ],
      "Eczacılık meslek rehberi sunumu",
    ),
  },
  {
    id: "universite-siralamalari",
    label: "Üniversite Sıralamaları ve Kalite Göstergeleri",
    shortLabel: "Üniversite Sıralamaları",
    description:
      "Türkiye üniversitelerini QS, THE ve ARWU dünya sıralamaları, akredite program sayısı, AR-GE ve proje üretimi, TÜBİTAK-TEKNOFEST başarıları ve öğrenci memnuniyeti üzerinden karşılaştıran tablo serisi.",
    slides: createNamedSlides(
      "universite-siralamalari",
      [
        "QS Dünya Sıralamasında En İyi Üniversitelerimiz",
        "THE Dünya Sıralamasında En İyi Üniversitelerimiz",
        "ARWU Dünya Sıralamasında En İyi Üniversitelerimiz",
        "QS Mühendislik Dünya Sıralamasında En İyi Üniversitelerimiz",
        "QS Sağlık Alanı Dünya Sıralamasında En İyi Üniversitelerimiz",
        "QS Sosyal Bilimler Dünya Sıralamasında En İyi Üniversitelerimiz",
        "Akredite Program Sayısında En İyi Üniversitelerimiz",
        "AR-GE Çalışmalarında En İyi Üniversitelerimiz",
        "Sektörel Proje Sayısında En İyi Üniversitelerimiz",
        "TÜBİTAK Bursunda En İyi Üniversitelerimiz",
        "TEKNOFEST ve TÜBİTAK Ödül Sayısında En İyi Üniversitelerimiz",
        "Genel Memnuniyet Yüzdesinde En İyi Üniversitelerimiz",
        "Öğretim Üyelerinden Memnuniyet Yüzdesinde En İyi Üniversitelerimiz",
      ],
      "Üniversite sıralamaları ve kalite göstergeleri tablosu",
    ),
  },
  {
    id: "yks-tercih-rehberi-2026",
    label: "2026 YKS Tercih Rehberi",
    shortLabel: "Tercih Rehberi",
    description:
      "Tercih sürecini baştan sona kuran seri: kendini tanımaktan puan barajlarına, devlet-vakıf karşılaştırmasından güvenli aralıklı liste kurmaya ve son kontrol adımlarına kadar.",
    slides: createNamedSlides(
      "yks-tercih-rehberi-2026",
      [
        "2026 YKS Tercih Rehberi: Geleceğin Mimari Planı",
        "Geleceğin Kuralları",
        "Doğru Tercihin Sıfır Noktası: Kendini Tanımak",
        "Tercih Sürecinde 5 Adımlı Karar Motoru",
        "Üniversite Değerlendirme Radarı",
        "Veri Kılavuzu: Güvenilir Bilgi Kaynakları",
        "Puan Matrisi ve Başarı Barajları",
        "Kurumsal Matris: Devlet ve Vakıf Üniversiteleri",
        "Tercih Listesi Stratejisi: Güvenli Aralık Kurmak",
        "Nihai Tercih Kontrol Paneli",
      ],
      "2026 YKS tercih rehberi sunumu",
    ),
  },
];

export const presentationSlideCount = presentationCollections.reduce(
  (total, collection) => total + collection.slides.length,
  0,
);
