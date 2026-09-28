/*
 * Maket məzmunu.
 *
 * Bu fayldakı məhsul qrupları, həllər və sektorlar sənədlərdəki quruluşa uyğundur.
 * Məhsullar, kodlar, texniki göstəricilər və kataloqlar isə YALNIZ quruluşu göstərmək
 * üçün nümunədir — DEFNE GROUP real məzmunu təqdim etdikdən sonra əvəz olunmalıdır
 * (ikinci mərhələ sənədi, bölmə 7). Gələcəkdə bu məlumatlar admin paneli / API-dən gələcək.
 */

export type IconName =
  | "paw"
  | "stethoscope"
  | "bench"
  | "trees"
  | "cross"
  | "heart-hand"
  | "shirt"
  | "hard-hat"
  | "spray"
  | "trash"
  | "utensils"
  | "briefcase"
  | "landmark"
  | "shield"
  | "hospital"
  | "school"
  | "factory"
  | "users"
  | "building"
  | "home"
  | "siren"
  | "search"
  | "clipboard"
  | "file-check"
  | "truck";

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: IconName;
  image?: string;
  featured?: boolean;
};

export const categories: Category[] = [
  {
    slug: "sokak-hayvanlari-ekipmanlari",
    name: "Sokak Hayvanları Ekipmanları",
    short: "Barınak, yakalama, besleme ve bakım çözümleri.",
    description:
      "Belediye barınakları ve saha ekipleri için yakalama, taşıma, besleme ve bakım ekipmanları.",
    icon: "paw",
    featured: true,
  },
  {
    slug: "veteriner-ve-klinik-urunleri",
    name: "Veteriner ve Klinik Ürünleri",
    short: "Muayene, cerrahi ve klinik donanım.",
    description: "Veteriner klinikleri ve barınak revirleri için muayene, cerrahi ve sarf ürünleri.",
    icon: "stethoscope",
    featured: true,
  },
  {
    slug: "kent-mobilyalari",
    name: "Kent Mobilyaları",
    short: "Oturma grupları, çöp kutuları, bariyerler.",
    description: "Meydan, park ve kamusal alanlar için dayanıklı ve estetik kent mobilyaları.",
    icon: "bench",
    featured: true,
  },
  {
    slug: "park-ve-bahce-ekipmanlari",
    name: "Park ve Bahçe Ekipmanları",
    short: "Oyun grupları, spor aletleri, peyzaj ürünleri.",
    description: "Park, bahçe ve rekreasyon alanları için oyun, spor ve peyzaj ekipmanları.",
    icon: "trees",
  },
  {
    slug: "tibbi-ve-medikal-urunler",
    name: "Tıbbi ve Medikal Ürünler",
    short: "Medikal sarf, ilk yardım ve hasta bakım ürünleri.",
    description: "Sağlık kurumları ve kamu birimleri için medikal sarf, ilk yardım ve hasta bakım ürünleri.",
    icon: "cross",
    featured: true,
  },
  {
    slug: "sosyal-yardim-ve-afet-urunleri",
    name: "Sosyal Yardım ve Afet Ürünleri",
    short: "Çadır, battaniye, hijyen kiti ve yaşam alanı ürünleri.",
    description:
      "Sosyal hizmet kurumları ve afet koordinasyonu için barınma, hijyen ve temel ihtiyaç ürünleri.",
    icon: "heart-hand",
    featured: true,
  },
  {
    slug: "uniforma-ve-is-kiyafetleri",
    name: "Üniforma ve İş Kıyafetleri",
    short: "Kurumsal üniforma, saha ve iş kıyafetleri.",
    description: "Kurum kimliğine uygun üniforma, saha kıyafeti ve mevsimsel iş giyim çözümleri.",
    icon: "shirt",
    featured: true,
  },
  {
    slug: "is-guvenligi-ve-kkd",
    name: "İş Güvenliği ve KKD",
    short: "Kişisel koruyucu donanım ve saha güvenliği.",
    description: "Saha ekipleri için kişisel koruyucu donanım, işaretleme ve güvenlik ekipmanları.",
    icon: "hard-hat",
  },
  {
    slug: "dezenfeksiyon-ve-hijyen",
    name: "Dezenfeksiyon ve Hijyen",
    short: "Dezenfektan, ilaçlama ve hijyen ekipmanları.",
    description: "Kurumsal alanlar ve saha uygulamaları için dezenfeksiyon, ilaçlama ve hijyen çözümleri.",
    icon: "spray",
    featured: true,
  },
  {
    slug: "temizlik-ve-atik-yonetimi",
    name: "Temizlik ve Atık Yönetimi",
    short: "Konteyner, temizlik ekipmanı ve sarf.",
    description: "Atık konteynerleri, temizlik makineleri ve kurumsal temizlik sarf malzemeleri.",
    icon: "trash",
  },
  {
    slug: "otel-restoran-catering-ekipmanlari",
    name: "Otel, Restoran ve Catering",
    short: "Mutfak, servis ve konaklama ekipmanları.",
    description: "Toplu yemek, konaklama ve servis alanları için profesyonel ekipman ve sarf ürünleri.",
    icon: "utensils",
    featured: true,
  },
  {
    slug: "ofis-ve-kurumsal-tedarik",
    name: "Ofis ve Kurumsal Tedarik",
    short: "Ofis mobilyası, kırtasiye ve kurumsal sarf.",
    description: "Kamu ve özel kurumların ofis mobilyası, kırtasiye ve günlük sarf ihtiyaçları.",
    icon: "briefcase",
  },
];

