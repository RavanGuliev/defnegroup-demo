/*
 * Məlumat faylının (data.ts) Azərbaycan dilinə tərcüməsi.
 * Açarlar kod/slug ilə bağlanır; burada olmayan sahə türkcə orijinalda qalır.
 * Qrup və alt bölmə adlarının AZ variantı DEFNE tərəfindən təsdiqlənməlidir.
 */

export const azGroups: Record<string, string> = {
  "01": "Heyvan Rifahı və Baytarlıq Həlləri",
  "02": "Landşaft, Park və Rekreasiya Həlləri",
  "03": "Səhiyyə və Tibbi Həllər",
  "04": "Korporativ Geyim və İş Paltarları",
  "05": "Fəlakət, Fövqəladə Hal və Humanitar Yardım",
  "06": "Korporativ, Dövlət və Sənaye Mebeli",
  "07": "Şəhər İnfrastrukturu və İctimai Məkan Həlləri",
  "08": "Təmizlik, Gigiyena və Sanitariya",
  "09": "Sosial Dəstək və Rifah Həlləri",
  "10": "Əməyin Təhlükəsizliyi və Qoruyucu Avadanlıq",
  "11": "Otel, Restoran və Peşəkar Mətbəx Həlləri",
  "12": "Nəqliyyat, Yol və Sahə Təhlükəsizliyi",
  "13": "Meşəçilik və Meşəyə Qulluq Avadanlıqları",
  "14": "Taxta Məhsullar və Konstruktiv Həllər",
  "15": "Tikinti və İnşaat Materialları",
  "16": "Vektor və Zərərverici Nəzarəti Həlləri",
  "17": "Bayraq, Korporativ Təqdimat və Hədiyyə Məhsulları",
};

export const azSubcategories: Record<string, string> = {
  "01.01": "Heyvan Sığınacaqları və Avadanlıqları",
  "01.02": "Baytarlıq Avadanlıqları",
  "01.03": "Heyvanların Qidalanması və Suvarılması",
  "01.04": "Küçə Heyvanları üçün Həllər",
  "01.05": "Heyvanların Daşınması və Qorunması",
  "01.06": "Qulluq və Gigiyena Məhsulları",
  "04.02": "İş Paltarları",
  "05.07": "İlk Yardım Çantaları və Dəstləri",
  "05.08": "Yanğın Təhlükəsizliyi və Müdaxilə Avadanlıqları",
  "07.01": "Şəhər Mebeli",
  "08.07": "Qoxu Nəzarəti Məhsulları və Sistemləri",
  "09.07": "Ana və Körpə Dəstək Dəstləri",
  "10.03": "Qoruyucu Geyim",
  "11.07": "Otel Aksesuarları və Qonaq Qarşılama Məhsulları",
};

export const azSubFallback = "Alt kateqoriya";

export const azSectors: Record<string, { name: string; description: string }> = {
  belediyeler: { name: "Bələdiyyələr", description: "Sığınacaq, şəhər mebeli, park-bağ, təmizlik və sosial xidmət təchizatı." },
  "valilikler-ve-kamu-kurumlari": {
    name: "Valiliklər və Dövlət Qurumları",
    description: "Korporativ təchizat, fəlakətə hazırlıq və tender şərtnaməsinə uyğun məhsul həlləri.",
  },
  "jandarma-emniyet-ve-askeri-birimler": {
    name: "Jandarma, Polis və Hərbi Bölmələr",
    description: "Uniforma, sahə avadanlığı, qoruyucu vasitələr və logistik dəstək məhsulları.",
  },
  saglik: { name: "Səhiyyə", description: "Xəstəxana, səhiyyə mərkəzi və klinikalar üçün tibbi sərf materialları və avadanlıq." },
  egitim: { name: "Təhsil", description: "Məktəb, yataqxana və təhsil kampusları üçün mebel, gigiyena və yeməkxana avadanlığı." },
  "otel-restoran-ve-catering": {
    name: "Otel, Restoran və Keytrinq",
    description: "Mətbəx, xidmət, yerləşmə və gigiyena məhsullarında toplu təchizat.",
  },
  "sanayi-ve-ozel-sektor": {
    name: "Sənaye və Özəl Sektor",
    description: "Əməyin təhlükəsizliyi, iş paltarı, təmizlik və obyekt ehtiyacları üçün təchizat.",
  },
  "sosyal-hizmet-kurumlari": {
    name: "Sosial Xidmət Qurumları",
    description: "Qocalar evi, qulluq mərkəzi və sosial obyektlər üçün qulluq və yaşayış məhsulları.",
  },
};

