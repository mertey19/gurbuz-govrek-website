export type SeoServicePage = {
  path: string;
  serviceName: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  eyebrow: string;
  heading: string;
  lead: string;
  image: string;
  imageAlt: string;
  highlights: readonly {
    value: string;
    label: string;
  }[];
  audienceTitle: string;
  audienceIntro: string;
  audience: readonly {
    title: string;
    description: string;
  }[];
  processTitle: string;
  processIntro: string;
  process: readonly {
    title: string;
    description: string;
  }[];
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: readonly string[];
  faqs: readonly {
    question: string;
    answer: string;
  }[];
  related: readonly {
    label: string;
    href: string;
    description: string;
  }[];
};

export const yksPreferenceService: SeoServicePage = {
  path: "/denizli-yks-tercih-danismanligi",
  serviceName: "Denizli YKS Tercih Danışmanlığı",
  title: "Denizli Tercih Danışmanlığı | YKS Tercih Danışmanı",
  description:
    "Denizli tercih danışmanlığı ve YKS tercih danışmanı desteği. Başarı sırası, kontenjan, bölüm olanakları ve öğrenci hedefleriyle kişisel tercih listesi.",
  keywords: [
    "Denizli tercih danışmanlığı",
    "Denizli tercih danışmanı",
    "Denizli YKS tercih danışmanlığı",
    "YKS tercih danışmanı",
    "üniversite tercih danışmanlığı Denizli",
  ],
  eyebrow: "Denizli Tercih Danışmanlığı · Yüz Yüze ve Online",
  heading: "Denizli Tercih Danışmanlığı ile YKS Tercihlerinizi Veriye Dayandırın",
  lead:
    "Denizli’de tercih danışmanı arayan öğrenciler için tercih listesi yalnızca puanların sıralandığı bir tablo değildir. Öğrencinin hedefi, ilgi alanı, şehir ve kampüs beklentisi ile güncel program verileri birlikte değerlendirilerek açıklanabilir bir karar planına dönüştürülür.",
  image: "/images/one-to-one-consulting.png",
  imageAlt:
    "Gürbüz Gövrek Denizli’de öğrenciyle bire bir YKS tercih danışmanlığı görüşmesi yapıyor",
  highlights: [
    { value: "Bire Bir", label: "Öğrenci görüşmesi" },
    { value: "Güncel", label: "Program ve kontenjan verisi" },
    { value: "Kişisel", label: "Tercih yol haritası" },
  ],
  audienceTitle: "Bu Danışmanlık Kimler İçin Uygun?",
  audienceIntro:
    "Karar sürecinde yalnızca bir liste değil, seçeneklerin neden uygun veya riskli olduğunu anlamak isteyen öğrenci ve veliler için planlanır.",
  audience: [
    {
      title: "Hedefini netleştirmek isteyen öğrenciler",
      description:
        "Bölüm, şehir veya üniversite konusunda birden fazla seçeneği bulunan öğrencinin öncelikleri görünür hâle getirilir.",
    },
    {
      title: "Başarı sırasını doğru yorumlamak isteyenler",
      description:
        "Tek bir önceki yıl verisine bağlı kalmadan kontenjan ve sıralama eğilimleri birlikte değerlendirilir.",
    },
    {
      title: "Öğrencisine bilinçli eşlik etmek isteyen veliler",
      description:
        "Aile beklentileri ile öğrencinin ilgi ve hedefleri açık bir görüşme zemini içinde ele alınır.",
    },
  ],
  processTitle: "Tercih Süreci Nasıl İlerliyor?",
  processIntro:
    "Her adımın amacı öğrencinin kendi kararını daha bilinçli verebilmesini sağlamaktır.",
  process: [
    {
      title: "Öğrenciyi ve öncelikleri tanıma",
      description:
        "İlgi alanları, başarı sırası, bölüm hedefleri, şehir ve kampüs beklentileri konuşulur.",
    },
    {
      title: "Üniversite ve bölüm seçeneklerini araştırma",
      description:
        "Program içerikleri, özel koşullar, kontenjanlar ve öğrencinin hedefleri karşılaştırılır.",
    },
    {
      title: "Risk dağılımını oluşturma",
      description:
        "Tercihler; iddialı, dengeli ve daha güvenli seçenekler arasında gerekçeli biçimde dağıtılır.",
    },
    {
      title: "Listeyi son kontrollerle netleştirme",
      description:
        "Sıralama, koşullar ve öğrenci öncelikleri yeniden kontrol edilerek kişisel yol haritası tamamlanır.",
    },
  ],
  benefitsTitle: "Görüşmede Neler Değerlendirilir?",
  benefitsIntro:
    "Çalışmanın kapsamı öğrencinin ihtiyacına göre şekillenir; hazır ve herkese aynı uygulanan bir liste kullanılmaz.",
  benefits: [
    "YKS başarı sırası ve puan türünün doğru yorumlanması",
    "Kontenjan değişimleri ile geçmiş yıl eğilimlerinin karşılaştırılması",
    "Bölüm dersleri, akademik yapı ve kariyer seçeneklerinin incelenmesi",
    "Şehir, kampüs, barınma ve öğrenci yaşamı beklentilerinin konuşulması",
    "Burs, ücret ve program özel koşullarının resmî kaynaklardan doğrulanması",
    "Öğrenci ve veli için açık, gerekçeli tercih planı hazırlanması",
  ],
  faqs: [
    {
      question: "YKS tercih danışmanlığı ne zaman alınmalı?",
      answer:
        "Sonuçlar ve güncel tercih kılavuzu yayımlandıktan sonra çalışma daha somut ilerler. Ancak hedef ve bölüm araştırması sınavdan önce de başlatılabilir.",
    },
    {
      question: "Görüşme online yapılabilir mi?",
      answer:
        "Evet. Denizli’de yüz yüze görüşme seçeneğinin yanında, farklı şehirlerdeki öğrenciler için online görüşme de planlanabilir.",
    },
    {
      question: "Tercih listesi garanti verir mi?",
      answer:
        "Hayır. Yerleşme sonucu başarı sırası, kontenjan, aday davranışları ve ilgili yılın koşullarına bağlıdır. Danışmanlığın amacı belirsizliği azaltan, gerekçeli bir strateji oluşturmaktır.",
    },
    {
      question: "Öğrenci ve veli görüşmeye birlikte katılabilir mi?",
      answer:
        "Evet. Öğrencinin karar alanını koruyarak velinin sorularını da ele alan ortak bir görüşme planlanabilir.",
    },
  ],
  related: [
    {
      label: "Denizli Tercih Danışmanlığı",
      href: "/denizli-tercih-danismanligi",
      description: "Tercih sürecinin kapsamını ve görüşmede nasıl ilerlediğimizi inceleyin.",
    },
    {
      label: "Denizli Tercih Danışmanı",
      href: "/denizli-tercih-danismani",
      description: "Tercih danışmanı seçerken bakılması gereken ölçütleri görün.",
    },
    {
      label: "Üniversite ve Bölüm Analizi",
      href: "/universite-bolum-analizi",
      description: "Programları akademik yapı, kampüs ve kariyer olanaklarıyla karşılaştırın.",
    },
  ],
};

