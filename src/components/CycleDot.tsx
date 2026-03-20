import { motion, AnimatePresence } from 'motion/react'
import type { WorkStateVariant } from '../stores/pomodoroStore'

type DotStatus = 'past' | 'current' | 'next' | 'future'

type CycleDotProps = {
  variant: WorkStateVariant
  status: DotStatus
}

const colorMap: Record<WorkStateVariant, { base: string; glow: string; ring: string }> = {
  workTime: { base: '#ff4d4d', glow: 'rgba(255,77,77,0.6)', ring: 'rgba(255,77,77,0.25)' },
  shortBreak: { base: '#38bdf8', glow: 'rgba(56,189,248,0.6)', ring: 'rgba(56,189,248,0.25)' },
  longBreak: { base: '#34d399', glow: 'rgba(52,211,153,0.6)', ring: 'rgba(52,211,153,0.25)' },
}

const sizeMap: Record<DotStatus, number> = {
  past: 10,
  future: 10,
  next: 14,
  current: 22,
}

const opacityMap: Record<DotStatus, number> = {
  past: 0.35,
  future: 0.18,
  next: 0.7,
  current: 1,
}

const SLOT_SIZE = 38

const CycleDot = ({ variant, status }: CycleDotProps) => {
  const { base, glow, ring } = colorMap[variant]
  const size = sizeMap[status]
  const isCurrent = status === 'current'

  return (
    // motion.span com layout — quando o status muda e o componente
    // muda de posição na janela deslizante, o Motion anima o movimento
    // automaticamente sem calcular nada manualmente
    <motion.span
      layout
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${SLOT_SIZE}px`,
        height: `${SLOT_SIZE}px`,
        flexShrink: 0,
      }}
      // Anima a opacidade quando o status muda
      animate={{ opacity: opacityMap[status] }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Ring pulsante — AnimatePresence para animar entrada/saída */}
      <AnimatePresence>
        {isCurrent && (
          <motion.span
            key='ring'
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: `${size + 16}px`,
              height: `${size + 16}px`,
              borderRadius: '50%',
              border: `1.5px solid ${base}`,
              backgroundColor: ring,
              animation: 'cyclePulse 2s ease-in-out infinite',
            }}
          />
        )}
      </AnimatePresence>

      {/* Dot principal — Motion anima width/height quando o status muda */}
      <motion.span
        layout
        animate={{
          width: size,
          height: size,
          // Glow só no dot atual
          boxShadow: isCurrent ? `0 0 12px 3px ${glow}` : '0 0 0px 0px transparent',
        }}
        transition={{
          // Spring com bounce para o crescimento do dot atual
          type: 'spring',
          stiffness: 320,
          damping: 22,
        }}
        style={{
          borderRadius: '50%',
          backgroundColor: base,
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
      />

      <style>{`
        @keyframes cyclePulse {
          0%, 100% { transform: scale(1);    opacity: 0.6;  }
          50%       { transform: scale(1.35); opacity: 0.15; }
        }
      `}</style>
    </motion.span>
  )
}

export default CycleDot
export type { DotStatus }
