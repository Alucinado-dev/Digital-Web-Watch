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

// Largura fixa de todos os slots — garante que o dot central
// fique sempre no centro geométrico da linha, independente do tamanho de cada dot.
const SLOT_SIZE = 38

const CycleDot = ({ variant, status }: CycleDotProps) => {
  const { base, glow, ring } = colorMap[variant]
  const size = sizeMap[status]
  const opacity = opacityMap[status]
  const isCurrent = status === 'current'

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${SLOT_SIZE}px`,
        height: `${SLOT_SIZE}px`,
        opacity,
        transition: 'opacity 0.4s ease',
        flexShrink: 0,
      }}
    >
      {/* Pulse ring — tamanho absoluto, não afeta o slot */}
      {isCurrent && (
        <span
          style={{
            position: 'absolute',
            width: `${size + 16}px`,
            height: `${size + 16}px`,
            borderRadius: '50%',
  
            backgroundColor: ring,
            animation: 'cyclePulse 2s ease-in-out infinite',
          }}
        />
      )}

      {/* Dot principal — cresce/encolhe dentro do slot fixo */}
      <span
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: base,
          boxShadow: isCurrent ? `0 0 12px 3px ${glow}` : 'none',
          transition:
            'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease',
          position: 'relative',
          zIndex: 1,
        }}
      />

      <style>{`
        @keyframes cyclePulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.35); opacity: 0.15; }
        }
      `}</style>
    </span>
  )
}

export default CycleDot
export type { DotStatus }
