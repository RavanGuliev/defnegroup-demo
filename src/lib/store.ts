/*
 * Saytın məlumat qatı (server və brauzerdə eyni işləyir).
 * RawData API-dən (və ya API əlçatan olmadıqda statik data.ts-dən) gəlir; makeDb ondan
 * axtarış/keçid köməkçiləri qurur, mergeCopy isə paneldəki mətnləri saytın lüğəti ilə birləşdirir.
 */
import type { Locale } from "@/i18n/config";
import {
  normalize,
  productGroupCode,
  type Catalog,
  type Certificate,
  type Group,
  type IconName,
  type Product,
  type Project,
  type Sector,
  type Solution,
  type Subcategory,
} from "./data";

export type ContentTree = { [key: string]: unknown };

export type SiteInfo = {
  name: string;
  logo: string | null;
  logoLight: string | null;
  favicon: string | null;
  ogImage: string | null;
  social: Record<string, string>;
  contact: {
    email: string | null;
    quoteEmail: string | null;
    phone: string | null;
    whatsapp: string | null;
    address: string | null;
    mapUrl: string | null;
    /** Xəritə üçün koordinat və ya ünvan (boşdursa ünvan istifadə olunur) */
    mapQuery: string | null;
    workingHours: string | null;
  };
  /** Ana səhifədə "Konum" bölməsi (paneldə söndürülə bilər) */
  showLocation: boolean;
  /** Ana səhifə "Fuarlar" qalereyası (Panel → Site → Fuar Galerisi) */
  fairPhotos: { image: string; caption: string | null; date: string | null }[];
  /** label boşdursa lüğətdəki slayd başlığı istifadə olunur */
  heroSlides: { label: string | null; image: string | null; groupCodes: string[] }[];
};

export type RawData = {
  lang: Locale;
  source: "api" | "static";
  groups: Group[];
  subcategories: Subcategory[];
  products: Product[];
  sectors: Sector[];
  solutions: Solution[];
  processSteps: { title: string; text: string; icon: IconName }[];
  trustItems: { title: string; icon: IconName }[];
  usageAreas: string[];
  catalogs: Catalog[];
  projects: Project[];
  certificates: Certificate[];
  site: SiteInfo;
  /** Səhifə şəkilləri (Site İçeriği → Sayfa görselleri): açar → URL */
  images: Record<string, string | null>;
  /** Paneldəki bütün mətnlər (iç-içə) */
  content: ContentTree;
};

export function makeDb(raw: RawData) {
  const { lang, groups: G, subcategories: S, products: P } = raw;
  const en = lang === "en";

  const getGroupByCode = (code: string) => G.find((g) => g.code === code);
  const getSub = (code: string) => S.find((s) => s.code === code);
  const subName = (s: Subcategory) => s.name ?? `${en ? "Subcategory" : "Alt Kategori"} ${s.code}`;
  const productGroup = (p: Product) => getGroupByCode(productGroupCode(p))!;

  return {
    lang,
    source: raw.source,
    groups: G,
    subcategories: S,
    products: P,
    sectors: raw.sectors,
    solutions: raw.solutions,
    processSteps: raw.processSteps,
    trustItems: raw.trustItems,
    usageAreas: raw.usageAreas,
    catalogs: raw.catalogs,
    projects: raw.projects,
    certificates: raw.certificates,
    site: raw.site,
    images: raw.images,

    getGroup: (slug: string) => G.find((g) => g.slug === slug),
    getGroupByCode,
    getSub,
    getSubBySlug: (groupCode: string, slug: string) => S.find((s) => s.groupCode === groupCode && s.slug === slug),
    subsOfGroup: (groupCode: string) => S.filter((s) => s.groupCode === groupCode),
    getSector: (slug: string) => raw.sectors.find((s) => s.slug === slug),
    getSolution: (slug: string) => raw.solutions.find((s) => s.slug === slug),
    getProduct: (slug: string) => P.find((p) => p.slug === slug),
    productGroup,
    productsInSub: (code: string) => P.filter((p) => p.subCode === code),
    productsInGroup: (code: string) => P.filter((p) => productGroupCode(p) === code),
    linkedProductsForGroup: (code: string) => P.filter((p) => p.crossGroups?.includes(code)),
    productsInSector: (slug: string) => P.filter((p) => p.sectorSlugs.includes(slug)),
    subName,
    /** Ad, kod, açar söz və kateqoriya adına görə axtarış (Türk hərfləri normallaşdırılır). */
    searchProducts(query: string, list: Product[] = P) {
      const q = normalize(query);
      if (!q) return list;
      const terms = q.split(/\s+/);
      return list.filter((p) => {
        const sub = getSub(p.subCode);
        const hay = `${p.searchText ?? normalize([p.name, p.code].join(" "))} ${normalize([productGroup(p)?.name ?? "", sub ? subName(sub) : ""].join(" "))}`;
        return terms.every((t) => hay.includes(t));
      });
    },
  };
}

