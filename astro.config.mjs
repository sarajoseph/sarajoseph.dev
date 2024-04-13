import { defineConfig } from 'astro/config'
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      en: 'es',
      ca: 'es'
    }
  }
})
