/*
 * Məlumat faylının (data.ts) İngilis dilinə tərcüməsi.
 * Açarlar kod/slug ilə bağlanır; burada olmayan sahə türkcə orijinalda qalır.
 * Qrup və alt bölmə adlarının EN variantı DEFNE tərəfindən təsdiqlənməlidir.
 */

export const enGroups: Record<string, string> = {
  "01": "Animal Welfare and Veterinary Solutions",
  "02": "Landscape, Park and Recreation Solutions",
  "03": "Healthcare and Medical Solutions",
  "04": "Corporate Apparel and Workwear",
  "05": "Disaster, Emergency and Humanitarian Aid",
  "06": "Corporate, Public and Industrial Furniture",
  "07": "Urban Infrastructure and Public Space Solutions",
  "08": "Cleaning, Hygiene and Sanitation",
  "09": "Social Support and Welfare Solutions",
  "10": "Occupational Safety and Protective Equipment",
  "11": "Hotel, Restaurant and Professional Kitchen Solutions",
  "12": "Traffic, Road and Site Safety",
  "13": "Forestry and Forest Maintenance Equipment",
  "14": "Wood Products and Structural Solutions",
  "15": "Building and Construction Materials",
  "16": "Vector and Pest Control Solutions",
  "17": "Flags, Corporate Promotion and Gift Products",
};

export const enSubcategories: Record<string, string> = {
  "01.01": "Animal Shelters and Equipment",
  "01.02": "Veterinary Equipment",
  "01.03": "Animal Feeding and Watering",
  "01.04": "Solutions for Stray Animals",
  "01.05": "Animal Transport and Containment",
  "01.06": "Care and Hygiene Products",
  "04.02": "Workwear",
  "05.07": "First Aid Bags and Kits",
  "05.08": "Fire Safety and Response Equipment",
  "07.01": "Urban Furniture",
  "08.07": "Odour Control Products and Systems",
  "09.07": "Mother and Baby Support Kits",
  "10.03": "Protective Clothing",
  "11.07": "Hotel Accessories and Guest Amenities",
};

export const enSectors: Record<string, { name: string; description: string }> = {
  belediyeler: { name: "Municipalities", description: "Supply for shelters, urban furniture, parks and gardens, cleaning and social services." },
  "valilikler-ve-kamu-kurumlari": {
    name: "Governorships and Public Institutions",
    description: "Corporate supply, disaster preparedness and product solutions compliant with tender specifications.",
  },
  "jandarma-emniyet-ve-askeri-birimler": {
    name: "Gendarmerie, Police and Military Units",
    description: "Uniforms, field equipment, protective gear and logistics support products.",
  },
  saglik: { name: "Healthcare", description: "Medical consumables and equipment for hospitals, health centres and clinics." },
  egitim: { name: "Education", description: "Furniture, hygiene and dining hall equipment for schools, dormitories and campuses." },
  "otel-restoran-ve-catering": {
    name: "Hotels, Restaurants and Catering",
    description: "Bulk supply of kitchen, service, accommodation and hygiene products.",
  },
  "sanayi-ve-ozel-sektor": {
    name: "Industry and Private Sector",
    description: "Supply for occupational safety, workwear, cleaning and facility needs.",
  },
  "sosyal-hizmet-kurumlari": {
    name: "Social Service Institutions",
    description: "Care and living products for nursing homes, care centres and social facilities.",
  },
};

