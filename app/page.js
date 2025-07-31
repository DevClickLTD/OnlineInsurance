import HeroSection from "../components/hero";
import { WebVitals } from "./web-vitals";
import dynamic from "next/dynamic";

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

// Добавяне на метаданни за главната страница
export const metadata = {
  title: "OnlineInsurance.bg - Онлайн застрахователни услуги",
  description:
    "Открийте най-добрите застрахователни решения за автомобили, домове, здраве и живот. Получете безплатна оферта за минути и се насладете на сигурността, която заслужавате.",
  keywords: [
    "автомобилно застраховане",
    "имуществено застраховане",
    "здравно застраховане",
    "животозастраховане",
    "онлайн застраховки",
    "застрахователни услуги",
    "България",
  ],
  openGraph: {
    title: "OnlineInsurance.bg - Онлайн застрахователни услуги",
    description: "Най-добрите застрахователни решения за вас и вашето семейство",
    images: [
      {
        url: "/hero-image-desktop.jpg",
        width: 1200,
        height: 630,
        alt: "OnlineInsurance.bg - Застрахователни услуги",
      },
    ],
    locale: "bg_BG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnlineInsurance.bg - Онлайн застрахователни услуги",
    description: "Най-добрите застрахователни решения за вас и вашето семейство",
    images: ["/hero-image-desktop.jpg"],
  },
};

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
