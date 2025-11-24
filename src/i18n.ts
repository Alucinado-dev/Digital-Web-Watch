import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en-us'
import pt from './locales/pt-br'

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: pt,
    },
    en: {
      translation: en,
    },
  },
  lng: 'pt', // Idioma padrão
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
