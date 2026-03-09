import { create } from 'zustand'

type Lap = {
  id: number
  time: number // tempo absoluto do relógio no momento do lap (ms)
  split: number // tempo desde o último lap (ms)
}

type StopwatchState = {
  laps: Lap[]
  bestLap: Lap | null // menor split
  worstLap: Lap | null // maior split

  actions: {
    addLap: (currentTime: number) => void
    reset: () => void
  }
}

const calcBestWorst = (laps: Lap[]) => {
  if (laps.length === 0) return { bestLap: null, worstLap: null }

  const best = laps.reduce((a, b) => (a.split < b.split ? a : b))
  const worst = laps.reduce((a, b) => (a.split > b.split ? a : b))

  return { bestLap: best, worstLap: worst }
}

const useStopwatchStore = create<StopwatchState>(set => ({
  laps: [],
  bestLap: null,
  worstLap: null,

  actions: {
    addLap: (currentTime: number) =>
      set(state => {
        const lastLapTime = state.laps.length > 0 ? state.laps[state.laps.length - 1].time : 0

        const newLap: Lap = {
          id: state.laps.length + 1,
          time: currentTime,
          split: currentTime - lastLapTime,
        }

        const updatedLaps = [...state.laps, newLap]
        const { bestLap, worstLap } = calcBestWorst(updatedLaps)

        return { laps: updatedLaps, bestLap, worstLap }
      }),

    reset: () => set({ laps: [], bestLap: null, worstLap: null }),
  },
}))

export default useStopwatchStore
export type { Lap }
