/*
 * Sınaq mühiti noindex-dir (düzəliş tapşırığı, bölmə 7). Şəkil hüquqları, təchizatçı/model
 * və DEFNE təsdiqi tamamlandıqdan sonra canlı mühitdə SITE_INDEXABLE=true təyin edilir.
 */
export const indexable = process.env.SITE_INDEXABLE === "true";

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

export type NavKey = "home" | "corporate" | "about" | "mission" | "why" | "certificates" | "solutions" | "sectors" | "productGroups" | "projects" | "catalogs" | "contact";
/** Menyu elementləri — başlıqlar lüğətdən (`dict.nav[key]`) götürülür. */
export type NavItem = { key: NavKey; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { key: "home", href: "/" },
  {
    key: "corporate",
    href: "/kurumsal",
    children: [
      { key: "about", href: "/kurumsal/hakkimizda" },
      { key: "mission", href: "/kurumsal/misyon-ve-vizyon" },
      { key: "why", href: "/kurumsal/neden-defne-group" },
      { key: "certificates", href: "/kurumsal/belgeler-ve-sertifikalar" },
    ],
  },
  { key: "solutions", href: "/cozum-alanlari" },
  { key: "sectors", href: "/sektorler" },
  { key: "productGroups", href: "/urunler" },
  { key: "projects", href: "/projelerimiz" },
  { key: "catalogs", href: "/kataloglar" },
  { key: "contact", href: "/iletisim" },
];
