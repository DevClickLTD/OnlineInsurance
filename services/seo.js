// Каноничният публичен домейн на сайта.
// Vercel пренасочва onlineinsurance.bg -> www.onlineinsurance.bg,
// затова всички canonical URL-и, sitemap и structured data трябва да сочат към www.
// ВАЖНО: Никога не използвайте Yoast canonical директно - той сочи към
// WordPress бекенда (onlineinsurance.admin-panels.com) и разиндексира сайта.
export const SITE_URL = "https://www.onlineinsurance.bg";

/**
 * Построява абсолютен URL върху каноничния домейн.
 * @param {string} path - Път, започващ с "/" (напр. "/zastrahovki/avtomobili")
 * @returns {string} - Абсолютен canonical URL
 */
export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
