import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Themes =
  | 'neon-dreams'
  | 'deep-ocean'
  | 'sakura-blossom'
  | 'mint-leaves'
  | 'dune-glow'
  | 'overcast'

interface ThemeState {
  theme: Themes
  setTheme: (theme: Themes) => void
}

export const useThemeStore = create(
  persist<ThemeState>(
    set => ({
      theme: 'neon-dreams', // Tema inicial padrão
      setTheme: theme => {
        document.body.setAttribute('data-theme', theme )
        set({ theme })
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => state => {
        state?.setTheme(state.theme)
      },
    },
  ),
)
