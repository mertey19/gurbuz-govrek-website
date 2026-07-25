import type { CareerResource } from "@/data/careerResources";

/**
 * Meslek tanıtım köşesinin kategori sayfaları.
 *
 * Sayfa metinleri özgündür; meslek dosyalarının kendisi Türkiye İş Kurumu
 * (İŞKUR) tarafından hazırlanan resmî tanıtım yayınlarıdır ve PDF olarak
 * kaynak gösterilerek sunulur — metinleri sayfaya kopyalanmaz.
 */
export type CareerCategory = {
  slug: string;
  /** `careerResources` içindeki kategori etiketi */
  key: CareerResource["category"];
  /** Menü ve liste etiketleri */
  label: string;
  shortLabel: string;
  /** <title> ve <h1> */
  title: string;
  heading: string;
  eyebrow: string;
  description: string;
  lead: string;
  /** Puan türünün ne anlama geldiğini anlatan özgün giriş metni */
  intro: readonly string[];
  /** Tercih ederken dikkat edilmesi gereken noktalar */
  considerations: readonly { title: string; description: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const careerCategories: readonly CareerCategory[] = [
  {
    slug: "sayisal",
    key: "SAY",
    label: "Sayısal (SAY) Meslekler",
    shortLabel: "Sayısal",
    title: "Sayısal Meslekler ve Bölümler | Meslek Tanıtım Rehberi",
    heading: "Sayısal Puan Türüyle Tercih Edilen Meslekler",
    eyebrow: "Meslek Tanıtım Köşesi · Sayısal",
    description:
      "Sayısal puan türüyle yerleşilen mühendislik, sağlık ve temel bilim mesleklerinin tanıtım dosyaları. Görevler, çalışma koşulları, eğitim süreci ve iş bulma olanakları.",
    lead:
      "Mühendislik dallarından tıp ve sağlık bilimlerine, temel bilimlerden havacılığa kadar sayısal puan türüyle yerleşilen mesleklerin tanıtım dosyalarını bir arada bulabilirsiniz.",
    intro: [
      "Sayısal puan türü; matematik, fizik, kimya ve biyoloji testlerindeki başarının ağırlıklı olarak belirleyici olduğu puan türüdür. AYT’de bu dört testin netleri, TYT puanıyla birleşerek yerleşme sıranızı oluşturur.",
      "Bu alandaki meslek yelpazesi oldukça geniştir. Aynı puan türüyle bir yandan tıp ve diş hekimliği, diğer yandan yazılım mühendisliği, mimarlık veya ziraat mühendisliği tercih edilebilir. Bu genişlik bir avantaj olduğu kadar, kararı zorlaştıran bir etken de olabilir.",
      "Bu yüzden tercih listesini yalnızca taban puana bakarak değil; mesleğin günlük çalışma biçimini, fiziksel ve zihinsel gerekliliklerini ve mezuniyet sonrası çalışma alanlarını inceleyerek kurmak gerekir. Aşağıdaki dosyalar tam da bunun için hazırlanmıştır.",
    ],
    considerations: [
      {
        title: "Aynı isimli bölümler farklı olabilir",
        description:
          "Elektrik Mühendisliği ile Elektrik-Elektronik Mühendisliği ya da Biyoloji ile Moleküler Biyoloji ve Genetik, adları benzese de ders içerikleri ve çalışma alanları bakımından ayrışır. Dosyaları karşılaştırarak okumak bu farkı görünür kılar.",
      },
      {
        title: "Fiziksel ve sağlık koşullarını okuyun",
        description:
          "Pilotluk, sağlık teknikerlikleri ve bazı mühendislik dalları belirli sağlık şartları veya özel giriş koşulları arar. Bu bilgiler dosyaların “giriş koşulları” bölümünde yer alır ve tercih öncesinde mutlaka okunmalıdır.",
      },
      {
        title: "Çalışma ortamını göz ardı etmeyin",
        description:
          "Bir mesleğin saha mı ofis mi ağırlıklı olduğu, vardiyalı çalışma gerektirip gerektirmediği, günlük yaşam düzeninizi doğrudan etkiler. Puan yeterli olsa bile bu uyum yoksa süreç zorlaşır.",
      },
    ],
    faqs: [
      {
        question: "Sayısal puan türüyle hangi meslekler tercih edilebilir?",
        answer:
          "Mühendislik dalları, tıp, diş hekimliği, eczacılık, veterinerlik, hemşirelik ve diğer sağlık bilimleri, mimarlık, temel bilimler ve ziraat alanları sayısal puan türüyle tercih edilen başlıca gruplardır. Bu sayfadaki dosyalar bu alanların büyük bölümünü kapsar.",
      },
      {
        question: "Meslek dosyalarında hangi bilgiler yer alıyor?",
        answer:
          "Her dosyada mesleğin tanımı, görevleri, gerektirdiği genel özellikler, çalışma ortamı ve koşulları, eğitim süreci, çalışma alanları ile iş bulma olanakları ve meslekte ilerleme başlıkları bulunur.",
      },
      {
        question: "Tercih listemi bu dosyalara bakarak tek başıma kurabilir miyim?",
        answer:
          "Dosyalar meslekleri tanımak için sağlam bir başlangıçtır ancak tek başına yeterli değildir. Başarı sıranız, tercih ettiğiniz şehirler, üniversitelerin akademik yapısı ve kişisel önceliklerinizin birlikte değerlendirilmesi gerekir. Bu değerlendirmeyi birlikte yapmak için görüşme talep edebilirsiniz.",
      },
    ],
  },
  {
    slug: "esit-agirlik",
    key: "EA",
    label: "Eşit Ağırlık (EA) Meslekleri",
    shortLabel: "Eşit Ağırlık",
    title: "Eşit Ağırlık Meslekleri ve Bölümleri | Meslek Tanıtım Rehberi",
    heading: "Eşit Ağırlık Puan Türüyle Tercih Edilen Meslekler",
    eyebrow: "Meslek Tanıtım Köşesi · Eşit Ağırlık",
    description:
      "Eşit ağırlık puan türüyle yerleşilen hukuk, psikoloji, işletme, ekonomi ve finans mesleklerinin tanıtım dosyaları ve tercih öncesi dikkat edilecek noktalar.",
    lead:
      "Hukuktan psikolojiye, bankacılıktan insan kaynaklarına kadar eşit ağırlık puan türüyle yerleşilen mesleklerin tanıtım dosyalarını inceleyebilirsiniz.",
    intro: [
      "Eşit ağırlık puan türünde matematik ile Türk dili ve edebiyatı–sosyal bilimler testleri birbirine yakın ağırlıkta değerlendirilir. Bu nedenle hem sayısal hem sözel becerilerin dengeli olduğu öğrenciler için uygun bir alandır.",
      "Alanın meslek haritası ağırlıklı olarak hukuk, psikoloji, ekonomi, işletme ve finans çevresinde şekillenir. Bu mesleklerin ortak yanı, analitik düşünmeyle birlikte güçlü bir iletişim ve yazılı anlatım becerisi gerektirmesidir.",
      "Eşit ağırlık alanında bölüm adları birbirine yakın göründüğü için karışıklık sık yaşanır. İşletme, ekonomi, çalışma ekonomisi ve uluslararası ticaret farklı müfredatlara ve farklı kariyer yollarına sahiptir.",
    ],
    considerations: [
      {
        title: "Benzer adlı bölümleri ayırt edin",
        description:
          "İşletme, ekonomi, uluslararası ticaret ve yönetim bilişim sistemleri ilk bakışta yakın görünür. Dosyalardaki görev tanımları ve çalışma alanları bölümleri, bu bölümlerin gerçekte nerede ayrıştığını gösterir.",
      },
      {
        title: "Mezuniyet sonrası sınavları hesaba katın",
        description:
          "Hukuk, psikoloji ve öğretmenlik gibi alanlarda mesleğe erişim; staj, KPSS veya alan sınavları gibi ek adımlar içerebilir. Bu adımların süresi ve koşulları kariyer planınızın parçasıdır.",
      },
      {
        title: "İletişim yoğunluğunu değerlendirin",
        description:
          "Bu alandaki mesleklerin büyük bölümü insanla doğrudan çalışmayı gerektirir. Danışan görüşmesi, müzakere veya sunum yoğunluğunun size uygun olup olmadığını baştan düşünmek önemlidir.",
      },
    ],
    faqs: [
      {
        question: "Eşit ağırlık puan türüyle hangi bölümler tercih edilebilir?",
        answer:
          "Hukuk, psikoloji, işletme, ekonomi, maliye, uluslararası ilişkiler, bankacılık ve finans, çalışma ekonomisi ile sınıf öğretmenliği eşit ağırlık alanının başlıca bölümleridir.",
      },
      {
        question: "Eşit ağırlıkta matematik ne kadar belirleyici?",
        answer:
          "Matematik testi eşit ağırlık puanının önemli bir bileşenidir ancak tek başına belirleyici değildir. Türk dili ve edebiyatı ile sosyal bilimler netlerinin de dengeli olması gerekir; iki alandan birinin zayıf kalması sıralamayı belirgin biçimde etkiler.",
      },
      {
        question: "Bu dosyalar güncel mi?",
        answer:
          "Dosyalar Türkiye İş Kurumu’nun yayımladığı resmî meslek tanıtım yayınlarıdır ve künyelerinde yayım bilgisi yer alır. Kontenjan ve taban puan gibi yıldan yıla değişen veriler için tercih döneminde ÖSYM ve YÖK Atlas kaynakları esas alınmalıdır.",
      },
    ],
  },
  {
    slug: "sozel",
    key: "SÖZ",
    label: "Sözel (SÖZ) Meslekler",
    shortLabel: "Sözel",
    title: "Sözel Meslekler ve Bölümler | Meslek Tanıtım Rehberi",
    heading: "Sözel Puan Türüyle Tercih Edilen Meslekler",
    eyebrow: "Meslek Tanıtım Köşesi · Sözel",
    description:
      "Sözel puan türüyle yerleşilen öğretmenlik, edebiyat, turizm ve iletişim mesleklerinin tanıtım dosyaları ve tercih öncesi değerlendirme başlıkları.",
    lead:
      "Öğretmenlikten turizm rehberliğine, edebiyattan gastronomiye kadar sözel puan türüyle yerleşilen mesleklerin tanıtım dosyalarını inceleyebilirsiniz.",
    intro: [
      "Sözel puan türünde Türk dili ve edebiyatı ile tarih, coğrafya, felsefe gibi sosyal bilimler testleri belirleyicidir. Okuduğunu anlama, yorumlama ve kendini yazılı–sözlü ifade etme becerisi bu alanın temelidir.",
      "Alandaki mesleklerin önemli bir bölümü öğretmenlik ve eğitim çevresinde yoğunlaşır. Bunun yanında turizm, gastronomi, iletişim ve sanat yönetimi gibi doğrudan insanla çalışılan alanlar da sözel puanla tercih edilir.",
      "Sözel alanda tercih yaparken mesleğin gerektirdiği sabır, iletişim yoğunluğu ve çalışma temposunun kişisel yapınıza uygunluğu, taban puandan daha belirleyici olabilir.",
    ],
    considerations: [
      {
        title: "Öğretmenlik alanlarını ayırt edin",
        description:
          "Türkçe öğretmenliği ile Türk dili ve edebiyatı öğretmenliği farklı kademelerde görev yapar; okul öncesi, sınıf ve özel eğitim öğretmenliği ise bambaşka çalışma dinamiklerine sahiptir. Dosyalar bu ayrımı somutlaştırır.",
      },
      {
        title: "Atama ve istihdam yolunu araştırın",
        description:
          "Öğretmenlik alanlarında mesleğe geçiş KPSS ve alan sınavlarıyla ilerler. Alanların kontenjan ve atama koşulları farklılaşabildiği için bu bilgiyi tercih öncesinde edinmek gerekir.",
      },
      {
        title: "Sezonluk çalışma düzenini göz önünde bulundurun",
        description:
          "Turizm rehberliği ve rekreasyon gibi alanlarda çalışma temposu mevsime göre değişebilir. Bu düzenin yaşam planınıza uyup uymadığını baştan değerlendirin.",
      },
    ],
    faqs: [
      {
        question: "Sözel puan türüyle hangi meslekler tercih edilebilir?",
        answer:
          "Türkçe ve edebiyat öğretmenliği, okul öncesi ve özel eğitim öğretmenliği, turist rehberliği, gastronomi, rekreasyon ve iletişim alanları sözel puan türüyle tercih edilen başlıca mesleklerdir.",
      },
      {
        question: "Sözel alanda meslek seçerken neye dikkat etmeliyim?",
        answer:
          "Mesleğin günlük iletişim yoğunluğunu, çalışma ortamını ve mezuniyet sonrası istihdam yolunu birlikte değerlendirmek gerekir. Bu alandaki mesleklerin çoğu insanla doğrudan ve sürekli temas içerir.",
      },
    ],
  },
  {
    slug: "dil",
    key: "DİL",
    label: "Dil (DİL) Meslekleri",
    shortLabel: "Dil",
    title: "Dil Puanıyla Tercih Edilen Meslekler | Meslek Tanıtım Rehberi",
    heading: "Dil Puan Türüyle Tercih Edilen Meslekler",
    eyebrow: "Meslek Tanıtım Köşesi · Dil",
    description:
      "Dil puan türüyle yerleşilen mütercim-tercümanlık, İngilizce öğretmenliği ve turist rehberliği mesleklerinin tanıtım dosyaları.",
    lead:
      "Yabancı dil testine dayalı dil puan türüyle yerleşilen mesleklerin tanıtım dosyalarını ve alanın çalışma biçimini inceleyebilirsiniz.",
    intro: [
      "Dil puan türü, YDT (Yabancı Dil Testi) sonucuna dayanır ve diğer puan türlerinden farklı bir sınav süreci içerir. Bu nedenle hazırlık stratejisi de ayrışır.",
      "Alandaki bölüm sayısı sınırlı olsa da mezuniyet sonrası çalışma alanları düşünüldüğünden geniştir: çeviri, öğretmenlik, turizm, dış ticaret ve uluslararası kurumlarda görev alma seçenekleri bulunur.",
      "Dil alanında mesleğe hâkimiyet yalnızca sınav başarısıyla değil, dilin aktif kullanımıyla sürdürülür. Bu yüzden bölüm seçerken üniversitenin dil eğitimi yaklaşımı ve değişim programı olanakları önemli bir ölçüt olur.",
    ],
    considerations: [
      {
        title: "Hazırlık ve dil seviyesi şartlarını inceleyin",
        description:
          "Programların hazırlık sınıfı zorunluluğu ve muafiyet koşulları üniversiteye göre değişir. Bu bilgi eğitim sürenizi doğrudan etkiler.",
      },
      {
        title: "İkinci yabancı dil olanaklarına bakın",
        description:
          "Çeviri ve uluslararası çalışma alanlarında ikinci bir yabancı dil belirgin bir fark yaratır. Bölümün bu konuda sunduğu olanaklar tercih ölçütü olabilir.",
      },
    ],
    faqs: [
      {
        question: "Dil puanıyla hangi bölümler tercih edilebilir?",
        answer:
          "Mütercim-tercümanlık, İngilizce ve diğer yabancı dil öğretmenlikleri, dil ve edebiyat programları ile turist rehberliği dil puan türüyle tercih edilen başlıca bölümlerdir.",
      },
      {
        question: "Dil alanına geçiş yapmak mantıklı mı?",
        answer:
          "Bu karar mevcut dil seviyenize, hazırlanmak için kalan süreye ve hedeflediğiniz mesleğe bağlıdır. Alan değişikliği ciddi bir planlama gerektirir; karar öncesinde birlikte değerlendirmek en sağlıklısıdır.",
      },
    ],
  },
  {
    slug: "tyt",
    key: "TYT",
    label: "TYT ve Ön Lisans Meslekleri",
    shortLabel: "TYT",
    title: "TYT Puanıyla Tercih Edilen Meslekler ve Ön Lisans Bölümleri",
    heading: "TYT Puanıyla Tercih Edilen Meslekler",
    eyebrow: "Meslek Tanıtım Köşesi · TYT",
    description:
      "TYT puanıyla yerleşilen iki yıllık ön lisans programları ve sağlık teknikerliği, bilişim ve teknik alanlardaki mesleklerin tanıtım dosyaları.",
    lead:
      "Sağlık teknikerliğinden bilişim ve teknik alanlara kadar TYT puanıyla yerleşilen iki yıllık programların meslek tanıtım dosyalarını inceleyebilirsiniz.",
    intro: [
      "TYT puanı, yalnızca Temel Yeterlilik Testi sonucuna dayanır ve ağırlıklı olarak iki yıllık ön lisans programlarının tercihinde kullanılır. Bu programlar genellikle uygulama ağırlıklıdır ve mezunları belirli bir teknik alanda uzmanlaşır.",
      "Ön lisans, sıklıkla “ikinci seçenek” gibi görülür; oysa özellikle sağlık teknikerlikleri ve bilişim alanlarında istihdam olanakları ve mesleğe erken başlama avantajı dikkate değerdir.",
      "Ayrıca DGS (Dikey Geçiş Sınavı) ile ilgili lisans programlarına geçiş mümkündür. Bu nedenle ön lisans tercihi, uzun vadeli bir plan içinde değerlendirildiğinde daha isabetli olur.",
    ],
    considerations: [
      {
        title: "DGS geçiş olanaklarını baştan planlayın",
        description:
          "Her ön lisans programının dikey geçiş yapabileceği lisans programları bellidir. Hedefiniz lisans tamamlamaksa, bu listeyi tercih aşamasında incelemek yolunuzu kısaltır.",
      },
      {
        title: "Staj ve uygulama yapısını sorun",
        description:
          "Ön lisans programlarında mesleki yetkinlik büyük ölçüde uygulamayla kazanılır. Programın staj imkânları ve iş birliği yaptığı kurumlar belirleyici bir ölçüttür.",
      },
      {
        title: "Sağlık programlarının giriş koşullarına dikkat edin",
        description:
          "Bazı sağlık teknikerliği programları belirli sağlık şartları arar. Bu koşullar dosyaların giriş koşulları bölümünde belirtilir.",
      },
    ],
    faqs: [
      {
        question: "TYT puanıyla hangi bölümlere girilebilir?",
        answer:
          "Sağlık teknikerlikleri, bilişim ve ağ teknolojileri, dijital oyun tasarımı, optisyenlik, anestezi ve diş protez gibi iki yıllık ön lisans programları TYT puanıyla tercih edilir.",
      },
      {
        question: "İki yıllık bölüm okuduktan sonra lisans tamamlanabilir mi?",
        answer:
          "Evet. Dikey Geçiş Sınavı (DGS) ile ilgili lisans programlarına geçiş yapılabilir. Hangi ön lisans programının hangi lisans programlarına geçiş hakkı verdiği ÖSYM tarafından her yıl yayımlanır.",
      },
      {
        question: "Ön lisans tercihinde en sık yapılan hata nedir?",
        answer:
          "Programı yalnızca puanı tuttuğu için seçmek en sık karşılaşılan hatadır. Mesleğin çalışma ortamı, istihdam alanı ve dikey geçiş olanakları birlikte değerlendirilmediğinde, iki yılın sonunda yeniden karar aşamasına dönülebiliyor.",
      },
    ],
  },
];

/** Sayfa dosyalarından çağrılır; tanımsız bir slug build sırasında hata verir. */
export function getCareerCategory(slug: string): CareerCategory {
  const category = careerCategories.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Tanımsız meslek kategorisi: ${slug}`);
  }
  return category;
}