export type Sector = { slug: string; name: string; description: string; icon: IconName };

export const sectors: Sector[] = [
  {
    slug: "belediyeler",
    name: "Belediyeler",
    description: "Barınak, kent mobilyası, park-bahçe, temizlik ve sosyal hizmet tedariki.",
    icon: "building",
  },
  {
    slug: "valilikler-ve-kamu-kurumlari",
    name: "Valilikler ve Kamu Kurumları",
    description: "Kurumsal tedarik, afet hazırlığı ve ihale şartnamesine uygun ürün çözümleri.",
    icon: "landmark",
  },
  {
    slug: "jandarma-emniyet-ve-askeri-birimler",
    name: "Jandarma, Emniyet ve Askeri Birimler",
    description: "Üniforma, saha ekipmanı, koruyucu donanım ve lojistik destek ürünleri.",
    icon: "shield",
  },
  {
    slug: "saglik",
    name: "Sağlık",
    description: "Hastane, sağlık merkezi ve klinikler için medikal sarf ve donanım.",
    icon: "hospital",
  },
  {
    slug: "egitim",
    name: "Eğitim",
    description: "Okul, yurt ve eğitim kampüsleri için mobilya, hijyen ve kantin ekipmanı.",
    icon: "school",
  },
  {
    slug: "otel-restoran-ve-catering",
    name: "Otel, Restoran ve Catering",
    description: "Mutfak, servis, konaklama ve hijyen ürünlerinde toplu tedarik.",
    icon: "utensils",
  },
  {
    slug: "sanayi-ve-ozel-sektor",
    name: "Sanayi ve Özel Sektör",
    description: "İş güvenliği, iş kıyafeti, temizlik ve tesis ihtiyaçları için tedarik.",
    icon: "factory",
  },
  {
    slug: "sosyal-hizmet-kurumlari",
    name: "Sosyal Hizmet Kurumları",
    description: "Huzurevi, bakım merkezi ve sosyal tesisler için bakım ve yaşam ürünleri.",
    icon: "users",
  },
];

export type Solution = {
  slug: string;
  name: string;
  need: string;
  description: string;
  scope: string[];
  categorySlugs: string[];
  sectorSlugs: string[];
  icon: IconName;
};

