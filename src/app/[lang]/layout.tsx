import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteProvider } from "@/components/QuoteProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { localeLabels, locales } from "@/i18n/config";
import { getDict } from "@/i18n/dictionaries";
import { getLang } from "@/i18n/server";
import { indexable, site } from "@/lib/site";
import "../globals.css";

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
  const t = getDict(lang).meta;
  return {
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
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#00704A",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  const t = getDict(lang);
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.contact.email,
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
        <QuoteProvider>
          <Header />
          <main id="icerik" className="min-w-0 flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </QuoteProvider>
      </body>
    </html>
  );
}
