const incentives = [
  {
    name: "Бързо и лесно",
    imageSrc: "/icons/cta-icon-1.svg",
    description:
      "Получете оферта за минути с нашата онлайн платформа. Няма нужда от чакане или сложни формуляри.",
  },
  {
    name: "Най-добри цени",
    imageSrc: "/icons/cta-icon-2.svg",
    description:
      "Сравняваме оферти от водещи застрахователни компании, за да ви предложим най-изгодната оферта.",
  },
  {
    name: "24/7 Подкрепа",
    imageSrc: "/icons/cta-icon-3.svg",
    description:
      "Нашият клиентски екип е на разположение 24 часа в деня, 7 дни в седмицата, за да ви помогне при нужда.",
  },
];

export default function Incentives() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Защо да изберете нас?
              </h2>
              <p className="mt-4 text-white">
                С над 15 години опит в застрахователната бранша, ние сме вашият надежден 
                партньор за защита на всичко, което е важно за вас. От автомобилно 
                застраховане до комплексни решения за дома и семейството, ние предлагаме 
                индивидуални решения, прилагодени към вашите нужди.
              </p>
            </div>
            <img
              alt=""
              src="/menu-hero-image.jpg"
              className="aspect-3/2 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#47a7d7]">
                    <img
                      alt=""
                      src={incentive.imageSrc}
                      className="h-10 w-10"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-white">
                    {incentive.name}
                  </h3>
                  <p className="mt-2 text-sm text-white">
                    {incentive.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
