/*
 * Laravel API-dən (defnegroup-api) saytın bütün məzmununu oxuyur — yalnız serverdə.
 * Sorğular "cms" teqi ilə keşlənir; paneldə dəyişiklik olanda Laravel /api/revalidate-ə
 * xəbər verir və keş yenilənir. API əlçatan deyilsə sayt statik məlumatla açılır.
 */
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import { getDict, type Dictionary } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { staticRaw, type Catalog, type Certificate, type Group, type IconName, type Product, type Project, type Sector, type Solution, type Subcategory } from "./data";
import { makeDb, mergeCopy, pick, type ContentTree, type RawData, type SiteInfo } from "./store";

const API = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL)?.replace(/\/$/, "");
/** Paneldəki dəyişiklik revalidate siqnalı ilə dərhal düşür; siqnal gəlməsə də 5 dəqiqədən bir yenilənir. */
const REVALIDATE = 300;

async function api<T>(path: string, lang: Locale): Promise<T> {
  const url = `${API}${path}${path.includes("?") ? "&" : "?"}lang=${lang}`;
  const res = await fetch(url, { headers: { Accept: "application/json" }, next: { revalidate: REVALIDATE, tags: ["cms"] } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return ((await res.json()) as { data: T }).data;
}

/* ---------- API cavabları → saytın tipləri ---------- */

type ApiSub = { code: string; slug: string; group_code: string; name: string; pending: boolean; image: string | null };
type ApiGroup = { code: string; slug: string; name: string; icon: string | null; image: string | null; featured: boolean; subcategory_count: number; subcategories: ApiSub[] };
type ApiProduct = {
  slug: string; code: string; name: string; summary: string | null; description: string | null; group_code: string; group_slug: string;
  subcategory_code: string | null; subcategory_slug: string | null; images: string[]; is_new: boolean; is_sample: boolean; is_featured: boolean;
  features: string[]; specs: { label: string; value: string }[]; variants: string[]; packaging: string | null; usage_areas: string[];
  keywords: string[]; search_text: string | null; sectors: { slug: string }[]; cross_groups: { code: string }[]; documents: { name: string; type: string; url: string | null }[];
};
type ApiSector = { slug: string; name: string; description: string | null; icon: string | null; image: string | null; content: string | null };
type ApiSolution = { slug: string; name: string; need: string | null; description: string | null; scope: string[]; icon: string | null; image: string | null; content: string | null; group_codes: string[]; sector_slugs: string[] };
type ApiCatalog = { slug: string; name: string; type_label: string; group_code: string | null; file: string | null; cover: string | null; updated_on: string | null };
type ApiProject = { slug: string; title: string; summary: string | null; content: string | null; year: number | null; client_name: string | null; sector: { slug: string } | null; solution: { slug: string } | null; images: string[] };
type ApiCertificate = { slug: string; name: string; type: string | null; issuer: string | null; valid_until: string | null; file: string | null; preview: string | null };
type ApiSite = {
  name: string; logo: string | null; logo_light: string | null; favicon: string | null; og_image: string | null; social: Record<string, string> | [];
  contact: { email: string | null; quote_email: string | null; phone: string | null; whatsapp: string | null; address: string | null; map_url: string | null; map_query?: string | null; working_hours: string | null };
  show_location?: boolean;
  hero_slides: { label: string | null; image: string | null; group_codes: string[] }[];
  fair_photos?: { image: string | null; caption: string | null; date: string | null }[];
};

const icon = (v: string | null | undefined, fallback: IconName = "clipboard") => (v || fallback) as IconName;
const opt = <T,>(v: T | null | undefined) => v ?? undefined;

async function fromApi(lang: Locale): Promise<RawData> {
  const [groups, products, sectors, solutions, catalogs, projects, certificates, content, site] = await Promise.all([
    api<ApiGroup[]>("/groups", lang),
    api<ApiProduct[]>("/products?detail=1&per_page=500", lang),
    api<ApiSector[]>("/sectors", lang),
    api<ApiSolution[]>("/solutions", lang),
    api<ApiCatalog[]>("/catalogs", lang),
    api<ApiProject[]>("/projects", lang),
    api<ApiCertificate[]>("/certificates", lang),
    api<ContentTree>("/content", lang),
    api<ApiSite>("/site", lang),
  ]);
  const fb = staticRaw(lang);
  const list = <T,>(path: string) => (Array.isArray(pick(content, path)) ? (pick(content, path) as T[]) : undefined);

  return {
    lang,
    source: "api",
    groups: groups.map<Group>((g) => ({ code: g.code, slug: g.slug, name: g.name, icon: icon(g.icon), image: opt(g.image), featured: g.featured, subCount: g.subcategory_count })),
    subcategories: groups.flatMap((g) =>
      g.subcategories.map<Subcategory>((s) => ({ code: s.code, groupCode: g.code, groupSlug: g.slug, slug: s.slug, name: s.pending ? undefined : s.name, pending: s.pending })),
    ),
    products: products.map<Product>((p) => ({
      slug: p.slug,
      code: p.code,
      name: p.name,
      subCode: p.subcategory_code ?? "",
      groupCode: p.group_code,
      groupSlug: p.group_slug,
      subSlug: opt(p.subcategory_slug),
      crossGroups: p.cross_groups.map((g) => g.code),
      sample: p.is_sample,
      isNew: p.is_new,
      featured: p.is_featured,
      sectorSlugs: p.sectors.map((s) => s.slug),
      usageAreas: p.usage_areas,
      summary: p.summary ?? "",
      description: p.description ?? "",
      descriptionHtml: true,
      features: p.features,
      specs: p.specs,
      variants: p.variants,
      packaging: p.packaging ?? "",
      documents: p.documents.map((d) => ({ name: d.name, type: d.type, url: opt(d.url) })),
      keywords: p.keywords,
      images: p.images,
      searchText: opt(p.search_text),
    })),
    sectors: sectors.map<Sector>((s) => ({ slug: s.slug, name: s.name, description: s.description ?? "", icon: icon(s.icon, "building"), image: opt(s.image), content: opt(s.content) })),
    solutions: solutions.map<Solution>((s) => ({
      slug: s.slug, name: s.name, need: s.need ?? "", description: s.description ?? "", scope: s.scope, icon: icon(s.icon),
      image: opt(s.image), content: opt(s.content), groupCodes: s.group_codes, sectorSlugs: s.sector_slugs,
    })),
    processSteps: list<RawData["processSteps"][number]>("process.steps") ?? fb.processSteps,
    trustItems: list<RawData["trustItems"][number]>("home.trust") ?? fb.trustItems,
    usageAreas: fb.usageAreas,
    catalogs: catalogs.map<Catalog>((c) => ({ slug: c.slug, name: c.name, type: c.type_label, groupCode: opt(c.group_code), file: opt(c.file), cover: opt(c.cover), updatedAt: c.updated_on ?? "" })),
    projects: projects.map<Project>((p) => ({
      slug: p.slug, title: p.title, summary: opt(p.summary), content: opt(p.content), year: opt(p.year), clientName: opt(p.client_name),
      sectorSlug: p.sector?.slug, solutionSlug: p.solution?.slug, images: p.images,
    })),
    certificates: certificates.map<Certificate>((c) => ({ slug: c.slug, name: c.name, type: c.type ?? "", issuer: opt(c.issuer), validUntil: opt(c.valid_until), file: c.file ?? "", preview: opt(c.preview) })),
    site: {
      name: site.name,
      logo: site.logo,
      logoLight: site.logo_light,
      favicon: site.favicon,
      ogImage: site.og_image,
      social: Array.isArray(site.social) ? {} : site.social,
      contact: {
        email: site.contact.email, quoteEmail: site.contact.quote_email, phone: site.contact.phone, whatsapp: site.contact.whatsapp,
        address: site.contact.address, mapUrl: site.contact.map_url, mapQuery: site.contact.map_query ?? null, workingHours: site.contact.working_hours,
      },
      showLocation: site.show_location !== false,
      fairPhotos: (site.fair_photos ?? []).flatMap((f) => (f.image ? [{ image: f.image, caption: f.caption, date: f.date }] : [])),
      heroSlides: site.hero_slides.map((h) => ({ label: h.label, image: h.image, groupCodes: h.group_codes })),
    } satisfies SiteInfo,
    images: (pick(content, "images") as Record<string, string | null>) ?? {},
    content,
  };
}

/** Bir sorğu ərzində bir dəfə yüklənir (React cache). */
export const getRaw = cache(async (lang: Locale): Promise<RawData> => {
  if (!API) return staticRaw(lang);
  try {
    return await fromApi(lang);
  } catch (e) {
    console.warn(`[cms] API əlçatan deyil, statik məlumat istifadə olunur: ${(e as Error).message}`);
    return staticRaw(lang);
  }
});

export const getDb = cache(async (lang?: Locale) => makeDb(await getRaw(lang ?? (await getLang()))));

/** Saytın ortaq lüğəti + paneldəki dəyişikliklər. */
export const getDictionary = cache(async (lang?: Locale): Promise<Dictionary> => {
  const l = lang ?? (await getLang());
  return mergeCopy(getDict(l), (await getRaw(l)).content);
});

/** Səhifəyə xas mətnlər (səhifə faylındakı `copy`) + paneldəki dəyişikliklər. */
export async function pageCopy<T>(path: string, base: Record<Locale, T>, lang?: Locale): Promise<T> {
  const l = lang ?? (await getLang());
  return mergeCopy(base[l], pick((await getRaw(l)).content, path), path);
}
