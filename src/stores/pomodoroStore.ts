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




/* Documentação e Fluxo da pomodoroStore
Esta store é responsável por gerenciar o estado e a sequência lógica do ciclo Pomodoro. Ela não gerencia o cronômetro em si (a contagem de segundos), apenas dita qual é o estágio atual e qual será o próximo.

1. A Estrutura do Estado (O que ela armazena)
O estado é o conjunto de informações que a store guarda. Ele é dividido em três partes lógicas:

config: Um objeto com as configurações do Pomodoro. É aqui que os valores que o usuário poderá personalizar no futuro são guardados.

duration: Objeto com a duração de cada tipo de WorkState, em segundos.
workTime: Duração do tempo de trabalho (ex: 25 * 60).
shortBreak: Duração da pausa curta (ex: 5 * 60).
longBreak: Duração da pausa longa (ex: 15 * 60).
cyclesUntilSessionEnds: Um número que define quantos ciclos de trabalho (workTime) são necessários antes de uma pausa longa (longBreak).
Estado Gerado: Valores que são calculados com base na config.

workflow: Um array de strings (WorkStateVariant[]) que representa a sequência completa de uma sessão. É gerado dinamicamente. Por exemplo, para cyclesUntilSessionEnds: 4, o workflow será:
['workTime', 'shortBreak', 'workTime', 'shortBreak', 'workTime', 'shortBreak', 'workTime', 'longBreak']
Estado Atual: Valores que rastreiam o progresso do usuário no ciclo.

SessionIndex: Um número que funciona como um ponteiro, indicando a posição atual dentro do array workflow. Se SessionIndex é 0, o estado atual é workflow[0] ('workTime').
completedWorkSessions: Um contador que registra quantas sessões de 'workTime' foram concluídas.
2. As Ações Disponíveis (O que ela pode fazer)
As ações são funções que modificam o estado da store.

actions.setCyclesUntilSessionEnds(cycles: number)

O que faz: Permite alterar o número de ciclos de trabalho por sessão, reconstruindo todo o fluxo do Pomodoro.
Fluxo de Execução:
Recebe um novo número de ciclos (ex: cycles = 3).
Chama a função interna generateWorkFlow(3) para criar um novo array workflow.
Atualiza o estado da store:
config.cyclesUntilSessionEnds é atualizado para o novo valor (3).
workflow é substituído pelo novo array gerado.
SessionIndex é resetado para 0.
completedWorkSessions é resetado para 0.
Resultado: A store é reiniciada com uma nova estrutura de ciclos.
actions.advanceToNextWorkState()

O que faz: Avança para o próximo estágio do workflow. Esta é a ação principal a ser chamada sempre que um timer (seja de trabalho ou pausa) chega ao fim.
Fluxo de Execução:
Verifica qual era o estado atual antes de avançar (ex: workflow[state.SessionIndex] era 'workTime').
Calcula o próximo índice do workflow usando a fórmula (state.SessionIndex + 1) % state.workflow.length. O operador módulo (%) garante que, ao chegar ao fim do array, o índice volte para 0 (criando um loop infinito da sessão).
Atualiza o estado:
SessionIndex recebe o valor do novo índice calculado.
Se, e somente se, o estado anterior era 'workTime', o contador completedWorkSessions é incrementado em 1.
Resultado: O "ponteiro" avança para o próximo estágio do ciclo.
actions.resetSequence()

O que faz: Reseta o progresso da sessão atual, forçando o ciclo a voltar para o primeiro estágio de trabalho, sem alterar as configurações.
Fluxo de Execução:
Atualiza o estado:
SessionIndex é resetado para 0.
completedWorkSessions é resetado para 0.
Resultado: O usuário volta para o início do Pomodoro.
3. Exemplo de Fluxo de Uso Completo (Ciclo Trabalho -> Pausa)
Estado Inicial:

A página PomodoroPage é carregada.
A store está com SessionIndex: 0.
O componente lê o estado atual: currentWorkState = store.workflow[store.SessionIndex] que resulta em 'workTime'.
O componente lê a duração para o estado atual: duration = store.config.duration[currentWorkState] que resulta em 1500 (25 minutos).
O componente useCountdown é iniciado com 1500.
Fim do Período de Trabalho:

O useCountdown chega a zero.
O evento de término do countdown chama a ação actions.advanceToNextWorkState().
Transição na Store:

A store executa advanceToNextWorkState:
O estado anterior era 'workTime'.
SessionIndex vai de 0 para 1.
completedWorkSessions vai de 0 para 1.
Início do Período de Pausa:

O componente PomodoroPage re-renderiza porque a store mudou.
Ele lê o novo estado atual: currentWorkState = store.workflow[store.SessionIndex] que agora resulta em 'shortBreak'.
Ele lê a nova duração: duration = store.config.duration[currentWorkState] que resulta em 300 (5 minutos).
O useCountdown é reiniciado com o novo valor 300.
O ciclo se repete. Quando a pausa curta terminar, advanceToNextWorkState será chamado de novo, o SessionIndex irá para 2 ('workTime'), e completedWorkSessions permanecerá 1 (pois o estado anterior não era 'workTime').
 */