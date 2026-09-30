/*
 * Maket məzmunu.
 *
 * Bu fayldakı məhsul qrupları, həllər və sektorlar sənədlərdəki quruluşa uyğundur.
 * Məhsullar, kodlar, texniki göstəricilər və kataloqlar isə YALNIZ quruluşu göstərmək
 * üçün nümunədir — DEFNE GROUP real məzmunu təqdim etdikdən sonra əvəz olunmalıdır
 * (ikinci mərhələ sənədi, bölmə 7). Gələcəkdə bu məlumatlar admin paneli / API-dən gələcək.
 */

import type { Locale } from "../i18n/config";
import {
  azCatalogs,
  azCatalogTypes,
  azGroups,
  azProcessSteps,
  azProducts,
  azSectors,
  azSolutions,
  azSubcategories,
  azSubFallback,
  azTrustItems,
  azUsageAreas,
} from "./content-az";

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
  | "truck"
  | "sofa"
  | "traffic-cone"
  | "tree-pine"
  | "axe"
  | "brick"
  | "bug"
  | "flag";

/* ---------- Ürün grupları: 17 əsas qrup / 107 alt bölmə ----------
 * Mənbə: DEFNE_Icraci_Duzelis_Tapsirigi_2026_09_29 (bölmə 2) və 27.09.2026 tarixli
 * 17/107 siyahısı. Kodlar sabit daxili istinaddır; ad, kod və sıra dəyişdirilmir.
 */

export type Group = {
  code: string;
  slug: string;
  name: string;
  icon: IconName;
  /** Təsdiqlənmiş alt bölmə sayı — hamısına avtomatik 6 tətbiq edilmir. */
  subCount: number;
  image?: string;
  featured?: boolean;
};

export const groups: Group[] = [
  {
    code: "01",
    slug: "hayvan-refahi-ve-veteriner-cozumleri",
    name: "Hayvan Refahı & Veteriner Çözümleri",
    icon: "paw",
    subCount: 6,
    featured: true,
  },
  {
    code: "02",
    slug: "peyzaj-park-ve-rekreasyon-cozumleri",
    name: "Peyzaj, Park & Rekreasyon Çözümleri",
    icon: "trees",
    subCount: 6,
    featured: true,
  },
  {
    code: "03",
    slug: "saglik-ve-medikal-cozumler",
    name: "Sağlık & Medikal Çözümler",
    icon: "cross",
    subCount: 6,
    featured: true,
  },
  {
    code: "04",
    slug: "kurumsal-giyim-ve-is-kiyafetleri",
    name: "Kurumsal Giyim & İş Kıyafetleri",
    icon: "shirt",
    subCount: 6,
    featured: true,
  },
  {
    code: "05",
    slug: "afet-acil-durum-ve-insani-yardim",
    name: "Afet, Acil Durum & İnsani Yardım",
    icon: "siren",
    subCount: 8,
    featured: true,
  },
  {
    code: "06",
    slug: "kurumsal-kamu-ve-endustriyel-mobilya",
    name: "Kurumsal, Kamu & Endüstriyel Mobilya",
    icon: "sofa",
    subCount: 6,
  },
  {
    code: "07",
    slug: "kentsel-altyapi-ve-kamusal-alan-cozumleri",
    name: "Kentsel Altyapı & Kamusal Alan Çözümleri",
    icon: "bench",
    subCount: 6,
    featured: true,
  },
  {
    code: "08",
    slug: "temizlik-hijyen-ve-sanitasyon",
    name: "Temizlik, Hijyen & Sanitasyon",
    icon: "spray",
    subCount: 7,
    featured: true,
  },
  {
    code: "09",
    slug: "sosyal-destek-ve-refah-cozumleri",
    name: "Sosyal Destek & Refah Çözümleri",
    icon: "heart-hand",
    subCount: 7,
  },
  {
    code: "10",
    slug: "is-guvenligi-ve-koruyucu-ekipman",
    name: "İş Güvenliği & Koruyucu Ekipman",
    icon: "hard-hat",
    subCount: 6,
  },
  {
    code: "11",
    slug: "otel-restoran-ve-profesyonel-mutfak-cozumleri",
    name: "Otel, Restoran & Profesyonel Mutfak Çözümleri",
    icon: "utensils",
    subCount: 7,
    featured: true,
  },
  {
    code: "12",
    slug: "trafik-yol-ve-saha-guvenligi",
    name: "Trafik, Yol & Saha Güvenliği",
    icon: "traffic-cone",
    subCount: 6,
  },
  {
    code: "13",
    slug: "ormancilik-ve-orman-bakim-ekipmanlari",
    name: "Ormancılık & Orman Bakım Ekipmanları",
    icon: "tree-pine",
    subCount: 6,
  },
  {
    code: "14",
    slug: "ahsap-urunler-ve-yapisal-cozumler",
    name: "Ahşap Ürünler & Yapısal Çözümler",
    icon: "axe",
    subCount: 6,
  },
  {
    code: "15",
    slug: "insaat-ve-yapi-malzemeleri",
    name: "İnşaat & Yapı Malzemeleri",
    icon: "brick",
    subCount: 6,
  },
  {
    code: "16",
    slug: "vektor-ve-hasere-kontrol-cozumleri",
    name: "Vektör & Haşere Kontrol Çözümleri",
    icon: "bug",
    subCount: 6,
  },
  {
    code: "17",
    slug: "bayrak-kurumsal-tanitim-ve-hediye-urunleri",
    name: "Bayrak, Kurumsal Tanıtım & Hediye Ürünleri",
    icon: "flag",
    subCount: 6,
  },
];

