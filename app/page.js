import HeroSection from "../components/hero";
import { WebVitals } from "./web-vitals";
import dynamic from "next/dynamic";
import { getFirstExistingPageBySlugs } from "../services/pages";

// Динамично зареждане на компоненти с lazy loading
const Incentives = dynamic(() => import("../components/incentives"), {
  ssr: true,
});
const CTA = dynamic(() => import("../components/cta"), { ssr: true });
const Clients = dynamic(() => import("../components/clients"), { ssr: true });
const Lastestposts = dynamic(() => import("../components/latestposts"), {
  ssr: true,
});

// Добавяне на ISR ревалидиране на всеки час
export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getFirstExistingPageBySlugs([
    "home",
    "начало",
    "homepage",
    "front-page",
    "index",
  ]);

  const meta = page?.yoast_head_json;
  const ogImage = meta?.og_image?.[0]?.url;
  const title = meta?.title || "OnlineInsurance.bg";
  const description = meta?.description || meta?.og_description || "";

  return {
    title,
    description,
    robots: meta?.robots
      ? {
          index: meta.robots.index !== "noindex",
          follow: meta.robots.follow !== "nofollow",
        }
      : undefined,
    alternates: {
      canonical: meta?.canonical || "/",
    },
    openGraph: {
      title: meta?.og_title || title,
      description: meta?.og_description || description,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [{ url: "/online-insurance.webp", width: 1200, height: 630 }],
      type: "website",
      locale: "bg_BG",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : ["/online-insurance.webp"],
    },
  };
}

export default function Home() {
  return (
    <>
      <WebVitals />
      <HeroSection />
      <Incentives />
      <CTA />
      <Clients />
      <Lastestposts />
    </>
  );
}
