import { fetchAPI } from "./api";
import { cache } from "react";

/**
 * Get all pages
 * @returns {Promise<Array>} - List of pages
 */
export const getPages = cache(async () => {
  return await fetchAPI(
    "pages?_fields=id,slug,yoast_head_json,title,content,modified,date",
    {
      next: { revalidate: 3600 }, // Обновяване на всеки час
    }
  );
});

/**
 * Get page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<Object|null>} - Page data
 */
export const getPageBySlug = cache(async (slug) => {
  return await fetchAPI(
    `pages?slug=${slug}&_fields=id,slug,yoast_head_json,title,content,modified,date`,
    {
      next: { revalidate: 3600 }, // Обновяване на всеки час
    }
  );
});

/**
 * Tries multiple slugs to find a page (helper for known aliases)
 */
export const getFirstExistingPageBySlugs = cache(async (slugs) => {
  for (const s of slugs) {
    const page = await getPageBySlug(s);
    if (Array.isArray(page) && page.length > 0) return page[0];
  }
  return null;
});
