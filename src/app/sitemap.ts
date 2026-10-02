import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getDb } from "@/lib/cms";
import { allProductsHref, groupHref, productHref, subHref } from "@/lib/data";
import { site } from "@/lib/site";

/* Hər səhifə hər iki dildə; siyahı paneldəki (API) məzmundan qurulur */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb("tr");
  const staticPaths = [
    "",
    "/kurumsal",
    "/kurumsal/hakkimizda",
    "/kurumsal/misyon-ve-vizyon",
    "/kurumsal/neden-defne-group",
    "/kurumsal/belgeler-ve-sertifikalar",
    "/cozum-alanlari",
    "/sektorler",
    "/urunler",
    allProductsHref,
    "/projelerimiz",
    "/kataloglar",
    "/iletisim",
  ];
  const paths = [
    ...staticPaths,
    ...db.groups.map(groupHref),
    // Hazırlıq statusundakı alt bölmələr indekslənmir
    ...db.subcategories.filter((s) => !s.pending).map(subHref),
    ...db.products.filter((p) => p.subSlug).map(productHref),
    ...db.solutions.map((s) => `/cozum-alanlari/${s.slug}`),
    ...db.sectors.map((s) => `/sektorler/${s.slug}`),
  ];
  const now = new Date();
  return paths.flatMap((p) =>
    locales.map((lang) => ({
      url: `${site.url}/${lang}${p}`,
      lastModified: now,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${p}`])) },
    })),
  );
}