export const solutions: Solution[] = [
  {
    slug: "barinak-kurulumu-ve-donatimi",
    name: "Barınak Kurulumu ve Donatımı",
    need: "Yeni bir hayvan barınağı açmak ya da mevcut barınağı yenilemek istiyorum.",
    description:
      "Barınak ihtiyaç analizinden kafes, revir, besleme ve hijyen donanımına kadar tüm kalemleri tek projede planlıyoruz.",
    scope: ["İhtiyaç ve kapasite analizi", "Kafes ve yaşam alanı donanımı", "Revir ve klinik ekipmanı", "Hijyen ve dezenfeksiyon planı"],
    categorySlugs: ["sokak-hayvanlari-ekipmanlari", "veteriner-ve-klinik-urunleri", "dezenfeksiyon-ve-hijyen"],
    sectorSlugs: ["belediyeler"],
    icon: "paw",
  },
  {
    slug: "kent-donatisi-projeleri",
    name: "Kent Donatısı Projeleri",
    need: "Meydan, park veya cadde için bütüncül bir donatı çözümüne ihtiyacım var.",
    description:
      "Kent mobilyası, park ekipmanı ve atık yönetimi ürünlerini proje çizimine ve şartnameye uygun olarak bir araya getiriyoruz.",
    scope: ["Şartname ve metraj uyumu", "Kent mobilyası seçimi", "Park ve oyun alanı ekipmanı", "Atık ve temizlik donatısı"],
    categorySlugs: ["kent-mobilyalari", "park-ve-bahce-ekipmanlari", "temizlik-ve-atik-yonetimi"],
    sectorSlugs: ["belediyeler", "valilikler-ve-kamu-kurumlari"],
    icon: "bench",
  },
  {
    slug: "afet-ve-acil-durum-tedariki",
    name: "Afet ve Acil Durum Tedariki",
    need: "Afet ve acil durumlar için hızlı ve planlı stok oluşturmam gerekiyor.",
    description:
      "Barınma, hijyen, ilk yardım ve temel ihtiyaç ürünlerini kurumunuzun afet planına göre paketleyip tedarik ediyoruz.",
    scope: ["Afet planına göre ürün listesi", "Barınma ve yaşam ürünleri", "Hijyen ve ilk yardım kitleri", "Depolama ve sevk planı"],
    categorySlugs: ["sosyal-yardim-ve-afet-urunleri", "tibbi-ve-medikal-urunler", "dezenfeksiyon-ve-hijyen"],
    sectorSlugs: ["valilikler-ve-kamu-kurumlari", "belediyeler", "sosyal-hizmet-kurumlari"],
    icon: "siren",
  },
  {
    slug: "hijyen-ve-dezenfeksiyon-programlari",
    name: "Hijyen ve Dezenfeksiyon Programları",
    need: "Kurumumuzun hijyen standardını sürdürülebilir şekilde yönetmek istiyorum.",
    description:
      "Alan tipine göre dezenfektan, ekipman ve sarf planlaması yaparak düzenli ve ölçülebilir bir hijyen programı kuruyoruz.",
    scope: ["Alan ve risk değerlendirmesi", "Ürün ve ekipman seçimi", "Periyodik sarf planı", "Uygulama dokümantasyonu"],
    categorySlugs: ["dezenfeksiyon-ve-hijyen", "temizlik-ve-atik-yonetimi"],
    sectorSlugs: ["saglik", "egitim", "otel-restoran-ve-catering"],
    icon: "spray",
  },
  {
    slug: "personel-donatimi",
    name: "Personel Donatımı",
    need: "Saha ve ofis personelimizin kıyafet ve koruyucu ekipmanını tek elden almak istiyorum.",
    description:
      "Kurumsal kimliğe uygun üniforma, iş kıyafeti ve KKD ürünlerini beden dağılımı ve sevkiyat planıyla birlikte sunuyoruz.",
    scope: ["Kurum kimliğine uygun tasarım", "Beden ve adet planlaması", "KKD uyum kontrolü", "Toplu paketleme ve sevkiyat"],
    categorySlugs: ["uniforma-ve-is-kiyafetleri", "is-guvenligi-ve-kkd"],
    sectorSlugs: ["jandarma-emniyet-ve-askeri-birimler", "sanayi-ve-ozel-sektor", "belediyeler"],
    icon: "shirt",
  },
  {
    slug: "saglik-ve-sosyal-tesis-donatimi",
    name: "Sağlık ve Sosyal Tesis Donatımı",
    need: "Sağlık veya bakım tesisimizin donanımını eksiksiz tamamlamak istiyorum.",
    description:
      "Medikal sarf, hasta bakım ürünleri, mobilya ve hijyen kalemlerini tek teklif altında topluyoruz.",
    scope: ["Tesis ihtiyaç listesi", "Medikal ve bakım ürünleri", "Mobilya ve yaşam alanı", "Sarf yenileme planı"],
    categorySlugs: ["tibbi-ve-medikal-urunler", "sosyal-yardim-ve-afet-urunleri", "ofis-ve-kurumsal-tedarik"],
    sectorSlugs: ["saglik", "sosyal-hizmet-kurumlari"],
    icon: "hospital",
  },
];

