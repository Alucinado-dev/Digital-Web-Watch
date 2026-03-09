import { create } from 'zustand'

type TimerState = {
  config: {
    duration: number // em milissegundos
  }
  isFinished: boolean

  actions: {
    setDuration: (ms: number) => void
    setFinished: (value: boolean) => void
    reset: () => void
  }
}

const DEFAULT_DURATION = 5 * 60 * 1000 // 5 minutos

const useTimerStore = create<TimerState>(set => ({
  config: {
    duration: DEFAULT_DURATION,
  },
  isFinished: false,

  actions: {
    setDuration: (ms: number) =>
      set(state => ({
        config: { ...state.config, duration: ms },
        isFinished: false,
      })),

    setFinished: (value: boolean) => set({ isFinished: value }),

    reset: () =>
      set(state => ({
        isFinished: false,
        config: { ...state.config }, // preserva a duração configurada
      })),
  },
}))

export default useTimerStore
