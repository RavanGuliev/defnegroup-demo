import { isFinal } from "./flags";

export { isFinal };
/** Sınaq mühiti noindex-dir; yalnız son yayında indeksləmə açılır. */
export const indexable = isFinal;

export const site = {
  name: "DEFNE GROUP",
  domain: "defnegroup.com",
  url: "https://defnegroup.com",
  // İletişim bilgileri DEFNE GROUP tarafından onaylandıktan sonra doldurulacak.
  contact: {
    email: "info@defnegroup.com",
    quoteEmail: "teklif@defnegroup.com",
    phone: "",
    phoneHref: "",
    whatsapp: "",
    address: "",
    hours: [] as string[],
  },
};

export type NavKey =
  | "home"
  | "productGroups"
  | "solutionsMenu"
  | "solutionAreas"
  | "servedSectors"
  | "corporate"
  | "about"
  | "projects"
  | "certificates"
  | "catalogs"
  | "contact";
/** Menyu elementləri — başlıqlar lüğətdən (`dict.nav[key]`) götürülür. */
export type NavItem = { key: NavKey; href: string; children?: NavItem[] };

/*
 * Üst menyu (Kalan İşler, bölmə 1): Logo → Ürün Grupları → Çözümler → Kurumsal → Kataloglar → İletişim.
 * Ana Sayfa masaüstü menyusunda yoxdur (loqo ana səhifəni açır); mobil menyuda saxlanılır.
 */
export const mainNav: NavItem[] = [
  { key: "productGroups", href: "/urunler" },
  {
    key: "solutionsMenu",
    href: "/cozum-alanlari",
    children: [
      { key: "solutionAreas", href: "/cozum-alanlari" },
      { key: "servedSectors", href: "/sektorler" },
    ],
  },
  {
    key: "corporate",
    href: "/kurumsal",
    children: [
      { key: "about", href: "/kurumsal/hakkimizda" },
      { key: "projects", href: "/projelerimiz" },
      { key: "certificates", href: "/kurumsal/belgeler-ve-sertifikalar" },
    ],
  },
  { key: "catalogs", href: "/kataloglar" },
  { key: "contact", href: "/iletisim" },
];

export const homeNav: NavItem = { key: "home", href: "/" };

/** Son yayında məzmunu olmayan səhifələrin (layihələr, sənədlər) menyu keçidi gizlədilir. */
export function navVisible(item: NavItem, counts: { projects: number; certificates: number }) {
  if (!isFinal) return true;
  if (item.key === "projects") return counts.projects > 0;
  if (item.key === "certificates") return counts.certificates > 0;
  return true;
}

/** Telefon nömrəsindən tel: keçidi (boşluq, mötərizə və tire silinir). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
