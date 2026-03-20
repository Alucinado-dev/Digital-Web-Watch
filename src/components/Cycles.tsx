import { AnimatePresence, motion } from 'motion/react'
import type { WorkStateVariant } from '../stores/pomodoroStore'
import usePomodoroStore from '../stores/pomodoroStore'
import CycleDot, { type DotStatus } from './CycleDot'
import { pageItemVariants } from '../utils/pageItemVariants'


const WINDOW_SIZE = 7
const HALF = Math.floor(WINDOW_SIZE / 2)

const labelMap: Record<WorkStateVariant, string> = {
  workTime: 'Foco',
  shortBreak: 'Pausa curta',
  longBreak: 'Pausa longa',
}

const Cycles = () => {
  const { workflow, SessionIndex } = usePomodoroStore(state => state)
  const currentVariant = workflow[SessionIndex]

  const windowItems = Array.from({ length: WINDOW_SIZE }, (_, i) => {
    const offset = i - HALF
    const absoluteIndex = SessionIndex + offset

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
    // Herda o stagger do PageWrapper
    <motion.div
      variants={pageItemVariants}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
    >
      {/* Label com AnimatePresence — blur+fade na troca de fase */}
      <AnimatePresence mode='wait'>
        <motion.span
          key={currentVariant} // muda quando a fase muda
          initial={{ opacity: 0, filter: 'blur(6px)', y: -6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          exit={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 500,
            minHeight: '16px',
          }}
        >
          {labelMap[currentVariant]}
        </motion.span>
      </AnimatePresence>

      {/* Linha do tempo — LayoutGroup para coordenar layout animations entre dots */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {windowItems.map((item, i) =>
          item.variant && item.status ?
            <CycleDot
              key={item.key}
              variant={item.variant as WorkStateVariant}
              status={item.status}
            />
          : <span key={`empty-${i}`} style={{ width: '38px', height: '38px', flexShrink: 0 }} />,
        )}
      </div>

      {/* Contador com blur na troca */}
      <AnimatePresence mode='wait'>
        <motion.span
          key={SessionIndex}
          initial={{ opacity: 0, filter: 'blur(4px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '10px',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.2)',
            fontWeight: 400,
          }}
        >
          {SessionIndex + 1} / {workflow.length}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  )
}

export default Cycles
