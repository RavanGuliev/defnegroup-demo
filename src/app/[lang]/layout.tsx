import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteProvider } from "@/components/QuoteProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { localeLabels, locales } from "@/i18n/config";
import { getLang } from "@/i18n/server";
import { indexable, site } from "@/lib/site";
import "../globals.css";
import { SiteDataProvider } from "@/components/SiteData";
import { getDictionary, getRaw } from "@/lib/cms";
import { liteRaw } from "@/lib/store";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const t = (await getDictionary(lang)).meta;
  const brand = (await getRaw(lang)).site;
  return {
    // Favicon və paylaşım şəkli paneldən (Site Ayarları → Marka)
    ...(brand.favicon && { icons: { icon: brand.favicon, apple: brand.favicon } }),
    metadataBase: new URL(site.url),
    title: { default: t.title, template: "%s | DEFNE GROUP" },
    description: t.description,
    robots: indexable ? undefined : { index: false, follow: false },
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/tr" },
    },
    openGraph: {
      type: "website",
      locale: localeLabels[lang].og,
      alternateLocale: locales.filter((l) => l !== lang).map((l) => localeLabels[l].og),
      siteName: site.name,
      title: t.title,
      description: t.description,
      ...(brand.ogImage && { images: [{ url: brand.ogImage, width: 1200, height: 630 }] }),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#00704A",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const t = (await getDictionary(lang));
  const raw = await getRaw(lang);
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: raw.site.name,
    url: site.url,
    email: raw.site.contact.email ?? undefined,
    telephone: raw.site.contact.phone ?? undefined,
    logo: raw.site.logo ?? undefined,
    sameAs: Object.values(raw.site.social),
    description: t.meta.description,
  };

  return (
    <html lang={localeLabels[lang].htmlLang} className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-charcoal antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          {t.common.skipToContent}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <SiteDataProvider raw={liteRaw(raw)}>
          <QuoteProvider>
            <Header />
            <main id="icerik" className="min-w-0 flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </QuoteProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
