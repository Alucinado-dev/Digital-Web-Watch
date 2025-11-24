import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '../i18n'

export type Language = 'pt-BR' | 'en-US'

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

export const useLanguageStore = create(
  persist<LanguageState>(
    set => ({
      language: (i18n.language as Language) || 'pt-BR',
      setLanguage: language => {
        i18n.changeLanguage(language)
        document.documentElement.lang = language // Altera o atributo lang do HTML
        set({ language })
      },
    }),
    {
      name: 'language-storage', // Nome do item no localStorage
      onRehydrateStorage: () => state => {
        // Esta função é chamada quando o estado é carregado do localStorage
        state?.setLanguage(state.language)
      },
    },
  ),
)

