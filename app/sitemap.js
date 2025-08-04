import { getServices } from "../services/services";
import { fetchAPI } from "../services/api";

// Get all posts for sitemap
async function getAllPosts() {
  try {
    return await fetchAPI(
      "posts?_fields=id,slug,date&per_page=100&status=publish"
    );
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  const baseUrl = "https://onlineinsurance.bg";

  try {
    // Fetch all services and posts
    const [services, posts] = await Promise.all([
      getServices().catch(() => []),
      getAllPosts(),
    ]);

    // Static routes
    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/zastrahovki`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];

    // Dynamic service routes
    const serviceRoutes = services?.map((service) => ({
      url: `${baseUrl}/zastrahovki/${service.slug}`,
      lastModified: new Date(service.date || new Date()),
      changeFrequency: "weekly",
      priority: 0.7,
    })) || [];

    // Dynamic blog post routes
    const postRoutes = posts?.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date || new Date()),
      changeFrequency: "monthly",
      priority: 0.6,
    })) || [];

    // Combine all routes
    return [...staticRoutes, ...serviceRoutes, ...postRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    
    // Fallback to static routes only
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/zastrahovki`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];
  }
}