import { type CSSProperties, type ReactNode } from 'react'

type GlassVariant = 'subtle' | 'medium' | 'heavy'
type GlassTint = 'neutral' | 'warm' | 'cool' | 'none'

type GlassProps = {
  children: ReactNode
  variant?: GlassVariant
  tint?: GlassTint
  border?: boolean
  rounded?: CSSProperties['borderRadius']
  className?: string
  style?: CSSProperties
}

// Quanto blur e opacidade de fundo cada variante aplica
const variantStyles: Record<
  GlassVariant,
  { blur: number; bgOpacity: number; shadowOpacity: number }
> = {
  subtle: { blur: 6, bgOpacity: 0.06, shadowOpacity: 0.1 },
  medium: { blur: 14, bgOpacity: 0.1, shadowOpacity: 0.18 },
  heavy: { blur: 28, bgOpacity: 0.18, shadowOpacity: 0.28 },
}

// Tint adiciona uma cor de base ao fundo transparente
const tintColor: Record<GlassTint, string> = {
  neutral: '255, 255, 255',
  warm: '255, 220, 180',
  cool: '160, 210, 255',
  none: '255, 255, 255',
}

const Glass = ({
  children,
  variant = 'medium',
  tint = 'neutral',
  border = true,
  rounded = '16px',
  className,
  style,
}: GlassProps) => {
  const { blur, bgOpacity, shadowOpacity } = variantStyles[variant]
  const rgb = tint === 'none' ? null : tintColor[tint]

  const glassStyle: CSSProperties = {
    // O coração do glassmorphism
    backdropFilter: `blur(${blur}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,

    // Fundo levemente branco/tintado — transparente o suficiente pra ver o blur
    backgroundColor: rgb ? `rgba(${rgb}, ${bgOpacity})` : 'transparent',

    // Borda sutil simulando reflexo de luz na borda do vidro
    ...(border && {
      border: '1px solid rgba(255, 255, 255, 0.12)',
      boxShadow: `
        0 4px 24px rgba(0, 0, 0, ${shadowOpacity}),
        inset 0 1px 0 rgba(255, 255, 255, 0.10)
      `,
    }),

    borderRadius: rounded,
    position: 'relative',
    ...style,
  }

  return (
    <div className={className} style={glassStyle}>
      {children}
    </div>
  )
}

export default Glass
export type { GlassVariant, GlassTint, GlassProps }
