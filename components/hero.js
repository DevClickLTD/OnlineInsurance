import Link from "next/link";
import LazyImageObserver from "./LazyImageObserver";

export default function Hero() {
  return (
    <>
      <LazyImageObserver />
      <div className="bg-white">
        {/* Мобилен Hero с изображение най-отгоре - ще бъде LCP елемент за мобилни */}
        <div className="lg:hidden relative">
          <div className="w-full">
            {/* Директно използване на HTML img за максимална производителност на LCP */}
            <img
              src="/online-insurance.webp"
              width={640}
              height={400}
              alt="Онлайн застраховане – илюстративно изображение"
              className="w-full h-auto object-cover aspect-[4/3]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                objectFit: "cover",
              }}
              id="hero-mobile-lcp"
            />
          </div>

          <div className="px-6 py-10">
            <h1 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 font-display">
              Сигурност и защита за вашето бъдеще
            </h1>
            <p className="mt-4 text-2xl font-medium font-display">
              Онлайн застраховане
            </p>
            <p className="mt-6 text-sm font-medium text-pretty text-gray-500 font-display">
              Открийте най-добрите застрахователни решения за автомобили,
              домове, здраве и живот. Получете безплатна оферта за минути с
              нашата удобна онлайн платформа.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <Link
                href="/zastrahovki"
                className="rounded-md bg-[#47a7d7] hover:bg-gray-300 hover:text-[#000000] px-3 py-2 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Застраховки
              </Link>
            </div>
          </div>
        </div>

        {/* Десктоп Hero с текст вляво и изображение вдясно */}
        <div className="hidden lg:block relative">
          <div className="mx-auto max-w-7xl">
            <div className="relative z-10 pt-0 lg:w-full lg:max-w-2xl">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="absolute inset-y-0 right-8 h-full w-80 translate-x-1/2 transform fill-white"
              >
                <polygon points="0,0 90,0 50,100 0,100" />
              </svg>
              <div className="relative px-6 py-12 lg:px-8 lg:py-14 lg:pr-0">
                <div className="ml-0 mr-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                  <div className="mt-2 mb-10 flex">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Полезни статии и новини от нашия блог.{" "}
                      <Link
                        href="/blog"
                        className="font-semibold whitespace-nowrap text-[#47a7d7]"
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        Вижте повече <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                  <h1 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl font-display">
                    Сигурност и защита за вашето бъдеще
                  </h1>
                  <p className="mt-8 text-4xl font-medium font-display">
                    Онлайн застраховане
                  </p>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 font-display">
                    Открийте най-добрите застрахователни решения за автомобили,
                    домове, здраве и живот. Получете безплатна оферта за минути
                    и се насладете на сигурността, която заслужавате. Нашите
                    експерти са тук, за да ви помогнат да направите правилния
                    избор за вас и вашето семейство.
                  </p>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/zastrahovki"
                      className="rounded-md bg-[#47a7d7] hover:bg-gray-300 hover:text-black px-3.5 py-2.5 text-sm font-semibold text-black shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Застраховки
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm/6 font-semibold text-gray-900"
                    >
                      Блог <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 absolute inset-y-0 right-0 w-1/2">
            {/* Директно използване на HTML img за десктоп версията */}
            <img
              src="/online-insurance.webp"
              width={955}
              height={776}
              alt="Онлайн застраховане – илюстративно изображение"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ objectFit: "cover" }}
              id="hero-desktop-lcp"
            />
          </div>
        </div>
      </div>
    </>
  );
}