export const enSolutions: Record<string, { name: string; need: string; description: string; scope: string[] }> = {
  "barinak-kurulumu-ve-donatimi": {
    name: "Shelter Setup and Equipment",
    need: "I want to open a new animal shelter or renew an existing one.",
    description: "From the shelter’s needs analysis to cages, infirmary, feeding and hygiene equipment, we plan every item in a single project.",
    scope: ["Needs and capacity analysis", "Cage and living area equipment", "Infirmary and clinic equipment", "Hygiene and disinfection plan"],
  },
  "kent-donatisi-projeleri": {
    name: "Urban Equipment Projects",
    need: "I need a complete equipment solution for a square, park or street.",
    description: "We combine urban furniture, park equipment and waste management products in line with the project drawings and specification.",
    scope: ["Compliance with specification and bill of quantities", "Urban furniture selection", "Park and playground equipment", "Waste and cleaning supplies"],
  },
  "afet-ve-acil-durum-tedariki": {
    name: "Disaster and Emergency Supply",
    need: "I need to build a fast, planned stock for disasters and emergencies.",
    description: "We package and supply shelter, hygiene, first aid and basic needs products in line with your institution’s disaster plan.",
    scope: ["Product list aligned with the disaster plan", "Shelter and living products", "Hygiene and first aid kits", "Storage and dispatch plan"],
  },
  "hijyen-ve-dezenfeksiyon-programlari": {
    name: "Hygiene and Disinfection Programmes",
    need: "I want to manage our institution’s hygiene standard sustainably.",
    description: "We plan disinfectants, equipment and consumables by area type to build a regular, measurable hygiene programme.",
    scope: ["Area and risk assessment", "Product and equipment selection", "Periodic consumables plan", "Application documentation"],
  },
  "personel-donatimi": {
    name: "Staff Outfitting",
    need: "I want to source clothing and protective equipment for our field and office staff from a single supplier.",
    description: "We provide uniforms, workwear and personal protective equipment matching your corporate identity, together with size distribution and a dispatch plan.",
    scope: ["Design matching corporate identity", "Size and quantity planning", "PPE compliance check", "Bulk packaging and dispatch"],
  },
  "saglik-ve-sosyal-tesis-donatimi": {
    name: "Healthcare and Social Facility Equipment",
    need: "I want to fully equip our healthcare or care facility.",
    description: "We bring medical consumables, patient care products, furniture and hygiene items together under a single quote.",
    scope: ["Facility needs list", "Medical and care products", "Furniture and living areas", "Consumables replenishment plan"],
  },
};

export const enProcessSteps = [
  { title: "Defining the Need", text: "Together we clarify your institution’s needs, specification and conditions of use." },
  { title: "Product and Technical Solution Selection", text: "We present suitable products, technical specifications and alternatives side by side." },
  { title: "Quotation and Approval", text: "We prepare a transparent, detailed quotation and follow your approval process." },
  { title: "Supply and Delivery", text: "We deliver on the planned date, complete and fully documented." },
];

export const enTrustItems = ["Supply to public and private sectors", "Broad product portfolio", "Project-specific solutions", "Service across Türkiye"];

export const enUsageAreas: Record<string, string> = {
  Barınak: "Shelter",
  Saha: "Field",
  Klinik: "Clinic",
  "Kamusal alan": "Public space",
  Park: "Park",
  Mutfak: "Kitchen",
  Ofis: "Office",
  Depo: "Warehouse",
};