export const denizliPreferenceConsultingService: SeoServicePage = {
  path: "/denizli-tercih-danismanligi",
  serviceName: "Denizli Tercih Danışmanlığı",
  title: "Denizli Tercih Danışmanlığı | Üniversite Tercih Danışmanı",
  description:
    "Denizli tercih danışmanlığı hizmetiyle üniversite, bölüm ve şehir seçeneklerini veriye dayalı değerlendirin. YKS tercih döneminde yüz yüze ve online destek.",
  keywords: [
    "Denizli tercih danışmanlığı",
    "tercih danışmanlığı Denizli",
    "üniversite tercih danışmanlığı",
    "YKS tercih danışmanlığı",
    "Denizli üniversite tercih danışmanı",
  ],
  eyebrow: "Denizli · Üniversite Tercih Süreci",
  heading: "Denizli Tercih Danışmanlığı: Doğru Üniversite ve Bölüm İçin Kişisel Yol Haritası",
  lead:
    "Tercih dönemi, öğrencinin yalnızca sıralamasına göre değil; hedeflerine, güçlü yönlerine, bölüm beklentilerine ve aileyle birlikte konuşulan gerçek koşullara göre planlanmalıdır. Denizli tercih danışmanlığı sürecinde amaç, öğrencinin neden o listeyi yazdığını açıkça anlayabildiği bir karar zemini oluşturmaktır.",
  image: "/images/preference-analysis.png",
  imageAlt:
    "Denizli tercih danışmanlığı görüşmesinde üniversite ve bölüm seçenekleri değerlendiriliyor",
  highlights: [
    { value: "Denizli", label: "Yüz yüze görüşme" },
    { value: "Online", label: "Farklı şehirlerden destek" },
    { value: "Veriye Dayalı", label: "Tercih listesi" },
  ],
  audienceTitle: "Denizli Tercih Danışmanlığı Kimler İçin Uygun?",
  audienceIntro:
    "Öğrenci ve velinin aynı masada daha sakin, daha açık ve daha veriye dayalı karar verebilmesi için yapılandırılır.",
  audience: [
    {
      title: "Üniversite ve bölüm kararı netleşmeyen öğrenciler",
      description:
        "Benzer görünen bölümlerin ders planları, mezuniyet sonrası alanları ve öğrencinin ilgileri birlikte değerlendirilir.",
    },
    {
      title: "Tercih listesindeki riskleri görmek isteyen aileler",
      description:
        "Sıralama aralıkları, kontenjan değişimleri ve özel koşullar tek tek konuşularak listenin mantığı netleştirilir.",
    },
    {
      title: "Denizli’de yüz yüze tercih danışmanı arayanlar",
      description:
        "Görüşmeler randevu ile planlanır; ihtiyaç hâlinde online destekle süreç devam ettirilebilir.",
    },
  ],
  processTitle: "Tercih Danışmanlığı Görüşmesi Nasıl İlerler?",
  processIntro:
    "Süreç, öğrencinin kendisini ve seçeneklerini daha doğru okumasını sağlayan aşamalı bir değerlendirmeyle ilerler.",
  process: [
    {
      title: "Öğrencinin hedefini ve beklentisini anlama",
      description:
        "Puan türü, başarı sırası, şehir beklentisi, bölüm ilgisi ve aile koşulları açıkça konuşulur.",
    },
    {
      title: "Üniversite ve bölüm seçeneklerini karşılaştırma",
      description:
        "Ders içerikleri, kontenjanlar, özel koşullar, kampüs ve kariyer olanakları aynı çerçevede incelenir.",
    },
    {
      title: "Tercih listesini risk dengesine göre kurma",
      description:
        "Liste; iddialı, dengeli ve daha güvenli seçenekler arasında öğrencinin hedefleriyle uyumlu biçimde düzenlenir.",
    },
    {
      title: "Son kontrol ve başvuru öncesi netleştirme",
      description:
        "Tercih sırası, özel koşullar ve kritik tarihler yeniden kontrol edilerek öğrencinin içi rahat bir listeyle ilerlemesi sağlanır.",
    },
  ],
  benefitsTitle: "Görüşmede Hangi Başlıklar Ele Alınır?",
  benefitsIntro:
    "Hazır liste yerine öğrencinin kendi önceliklerini taşıyan, gerekçeli ve açıklanabilir bir tercih planı hedeflenir.",
  benefits: [
    "Denizli’de yüz yüze veya online tercih danışmanlığı planı",
    "YKS başarı sırası ve puan türünün gerçekçi yorumlanması",
    "Üniversite, bölüm, şehir ve kampüs seçeneklerinin karşılaştırılması",
    "Kontenjan değişimleri ve geçmiş yıl eğilimlerinin değerlendirilmesi",
    "Özel koşullar, burs, ücret ve program ayrıntılarının kontrol edilmesi",
    "Öğrenci ve veli için anlaşılır tercih stratejisi oluşturulması",
  ],
  faqs: [
    {
      question: "Denizli tercih danışmanlığı yüz yüze mi yapılıyor?",
      answer:
        "Denizli’de randevu ile yüz yüze görüşme planlanabilir. Farklı şehirlerdeki öğrenciler veya devam görüşmeleri için online seçenek de kullanılabilir.",
    },
    {
      question: "Tercih danışmanlığı sadece YKS öğrencileri için mi?",
      answer:
        "Ana çalışma YKS ve üniversite tercih dönemine yöneliktir. Bölüm, şehir, vakıf-devlet üniversitesi karşılaştırması gibi karar başlıkları da ayrıca ele alınabilir.",
    },
    {
      question: "Tercih listesi kaç görüşmede hazırlanır?",
      answer:
        "Öğrencinin seçenekleri ve hazırlık durumuna göre değişir. Çoğu süreçte ilk analiz, liste taslağı ve son kontrol adımları ayrı ayrı değerlendirilir.",
    },
    {
      question: "Yerleşme garantisi veriliyor mu?",
      answer:
        "Hayır. Tercih danışmanlığının amacı garanti vermek değil; verileri doğru okuyarak belirsizliği azaltan, gerekçeli ve dengeli bir liste oluşturmaktır.",
    },
  ],
  related: [
    {
      label: "Denizli YKS Tercih Danışmanlığı",
      href: "/denizli-yks-tercih-danismanligi",
      description: "YKS tercih dönemine özel ayrıntılı çalışma sürecini inceleyin.",
    },
    {
      label: "Denizli Tercih Danışmanı",
      href: "/denizli-tercih-danismani",
      description: "Tercih danışmanı seçerken dikkat edilecek ölçütleri okuyun.",
    },
    {
      label: "Üniversite ve Bölüm Analizi",
      href: "/universite-bolum-analizi",
      description: "Bölüm ve üniversite seçeneklerini karşılaştırmalı değerlendirin.",
    },
  ],
};

