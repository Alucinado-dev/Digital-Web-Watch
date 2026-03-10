import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Todos os valores em MINUTOS — convertidos para ms na hora de passar às stores
type SettingsState = {
  pomodoro: {
    workTime: number // minutos
    shortBreak: number // minutos
    longBreak: number // minutos
  }
  timer: {
    duration: number // minutos
  }


  isOpen: boolean

  actions: {
    openModal: () => void
    closeModal: () => void
    saveSettings: (pomodoro: SettingsState['pomodoro'], timer: SettingsState['timer']) => void
  }
}


const DEFAULTS = {
  pomodoro: {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  timer: {
    duration: 5,
  },
}

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      pomodoro: DEFAULTS.pomodoro,
      timer: DEFAULTS.timer,
      isOpen: false,

      actions: {
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),

        saveSettings: (pomodoro, timer) => {
          set({ pomodoro, timer, isOpen: false })
        },
      },
    }),
    {
      name: 'dww-settings', // chave no localStorage
      // Não persiste o estado do modal — sempre começa fechado
      partialize: state => ({
        pomodoro: state.pomodoro,
        timer: state.timer,
      }),
    },
  ),
)

// Helper: converte minutos → milissegundos
export const minToMs = (min: number) => min * 60 * 1000

export default useSettingsStore
export { DEFAULTS }
export type { SettingsState }
