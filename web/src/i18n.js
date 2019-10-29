import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEN from 'locales/en/translation.json'
import translationZH from 'locales/en/translation.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: translationEN,
    },
    zh: {
      translation: translationZH,
    },
  },
})

export default i18n