export const denizliPreferenceConsultantService: SeoServicePage = {
  path: "/denizli-tercih-danismani",
  serviceName: "Denizli Tercih Danışmanı",
  title: "Denizli Tercih Danışmanı | Gürbüz Gövrek",
  description:
    "Denizli tercih danışmanı Gürbüz Gövrek ile YKS tercih listesi, üniversite-bölüm analizi, başarı sırası ve öğrenci hedefleri birlikte değerlendirilir.",
  keywords: [
    "Denizli tercih danışmanı",
    "tercih danışmanı Denizli",
    "YKS tercih danışmanı Denizli",
    "üniversite tercih danışmanı",
    "Gürbüz Gövrek tercih danışmanı",
  ],
  eyebrow: "Tercih Danışmanı · Denizli",
  heading: "Denizli Tercih Danışmanı Arayan Öğrenciler İçin Veriye Dayalı Rehberlik",
  lead:
    "İyi bir tercih danışmanı öğrencinin yerine karar vermez; öğrencinin seçenekleri daha iyi görmesini, riskleri anlamasını ve kendi hedefiyle uyumlu bir liste hazırlamasını sağlar. Gürbüz Gövrek ile süreç, matematik öğretmenliği deneyimi ve tercih rehberliği bakışıyla kişisel olarak ele alınır.",
  image: "/images/one-to-one-consulting.png",
  imageAlt:
    "Denizli tercih danışmanı Gürbüz Gövrek öğrenciyle tercih listesi üzerine görüşüyor",
  highlights: [
    { value: "Bire Bir", label: "Tercih görüşmesi" },
    { value: "Kişisel", label: "Öğrenci hedefleri" },
    { value: "Kontrollü", label: "Liste son kontrolü" },
  ],
  audienceTitle: "Tercih Danışmanı Seçerken Nelere Bakılmalı?",
  audienceIntro:
    "Tercih döneminde en değerli şey, öğrenciyi panikten çıkarıp kararları anlaşılır ölçütlerle konuşabilmektir.",
  audience: [
    {
      title: "Veriyi açıklayarak çalışan bir danışman",
      description:
        "Başarı sırası, kontenjan ve önceki yıl verileri tek başına değil, öğrencinin hedefleriyle birlikte yorumlanmalıdır.",
    },
    {
      title: "Öğrenciyi tanımaya zaman ayıran yaklaşım",
      description:
        "Bölüm ilgisi, şehir beklentisi, akademik alışkanlıklar ve aile koşulları kararın doğal parçası olarak ele alınır.",
    },
    {
      title: "Son kararı öğrenciyle birlikte netleştiren süreç",
      description:
        "Liste yazılırken öğrencinin neden o sırayı tercih ettiğini anlayabilmesi ve içinin rahat olması hedeflenir.",
    },
  ],
  processTitle: "Gürbüz Gövrek ile Tercih Danışmanı Süreci",
  processIntro:
    "Görüşme; hızlı, ezbere ve tek tip bir liste yerine öğrencinin seçeneklerini açan bir çalışma olarak tasarlanır.",
  process: [
    {
      title: "Ön görüşme ve ihtiyaç analizi",
      description:
        "Öğrencinin başarı sırası, hedefleri, kararsız kaldığı bölümler ve aile beklentileri dinlenir.",
    },
    {
      title: "Bölüm ve üniversite seçeneklerini daraltma",
      description:
        "Benzer bölümler, şehirler ve üniversiteler arasında öğrencinin önceliklerine göre karşılaştırma yapılır.",
    },
    {
      title: "Tercih listesi stratejisi oluşturma",
      description:
        "Listenin üst, orta ve güvenli alanları dengelenir; özel koşullar ve sıralama riskleri kontrol edilir.",
    },
    {
      title: "Son karar ve başvuru kontrolü",
      description:
        "Tercih sırası, program kodları ve dikkat edilmesi gereken detaylar başvuru öncesinde tekrar gözden geçirilir.",
    },
  ],
  benefitsTitle: "Denizli Tercih Danışmanı Görüşmesinde Kazanımlar",
  benefitsIntro:
    "Amaç öğrencinin sadece bir liste alması değil, kararının arkasındaki gerekçeyi anlayarak ilerlemesidir.",
  benefits: [
    "Tercih sürecinde panik ve bilgi karmaşasının azalması",
    "YKS başarı sırasının daha gerçekçi yorumlanması",
    "Üniversite ve bölüm alternatiflerinin netleşmesi",
    "Aile ve öğrencinin aynı karar dilinde buluşması",
    "Özel koşulların ve kritik detayların gözden kaçmaması",
    "Başvuru öncesinde dengeli ve açıklanabilir son liste",
  ],
  faqs: [
    {
      question: "Denizli tercih danışmanı ile ne zaman görüşülmeli?",
      answer:
        "Sonuçlar açıklandıktan sonra liste daha somut hazırlanır. Ancak bölüm ve üniversite araştırması için sonuç öncesinde de ön görüşme yapılabilir.",
    },
    {
      question: "Sadece liste hazırlamak için görüşme yapılabilir mi?",
      answer:
        "Evet, fakat listenin sağlam olması için öğrencinin hedefleri, özel koşullar ve bölüm seçenekleri de birlikte değerlendirilir.",
    },
    {
      question: "Görüşmeye veli katılabilir mi?",
      answer:
        "Evet. Öğrencinin karar alanı korunarak velinin soruları ve kaygıları da açık biçimde ele alınabilir.",
    },
    {
      question: "Online tercih danışmanı desteği var mı?",
      answer:
        "Evet. Denizli dışındaki öğrenciler için online görüşme yapılabilir; belge ve liste kontrolleri dijital olarak paylaşılabilir.",
    },
  ],
  related: [
    {
      label: "Denizli Tercih Danışmanlığı",
      href: "/denizli-tercih-danismanligi",
      description: "Tercih sürecinin kapsamını ve görüşme başlıklarını inceleyin.",
    },
    {
      label: "YKS Tercih Danışmanlığı",
      href: "/denizli-yks-tercih-danismanligi",
      description: "YKS tercih listesi hazırlama sürecinin ayrıntılarına bakın.",
    },
    {
      label: "Denizli’de YKS Tercih Danışmanı Nasıl Seçilir?",
      href: "/blog/denizlide-yks-tercih-danismani-nasil-secilir",
      description: "Danışman seçerken dikkat edilmesi gereken ölçütleri blog yazısında okuyun.",
    },
  ],
};