export const processSteps = [
  {
    title: "İhtiyacın Belirlenmesi",
    text: "Kurumunuzun ihtiyacını, şartnamesini ve kullanım koşullarını birlikte netleştiriyoruz.",
    icon: "search" as IconName,
  },
  {
    title: "Ürün ve Teknik Çözüm Seçimi",
    text: "Uygun ürünleri, teknik özellikleri ve alternatifleri karşılaştırmalı olarak sunuyoruz.",
    icon: "clipboard" as IconName,
  },
  {
    title: "Teklif ve Onay Süreci",
    text: "Şeffaf ve detaylı teklifimizi hazırlıyor, onay sürecinizi takip ediyoruz.",
    icon: "file-check" as IconName,
  },
  {
    title: "Tedarik ve Teslimat",
    text: "Planlanan tarihte, eksiksiz ve kayıt altında teslimatı gerçekleştiriyoruz.",
    icon: "truck" as IconName,
  },
];

export const trustItems = [
  { title: "Kamu ve özel sektöre tedarik", icon: "landmark" as IconName },
  { title: "Geniş ürün portföyü", icon: "clipboard" as IconName },
  { title: "Projeye özel çözümler", icon: "file-check" as IconName },
  { title: "Türkiye geneli hizmet", icon: "truck" as IconName },
];

export type ProductDoc = { name: string; type: "PDF" | "DOCX" | "XLSX"; size: string };

export type Product = {
  slug: string;
  code: string;
  name: string;
  categorySlug: string;
  sectorSlugs: string[];
  usageAreas: string[];
  summary: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  variants: string[];
  packaging: string;
  documents: ProductDoc[];
  keywords: string[];
  isNew?: boolean;
  featured?: boolean;
  images?: string[];
};

export const usageAreas = ["Barınak", "Saha", "Klinik", "Kamusal alan", "Park", "Mutfak", "Ofis", "Depo"];

