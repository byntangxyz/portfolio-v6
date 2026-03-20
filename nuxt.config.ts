// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', 'motion-v/nuxt', '@nuxt/image'],
  runtimeConfig: {
    public: {
      siteUrl:
        import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://bintangmurtifandy.id',
      siteName: 'Bintang Murtifandy',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s',
      meta: [
        { name: 'application-name', content: 'Bintang Murtifandy' },
        { name: 'theme-color', content: '#020617' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/logo.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/': {
        prerender: true,
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      '/about': {
        prerender: true,
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      '/portofolio': {
        prerender: true,
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      '/contact': {
        prerender: false,
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      '/guestbook': {
        prerender: true,
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
      '/sitemap.xml': {
        headers: {
          'cache-control':
            'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
        },
      },
    },
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
});
