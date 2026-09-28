export const site = {
  name: "DEFNE GROUP",
  domain: "defnegroup.com",
  url: "https://defnegroup.com",
  description:
    "Kamu kurumları ve özel sektör için güvenilir tedarik ve proje çözümleri. Geniş ürün portföyü, sektörel deneyim ve ihtiyaca özel yaklaşım.",
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

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const mainNav: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  {
    label: "Kurumsal",
    href: "/kurumsal",
    children: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "Misyon ve Vizyon", href: "/kurumsal/misyon-ve-vizyon" },
      { label: "Neden DEFNE GROUP", href: "/kurumsal/neden-defne-group" },
      { label: "Belgeler ve Sertifikalar", href: "/kurumsal/belgeler-ve-sertifikalar" },
    ],
  },
  { label: "Çözüm Alanları", href: "/cozum-alanlari" },
  { label: "Sektörler", href: "/sektorler" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Projelerimiz", href: "/projelerimiz" },
  { label: "Kataloglar", href: "/kataloglar" },
  { label: "İletişim", href: "/iletisim" },
];
