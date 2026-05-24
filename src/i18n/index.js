import { createI18n } from 'vue-i18n'
import ar from './locales/ar.json'
import en from './locales/en.json'

const savedLocale =
  localStorage.getItem('locale') ||
  'ar'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    ar,
    en
  }
})

document.documentElement.lang =
  savedLocale

document.documentElement.dir =
  savedLocale === 'ar'
    ? 'rtl'
    : 'ltr'

export default i18n