export type Db = ReturnType<typeof makeDb>;

/* ---------- paneldəki mətnlərin birləşdirilməsi ---------- */

/**
 * Bir neçə parametrli şablonlarda yer tutucuların sırası (production build-də funksiya
 * parametr adları kiçildildiyi üçün adlar buradan götürülür). Tək parametrli şablonlarda
 * bütün {…} yer tutucuları həmin parametrlə doldurulur.
 */
const TEMPLATE_PARAMS: Record<string, string[]> = {
  "quote.tooBig": ["f", "mb"],
  "quote.fileHint": ["n", "mb"],
  "pages.urunler.grup.alt.metaDescription": ["g", "s"],
  "pages.urunler.meta": ["g", "s", "p"],
};

/** "{product|products}" → say 1 olduqda tək, əks halda cəm forma (ingiliscə mətnlər üçün). */
const plural = (s: string, n: unknown) => s.replace(/\{([^{}|]+)\|([^{}|]+)\}/g, (_, one: string, many: string) => (n === 1 ? one : many));

function template(path: string, tpl: string, arity: number) {
  const names = TEMPLATE_PARAMS[path];
  return (...args: unknown[]) => {
    const n = [...args].reverse().find((a) => typeof a === "number");
    if (names) return plural(names.reduce((s, k, i) => s.replaceAll(`{${k}}`, String(args[i] ?? "")), tpl), n);
    return arity === 0 ? tpl : plural(tpl.replace(/\{[a-z]+\}/gi, String(args[0] ?? "")), n);
  };
}

const filled = (v: unknown) => v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0);

/**
 * `base` (saytdakı lüğət və ya səhifə mətni) üzərinə paneldəki dəyərləri yazır.
 * Quruluş `base`-dən götürülür; paneldə boş olan sahə saytdakı ilkin mətnlə qalır.
 */
export function mergeCopy<T>(base: T, over: unknown, path = ""): T {
  if (!filled(over)) return base;
  if (typeof base === "function") {
    return (typeof over === "string" ? template(path, over, (base as (...a: unknown[]) => unknown).length) : base) as T;
  }
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  if (base && typeof base === "object") {
    if (typeof over !== "object" || Array.isArray(over)) return base;
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const k of Object.keys(out)) out[k] = mergeCopy(out[k], (over as Record<string, unknown>)[k], path ? `${path}.${k}` : k);
    return out as T;
  }
  if (typeof base === "string") return (typeof over === "string" ? over : base) as T;
  return base;
}

/** Ağacda nöqtəli yol: "pages.home" */
export function pick(tree: ContentTree, path: string): unknown {
  return path.split(".").reduce<unknown>((n, k) => (n && typeof n === "object" ? (n as ContentTree)[k] : undefined), tree);
}

/** Brauzerə ötürüləcək yüngül məlumat — məhsulların uzun mətnləri çıxarılır. */
export function liteRaw(raw: RawData): RawData {
  return {
    ...raw,
    products: raw.products.map((p) => ({ ...p, description: "", features: [], specs: [], variants: [], packaging: "", keywords: [] })),
  };
}
