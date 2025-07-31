export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/wp-admin/',
        '/wp-includes/',
        '/wp-content/',
      ],
    },
    sitemap: 'https://onlineinsurance.bg/sitemap.xml',
  }
}