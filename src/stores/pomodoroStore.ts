import { create } from 'zustand'

type WorkStateVariant = 'workTime' | 'shortBreak' | 'longBreak'

const generateWorkFlow = (cycles: number): WorkStateVariant[] => {
  const workflow: WorkStateVariant[] = []
  for (let i = 0; i < cycles; i++) {
    workflow.push('workTime')
    if (i < cycles - 1) workflow.push('shortBreak')
  }
  workflow.push('longBreak')
  return workflow
}

type Durations = {
  workTime: number
  shortBreak: number
  longBreak: number
}

type PomodoroState = {
  config: {
    duration: Durations
    cyclesUntilSessionEnds: number
  }
  workflow: WorkStateVariant[]
  SessionIndex: number
  completedWorkSessions: number

  actions: {
    setCyclesUntilSessionEnds: (cycles: number) => void
    // Nova action — chamada pelo SettingsModal ao salvar
    setDurations: (durations: Durations) => void
    advanceToNextWorkState: () => void
    resetSequence: () => void
  }
}

const usePomodoroStore = create<PomodoroState>(set => ({
  config: {
    duration: {
      workTime: 25 * 60, 
      shortBreak: 5 * 60,
      longBreak: 15 * 60,
    },
    cyclesUntilSessionEnds: 4,
  },
  workflow: generateWorkFlow(4),
  SessionIndex: 0,
  completedWorkSessions: 0,

  actions: {
    setCyclesUntilSessionEnds: (cycles: number) => {
      const newWorkflow = generateWorkFlow(cycles)
      set(state => ({
        config: { ...state.config, cyclesUntilSessionEnds: cycles },
        workflow: newWorkflow,
        SessionIndex: 0,
        completedWorkSessions: 0,
      }))
    },


    setDurations: (durations: Durations) =>
      set(state => ({
        config: {
          ...state.config,
          duration: {
            workTime: durations.workTime / 1000,
            shortBreak: durations.shortBreak / 1000,
            longBreak: durations.longBreak / 1000,
          },
        },
        // Reseta o índice para o novo ciclo começar do zero com os novos tempos
        SessionIndex: 0,
        completedWorkSessions: 0,
      })),

    advanceToNextWorkState: () =>
      set(state => {
        const currentWorkState = state.workflow[state.SessionIndex]
        const wasWorkSession = currentWorkState === 'workTime'
        const nextIndex = (state.SessionIndex + 1) % state.workflow.length
        return {
          SessionIndex: nextIndex,
          completedWorkSessions:
            wasWorkSession ? state.completedWorkSessions + 1 : state.completedWorkSessions,
        }
      }),

    resetSequence: () =>
      set(state => ({
        workflow: generateWorkFlow(state.config.cyclesUntilSessionEnds),
        SessionIndex: 0,
        completedWorkSessions: 0,
      })),
  },
}))

export default usePomodoroStore
export type { WorkStateVariant }


/* conceitos:

  WorkState : tarefa atual do workflow ('workTime' | 'shortBreak' | 'longBreak')
  
  Cycle: par de estados consistindo entre um worktime e uma pausa 

  Session: lista de cycles até que o ultimo seja um cycle de long nreak

  Workflow: fluxo total de workstates
*/