import { create } from 'zustand'
import i18n from '../i18n'

type Language = 'pt' | 'en'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageState>(set => ({
  language: (i18n.language as Language) || 'pt',
  setLanguage: language => {
    i18n.changeLanguage(language)
    set({ language })
  },
}))
