import Image from "next/image";

export default function Clients() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Наши партньори
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Работим с водещи застрахователни компании в България, за да ви 
              предложим най-добрите застрахователни продукти и услуги.
              Нашият опит и партньорства ни позволяват да осигурим надеждно 
              покритие и конкурентни цени за всички наши клиенти.
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-1 sm:grid-cols-2 items-center gap-x-8 gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <Image
              alt="vinetka.bg"
              src="/partners/vinetka.avif"
              width={200}
              height={80}
              quality={80}
              loading="lazy"
              className="h-16 w-auto object-contain object-center"
            />
            <Image
              alt="insurance.bg"
              src="/partners/Insurancebg-logo.svg"
              width={200}
              height={80}
              quality={80}
              loading="lazy"
              className="h-16 w-auto object-contain object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
