import type { WorkStateVariant } from '../stores/pomodoroStore'
import usePomodoroStore from '../stores/pomodoroStore'
import CycleDot, { type DotStatus } from './CycleDot'

const WINDOW_SIZE = 7 // número de dots visíveis (sempre ímpar — atual fica no centro)
const HALF = Math.floor(WINDOW_SIZE / 2)

const labelMap: Record<WorkStateVariant, string> = {
  workTime: 'Foco',
  shortBreak: 'Pausa curta',
  longBreak: 'Pausa longa',
}

const Cycles = () => {
  const { workflow, SessionIndex } = usePomodoroStore(state => state)

  const currentVariant = workflow[SessionIndex]

  // Monta a janela deslizante centrada no SessionIndex
  const windowItems = Array.from({ length: WINDOW_SIZE }, (_, i) => {
    const offset = i - HALF
    const absoluteIndex = SessionIndex + offset

    // Índices fora do range do workflow ficam como null (slots vazios)
    if (absoluteIndex < 0 || absoluteIndex >= workflow.length) {
      return { variant: null, status: null, key: `empty-${i}` }
    }

    let status: DotStatus
    if (offset < 0) status = 'past'
    else if (offset === 0) status = 'current'
    else if (offset === 1) status = 'next'
    else status = 'future'

    return {
      variant: workflow[absoluteIndex],
      status,
      key: `${absoluteIndex}-${workflow[absoluteIndex]}`,
    }
  })

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Label da fase atual */}
      <span
        style={{
          fontSize: '11px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.45)',
          fontWeight: 500,
          minHeight: '16px',
          transition: 'opacity 0.3s ease',
        }}
      >
        {labelMap[currentVariant]}
      </span>

      {/* Linha do tempo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {windowItems.map((item, i) =>
          item.variant && item.status ?
            <CycleDot
              key={item.key}
              variant={item.variant as WorkStateVariant}
              status={item.status}
            />
            // Slot vazio — mesma largura fixa para não quebrar o alinhamento
          : <span key={`empty-${i}`} style={{ width: '38px', height: '38px', flexShrink: 0 }} />,
        )}
      </div>

      {/* Indicador de progresso textual: "3 / 4 sessões" */}
      <span
        style={{
          fontSize: '10px',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.2)',
          fontWeight: 400,
        }}
      >
        {SessionIndex + 1} / {workflow.length}
      </span>
    </div>
  )
}

export default Cycles
