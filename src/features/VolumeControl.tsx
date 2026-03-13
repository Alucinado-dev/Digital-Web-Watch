import { useEffect, useRef, useState } from 'react'
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import { Howler } from 'howler'
import { useMediaQuery } from '@uidotdev/usehooks';

// Retorna o ícone correto baseado no volume atual
const VolumeIcon = ({ volume, muted }: { volume: number; muted: boolean }) => {
  if (muted || volume === 0) return <VolumeX size={18} />
  if (volume < 0.35) return <Volume size={18} />
  if (volume < 0.7) return <Volume1 size={18} />
  return <Volume2 size={18} />
}

type VolumeControlProps = {
  initialVolume?: number // 0 a 1
}

const VolumeControl = ({ initialVolume = 0.7 }: VolumeControlProps) => {
  const [volume, setVolume] = useState(initialVolume)
  const [muted, setMuted] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // Guarda o volume antes de mutar para restaurar depois
  const prevVolumeRef = useRef(initialVolume)

const isMobile =  useMediaQuery('(max-width: 768px)') // breakpoint para telas móveis

  // Fecha ao clicar fora do componente
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    setMuted(v === 0)
    Howler.volume(v)
    if (v > 0) prevVolumeRef.current = v
  }

  const toggleMute = () => {
    if (muted) {
      // Desmuta — restaura volume anterior (mínimo 0.1 pra não ficar inaudível)
      const restored = prevVolumeRef.current || 0.7
      setMuted(false)
      setVolume(restored)
      Howler.mute(false)
      Howler.volume(restored)
    } else {
      // Muta — guarda o volume atual antes
      prevVolumeRef.current = volume
      setMuted(true)
      Howler.mute(true)
    }
  }

  // Porcentagem de preenchimento do track — para o gradiente do slider
  const fillPercent = muted ? 0 : volume * 100

  return (
    <div
      ref={containerRef}
      style={
        isMobile ?
          {
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
          }
        : {
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            position: 'relative',
          }
      }
    >
      {/* Botão principal — igual ao SettingsBtn em estrutura */}
      <button
        onClick={() => setOpen(o => !o)}
        onContextMenu={e => {
          e.preventDefault()
          toggleMute()
        }}
        className='btn btn-ghost btn-sm'
        aria-label='Controle de volume'
        title='Volume (clique direito para mutar)'
        style={{ color: 'var(--volume-btn-color, currentColor)' }}
      >
        <VolumeIcon volume={volume} muted={muted} />
      </button>

      {/* Slider inline — aparece/desaparece com animação */}
      <div
        style={
          isMobile ?
            {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexDirection: 'column-reverse',
              maxWidth: open ? '140px' : '0px',
              opacity: open ? 1 : 0,
              transition: 'max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
              pointerEvents: open ? 'auto' : 'none',
            }
          : {
              display: 'flex',
              alignItems: 'center',
              gap: '8px',

              maxWidth: open ? '140px' : '0px',
              opacity: open ? 1 : 0,
              transition: 'max-width 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
              pointerEvents: open ? 'auto' : 'none',
            }
        }
      >
        {/* Percentual discreto */}
        <span
          style={{
            fontSize: '11px',
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--volume-label-color, rgba(255,255,255,0.35))',
            minWidth: '28px',
            textAlign: 'right',
            flexShrink: 0,
          }}
        >
          {muted ? '—' : `${Math.round(fillPercent)}%`}
        </span>

        {/* O slider em si */}
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label='Volume'
          style={{
            // Estilização via CSS variables — o tema controla as cores
            appearance: 'none',
            WebkitAppearance: 'none',
            width: '88px',
            height: '4px',
            borderRadius: '2px',
            outline: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            
            // Gradiente que preenche até o valor atual
            background: `linear-gradient(
              to right,
              var(--volume-fill-color, rgba(255,255,255,0.8)) 0%,
              var(--volume-fill-color, rgba(255,255,255,0.8)) ${fillPercent}%,
              var(--volume-track-color, rgba(255,255,255,0.12)) ${fillPercent}%,
              var(--volume-track-color, rgba(255,255,255,0.12)) 100%
            )`,
          }}
        />
      </div>

      {/* CSS do thumb — não tem jeito de fazer via style prop */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--volume-thumb-color, rgba(255,255,255,0.9));
          border: 2px solid var(--volume-thumb-border-color, rgba(255,255,255,0.2));
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          box-shadow: 0 0 0 0 var(--volume-thumb-glow, rgba(255,255,255,0.2));
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.25);
          box-shadow: 0 0 0 4px var(--volume-thumb-glow, rgba(255,255,255,0.15));
        }
        input[type='range']::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--volume-thumb-color, rgba(255,255,255,0.9));
          border: 2px solid var(--volume-thumb-border-color, rgba(255,255,255,0.2));
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        input[type='range']::-moz-range-thumb:hover {
          transform: scale(1.25);
        }
      `}</style>
    </div>
  )
}

export default VolumeControl
