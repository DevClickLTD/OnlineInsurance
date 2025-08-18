import { getServiceBySlug } from "../../../services/services";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

// Динамично зареждане на компоненти за по-добро разделяне на кода
const ServiceContent = dynamic(
  () => import("../../../components/ServiceContent"),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
    ),
  }
);

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || service.length === 0) {
    throw new Error("Service not found");
  }

  const meta = service[0].yoast_head_json;
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  const safeTitle = meta.title?.slice(0, 60);
  const safeDescription = (meta.description || meta.og_description || "")
    .replace(/\s+/g, " ")
    .slice(0, 155);

  return {
    title: safeTitle,
    description: safeDescription,
    keywords: meta.keywords || [
      "услуги",
      "професионални услуги",
      slug.replace(/-/g, " "),
    ],
    openGraph: {
      title: meta.og_title || safeTitle,
      description: meta.og_description || safeDescription,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: safeTitle }]
        : [
            {
              url: "/online-insurance.webp",
              width: 1200,
              height: 630,
              alt: safeTitle,
            },
          ],
      type: "article",
    },
    robots: {
      index: meta?.robots?.index !== "noindex",
      follow: meta?.robots?.follow !== "nofollow",
      googleBot: {
        index: meta?.robots?.index !== "noindex",
        follow: meta?.robots?.follow !== "nofollow",
        "max-snippet": meta?.robots?.["max-snippet"] ?? -1,
        "max-image-preview": meta?.robots?.["max-image-preview"] ?? "large",
        "max-video-preview": meta?.robots?.["max-video-preview"] ?? -1,
      },
    },
    alternates: {
      canonical: meta.canonical || `/zastrahovki/${slug}`,
    },
  };
}

export default async function ServicePage({ params }) {
  try {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service || service.length === 0) {
      throw new Error("Service not found");
    }

    const meta = service[0].yoast_head_json;
    const ogImage =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

    // Подготвяме структурирани данни за Schema.org
    const serviceSchemaData = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service[0].title.rendered,
      description:
        service[0].content.rendered.replace(/<[^>]+>/g, "").substring(0, 200) +
        "...",
      url: meta.canonical || `https://onlineinsurance.bg/zastrahovki/${slug}`,
      provider: {
        "@type": "Organization",
        name: "OnlineInsurance.bg",
        url: "https://onlineinsurance.bg",
        logo: "https://onlineinsurance.bg/logo.png",
      },
      image: ogImage || "https://onlineinsurance.bg/placeholder.webp",
      serviceType: service[0]?.title?.rendered || undefined,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Bulgaria",
      },
      offers: {
        "@type": "Offer",
        price: "Свържете се с нас за цена",
        priceCurrency: "BGN",
      },
    };

    // Ако имаме често задавани въпроси във WP съдържанието (маркирани с h3/strong), генерираме FAQPage
    const faqMatches = (service[0].content.rendered || "").match(
      /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis
    );
    const faqs = faqMatches
      ? faqMatches.map((block) => {
          const q = (block.match(/<h3[^>]*>(.*?)<\/h3>/i) || [])[1] || "";
          const a = (block.match(/<p[^>]*>([\s\S]*?)<\/p>/i) || [])[1] || "";
          return {
            "@type": "Question",
            name: q.replace(/<[^>]+>/g, " ").trim(),
            acceptedAnswer: {
              "@type": "Answer",
              text: a.trim(),
            },
          };
        })
      : [];

    return (
      <>
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchemaData),
          }}
        />

        {/* Breadcrumbs structured data */}
        <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Начало",
                  item: "https://onlineinsurance.bg/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Застраховки",
                  item: "https://onlineinsurance.bg/zastrahovki",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: service[0].title.rendered,
                  item:
                    meta.canonical ||
                    `https://onlineinsurance.bg/zastrahovki/${slug}`,
                },
              ],
            }),
          }}
        />

        {faqs.length > 0 && (
          <Script
            id="faq-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs,
              }),
            }}
          />
        )}

        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <h1 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                {service[0].title.rendered}
              </h1>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#47a7d7" />
                    <stop offset={1} stopColor="#47a7d7" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-12 sm:py-12">
          <div className="mx-auto w-full">
            <nav
              className="mx-auto max-w-8xl w-full mb-6 text-sm text-gray-600 px-6 lg:px-8"
              aria-label="Breadcrumb"
            >
              <ol className="flex space-x-2">
                <li>
                  <a href="/">Начало</a>
                </li>
                <li>/</li>
                <li>
                  <a href="/zastrahovki">Застраховки</a>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-gray-900">
                  {service[0].title.rendered}
                </li>
              </ol>
            </nav>
            <Suspense
              fallback={
                <div className="animate-pulse h-96 bg-gray-100 rounded-md"></div>
              }
            >
              <ServiceContent content={service[0].content.rendered} />
            </Suspense>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