export const products: Product[] = [
  {
    slug: "paslanmaz-barinak-kafesi-modul",
    code: "DG-SH-1001",
    name: "Paslanmaz Barınak Kafesi (Modüler)",
    categorySlug: "sokak-hayvanlari-ekipmanlari",
    sectorSlugs: ["belediyeler"],
    usageAreas: ["Barınak", "Klinik"],
    summary: "Modüler, kolay temizlenen, paslanmaz gövdeli barınak kafesi.",
    description:
      "Barınak ve revir alanlarında kullanılmak üzere tasarlanan modüler kafes sistemi; yan yana ve üst üste kurulabilir, tabanı kolay temizlenir.",
    features: ["Modüler bağlantı sistemi", "Çıkarılabilir taban tepsisi", "Kilitlenebilir kapı", "Kolay dezenfeksiyon"],
    specs: [
      { label: "Malzeme", value: "Paslanmaz çelik" },
      { label: "Kapı", value: "Kilit mekanizmalı" },
      { label: "Montaj", value: "Modüler, yan yana / üst üste" },
    ],
    variants: ["Küçük", "Orta", "Büyük"],
    packaging: "Demonte, koli içinde",
    documents: [{ name: "Teknik föy", type: "PDF", size: "—" }],
    keywords: ["kafes", "barınak", "paslanmaz", "revir"],
    featured: true,
    isNew: true,
  },
  {
    slug: "yakalama-kementi",
    code: "DG-SH-1002",
    name: "Hayvan Yakalama Kementi",
    categorySlug: "sokak-hayvanlari-ekipmanlari",
    sectorSlugs: ["belediyeler"],
    usageAreas: ["Saha"],
    summary: "Ayarlanabilir, hafif gövdeli, güvenli yakalama kementi.",
    description: "Saha ekiplerinin hayvana zarar vermeden güvenli yakalama yapabilmesi için ayarlanabilir kement.",
    features: ["Kilitli halka mekanizması", "Hafif gövde", "Kaymaz tutamak"],
    specs: [
      { label: "Gövde", value: "Alüminyum" },
      { label: "Halka", value: "Kaplamalı çelik halat" },
    ],
    variants: ["Standart", "Teleskopik"],
    packaging: "Tekli koli",
    documents: [{ name: "Kullanım kılavuzu", type: "PDF", size: "—" }],
    keywords: ["kement", "yakalama", "saha"],
    featured: true,
  },
  {
    slug: "otomatik-mama-istasyonu",
    code: "DG-SH-1003",
    name: "Sokak Hayvanı Mama ve Su İstasyonu",
    categorySlug: "sokak-hayvanlari-ekipmanlari",
    sectorSlugs: ["belediyeler"],
    usageAreas: ["Kamusal alan", "Park"],
    summary: "Kamusal alanlar için dayanıklı mama ve su istasyonu.",
    description: "Park ve kamusal alanlarda sokak hayvanlarının beslenmesi için hava koşullarına dayanıklı istasyon.",
    features: ["Hava koşullarına dayanıklı", "Zemine sabitlenebilir", "Kolay dolum kapağı"],
    specs: [
      { label: "Gövde", value: "Galvaniz / elektrostatik boya" },
      { label: "Montaj", value: "Zemine ankraj" },
    ],
    variants: ["Tekli", "İkili"],
    packaging: "Palet",
    documents: [],
    keywords: ["mama", "su", "istasyon", "besleme"],
    featured: true,
  },
  {
    slug: "muayene-masasi-paslanmaz",
    code: "DG-VK-2001",
    name: "Paslanmaz Muayene Masası",
    categorySlug: "veteriner-ve-klinik-urunleri",
    sectorSlugs: ["belediyeler", "saglik"],
    usageAreas: ["Klinik"],
    summary: "Klinik ve barınak revirleri için paslanmaz muayene masası.",
    description: "Kolay temizlenen yüzeyi ve sağlam gövdesiyle klinik muayene ve küçük müdahaleler için uygundur.",
    features: ["Paslanmaz tabla", "Tekerlekli gövde seçeneği", "Kenar sıvı kanalı"],
    specs: [
      { label: "Tabla", value: "Paslanmaz çelik" },
      { label: "Gövde", value: "Sabit / tekerlekli" },
    ],
    variants: ["Sabit", "Tekerlekli", "Hidrolik"],
    packaging: "Palet",
    documents: [{ name: "Teknik föy", type: "PDF", size: "—" }],
    keywords: ["masa", "muayene", "klinik", "veteriner"],
  },
  {
    slug: "kent-bank-ahsap-metal",
    code: "DG-KM-3001",
    name: "Kent Bankı (Ahşap–Metal)",
    categorySlug: "kent-mobilyalari",
    sectorSlugs: ["belediyeler", "valilikler-ve-kamu-kurumlari"],
    usageAreas: ["Kamusal alan", "Park"],
    summary: "Emprenyeli ahşap oturak ve metal ayaklı kent bankı.",
    description: "Meydan, park ve yürüyüş yolları için dayanıklı, sırtlıklı kent bankı.",
    features: ["Emprenyeli ahşap oturak", "Elektrostatik boyalı ayak", "Zemine sabitleme"],
    specs: [
      { label: "Oturak", value: "Emprenyeli ahşap" },
      { label: "Ayak", value: "Döküm / çelik" },
    ],
    variants: ["Sırtlıklı", "Sırtlıksız"],
    packaging: "Palet",
    documents: [{ name: "Ürün kataloğu sayfası", type: "PDF", size: "—" }],
    keywords: ["bank", "oturma", "kent mobilyası", "park"],
    featured: true,
  },
  {
    slug: "cop-kutusu-galvaniz",
    code: "DG-KM-3002",
    name: "Galvaniz Çöp Kutusu",
    categorySlug: "kent-mobilyalari",
    sectorSlugs: ["belediyeler"],
    usageAreas: ["Kamusal alan", "Park"],
    summary: "İç kovalı, galvaniz gövdeli kamusal alan çöp kutusu.",
    description: "Cadde ve parklar için iç kovası çıkarılabilen, dayanıklı galvaniz çöp kutusu.",
    features: ["Çıkarılabilir iç kova", "Yağmur korumalı kapak", "Zemine ankraj"],
    specs: [{ label: "Gövde", value: "Galvaniz sac" }],
    variants: ["Direk tipi", "Ayaklı"],
    packaging: "Tekli koli",
    documents: [],
    keywords: ["çöp kutusu", "atık", "kent"],
    isNew: true,
  },
  {
    slug: "ilk-yardim-cantasi",
    code: "DG-TM-4001",
    name: "Kurumsal İlk Yardım Çantası",
    categorySlug: "tibbi-ve-medikal-urunler",
    sectorSlugs: ["valilikler-ve-kamu-kurumlari", "egitim", "sanayi-ve-ozel-sektor"],
    usageAreas: ["Ofis", "Saha"],
    summary: "Kurum ve araçlar için içerik listeli ilk yardım çantası.",
    description: "Ofis, araç ve saha ekipleri için içerik listesiyle birlikte teslim edilen ilk yardım çantası.",
    features: ["İçerik listesi", "Dayanıklı kumaş çanta", "Duvar askı seçeneği"],
    specs: [{ label: "Çanta", value: "Su itici kumaş" }],
    variants: ["Araç", "Ofis", "Saha"],
    packaging: "Koli içi 10 adet",
    documents: [{ name: "İçerik listesi", type: "PDF", size: "—" }],
    keywords: ["ilk yardım", "çanta", "medikal"],
    featured: true,
  },
  {
    slug: "afet-battaniyesi",
    code: "DG-SY-5001",
    name: "Afet Battaniyesi",
    categorySlug: "sosyal-yardim-ve-afet-urunleri",
    sectorSlugs: ["valilikler-ve-kamu-kurumlari", "belediyeler", "sosyal-hizmet-kurumlari"],
    usageAreas: ["Depo", "Saha"],
    summary: "Vakumlu paketlenebilen, ısı tutucu afet battaniyesi.",
    description: "Afet ve acil durum stokları için vakumlu paketlenebilen, depolama alanı tasarrufu sağlayan battaniye.",
    features: ["Vakumlu paketleme", "Isı tutucu dokuma", "Uzun süreli depolama"],
    specs: [{ label: "Paketleme", value: "Vakumlu" }],
    variants: ["Tek kişilik", "Çift kişilik"],
    packaging: "Balya",
    documents: [],
    keywords: ["battaniye", "afet", "acil durum"],
    featured: true,
  },
  {
    slug: "saha-personeli-montu",
    code: "DG-UN-6001",
    name: "Saha Personeli Montu",
    categorySlug: "uniforma-ve-is-kiyafetleri",
    sectorSlugs: ["belediyeler", "jandarma-emniyet-ve-askeri-birimler", "sanayi-ve-ozel-sektor"],
    usageAreas: ["Saha"],
    summary: "Reflektörlü, su itici saha personeli montu.",
    description: "Kurum logosu işlenebilen, reflektör bantlı, su itici dış kumaşlı saha montu.",
    features: ["Reflektör bant", "Su itici kumaş", "Logo nakış / baskı alanı"],
    specs: [{ label: "Dış kumaş", value: "Su itici polyester" }],
    variants: ["S", "M", "L", "XL", "XXL"],
    packaging: "Tekli poşet, koli",
    documents: [{ name: "Beden tablosu", type: "PDF", size: "—" }],
    keywords: ["mont", "üniforma", "iş kıyafeti", "saha"],
    isNew: true,
  },
  {
    slug: "reflektorlu-yelek",
    code: "DG-KKD-7001",
    name: "Reflektörlü İkaz Yeleği",
    categorySlug: "is-guvenligi-ve-kkd",
    sectorSlugs: ["belediyeler", "sanayi-ve-ozel-sektor"],
    usageAreas: ["Saha"],
    summary: "Yüksek görünürlüklü, logo baskılı ikaz yeleği.",
    description: "Saha ve trafik çalışmalarında görünürlüğü artıran, logo baskısına uygun ikaz yeleği.",
    features: ["Yüksek görünürlük", "Cırt kapama", "Logo baskı alanı"],
    specs: [{ label: "Renk", value: "Sarı / turuncu" }],
    variants: ["Standart", "Fermuarlı"],
    packaging: "Koli içi 50 adet",
    documents: [],
    keywords: ["yelek", "reflektör", "kkd"],
  },
  {
    slug: "yuzey-dezenfektani",
    code: "DG-DH-8001",
    name: "Yüzey Dezenfektanı (Konsantre)",
    categorySlug: "dezenfeksiyon-ve-hijyen",
    sectorSlugs: ["saglik", "egitim", "otel-restoran-ve-catering", "belediyeler"],
    usageAreas: ["Barınak", "Klinik", "Ofis", "Mutfak"],
    summary: "Seyreltilerek kullanılan konsantre yüzey dezenfektanı.",
    description: "Kurumsal alanlarda yüzey dezenfeksiyonu için seyreltilerek kullanılan konsantre ürün.",
    features: ["Konsantre formül", "Geniş kullanım alanı", "Uygulama talimatlı"],
    specs: [{ label: "Form", value: "Sıvı konsantre" }],
    variants: ["5 L", "20 L"],
    packaging: "Bidon",
    documents: [
      { name: "Güvenlik bilgi formu", type: "PDF", size: "—" },
      { name: "Uygulama talimatı", type: "PDF", size: "—" },
    ],
    keywords: ["dezenfektan", "hijyen", "yüzey"],
    featured: true,
  },
  {
    slug: "sirt-tipi-ilaclama-pompasi",
    code: "DG-DH-8002",
    name: "Sırt Tipi İlaçlama Pompası",
    categorySlug: "dezenfeksiyon-ve-hijyen",
    sectorSlugs: ["belediyeler"],
    usageAreas: ["Saha", "Barınak", "Park"],
    summary: "Saha dezenfeksiyon ve ilaçlama uygulamaları için sırt pompası.",
    description: "Barınak, park ve saha uygulamalarında dezenfeksiyon ve ilaçlama için sırt tipi pompa.",
    features: ["Ayarlanabilir nozul", "Ergonomik taşıma", "Basınç göstergesi"],
    specs: [{ label: "Tip", value: "Manuel / akülü" }],
    variants: ["Manuel", "Akülü"],
    packaging: "Tekli koli",
    documents: [{ name: "Kullanım kılavuzu", type: "PDF", size: "—" }],
    keywords: ["pompa", "ilaçlama", "dezenfeksiyon"],
  },
  {
    slug: "tekerlekli-atik-konteyneri",
    code: "DG-TA-9001",
    name: "Tekerlekli Atık Konteyneri",
    categorySlug: "temizlik-ve-atik-yonetimi",
    sectorSlugs: ["belediyeler", "sanayi-ve-ozel-sektor"],
    usageAreas: ["Kamusal alan", "Depo"],
    summary: "Kapaklı, tekerlekli plastik atık konteyneri.",
    description: "Cadde ve tesislerde atık toplama için kapaklı, tekerlekli konteyner.",
    features: ["Kapaklı gövde", "Tekerlekli", "Araç kaldırma uyumlu"],
    specs: [{ label: "Gövde", value: "HDPE" }],
    variants: ["120 L", "240 L", "770 L"],
    packaging: "İstiflenmiş",
    documents: [],
    keywords: ["konteyner", "atık", "çöp"],
  },
  {
    slug: "endustriyel-yemek-arabasi",
    code: "DG-ORC-10001",
    name: "Paslanmaz Servis Arabası",
    categorySlug: "otel-restoran-catering-ekipmanlari",
    sectorSlugs: ["otel-restoran-ve-catering", "saglik", "egitim"],
    usageAreas: ["Mutfak"],
    summary: "Toplu yemek servisi için paslanmaz servis arabası.",
    description: "Yemekhane ve toplu servis alanları için raflı, paslanmaz servis arabası.",
    features: ["Paslanmaz gövde", "Frenli tekerlek", "Raflı yapı"],
    specs: [{ label: "Gövde", value: "Paslanmaz çelik" }],
    variants: ["2 raf", "3 raf"],
    packaging: "Koli",
    documents: [],
    keywords: ["servis arabası", "mutfak", "catering"],
    featured: true,
  },
  {
    slug: "calisma-masasi-kurumsal",
    code: "DG-OK-11001",
    name: "Kurumsal Çalışma Masası",
    categorySlug: "ofis-ve-kurumsal-tedarik",
    sectorSlugs: ["valilikler-ve-kamu-kurumlari", "egitim"],
    usageAreas: ["Ofis"],
    summary: "Kablo kanallı, kurumsal ofis çalışma masası.",
    description: "Kamu ve kurum ofisleri için kablo kanallı, dayanıklı çalışma masası.",
    features: ["Kablo kanalı", "Çizilmeye dayanıklı yüzey"],
    specs: [{ label: "Yüzey", value: "Melamin kaplı yonga levha" }],
    variants: ["120 cm", "140 cm", "160 cm"],
    packaging: "Demonte, koli",
    documents: [],
    keywords: ["masa", "ofis", "mobilya"],
  },
  {
    slug: "cocuk-oyun-grubu",
    code: "DG-PB-12001",
    name: "Çocuk Oyun Grubu",
    categorySlug: "park-ve-bahce-ekipmanlari",
    sectorSlugs: ["belediyeler", "egitim"],
    usageAreas: ["Park"],
    summary: "Kaydıraklı, tırmanma elemanlı çocuk oyun grubu.",
    description: "Park ve okul bahçeleri için kaydırak ve tırmanma elemanlarından oluşan oyun grubu.",
    features: ["Modüler tasarım", "Yuvarlatılmış köşeler", "UV dayanımlı plastik"],
    specs: [{ label: "Taşıyıcı", value: "Galvaniz direk" }],
    variants: ["Küçük yaş", "Büyük yaş"],
    packaging: "Palet",
    documents: [{ name: "Montaj planı", type: "PDF", size: "—" }],
    keywords: ["oyun grubu", "park", "kaydırak"],
    isNew: true,
  },
];

