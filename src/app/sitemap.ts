import type { MetadataRoute } from "next";
import { categories, productHref, products, sectors, solutions } from "@/lib/data";
import { site } from "@/lib/site";

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
    "/projelerimiz",
    "/kataloglar",
    "/iletisim",
  ];
  return [
    ...staticPaths,
    ...categories.map((c) => `/urunler/${c.slug}`),
    ...products.map(productHref),
    ...solutions.map((s) => `/cozum-alanlari/${s.slug}`),
    ...sectors.map((s) => `/sektorler/${s.slug}`),
  ].map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
