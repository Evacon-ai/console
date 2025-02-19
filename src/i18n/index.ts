import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import en from './locales/en'
import de from './locales/de'
import es from './locales/es'
import he from './locales/he'
import ru from './locales/ru'
import pl from './locales/pl'
import ar from './locales/ar'

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