/*
 * Alt bölmə adları. Yalnız təsdiqlənmiş adlar yazılır; siyahıda adı olmayan kodlar
 * "hazırlıq" statusunda qalır (uydurma ad əlavə edilmir). 27.09.2026 tarixli tam
 * 107 siyahısı gəldikdə qalan adlar bu obyektə əlavə olunur.
 */
const subcategoryNames: Record<string, string> = {
  "01.01": "Hayvan Barınakları ve Ekipmanları",
  "01.02": "Veteriner Ekipmanları",
  "01.03": "Hayvan Besleme ve Sulama",
  "01.04": "Sokak Hayvanları Çözümleri",
  "01.05": "Hayvan Taşıma ve Koruma",
  "01.06": "Bakım ve Hijyen Ürünleri",
  "04.02": "İş Kıyafetleri",
  "05.07": "İlk Yardım Çantaları ve Setleri",
  "05.08": "Yangın Güvenliği ve Müdahale Ekipmanları",
  "07.01": "Kent Mobilyaları",
  "08.07": "Koku Kontrol Ürünleri ve Sistemleri",
  "09.07": "Anne ve Bebek Destek Setleri",
  "10.03": "Koruyucu Giyim",
  "11.07": "Otel Buklet ve Misafir Karşılama Ürünleri",
};

export type Subcategory = {
  code: string;
  groupCode: string;
  slug: string;
  /** Təsdiqlənmiş ad yoxdursa boşdur — `subName()` ilə göstərilir. */
  name?: string;
  /** Adı hələ təqdim edilməyən alt bölmə: sınaq mühitində hazırlıq statusu. */
  pending: boolean;
};

