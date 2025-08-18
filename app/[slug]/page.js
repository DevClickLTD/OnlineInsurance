import { getPostBySlug } from "../../services/posts";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.length === 0) {
    throw new Error("Post not found");
  }

  const meta = post[0].yoast_head_json;
  const ogImage =
    meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";

  const safeTitle = meta.title?.slice(0, 60);
  const safeDescription = (meta.description || meta.og_description || "")
    .replace(/\s+/g, " ")
    .slice(0, 155);

  return {
    title: safeTitle,
    description: safeDescription,
    openGraph: {
      title: meta.og_title || safeTitle,
      description: meta.og_description || safeDescription,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : [{ url: "/online-insurance.webp", width: 1200, height: 630 }],
    },
    robots: {
      index: meta?.robots?.index !== "noindex",
      follow: meta?.robots?.follow !== "nofollow",
      googleBot: {
        index: meta?.robots?.index !== "noindex",
        follow: meta?.robots?.follow !== "nofollow",
        "max-snippet": meta?.robots?.["max-snippet"] ?? -1,
        "max-image-preview": meta?.robots?.["max-image-preview"] ?? "large",
        "max-video-preview": meta?.robots?.["max-video-preview"] ?? -1,
      },
    },
    alternates: {
      canonical: meta.canonical || `/${slug}`,
    },
  };
}

export default async function PostPage({ params }) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post || post.length === 0) {
      throw new Error("Post not found");
    }

    const meta = post[0].yoast_head_json;
    const ogImage =
      meta.og_image && meta.og_image.length > 0 ? meta.og_image[0].url : "";
    const plainText = post[0].content.rendered
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ");
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

    return (
      <>
        <div className="bg-white">
          <div className="mx-auto max-w-10/10 py-0 sm:px-6 sm:py-0 lg:px-0">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-23 text-center shadow-2xl sm:px-23">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  {post[0].title.rendered}
                </h1>
              </div>
              <svg
                viewBox="0 0 1024 1024"
                aria-hidden="true"
                className="absolute -top-50 left-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              >
                <circle
                  r={512}
                  cx={512}
                  cy={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#47a7d7" />
                    <stop offset={1} stopColor="#47a7d7" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <nav
              className="mx-auto max-w-8xl w-full mb-6 text-sm text-gray-600"
              aria-label="Breadcrumb"
            >
              <ol className="flex space-x-2">
                <li>
                  <a href="/">Начало</a>
                </li>
                <li>/</li>
                <li>
                  <a href="/blog">Блог</a>
                </li>
                <li>/</li>
                <li aria-current="page" className="text-gray-900">
                  {post[0].title.rendered}
                </li>
              </ol>
            </nav>
            <article className="mx-auto max-w-8xl w-full">
              {ogImage && (
                <img
                  src={ogImage}
                  alt={meta.og_title}
                  className="w-full h-auto mb-8 rounded-xl shadow-lg"
                />
              )}
              <time
                dateTime={new Date(post[0].date).toISOString()}
                className="block mt-2 text-sm text-gray-500"
              >
                {new Date(post[0].date).toISOString().slice(0, 10)}
              </time>
              <div className="wordpress-content prose max-w-none leading-relaxed">
                <div
                  id="post-content"
                  dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
                />
              </div>
              {/* Breadcrumbs structured data for blog post */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                      {
                        "@type": "ListItem",
                        position: 1,
                        name: "Начало",
                        item: "https://onlineinsurance.bg/",
                      },
                      {
                        "@type": "ListItem",
                        position: 2,
                        name: "Блог",
                        item: "https://onlineinsurance.bg/blog",
                      },
                      {
                        "@type": "ListItem",
                        position: 3,
                        name: post[0].title.rendered,
                        item:
                          meta?.canonical ||
                          `https://onlineinsurance.bg/${post[0].slug}`,
                      },
                    ],
                  }),
                }}
              />
              {/* Article structured data */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post[0].title.rendered,
                    image: ogImage ? [ogImage] : undefined,
                    datePublished: post[0].date,
                    dateModified: post[0].modified || post[0].date,
                    isAccessibleForFree: true,
                    articleSection: "Блог",
                    wordCount,
                    author:
                      meta?.schema?.["@graph"]?.find(
                        (n) => n["@type"] === "Person"
                      )?.name || "OnlineInsurance.bg",
                    mainEntityOfPage:
                      meta?.canonical ||
                      `https://onlineinsurance.bg/${post[0].slug}`,
                    description:
                      meta?.og_description || meta?.description || "",
                    publisher: {
                      "@type": "Organization",
                      name: "OnlineInsurance.bg",
                      logo: {
                        "@type": "ImageObject",
                        url: "https://onlineinsurance.bg/logo.png",
                      },
                    },
                  }),
                }}
              />
              {/* Enhance links inside post content on mount */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  (function(){
                    try {
                      var c = document.getElementById('post-content');
                      if(!c) return;
                      var anchors = c.querySelectorAll('a[href]');
                      anchors.forEach(function(a){
                        try{
                          var url = new URL(a.getAttribute('href'), window.location.origin);
                          if(url.origin !== window.location.origin){
                            a.setAttribute('target','_blank');
                            var rel = (a.getAttribute('rel')||'').split(' ').filter(Boolean);
                            ['nofollow','noopener','noreferrer'].forEach(function(r){ if(rel.indexOf(r)===-1) rel.push(r); });
                            a.setAttribute('rel', rel.join(' '));
                          }
                        }catch(e){}
                      });
                    } catch(e){}
                  })();
                `,
                }}
              />
            </article>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}