export const studentCoachingService: SeoServicePage = {
  path: "/denizli-ogrenci-koclugu",
  serviceName: "Öğrenci Koçluğu",
  title: "Denizli Öğrenci Koçluğu ve Akademik Takip | Gürbüz Gövrek",
  description:
    "Denizli’de yüz yüze ve online öğrenci koçluğu. Gerçekçi hedef, kişisel çalışma planı, düzenli takip ve öğrenci-veli geri bildirimi.",
  eyebrow: "Öğrenci Koçluğu · Akademik Takip",
  heading: "Hedefi Günlük Çalışma Düzenine Dönüştüren Kişisel Takip",
  lead:
    "Öğrenci koçluğu hazır bir program vermekten ibaret değildir. Öğrencinin mevcut düzeni, okul ve sınav takvimi, güçlü yönleri ve zorlandığı noktalar birlikte değerlendirilerek sürdürülebilir bir çalışma sistemi kurulur.",
  image: "/images/student-success.png",
  imageAlt:
    "Gürbüz Gövrek öğrenci ve ailesiyle Denizli’de öğrenci koçluğu görüşmesinde",
  highlights: [
    { value: "Gerçekçi", label: "Hedef planı" },
    { value: "Düzenli", label: "Akademik takip" },
    { value: "Açık", label: "Öğrenci-veli iletişimi" },
  ],
  audienceTitle: "Öğrenci Koçluğu Hangi İhtiyaçlara Yanıt Verir?",
  audienceIntro:
    "Çalışma isteği olduğu hâlde planını sürdüremeyen veya hedefini günlük adımlara çevirmekte zorlanan öğrenciler için yapılandırılır.",
  audience: [
    {
      title: "Nereden başlayacağını bilemeyen öğrenciler",
      description:
        "Dersler ve konular önem sırasına alınarak uygulanabilir bir başlangıç planı oluşturulur.",
    },
    {
      title: "Program yapıp sürdüremeyen öğrenciler",
      description:
        "Aşırı yoğun listeler yerine okul yaşamıyla uyumlu, düzenli güncellenen bir çalışma sistemi kurulur.",
    },
    {
      title: "Sınav sürecinde takibe ihtiyaç duyan öğrenciler",
      description:
        "Deneme sonuçları, konu ilerlemesi ve çalışma alışkanlıkları birlikte değerlendirilir.",
    },
  ],
  processTitle: "Akademik Takip Sistemi",
  processIntro:
    "Plan, öğrencinin gerçek yaşamına uymadığı sürece sürdürülebilir olmaz. Bu nedenle sistem düzenli geri bildirimle güncellenir.",
  process: [
    {
      title: "Mevcut düzeni anlama",
      description:
        "Ders çalışma alışkanlıkları, okul programı, güçlü alanlar ve zorlanılan noktalar belirlenir.",
    },
    {
      title: "Ölçülebilir hedef oluşturma",
      description:
        "Uzun vadeli hedef, haftalık ve günlük olarak takip edilebilecek küçük adımlara ayrılır.",
    },
    {
      title: "Uygulama ve takip",
      description:
        "Konu ilerlemesi, soru çözümü, denemeler ve planın uygulanabilirliği düzenli olarak değerlendirilir.",
    },
    {
      title: "Geri bildirimle güncelleme",
      description:
        "İşe yarayan yöntemler korunur; aksayan noktalar suçlayıcı olmayan, çözüm odaklı bir yaklaşımla yeniden planlanır.",
    },
  ],
  benefitsTitle: "Çalışmanın Temel Başlıkları",
  benefitsIntro:
    "Amaç öğrenciyi bir programa bağımlı kılmak değil, zamanla kendi çalışma düzenini yönetebilecek becerileri geliştirmektir.",
  benefits: [
    "Haftalık ders ve konu önceliklerinin belirlenmesi",
    "Deneme sonuçlarının hata türlerine göre değerlendirilmesi",
    "Erteleme ve odaklanma sorunlarına uygulanabilir çözümler geliştirilmesi",
    "Tekrar, soru çözümü ve dinlenme dengesinin kurulması",
    "Öğrencinin ilerlemesini görebileceği ölçülebilir hedefler oluşturulması",
    "Gerektiğinde öğrenci ve veliyle açık geri bildirim görüşmesi yapılması",
  ],
  faqs: [
    {
      question: "Öğrenci koçluğu özel ders yerine geçer mi?",
      answer:
        "Hayır. Koçluk çalışma düzeni, hedef ve takip sürecine odaklanır. Belirli bir derste konu eksiği varsa özel ders veya branş desteği ayrıca değerlendirilebilir.",
    },
    {
      question: "Program her hafta değişir mi?",
      answer:
        "Ana hedef korunur; ancak okul sınavları, deneme sonuçları ve öğrencinin ilerlemesine göre haftalık öncelikler güncellenebilir.",
    },
    {
      question: "Veliye düzenli bilgi verilir mi?",
      answer:
        "Öğrencinin mahremiyeti ve sorumluluk alanı korunarak, ihtiyaç duyulan noktalarda veliyle açık ve yapıcı geri bildirim paylaşılabilir.",
    },
    {
      question: "Görüşmeler online yapılabilir mi?",
      answer:
        "Evet. Denizli’de yüz yüze veya öğrencinin bulunduğu şehre göre online takip planlanabilir.",
    },
  ],
  related: [
    {
      label: "Matematik Özel Ders",
      href: "/matematik-ozel-ders",
      description: "Matematikte konu eksiklerini ve soru çözüm yaklaşımını güçlendirin.",
    },
    {
      label: "YKS Tercih Danışmanlığı",
      href: "/denizli-yks-tercih-danismanligi",
      description: "Sınav sonrasında kişisel tercih yol haritanızı oluşturun.",
    },
    {
      label: "Başarı Sırasına Göre Tercih Listesi",
      href: "/blog/basari-sirasina-gore-tercih-listesi-nasil-hazirlanir",
      description: "Dengeli tercih listesinin nasıl oluşturulduğunu okuyun.",
    },
  ],
};

