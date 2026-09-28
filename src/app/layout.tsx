import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteProvider } from "@/components/QuoteProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DEFNE GROUP | Güvenilir Tedarik ve Proje Çözümleri",
    template: "%s | DEFNE GROUP",
  },
  description: site.description,
  // Gələcək dillər üçün ayrıca URL + hreflang hazırlığı (sənəd, bölmə 9)
  alternates: { canonical: "/", languages: { "tr-TR": "/" } },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: "DEFNE GROUP | Güvenilir Tedarik ve Proje Çözümleri",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#00704A",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.contact.email,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-charcoal antialiased">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
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
