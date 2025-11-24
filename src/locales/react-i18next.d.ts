import 'react-i18next'
import pt from './locales/pt/translation'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof pt
    }
  }
}
