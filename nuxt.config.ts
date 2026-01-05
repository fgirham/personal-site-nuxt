// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    steamApiKey: process.env.STEAM_API_KEY || '',
  },
  fonts: {
    families: [
      {
        name: 'JetBrains Mono',
      },
      {
        name: 'Inter',
      },
      {
        name: 'Zalando Sans',
      },
      {
        name: 'Zalando Sans Expanded',
      }
    ]
  },
  modules: ['@nuxt/ui', '@nuxt/fonts', '@nuxt/image', '@nuxt/eslint'],
})