export const azSolutions: Record<string, { name: string; need: string; description: string; scope: string[] }> = {
  "barinak-kurulumu-ve-donatimi": {
    name: "Sığınacağın Qurulması və Təchizatı",
    need: "Yeni heyvan sığınacağı açmaq və ya mövcud sığınacağı yeniləmək istəyirəm.",
    description: "Sığınacağın ehtiyac təhlilindən qəfəs, revir, qidalanma və gigiyena avadanlığına qədər bütün mövqeləri bir layihədə planlaşdırırıq.",
    scope: ["Ehtiyac və tutum təhlili", "Qəfəs və yaşayış sahəsi avadanlığı", "Revir və klinika avadanlığı", "Gigiyena və dezinfeksiya planı"],
  },
  "kent-donatisi-projeleri": {
    name: "Şəhər Təchizatı Layihələri",
    need: "Meydan, park və ya küçə üçün kompleks təchizat həllinə ehtiyacım var.",
    description: "Şəhər mebeli, park avadanlığı və tullantıların idarə edilməsi məhsullarını layihə çertyojuna və şərtnaməyə uyğun birləşdiririk.",
    scope: ["Şərtnamə və metraja uyğunluq", "Şəhər mebelinin seçimi", "Park və oyun meydançası avadanlığı", "Tullantı və təmizlik təchizatı"],
  },
  "afet-ve-acil-durum-tedariki": {
    name: "Fəlakət və Fövqəladə Hal Təchizatı",
    need: "Fəlakət və fövqəladə hallar üçün sürətli və planlı ehtiyat yaratmalıyam.",
    description: "Sığınacaq, gigiyena, ilk yardım və əsas ehtiyac məhsullarını qurumunuzun fəlakət planına uyğun qablaşdırıb təchiz edirik.",
    scope: ["Fəlakət planına uyğun məhsul siyahısı", "Sığınacaq və yaşayış məhsulları", "Gigiyena və ilk yardım dəstləri", "Saxlama və göndərmə planı"],
  },
  "hijyen-ve-dezenfeksiyon-programlari": {
    name: "Gigiyena və Dezinfeksiya Proqramları",
    need: "Qurumumuzun gigiyena standartını davamlı şəkildə idarə etmək istəyirəm.",
    description: "Sahə növünə görə dezinfeksiyaedici, avadanlıq və sərf planlaması apararaq müntəzəm və ölçülə bilən gigiyena proqramı qururuq.",
    scope: ["Sahə və risk qiymətləndirilməsi", "Məhsul və avadanlıq seçimi", "Dövri sərf planı", "Tətbiq sənədləşməsi"],
  },
  "personel-donatimi": {
    name: "Personalın Təchizatı",
    need: "Sahə və ofis personalımızın geyim və qoruyucu avadanlığını bir mənbədən almaq istəyirəm.",
    description: "Korporativ kimliyə uyğun uniforma, iş paltarı və fərdi qoruyucu vasitələri ölçü bölgüsü və göndərmə planı ilə birlikdə təqdim edirik.",
    scope: ["Korporativ kimliyə uyğun dizayn", "Ölçü və say planlaması", "FQV uyğunluq yoxlaması", "Toplu qablaşdırma və göndərmə"],
  },
  "saglik-ve-sosyal-tesis-donatimi": {
    name: "Səhiyyə və Sosial Obyektlərin Təchizatı",
    need: "Səhiyyə və ya qulluq obyektimizin avadanlığını tam tamamlamaq istəyirəm.",
    description: "Tibbi sərf materiallarını, xəstə qulluğu məhsullarını, mebel və gigiyena mövqelərini bir təklif altında toplayırıq.",
    scope: ["Obyektin ehtiyac siyahısı", "Tibbi və qulluq məhsulları", "Mebel və yaşayış sahəsi", "Sərf yeniləmə planı"],
  },
};

export const azProcessSteps = [
  { title: "Ehtiyacın Müəyyənləşdirilməsi", text: "Qurumunuzun ehtiyacını, şərtnaməsini və istifadə şərtlərini birlikdə dəqiqləşdiririk." },
  { title: "Məhsul və Texniki Həllin Seçimi", text: "Uyğun məhsulları, texniki xüsusiyyətləri və alternativləri müqayisəli şəkildə təqdim edirik." },
  { title: "Təklif və Təsdiq Prosesi", text: "Şəffaf və ətraflı təklifimizi hazırlayır, təsdiq prosesinizi izləyirik." },
  { title: "Təchizat və Çatdırılma", text: "Planlaşdırılan tarixdə, tam və qeydiyyatla çatdırılmanı həyata keçiririk." },
];

