import { headers } from "next/headers";
import Navigation from "../components/nav";
import CookieConsentBanner from "../components/cookieConsentBanner";
import Footer from "../components/footer";
import Script from "next/script";
import ImagePreloader from "../components/ImagePreloader";
import { CriticalCSS } from "./critical-css";
import BackToTop from "../components/BackToTop";
import { getServicesNav } from "../services/services";
import NextTopLoader from "nextjs-toploader";
import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export async function generateMetadata() {
  const host = (await headers()).get("host"); // Get the current domain
  const protocol = host?.includes("localhost") ? "http" : "https"; // Adjust for local dev

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: {
      template: "%s | OnlineInsurance.bg",
      default: "OnlineInsurance.bg | Онлайн застрахователни услуги",
    },
    description:
      "Открийте най-добрите застрахователни решения за автомобили, домове, здраве и живот.",
    openGraph: {
      title: "OnlineInsurance.bg | Онлайн застрахователни услуги",
      description:
        "Открийте най-добрите застрахователни решения за автомобили, домове, здраве и живот.",
      images: "/online-insurance.webp",
      type: "website",
      locale: "bg_BG",
      siteName: "OnlineInsurance.bg",
    },
    twitter: {
      card: "summary_large_image",
      title: "OnlineInsurance.bg",
      description: "Онлайн застрахователни услуги за вас и вашето семейство",
      images: ["/online-insurance.webp"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        bg: "/",
      },
    },
  };
}

export default async function RootLayout({ children }) {
  const servicesForNav = await getServicesNav().catch(() => []);
  return (
    <html lang="bg">
      <head>
        <CriticalCSS />
        <link
          rel="preconnect"
          href="https://onlineinsurance.bg"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://onlineinsurance.bg" />
        <link
          rel="preconnect"
          href="https://onlineinsurance.admin-panels.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://onlineinsurance.admin-panels.com"
        />

        {/* Директно използване на preload тагове с правилния синтаксис */}
        <link
          rel="preload"
          as="image"
          href="/online-insurance.webp"
          type="image/webp"
          media="(max-width: 640px)"
          imagesrcset="/online-insurance.webp 1x"
          imagesizes="(max-width: 640px) 100vw"
        />

        <link
          rel="preload"
          as="image"
          href="/online-insurance.webp"
          type="image/webp"
          media="(min-width: 641px)"
          imagesrcset="/online-insurance.webp 1x"
          imagesizes="(min-width: 641px) 50vw"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={roboto.className}>
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:p-2"
        >
          Пропусни към съдържанието
        </a>
        {process.env.NODE_ENV !== "production" && (
          <NextTopLoader showSpinner={false} color="#47a7d7" />
        )}
        <BackToTop />
        <ImagePreloader />
        <Navigation initialServices={servicesForNav} />
        <main id="content">{children}</main>
        <CookieConsentBanner />
        <Footer />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "InsuranceAgency",
                  name: "OnlineInsurance.bg",
                  url: "https://onlineinsurance.bg",
                  logo: "https://onlineinsurance.bg/logo.png",
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+359 889 336 636",
                      contactType: "customer service",
                    },
                  ],
                  sameAs: [
                    "https://www.facebook.com/onlineinsurance.bg",
                    "https://www.linkedin.com/company/onlineinsurance-bg",
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "OnlineInsurance.bg",
                  url: "https://onlineinsurance.bg",
                  potentialAction: {
                    "@type": "SearchAction",
                    target:
                      "https://onlineinsurance.bg/blog?page=1&q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