type EnProduct = {
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

export const enProducts: Record<string, EnProduct> = {
  "paslanmaz-barinak-kafesi-modul": {
    name: "Stainless Steel Shelter Cage (Modular)",
    summary: "Modular, easy-to-clean shelter cage with a stainless steel body.",
    description: "A modular cage system designed for shelters and infirmaries; can be installed side by side or stacked, with an easy-to-clean floor.",
    features: ["Modular connection system", "Removable floor tray", "Lockable door", "Easy disinfection"],
    specs: [["Material", "Stainless steel"], ["Door", "With locking mechanism"], ["Installation", "Modular, side by side / stacked"]],
    variants: ["Small", "Medium", "Large"],
    packaging: "Disassembled, boxed",
    documents: ["Technical data sheet"],
    keywords: ["cage", "shelter", "stainless", "infirmary"],
  },
  "yakalama-kementi": {
    name: "Animal Catch Pole",
    summary: "Adjustable, lightweight and safe catch pole.",
    description: "An adjustable catch pole that lets field teams capture animals safely without harming them.",
    features: ["Locking loop mechanism", "Lightweight body", "Non-slip grip"],
    specs: [["Body", "Aluminium"], ["Loop", "Coated steel cable"]],
    variants: ["Standard", "Telescopic"],
    packaging: "Single box",
    documents: ["User manual"],
    keywords: ["catch pole", "capture", "field"],
  },
  "otomatik-mama-istasyonu": {
    name: "Food and Water Station for Stray Animals",
    summary: "Durable food and water station for public spaces.",
    description: "A weather-resistant station for feeding stray animals in parks and public spaces.",
    features: ["Weather resistant", "Ground mountable", "Easy refill lid"],
    specs: [["Body", "Galvanised / powder coated"], ["Installation", "Ground anchored"]],
    variants: ["Single", "Double"],
    packaging: "Pallet",
    keywords: ["food", "water", "station", "feeding"],
  },
  "muayene-masasi-paslanmaz": {
    name: "Stainless Steel Examination Table",
    summary: "Stainless steel examination table for clinics and shelter infirmaries.",
    description: "With its easy-to-clean surface and sturdy frame, it is suitable for clinical examinations and minor procedures.",
    features: ["Stainless steel top", "Optional castor frame", "Edge fluid channel"],
    specs: [["Top", "Stainless steel"], ["Frame", "Fixed / on castors"]],
    variants: ["Fixed", "On castors", "Hydraulic"],
    packaging: "Pallet",
    documents: ["Technical data sheet"],
    keywords: ["table", "examination", "clinic", "veterinary"],
  },
  "kent-bank-ahsap-metal": {
    name: "Urban Bench (Wood–Metal)",
    summary: "Urban bench with impregnated wooden seat and metal legs.",
    description: "A durable urban bench with backrest for squares, parks and pedestrian walkways.",
    features: ["Impregnated wooden seat", "Powder-coated legs", "Ground fixing"],
    specs: [["Seat", "Impregnated wood"], ["Legs", "Cast / steel"]],
    variants: ["With backrest", "Without backrest"],
    packaging: "Pallet",
    documents: ["Product catalogue page"],
    keywords: ["bench", "seating", "urban furniture", "park"],
  },
  "cop-kutusu-galvaniz": {
    name: "Galvanised Litter Bin",
    summary: "Public space litter bin with galvanised body and inner bucket.",
    description: "A durable galvanised litter bin with a removable inner bucket for streets and parks.",
    features: ["Removable inner bucket", "Rain-protected lid", "Ground anchored"],
    specs: [["Body", "Galvanised sheet"]],
    variants: ["Pole mounted", "Free standing"],
    packaging: "Single box",
    keywords: ["litter bin", "waste", "urban"],
  },
  "ilk-yardim-cantasi": {
    name: "Corporate First Aid Bag",
    summary: "First aid bag with contents list for institutions and vehicles.",
    description: "A first aid bag supplied with a contents list for offices, vehicles and field teams.",
    features: ["Contents list", "Durable fabric bag", "Wall-mount option"],
    specs: [["Bag", "Waterproof fabric"]],
    variants: ["Vehicle", "Office", "Field"],
    packaging: "10 pieces per box",
    documents: ["Contents list"],
    keywords: ["first aid", "bag", "medical"],
  },
  "afet-battaniyesi": {
    name: "Disaster Blanket",
    summary: "Vacuum-packable, heat-retaining disaster blanket.",
    description: "A vacuum-packable blanket that saves storage space, for disaster and emergency stocks.",
    features: ["Vacuum packaging", "Heat-retaining weave", "Long-term storage"],
    specs: [["Packaging", "Vacuum packed"]],
    variants: ["Single", "Double"],
    packaging: "Bale",
    keywords: ["blanket", "disaster", "emergency"],
  },
  "saha-personeli-montu": {
    name: "Field Staff Jacket",
    summary: "Reflective, waterproof field staff jacket.",
    description: "A field jacket with waterproof outer fabric and reflective tape, suitable for institution logo embroidery.",
    features: ["Reflective tape", "Waterproof fabric", "Logo embroidery / print area"],
    specs: [["Outer fabric", "Waterproof polyester"]],
    packaging: "Individually bagged, boxed",
    documents: ["Size chart"],
    keywords: ["jacket", "uniform", "workwear", "field"],
  },
  "reflektorlu-yelek": {
    name: "Reflective Safety Vest",
    summary: "High-visibility safety vest with logo print.",
    description: "A safety vest suitable for logo printing that increases visibility during field and road works.",
    features: ["High visibility", "Velcro closure", "Logo print area"],
    specs: [["Colour", "Yellow / orange"]],
    variants: ["Standard", "With zip"],
    packaging: "50 pieces per box",
    keywords: ["vest", "reflective", "ppe"],
  },
  "yuzey-dezenfektani": {
    name: "Surface Disinfectant (Concentrate)",
    summary: "Concentrated surface disinfectant used diluted.",
    description: "A concentrated product used diluted for surface disinfection in institutional areas.",
    features: ["Concentrated formula", "Wide area of use", "With application instructions"],
    specs: [["Form", "Liquid concentrate"]],
    packaging: "Canister",
    documents: ["Safety data sheet", "Application instructions"],
    keywords: ["disinfectant", "hygiene", "surface"],
  },
  "sirt-tipi-ilaclama-pompasi": {
    name: "Backpack Sprayer",
    summary: "Backpack pump for field disinfection and spraying applications.",
    description: "A backpack-type pump for disinfection and spraying in shelters, parks and field applications.",
    features: ["Adjustable nozzle", "Ergonomic carrying", "Pressure gauge"],
    specs: [["Type", "Manual / battery powered"]],
    variants: ["Manual", "Battery powered"],
    packaging: "Single box",
    documents: ["User manual"],
    keywords: ["pump", "spraying", "disinfection"],
  },
  "tekerlekli-atik-konteyneri": {
    name: "Wheeled Waste Container",
    summary: "Plastic waste container with lid and wheels.",
    description: "A wheeled container with lid for waste collection on streets and in facilities.",
    features: ["Lidded body", "On wheels", "Compatible with vehicle lifters"],
    specs: [["Body", "HDPE"]],
    packaging: "Stacked",
    keywords: ["container", "waste", "rubbish"],
  },
  "endustriyel-yemek-arabasi": {
    name: "Stainless Steel Service Trolley",
    summary: "Stainless steel service trolley for mass catering.",
    description: "A stainless steel service trolley with shelves for dining halls and mass catering areas.",
    features: ["Stainless steel body", "Braked castors", "Shelved design"],
    specs: [["Body", "Stainless steel"]],
    variants: ["2 shelves", "3 shelves"],
    packaging: "Box",
    keywords: ["service trolley", "kitchen", "catering"],
  },
  "calisma-masasi-kurumsal": {
    name: "Corporate Office Desk",
    summary: "Corporate office desk with cable management.",
    description: "A durable desk with cable management for public and corporate offices.",
    features: ["Cable channel", "Scratch-resistant surface"],
    specs: [["Surface", "Melamine-faced chipboard"]],
    packaging: "Disassembled, boxed",
    keywords: ["desk", "office", "furniture"],
  },
  "cocuk-oyun-grubu": {
    name: "Children’s Play Set",
    summary: "Children’s play set with slide and climbing elements.",
    description: "A play set with slide and climbing elements for parks and school yards.",
    features: ["Modular design", "Rounded corners", "UV-resistant plastic"],
    specs: [["Structure", "Galvanised posts"]],
    variants: ["Younger children", "Older children"],
    packaging: "Pallet",
    documents: ["Installation plan"],
    keywords: ["play set", "park", "slide"],
  },
};

export const enCatalogs: Record<string, string> = {
  "genel-urun-katalogu": "General Product Catalogue",
  "kurumsal-tanitim": "Corporate Presentation",
  "sokak-hayvanlari-katalogu": "Stray Animal Equipment",
  "kent-mobilyalari-katalogu": "Urban Furniture",
  "dezenfeksiyon-teknik": "Technical Documents for Disinfection Products",
  "uniforma-katalogu": "Uniforms and Workwear",
};

export const enCatalogTypes: Record<string, string> = {
  "Ürün Kataloğu": "Product Catalogue",
  "Teknik Doküman": "Technical Document",
  "Kurumsal Tanıtım": "Corporate Presentation",
};
