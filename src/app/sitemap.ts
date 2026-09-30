import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { allProductsHref, groupHref, groups, productHref, products, sectors, solutions, subcategories, subHref } from "@/lib/data";
import { site } from "@/lib/site";

/* Hər səhifə hər iki dildə yer alır; hreflang alternativləri ilə */
export default function sitemap(): MetadataRoute.Sitemap {
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
    ...groups.map(groupHref),
    // Hazırlıq statusundakı alt bölmələr indekslənmir
    ...subcategories.filter((s) => !s.pending).map(subHref),
    ...products.map(productHref),
    ...solutions.map((s) => `/cozum-alanlari/${s.slug}`),
    ...sectors.map((s) => `/sektorler/${s.slug}`),
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
