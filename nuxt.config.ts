// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4
  },

  modules: ['@nuxt/ui', '@pinia/colada-nuxt', '@pinia/nuxt'],
  css: ['~/assets/css/main.css']
})