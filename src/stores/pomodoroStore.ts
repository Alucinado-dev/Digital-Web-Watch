import { create } from "zustand"

type WorkStateVariant = 'workTime' | 'shortBreak' | 'longBreak'

/**
 * Função auxiliar que gera um workflow dinamicamente.
 * @param cycles - O número de sessões de trabalho antes de um descanso longo.
 * @returns Um array de ciclos (WorkStateVariant[]).
 */

const generateWorkFlow = (cycles: number): WorkStateVariant[] => {
  const workflow: WorkStateVariant[] = []

  for (let i = 0; i < cycles; i++) {
    workflow.push('workTime')

    if (i < cycles - 1) {
      workflow.push('shortBreak')
    }
  }

  workflow.push('longBreak')
  return workflow
}

type PomodoroState = {
  config: {
    duration: {
      workTime: number
      shortBreak: number
      longBreak: number
    }
    cyclesUntilSessionEnds: number
  }

  // --- ESTADO GERADO ---
  workflow: WorkStateVariant[] // O workflow é gerado com base nas instruções da confgi.

  // --- ESTADO ATUAL ---
  SessionIndex: number
  completedWorkSessions: number

  // --- AÇÕES ---
  actions:{
    setCyclesUntilSessionEnds: (cycles:number) => void
    advanceToNextWorkState: () => void
    resetSequence: () => void
  }
}

/* conceitos:

  WorkState : tarefa atual do workflow ('workTime' | 'shortBreak' | 'longBreak')
  
  Cycle: par de estados consistindo entre um worktime e uma pausa 

  Session: lista de cycles até que o ultimo seja um cycle de long nreak

  Workflow: fluxo total de workstates
*/

const usePomodoroStore = create<PomodoroState>(set => ({
  // ---VALORES INICIAIS ---
  config: {
    duration: {
      workTime: 70 * 60,
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
      // Cria o novo workflow
      const newWorkflow = generateWorkFlow(cycles)
      set(state => ({
        // Atualiza a configuração
        config: { ...state.config, cyclesUntilSessionEnds: cycles },
        // Substitui o workflow antigo pelo novo
        workflow: newWorkflow,
        // Reseta o estado do ciclo para começar do início
        SessionIndex: 0,
        completedWorkSessions: 0,
      }))
    },

    advanceToNextWorkState: () =>
      set(state => {
        const currentWorkState = state.workflow[state.SessionIndex]
        const wasWorkSession = currentWorkState === 'workTime'
        const nextIndex = (state.SessionIndex + 1) % state.workflow.length

        return {
          SessionIndex: nextIndex,
          completedWorkSessions: wasWorkSession ? state.completedWorkSessions + 1 : state.completedWorkSessions,
        }
      }),

    resetSequence: () =>
      set(state => ({
        // Ao resetar, também garantimos que o workflow está em sincronia com a config.
        workflow: generateWorkFlow(state.config.cyclesUntilSessionEnds),
        SessionIndex: 0,
        completedWorkSessions: 0,
      })),
  },
}))


export default usePomodoroStore

export type { WorkStateVariant }