export const azTrustItems = ["Dövlət və özəl sektora təchizat", "Geniş məhsul portfeli", "Layihəyə xüsusi həllər", "Türkiyə üzrə xidmət"];

export const azUsageAreas: Record<string, string> = {
  Barınak: "Sığınacaq",
  Saha: "Sahə",
  Klinik: "Klinika",
  "Kamusal alan": "İctimai məkan",
  Park: "Park",
  Mutfak: "Mətbəx",
  Ofis: "Ofis",
  Depo: "Anbar",
};

type AzProduct = {
  name: string;
  summary: string;
  description: string;
  features: string[];
  specs: [string, string][];
  variants?: string[];
  packaging: string;
  documents?: string[];
  keywords: string[];
};

export const azProducts: Record<string, AzProduct> = {
  "paslanmaz-barinak-kafesi-modul": {
    name: "Paslanmayan Polad Sığınacaq Qəfəsi (Modul)",
    summary: "Modul tipli, asan təmizlənən, paslanmayan polad gövdəli sığınacaq qəfəsi.",
    description: "Sığınacaq və revir sahələrində istifadə üçün hazırlanmış modul qəfəs sistemi; yan-yana və üst-üstə qurula bilir, döşəməsi asan təmizlənir.",
    features: ["Modul birləşmə sistemi", "Çıxarıla bilən döşəmə nimçəsi", "Kilidlənən qapı", "Asan dezinfeksiya"],
    specs: [["Material", "Paslanmayan polad"], ["Qapı", "Kilid mexanizmli"], ["Montaj", "Modul, yan-yana / üst-üstə"]],
    variants: ["Kiçik", "Orta", "Böyük"],
    packaging: "Sökülmüş halda, qutuda",
    documents: ["Texniki vərəqə"],
    keywords: ["qəfəs", "sığınacaq", "paslanmayan", "revir"],
  },
  "yakalama-kementi": {
    name: "Heyvan Tutma Kəməndi",
    summary: "Tənzimlənən, yüngül gövdəli, təhlükəsiz tutma kəməndi.",
    description: "Sahə komandalarının heyvana zərər vermədən təhlükəsiz tutma aparması üçün tənzimlənən kəmənd.",
    features: ["Kilidli halqa mexanizmi", "Yüngül gövdə", "Sürüşməyən tutacaq"],
    specs: [["Gövdə", "Alüminium"], ["Halqa", "Örtüklü polad kəndir"]],
    variants: ["Standart", "Teleskopik"],
    packaging: "Tək qutu",
    documents: ["İstifadə təlimatı"],
    keywords: ["kəmənd", "tutma", "sahə"],
  },
  "otomatik-mama-istasyonu": {
    name: "Küçə Heyvanları üçün Yem və Su Stansiyası",
    summary: "İctimai məkanlar üçün davamlı yem və su stansiyası.",
    description: "Park və ictimai məkanlarda küçə heyvanlarının qidalanması üçün hava şəraitinə davamlı stansiya.",
    features: ["Hava şəraitinə davamlı", "Yerə bərkidilə bilir", "Asan doldurma qapağı"],
    specs: [["Gövdə", "Sinklənmiş / elektrostatik boya"], ["Montaj", "Yerə ankerlə"]],
    variants: ["Tək", "Cüt"],
    packaging: "Palet",
    keywords: ["yem", "su", "stansiya", "qidalanma"],
  },
  "muayene-masasi-paslanmaz": {
    name: "Paslanmayan Polad Müayinə Masası",
    summary: "Klinika və sığınacaq revirləri üçün paslanmayan polad müayinə masası.",
    description: "Asan təmizlənən səthi və möhkəm gövdəsi ilə klinik müayinə və kiçik müdaxilələr üçün uyğundur.",
    features: ["Paslanmayan polad üst lövhə", "Təkərli gövdə seçimi", "Kənar maye kanalı"],
    specs: [["Üst lövhə", "Paslanmayan polad"], ["Gövdə", "Sabit / təkərli"]],
    variants: ["Sabit", "Təkərli", "Hidravlik"],
    packaging: "Palet",
    documents: ["Texniki vərəqə"],
    keywords: ["masa", "müayinə", "klinika", "baytar"],
  },
  "kent-bank-ahsap-metal": {
    name: "Şəhər Skamyası (Taxta–Metal)",
    summary: "Hopdurulmuş taxta oturacaqlı və metal ayaqlı şəhər skamyası.",
    description: "Meydan, park və piyada yolları üçün davamlı, söykənəcəkli şəhər skamyası.",
    features: ["Hopdurulmuş taxta oturacaq", "Elektrostatik boyalı ayaq", "Yerə bərkitmə"],
    specs: [["Oturacaq", "Hopdurulmuş taxta"], ["Ayaq", "Tökmə / polad"]],
    variants: ["Söykənəcəkli", "Söykənəcəksiz"],
    packaging: "Palet",
    documents: ["Məhsul kataloqu səhifəsi"],
    keywords: ["skamya", "oturacaq", "şəhər mebeli", "park"],
  },
  "cop-kutusu-galvaniz": {
    name: "Sinklənmiş Zibil Qutusu",
    summary: "Daxili vedrəli, sinklənmiş gövdəli ictimai məkan zibil qutusu.",
    description: "Küçə və parklar üçün daxili vedrəsi çıxarıla bilən, davamlı sinklənmiş zibil qutusu.",
    features: ["Çıxarıla bilən daxili vedrə", "Yağışdan qorunan qapaq", "Yerə ankerlə"],
    specs: [["Gövdə", "Sinklənmiş təbəqə"]],
    variants: ["Dirək tipli", "Ayaqlı"],
    packaging: "Tək qutu",
    keywords: ["zibil qutusu", "tullantı", "şəhər"],
  },
  "ilk-yardim-cantasi": {
    name: "Korporativ İlk Yardım Çantası",
    summary: "Qurum və avtomobillər üçün tərkib siyahılı ilk yardım çantası.",
    description: "Ofis, avtomobil və sahə komandaları üçün tərkib siyahısı ilə birlikdə təhvil verilən ilk yardım çantası.",
    features: ["Tərkib siyahısı", "Davamlı parça çanta", "Divardan asma seçimi"],
    specs: [["Çanta", "Su keçirməyən parça"]],
    variants: ["Avtomobil", "Ofis", "Sahə"],
    packaging: "Qutuda 10 ədəd",
    documents: ["Tərkib siyahısı"],
    keywords: ["ilk yardım", "çanta", "tibbi"],
  },
  "afet-battaniyesi": {
    name: "Fəlakət Yorğanı",
    summary: "Vakuumla qablaşdırıla bilən, istilik saxlayan fəlakət yorğanı.",
    description: "Fəlakət və fövqəladə hal ehtiyatları üçün vakuumla qablaşdırıla bilən, anbar sahəsinə qənaət edən yorğan.",
    features: ["Vakuum qablaşdırma", "İstilik saxlayan toxuma", "Uzunmüddətli saxlama"],
    specs: [["Qablaşdırma", "Vakuumlu"]],
    variants: ["Birnəfərlik", "İkinəfərlik"],
    packaging: "Bağlama",
    keywords: ["yorğan", "fəlakət", "fövqəladə hal"],
  },
  "saha-personeli-montu": {
    name: "Sahə Personalı Gödəkçəsi",
    summary: "Reflektorlu, su keçirməyən sahə personalı gödəkçəsi.",
    description: "Qurum loqosu tikilə bilən, reflektor lentli, su keçirməyən xarici parçalı sahə gödəkçəsi.",
    features: ["Reflektor lent", "Su keçirməyən parça", "Loqo tikmə / çap sahəsi"],
    specs: [["Xarici parça", "Su keçirməyən poliester"]],
    packaging: "Tək paket, qutu",
    documents: ["Ölçü cədvəli"],
    keywords: ["gödəkçə", "uniforma", "iş paltarı", "sahə"],
  },
  "reflektorlu-yelek": {
    name: "Reflektorlu Xəbərdarlıq Jileti",
    summary: "Yüksək görünmə qabiliyyətli, loqo çaplı xəbərdarlıq jileti.",
    description: "Sahə və yol işlərində görünməni artıran, loqo çapına uyğun xəbərdarlıq jileti.",
    features: ["Yüksək görünmə", "Velkro bağlama", "Loqo çap sahəsi"],
    specs: [["Rəng", "Sarı / narıncı"]],
    variants: ["Standart", "Fermuarlı"],
    packaging: "Qutuda 50 ədəd",
    keywords: ["jilet", "reflektor", "fqv"],
  },
  "yuzey-dezenfektani": {
    name: "Səth Dezinfeksiyaedicisi (Konsentrat)",
    summary: "Durulaşdırılaraq istifadə olunan konsentrat səth dezinfeksiyaedicisi.",
    description: "Korporativ sahələrdə səth dezinfeksiyası üçün durulaşdırılaraq istifadə olunan konsentrat məhsul.",
    features: ["Konsentrat formula", "Geniş istifadə sahəsi", "Tətbiq təlimatı ilə"],
    specs: [["Forma", "Maye konsentrat"]],
    packaging: "Bidon",
    documents: ["Təhlükəsizlik məlumat vərəqəsi", "Tətbiq təlimatı"],
    keywords: ["dezinfeksiyaedici", "gigiyena", "səth"],
  },
  "sirt-tipi-ilaclama-pompasi": {
    name: "Kürək Tipli Dərmanlama Nasosu",
    summary: "Sahə dezinfeksiyası və dərmanlama tətbiqləri üçün kürək nasosu.",
    description: "Sığınacaq, park və sahə tətbiqlərində dezinfeksiya və dərmanlama üçün kürək tipli nasos.",
    features: ["Tənzimlənən başlıq", "Erqonomik daşıma", "Təzyiq göstəricisi"],
    specs: [["Tip", "Mexaniki / akkumulyatorlu"]],
    variants: ["Mexaniki", "Akkumulyatorlu"],
    packaging: "Tək qutu",
    documents: ["İstifadə təlimatı"],
    keywords: ["nasos", "dərmanlama", "dezinfeksiya"],
  },
  "tekerlekli-atik-konteyneri": {
    name: "Təkərli Tullantı Konteyneri",
    summary: "Qapaqlı, təkərli plastik tullantı konteyneri.",
    description: "Küçə və obyektlərdə tullantı yığımı üçün qapaqlı, təkərli konteyner.",
    features: ["Qapaqlı gövdə", "Təkərli", "Avtomobil qaldırıcısına uyğun"],
    specs: [["Gövdə", "HDPE"]],
    packaging: "Üst-üstə yığılmış",
    keywords: ["konteyner", "tullantı", "zibil"],
  },
  "endustriyel-yemek-arabasi": {
    name: "Paslanmayan Polad Xidmət Arabası",
    summary: "Toplu yemək xidməti üçün paslanmayan polad xidmət arabası.",
    description: "Yeməkxana və toplu xidmət sahələri üçün rəfli, paslanmayan polad xidmət arabası.",
    features: ["Paslanmayan polad gövdə", "Əyləcli təkər", "Rəfli quruluş"],
    specs: [["Gövdə", "Paslanmayan polad"]],
    variants: ["2 rəf", "3 rəf"],
    packaging: "Qutu",
    keywords: ["xidmət arabası", "mətbəx", "keytrinq"],
  },
  "calisma-masasi-kurumsal": {
    name: "Korporativ İş Masası",
    summary: "Kabel kanallı, korporativ ofis iş masası.",
    description: "Dövlət və qurum ofisləri üçün kabel kanallı, davamlı iş masası.",
    features: ["Kabel kanalı", "Cızılmaya davamlı səth"],
    specs: [["Səth", "Melamin örtüklü yonqar lövhə"]],
    packaging: "Sökülmüş halda, qutu",
    keywords: ["masa", "ofis", "mebel"],
  },
  "cocuk-oyun-grubu": {
    name: "Uşaq Oyun Kompleksi",
    summary: "Sürüşkənli, dırmaşma elementli uşaq oyun kompleksi.",
    description: "Park və məktəb həyətləri üçün sürüşkən və dırmaşma elementlərindən ibarət oyun kompleksi.",
    features: ["Modul dizayn", "Yuvarlaqlaşdırılmış künclər", "UV-yə davamlı plastik"],
    specs: [["Daşıyıcı", "Sinklənmiş dirək"]],
    variants: ["Kiçik yaş", "Böyük yaş"],
    packaging: "Palet",
    documents: ["Montaj planı"],
    keywords: ["oyun kompleksi", "park", "sürüşkən"],
  },
};

export const azCatalogs: Record<string, string> = {
  "genel-urun-katalogu": "Ümumi Məhsul Kataloqu",
  "kurumsal-tanitim": "Korporativ Təqdimat Faylı",
  "sokak-hayvanlari-katalogu": "Küçə Heyvanları Avadanlıqları",
  "kent-mobilyalari-katalogu": "Şəhər Mebeli",
  "dezenfeksiyon-teknik": "Dezinfeksiya Məhsulları üzrə Texniki Sənədlər",
  "uniforma-katalogu": "Uniforma və İş Paltarları",
};

export const azCatalogTypes: Record<string, string> = {
  "Ürün Kataloğu": "Məhsul Kataloqu",
  "Teknik Doküman": "Texniki Sənəd",
  "Kurumsal Tanıtım": "Korporativ Təqdimat",
};
