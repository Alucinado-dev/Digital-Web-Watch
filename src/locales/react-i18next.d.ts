import 'react-i18next'
import type pt from './pt-br'


declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof pt
    }
  }
}