export type Catalog = {
  slug: string;
  name: string;
  type: "Ürün Kataloğu" | "Teknik Doküman" | "Kurumsal Tanıtım";
  updatedAt: string;
  file?: string;
  categorySlug?: string;
};

// Kataloqlar DEFNE GROUP tərəfindən təqdim edildikdən sonra `file` sahəsi doldurulacaq.
export const catalogs: Catalog[] = [
  { slug: "genel-urun-katalogu", name: "Genel Ürün Kataloğu", type: "Ürün Kataloğu", updatedAt: "2026-09" },
  { slug: "kurumsal-tanitim", name: "Kurumsal Tanıtım Dosyası", type: "Kurumsal Tanıtım", updatedAt: "2026-09" },
  {
    slug: "sokak-hayvanlari-katalogu",
    name: "Sokak Hayvanları Ekipmanları",
    type: "Ürün Kataloğu",
    updatedAt: "2026-09",
    categorySlug: "sokak-hayvanlari-ekipmanlari",
  },
  {
    slug: "kent-mobilyalari-katalogu",
    name: "Kent Mobilyaları",
    type: "Ürün Kataloğu",
    updatedAt: "2026-09",
    categorySlug: "kent-mobilyalari",
  },
  {
    slug: "dezenfeksiyon-teknik",
    name: "Dezenfeksiyon Ürünleri Teknik Dokümanları",
    type: "Teknik Doküman",
    updatedAt: "2026-09",
    categorySlug: "dezenfeksiyon-ve-hijyen",
  },
  {
    slug: "uniforma-katalogu",
    name: "Üniforma ve İş Kıyafetleri",
    type: "Ürün Kataloğu",
    updatedAt: "2026-09",
    categorySlug: "uniforma-ve-is-kiyafetleri",
  },
];

/* ---------- yardımcılar ---------- */

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsInCategory = (slug: string) => products.filter((p) => p.categorySlug === slug);
export const productsInSector = (slug: string) => products.filter((p) => p.sectorSlugs.includes(slug));
export const productHref = (p: Product) => `/urunler/${p.categorySlug}/${p.slug}`;
export const pad2 = (n: number) => String(n).padStart(2, "0");

const trMap: Record<string, string> = { ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g", ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c" };
export const normalize = (s: string) =>
  s
    .replace(/[ıİşŞğĞüÜöÖçÇ]/g, (ch) => trMap[ch] ?? ch)
    .toLowerCase()
    .trim();

/** Ürün adı, ürün kodu ve anahtar kelimeye göre arama (sənəd, bölmə 6.1). */
export function searchProducts(query: string, list: Product[] = products) {
  const q = normalize(query);
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const hay = normalize([p.name, p.code, p.summary, ...p.keywords, getCategory(p.categorySlug)?.name ?? ""].join(" "));
    return terms.every((t) => hay.includes(t));
  });
}
