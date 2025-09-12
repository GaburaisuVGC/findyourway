// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  nitro: {
    preset: 'static',
  },
  typescript: {
    strict: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [fileURLToPath(new URL('./assets/output.css', import.meta.url))],
})