export const universityAnalysisService: SeoServicePage = {
  path: "/universite-bolum-analizi",
  serviceName: "Üniversite ve Bölüm Analizi",
  title: "Üniversite ve Bölüm Analizi Danışmanlığı | Gürbüz Gövrek",
  description:
    "Üniversite ve bölümleri ders planı, akademik yapı, kontenjan, kampüs, burs koşulları ve kariyer olanaklarıyla karşılaştırmalı değerlendirin.",
  eyebrow: "Veriye Dayalı Karşılaştırma",
  heading: "Bölüm Adının Ötesine Geçin, Üniversite Deneyiminin Tamamını İnceleyin",
  lead:
    "Aynı bölüm adı farklı üniversitelerde farklı ders planları, eğitim dili, akademik olanaklar ve kampüs deneyimleri sunabilir. Analiz çalışması, öğrencinin önceliklerini bu farklılıklarla eşleştirerek seçenekleri anlaşılır hâle getirir.",
  image: "/images/preference-analysis.png",
  imageAlt:
    "Gürbüz Gövrek üniversite ve bölüm seçeneklerini karşılaştırmalı analiz ediyor",
  highlights: [
    { value: "Karşılaştırmalı", label: "Program incelemesi" },
    { value: "Resmî", label: "Kaynak kontrolü" },
    { value: "Bütüncül", label: "Akademik ve sosyal değerlendirme" },
  ],
  audienceTitle: "Neden Ayrıntılı Bölüm Analizi?",
  audienceIntro:
    "Popülerlik, şehir veya tek bir sıralama tablosu; dört yıl ve sonrasını etkileyen bir karar için tek başına yeterli değildir.",
  audience: [
    {
      title: "Benzer bölümler arasında kalanlar",
      description:
        "Programların ders içerikleri ve mezuniyet sonrası yönelimleri karşılaştırılarak temel farklar ortaya çıkarılır.",
    },
    {
      title: "Aynı bölümü farklı üniversitelerde değerlendirenler",
      description:
        "Akademik kadro, eğitim dili, kampüs, değişim olanakları ve şehir yaşamı birlikte incelenir.",
    },
    {
      title: "Vakıf ve devlet üniversitesini karşılaştıranlar",
      description:
        "Burs sürekliliği, ücret koşulları, akademik yapı ve toplam öğrenci deneyimi aynı tabloda değerlendirilir.",
    },
  ],
  processTitle: "Karşılaştırma Nasıl Yapılır?",
  processIntro:
    "Veriler kararın yerini almaz; seçenekleri daha açık görmeyi ve doğru soruları sormayı sağlar.",
  process: [
    {
      title: "Öğrenci önceliklerini belirleme",
      description:
        "Akademik ilgi, şehir, eğitim dili, kampüs, bütçe ve kariyer beklentileri önem sırasına alınır.",
    },
    {
      title: "Program verilerini toplama",
      description:
        "Ders planları, özel koşullar, kontenjanlar ve üniversitelerin resmî açıklamaları incelenir.",
    },
    {
      title: "Seçenekleri aynı ölçütlerle karşılaştırma",
      description:
        "Her program aynı başlıklar üzerinden değerlendirilerek güçlü yönler ve dikkat edilmesi gereken noktalar görünür hâle getirilir.",
    },
    {
      title: "Kişisel uyumu değerlendirme",
      description:
        "Toplanan bilgiler öğrencinin hedefleriyle eşleştirilir ve karar vermeyi kolaylaştıran bir özet hazırlanır.",
    },
  ],
  benefitsTitle: "Analizde İncelenen Başlıklar",
  benefitsIntro:
    "Kullanılan ölçütler bölüm ve üniversite türüne göre değişebilir; resmî ve güncel kaynaklar esas alınır.",
  benefits: [
    "Ders planı, seçmeli dersler ve bölümün akademik odağı",
    "Eğitim dili, hazırlık sınıfı ve değişim programları",
    "Akademik kadro, laboratuvar ve uygulama olanakları",
    "Kontenjan, başarı sırası ve geçmiş yıl eğilimleri",
    "Burs, ücret, yurt ve yaşam maliyeti koşulları",
    "Staj, kariyer, çift anadal ve yan dal seçenekleri",
  ],
  faqs: [
    {
      question: "Üniversite sıralamaları tek başına yeterli mi?",
      answer:
        "Hayır. Sıralamalar belirli ölçütleri özetleyebilir; ancak öğrencinin bölüm hedefi, ders planı, kampüs beklentisi ve kişisel koşulları ayrıca değerlendirilmelidir.",
    },
    {
      question: "Vakıf üniversitesinde burs koşulları nasıl kontrol edilir?",
      answer:
        "Bursun kapsamı, süresi ve kesilme koşulları ilgili yılın resmî tercih kılavuzu ile üniversitenin güncel açıklamalarından doğrulanmalıdır.",
    },
    {
      question: "Bölümün iş imkânı nasıl değerlendirilir?",
      answer:
        "Tek bir meslek unvanı yerine bölümün kazandırdığı beceriler, staj olanakları, sektör çeşitliliği ve öğrencinin geliştirmesi gereken ek yetkinlikler birlikte ele alınır.",
    },
    {
      question: "Analiz tercih danışmanlığından ayrı yapılabilir mi?",
      answer:
        "İhtiyaca göre belirli bölüm veya üniversiteler için karşılaştırma yapılabilir; kapsam ilk görüşmede netleştirilir.",
    },
  ],
  related: [
    {
      label: "YKS Tercih Danışmanlığı",
      href: "/denizli-yks-tercih-danismanligi",
      description: "Analiz sonuçlarını kişisel tercih stratejisine dönüştürün.",
    },
    {
      label: "Meslek Tanıtım Köşesi",
      href: "/#meslek-kosesi",
      description: "115 meslek dosyasını puan türüne göre inceleyin.",
    },
    {
      label: "Vakıf mı Devlet Üniversitesi mi?",
      href: "/blog/vakif-mi-devlet-universitesi-mi",
      description: "Karar verirken kullanabileceğiniz sekiz temel ölçütü okuyun.",
    },
  ],
};
