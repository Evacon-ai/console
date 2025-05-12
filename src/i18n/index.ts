import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import en from './locales/en/index.ts'
import de from './locales/de/index.ts'
import es from './locales/es/index.ts'
import he from './locales/he/index.ts'
import ru from './locales/ru/index.ts'
import pl from './locales/pl/index.ts'
import ar from './locales/ar/index.ts'

// RTL languages
const rtlLanguages = ['he', 'ar']

// Update document dir when language changes
const updateDocumentDir = (locale: string) => {
  document.documentElement.dir = rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
  document.documentElement.lang = locale
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de,
    es,
    he,
    ru,
    pl,
    ar
  }
})

// Set initial direction
updateDocumentDir(i18n.global.locale.value)

// Watch for language changes
watch(() => i18n.global.locale.value, (newLocale) => {
  updateDocumentDir(newLocale)
})

export default i18n