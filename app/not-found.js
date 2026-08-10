import Link from "next/link";

export const metadata = {
  title: "Страницата не е намерена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="text-center">
        <p className="text-base font-semibold text-[#47a7d7]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Страницата не е намерена
        </h1>
        <p className="mt-6 text-base text-gray-600">
          Съжаляваме, но страницата, която търсите, не съществува или е
          преместена.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-[#47a7d7] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90"
          >
            Към началната страница
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-gray-900">
            Разгледайте блога <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