const trMap: Record<string, string> = { ı: "i", İ: "i", ş: "s", Ş: "s", ğ: "g", Ğ: "g", ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c", ə: "e", Ə: "e" };
export const normalize = (s: string) =>
  s
    .replace(/[ıİşŞğĞüÜöÖçÇəƏ]/g, (ch) => trMap[ch] ?? ch)
    .toLowerCase()
    .trim();
const slugify = (s: string) =>
  normalize(s.replace(/&/g, " ve "))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const subcategories: Subcategory[] = groups.flatMap((g) =>
  Array.from({ length: g.subCount }, (_, i) => {
    const code = `${g.code}.${String(i + 1).padStart(2, "0")}`;
    const name = subcategoryNames[code];
    return { code, groupCode: g.code, slug: name ? slugify(name) : code.replace(".", "-"), name, pending: !name };
  }),
);

export const subName = (s: Subcategory) => s.name ?? `Alt Kategori ${s.code}`;

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
  groupCodes: string[];
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
    groupCodes: ["01", "08", "16"],
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
    groupCodes: ["07", "02", "08"],
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
    groupCodes: ["05", "09", "03", "08"],
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
    groupCodes: ["08", "16"],
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
    groupCodes: ["04", "10"],
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
    groupCodes: ["03", "09", "06"],
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
  /** Əsas alt bölmə — məhsulun yeganə əsas səhifəsi buradadır. */
  subCode: string;
  /** subCode boş olduqda (alt bölmə təsdiqlənməyib) əsas qrup. */
  groupCode?: string;
  /** Əlavə keçid verilən qruplar; məhsul nüsxəsi yaradılmır. */
  crossGroups?: string[];
  /** false — təsdiqsiz, saytda göstərilmir. */
  published?: boolean;
  /** Demo nümunəsi — təsdiqlənmiş məhsul ailəsi deyil, kartda ayrıca işarələnir. */
  sample?: boolean;
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

export const allProducts: Product[] = [
  {
    slug: "paslanmaz-barinak-kafesi-modul",
    code: "DG-SH-1001",
    sample: true,
    name: "Paslanmaz Barınak Kafesi (Modüler)",
    subCode: "01.01",
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
    sample: true,
    name: "Hayvan Yakalama Kementi",
    subCode: "01.04",
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
    sample: true,
    name: "Sokak Hayvanı Mama ve Su İstasyonu",
    subCode: "01.03",
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
    sample: true,
    name: "Paslanmaz Muayene Masası",
    subCode: "01.02",
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
    sample: true,
    name: "Kent Bankı (Ahşap–Metal)",
    subCode: "07.01",
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
    sample: true,
    name: "Galvaniz Çöp Kutusu",
    subCode: "07.01",
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
    sample: true,
    name: "Kurumsal İlk Yardım Çantası",
    subCode: "05.07",
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
    sample: true,
    name: "Afet Battaniyesi",
    subCode: "05.05",
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
    sample: true,
    name: "Saha Personeli Montu",
    subCode: "04.02",
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
    sample: true,
    name: "Reflektörlü İkaz Yeleği",
    subCode: "10.03",
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
    sample: true,
    name: "Yüzey Dezenfektanı (Konsantre)",
    // 08 daxilində alt bölmə adı hələ təsdiqlənməyib — təsdiqsiz yayımlanmır (bölmə 3).
    subCode: "",
    groupCode: "08",
    published: false,
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
    sample: true,
    name: "Sırt Tipi İlaçlama Pompası",
    // Vektor/həşərə tətbiqi → 16.01; nasosun təyinatı DEFNE tərəfindən təsdiqlənməlidir (bölmə 3).
    subCode: "16.01",
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
    sample: true,
    name: "Tekerlekli Atık Konteyneri",
    subCode: "07.05",
    // Əlaqəli təmizlik qrupundan eyni məhsula keçid (bölmə 3) — nüsxə yaradılmır.
    crossGroups: ["08"],
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
    sample: true,
    name: "Paslanmaz Servis Arabası",
    subCode: "11.05",
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
    sample: true,
    name: "Kurumsal Çalışma Masası",
    subCode: "06.01",
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
    sample: true,
    name: "Çocuk Oyun Grubu",
    subCode: "02.02",
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
  groupCode?: string;
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
    groupCode: "01",
  },
  {
    slug: "kent-mobilyalari-katalogu",
    name: "Kent Mobilyaları",
    type: "Ürün Kataloğu",
    updatedAt: "2026-09",
    groupCode: "07",
  },
  {
    slug: "dezenfeksiyon-teknik",
    name: "Dezenfeksiyon Ürünleri Teknik Dokümanları",
    type: "Teknik Doküman",
    updatedAt: "2026-09",
    groupCode: "08",
  },
  {
    slug: "uniforma-katalogu",
    name: "Üniforma ve İş Kıyafetleri",
    type: "Ürün Kataloğu",
    updatedAt: "2026-09",
    groupCode: "04",
  },
];

/* ---------- yardımcılar ---------- */

/** Saytda göstərilən məhsullar (təsdiqsiz qeydlər çıxarılır). */
export const products = allProducts.filter((p) => p.published !== false);

export const getGroup = (slug: string) => groups.find((g) => g.slug === slug);
export const getGroupByCode = (code: string) => groups.find((g) => g.code === code);
export const getSub = (code: string) => subcategories.find((s) => s.code === code);
export const getSubBySlug = (groupCode: string, slug: string) => subcategories.find((s) => s.groupCode === groupCode && s.slug === slug);
export const subsOfGroup = (groupCode: string) => subcategories.filter((s) => s.groupCode === groupCode);
export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const productGroupCode = (p: Product) => p.groupCode ?? p.subCode.slice(0, 2);
export const productGroup = (p: Product) => getGroupByCode(productGroupCode(p))!;
export const productsInSub = (code: string) => products.filter((p) => p.subCode === code);
export const productsInGroup = (code: string) => products.filter((p) => productGroupCode(p) === code);
/** Başqa qrupda əsas qeydi olan, bu qrupdan keçid verilən məhsullar. */
export const linkedProductsForGroup = (code: string) => products.filter((p) => p.crossGroups?.includes(code));
export const productsInSector = (slug: string) => products.filter((p) => p.sectorSlugs.includes(slug));

export const groupHref = (g: Group) => `/urunler/${g.slug}`;
export const subHref = (s: Subcategory) => `/urunler/${getGroupByCode(s.groupCode)!.slug}/${s.slug}`;
export const productHref = (p: Product) => `${subHref(getSub(p.subCode)!)}/${p.slug}`;
export const allProductsHref = "/urunler/tum-urunler";
export const pad2 = (n: number) => String(n).padStart(2, "0");

/* ---------- dilə görə məlumat ----------
 * Struktur (kod, slug, keçid) hər iki dildə eynidir; yalnız mətnlər tərcümə olunur.
 * Səhifələr `db(lang)` ilə cari dildə massivləri və axtarış funksiyalarını alır.
 */

function build(lang: Locale) {
  const az = lang === "az";
  const usage = (u: string) => (az ? (azUsageAreas[u] ?? u) : u);

  const G: Group[] = az ? groups.map((g) => ({ ...g, name: azGroups[g.code] ?? g.name })) : groups;
  const S: Subcategory[] = az ? subcategories.map((s) => (azSubcategories[s.code] ? { ...s, name: azSubcategories[s.code] } : s)) : subcategories;
  const P: (Product & { searchText: string })[] = products.map((p) => {
    const t = az ? azProducts[p.slug] : undefined;
    const base = normalize([p.name, p.code, p.summary, ...p.keywords].join(" "));
    if (!t) return { ...p, searchText: base };
    return {
      ...p,
      name: t.name,
      summary: t.summary,
      description: t.description,
      features: t.features,
      specs: t.specs.map(([label, value]) => ({ label, value })),
      variants: t.variants ?? p.variants,
      packaging: t.packaging,
      documents: p.documents.map((d, i) => ({ ...d, name: t.documents?.[i] ?? d.name })),
      usageAreas: p.usageAreas.map(usage),
      keywords: t.keywords,
      // Axtarış hər iki dildə işləyir
      searchText: `${base} ${normalize([t.name, t.summary, ...t.keywords].join(" "))}`,
    };
  });

  const getGroupByCode = (code: string) => G.find((g) => g.code === code);
  const getSub = (code: string) => S.find((s) => s.code === code);
  const subName = (s: Subcategory) => s.name ?? `${az ? azSubFallback : "Alt Kategori"} ${s.code}`;
  const productGroup = (p: Product) => getGroupByCode(productGroupCode(p))!;

  return {
    lang,
    groups: G,
    subcategories: S,
    products: P as Product[],
    sectors: az ? sectors.map((s) => ({ ...s, ...azSectors[s.slug] })) : sectors,
    solutions: az ? solutions.map((s) => ({ ...s, ...azSolutions[s.slug] })) : solutions,
    processSteps: az ? processSteps.map((s, i) => ({ ...s, ...azProcessSteps[i] })) : processSteps,
    trustItems: az ? trustItems.map((t, i) => ({ ...t, title: azTrustItems[i] })) : trustItems,
    usageAreas: usageAreas.map(usage),
    catalogs: az ? catalogs.map((c) => ({ ...c, name: azCatalogs[c.slug] ?? c.name, type: (azCatalogTypes[c.type] ?? c.type) as Catalog["type"] })) : catalogs,

    getGroup: (slug: string) => G.find((g) => g.slug === slug),
    getGroupByCode,
    getSub,
    getSubBySlug: (groupCode: string, slug: string) => S.find((s) => s.groupCode === groupCode && s.slug === slug),
    subsOfGroup: (groupCode: string) => S.filter((s) => s.groupCode === groupCode),
    getSector: (slug: string) => (az ? sectors.map((s) => ({ ...s, ...azSectors[s.slug] })) : sectors).find((s) => s.slug === slug),
    getSolution: (slug: string) => (az ? solutions.map((s) => ({ ...s, ...azSolutions[s.slug] })) : solutions).find((s) => s.slug === slug),
    getProduct: (slug: string) => P.find((p) => p.slug === slug) as Product | undefined,
    productGroup,
    productsInSub: (code: string) => P.filter((p) => p.subCode === code) as Product[],
    productsInGroup: (code: string) => P.filter((p) => productGroupCode(p) === code) as Product[],
    linkedProductsForGroup: (code: string) => P.filter((p) => p.crossGroups?.includes(code)) as Product[],
    productsInSector: (slug: string) => P.filter((p) => p.sectorSlugs.includes(slug)) as Product[],
    subName,
    /** Ad, kod, açar söz və kateqoriya adına görə axtarış (Türk/Azərbaycan hərfləri normallaşdırılır). */
    searchProducts(query: string, list: Product[] = P) {
      const q = normalize(query);
      if (!q) return list;
      const terms = q.split(/\s+/);
      return list.filter((p) => {
        const own = (p as Product & { searchText?: string }).searchText ?? "";
        const sub = getSub(p.subCode);
        const hay = `${own} ${normalize([productGroup(p).name, sub ? subName(sub) : ""].join(" "))}`;
        return terms.every((t) => hay.includes(t));
      });
    },
  };
}

export type Db = ReturnType<typeof build>;
const cache: Partial<Record<Locale, Db>> = {};
export const db = (lang: Locale): Db => (cache[lang] ??= build(lang));
