"use client";

import { useState, useEffect } from "react";
import { Pacifico } from "next/font/google";
// Inline SVGs to avoid react-icons bundle cost
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.6V12h2.6V9.8c0-2.6 1.6-4 3.9-4 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.9l-.5 2.9h-2.4v7A10 10 0 0 0 22 12Z"
    />
  </svg>
);
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zm7 0h3.8v2h.1c.5-.9 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6V23h-4v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V23h-4V8.5z"
    />
  </svg>
);
import Link from "next/link";

const pacifico = Pacifico({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  style: ["normal"],
  display: "swap",
});

const navigation = {
  solutions: [{ name: "Застрахователни услуги", href: "/zastrahovki" }],
  company: [{ name: "Блог", href: "/blog" }],
  legal: [{ name: "Политика за поверителност", href: "/privacy-policy" }],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/onlineinsurance.bg",
      icon: FacebookIcon,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/onlineinsurance-bg",
      icon: LinkedInIcon,
      target: "_blank",
      rel: "noopener noreferrer",
    },
  ],
};

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentYear = new Date().getFullYear();
      if (currentYear !== year) {
        setYear(currentYear);
      }
    }, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, [year]);

  return (
    <footer
      className="relative bg-white border border-t-[#eaeaea]"
      role="contentinfo"
    >
      <div className="absolute right-0 top-0 bottom-0 z-10 w-1/3 h-full flex items-center justify-center pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-80 hidden md:block sm:viewBox-[-150_0_500_1000] md:viewBox-[-150_0_500_800] lg:viewBox-[0_0_500_800]"
          viewBox="0 0 500 800"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 0 C160 150, 340 250, 420 400 S480 600, 350 800"
            stroke="#47a7d7"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M140 0 C180 170, 320 270, 440 420 S500 650, 320 800"
            stroke="#47a7d7"
            strokeWidth="1.2"
            opacity="0.8"
            fill="none"
          />
          <path
            d="M200 0 C200 190, 300 290, 460 440 S520 700, 290 800"
            stroke="#47a7d7"
            strokeWidth="1"
            opacity="0.6"
            fill="none"
          />
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <img
              alt="OnlineInsurance.bg лого"
              src="/logo.png"
              width={168}
              height={38}
              className="h-18 w-auto"
            />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-12">
              <nav
                className="text-center sm:text-left"
                aria-labelledby="footer-services"
              >
                <h3
                  id="footer-services"
                  className="text-base font-semibold text-gray-900 mb-6"
                >
                  Услуги
                </h3>
                <ul role="list" className="space-y-3">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="text-center sm:text-left"
                aria-labelledby="footer-company"
              >
                <h3
                  id="footer-company"
                  className="text-base font-semibold text-gray-900 mb-6"
                >
                  Компания
                </h3>
                <ul role="list" className="space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav
                className="text-center sm:text-left"
                aria-labelledby="footer-legal"
              >
                <h3
                  id="footer-legal"
                  className="text-base font-semibold text-gray-900 mb-6"
                >
                  Правни
                </h3>
                <ul role="list" className="space-y-3">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-900/10 pt-8">
          <div className="flex flex-col items-center space-y-6 md:flex-row md:justify-between md:space-y-0">
            <p className="text-sm text-gray-600 text-center md:text-left">
              &copy; {year} OnlineInsurance.bg - Всички права запазени.
            </p>
            <address
              className="not-italic text-sm text-gray-600 text-center md:text-left"
              aria-label="Контакти"
            >
              OnlineInsurance.bg
            </address>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  aria-label={item.name}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
