/**
 * Türkiye'nin 81 ili ve tercih robotunda kullanılan ek bölge değerleri.
 *
 * Şehir açılırı bilinçli olarak veritabanındaki farklı değerlerden değil bu sabit
 * listeden kurulur. Kaynak dosyadaki ŞEHİR sütunu bazı satırlarda üniversite ya da
 * ilçe adı taşıdığı için (FIRAT, GEBZE, TARBZON…) ham değerler doğrudan
 * kullanılamaz; yükleme sırasında `scripts/tercih/city-aliases.json` ile il adına
 * indirgenir ve arayüz bu listeyle eşleşir.
 */
export const PROVINCES = [
  "ADANA", "ADIYAMAN", "AFYONKARAHİSAR", "AĞRI", "AKSARAY", "AMASYA", "ANKARA",
  "ANTALYA", "ARDAHAN", "ARTVİN", "AYDIN", "BALIKESİR", "BARTIN", "BATMAN",
  "BAYBURT", "BİLECİK", "BİNGÖL", "BİTLİS", "BOLU", "BURDUR", "BURSA",
  "ÇANAKKALE", "ÇANKIRI", "ÇORUM", "DENİZLİ", "DİYARBAKIR", "DÜZCE", "EDİRNE",
  "ELAZIĞ", "ERZİNCAN", "ERZURUM", "ESKİŞEHİR", "GAZİANTEP", "GİRESUN",
  "GÜMÜŞHANE", "HAKKARİ", "HATAY", "IĞDIR", "ISPARTA", "İSTANBUL", "İZMİR",
  "KAHRAMANMARAŞ", "KARABÜK", "KARAMAN", "KARS", "KASTAMONU", "KAYSERİ",
  "KİLİS", "KIRIKKALE", "KIRKLARELİ", "KIRŞEHİR", "KOCAELİ", "KONYA", "KÜTAHYA",
  "MALATYA", "MANİSA", "MARDİN", "MERSİN", "MUĞLA", "MUŞ", "NEVŞEHİR", "NİĞDE",
  "ORDU", "OSMANİYE", "RİZE", "SAKARYA", "SAMSUN", "ŞANLIURFA", "SİİRT",
  "SİNOP", "SİVAS", "ŞIRNAK", "TEKİRDAĞ", "TOKAT", "TRABZON", "TUNCELİ", "UŞAK",
  "VAN", "YALOVA", "YOZGAT", "ZONGULDAK",
] as const;

/** İl olmayan ama tercih edilebilir bölgeler. */
export const EXTRA_REGIONS = ["KKTC", "YURT DIŞI"] as const;
