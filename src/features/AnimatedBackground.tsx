import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

/**
 * AnimatedBackground v3 — com paralaxe via Motion
 *
 * Camadas (de baixo para cima):
 * 1. Gradient escuro animado
 * 2. Blobs — motion.div com paralaxe suavizado por spring
 * 3. Canvas — estrelas, grid, beams, meteoros com offset de paralaxe
 *
 * Multiplicadores de paralaxe por camada (quanto mais alto = mais próximo):
 *   Estrelas:  0.008  (distantes, quase não se movem)
 *   Beams:     0.012
 *   Meteoros:  0.020
 *   Blob 1:    0.030
 *   Blob 2:    0.025
 *   Blob 3:    0.035
 */

const METEOR_COUNT = 50
const METEOR_ANGLE = 30
const COLS = 10

type Meteor = {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  width: number
}
type Beam = {
  colIndex: number
  y: number
  height: number
  speed: number
  opacity: number
}
type Star = {
  x: number
  y: number
  radius: number
  baseOpacity: number
  phase: number
  speed: number
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Posição bruta do mouse, relativa ao centro da tela
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Spring suaviza — stiffness baixo + damping alto = fluido e lento
  const springX = useSpring(rawX, { stiffness: 40, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 40, damping: 18 })

  // Transforms para os blobs — multiplicadores criam profundidade
  const blob1X = useTransform(springX, v => v * 0.93)
  const blob1Y = useTransform(springY, v => v * 0.83)
  const blob2X = useTransform(springX, v => v * 0.825)
  const blob2Y = useTransform(springY, v => v * 0.925)
  const blob3X = useTransform(springX, v => v * 0.735)
  const blob3Y = useTransform(springY, v => v * 0.635)

  // Ref que expõe os valores do spring pro canvas sem causar re-render
  const parallaxRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const unsubX = springX.on('change', v => {
      parallaxRef.current.x = v
    })
    const unsubY = springY.on('change', v => {
      parallaxRef.current.y = v
    })
    return () => {
      unsubX()
      unsubY()
    }
  }, [springX, springY])

  // Mousemove — atualiza os motion values com posição relativa ao centro
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX - window.innerWidth / 2)
      rawY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [rawX, rawY])

  // Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getVar = (name: string): string =>
      getComputedStyle(document.body).getPropertyValue(name).trim()

    let animFrame: number
    let meteors: Meteor[] = []
    let beams: Beam[] = []
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const W = canvas.width
      const H = canvas.height

      meteors = Array.from({ length: METEOR_COUNT }, () => ({
        x: Math.random() > 0.5 ? Math.random() * W : -Math.random() * 200,
        y: Math.random() > 0.5 ? Math.random() * H : -Math.random() * H,
        length: 80 + Math.random() * 120,
        speed: 2.5 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.5,
        width: 1 + Math.random() * 1.5,
      }))

      beams = [
        { colIndex: 1, y: -200, height: 480, speed: 0.8, opacity: 0.6 },
        { colIndex: 2, y: -400, height: 360, speed: 1.0, opacity: 0.9 },
        { colIndex: 2, y: -400, height: 200, speed: 1.0, opacity: 0.6 },
        { colIndex: 3, y: -300, height: 360, speed: 1.9, opacity: 0.55 },
        { colIndex: 4, y: -150, height: 320, speed: 1.6, opacity: 0.5 },
        { colIndex: 4, y: -150, height: 200, speed: 0.9, opacity: 0.9 },
        { colIndex: 5, y: -250, height: 580, speed: 0.2, opacity: 0.5 },
        { colIndex: 6, y: -350, height: 400, speed: 0.8, opacity: 0.5 },
        { colIndex: 6, y: -350, height: 200, speed: 0.8, opacity: 0.85 },
        { colIndex: 7, y: -100, height: 240, speed: 1.25, opacity: 0.5 },
        { colIndex: 8, y: -200, height: 480, speed: 2.6, opacity: 0.5 },
        { colIndex: 8, y: -200, height: 200, speed: 2.6, opacity: 0.9 },
        { colIndex: 9, y: -500, height: 360, speed: 0.9, opacity: 0.55 },
      ]

      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        radius: 0.3 + Math.random() * 1.2,
        baseOpacity: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0008,
      }))
    }

    resize()
    window.addEventListener('resize', resize)

    // Lê as cores uma vez — não a cada frame
    const colors = {
      grid: getVar('--bg-grid-color') || 'rgba(76,201,240,0.04)',
      center: getVar('--bg-grid-center-color') || 'rgba(76,201,240,0.10)',
      beam: getVar('--bg-beam-color') || 'rgba(247,37,133,0.7)',
      meteor: getVar('--bg-meteor-color') || 'rgba(76,201,240,0.8)',
    }

    // Atualiza as cores quando o tema mudar
    const observer = new MutationObserver(() => {
      colors.grid = getVar('--bg-grid-color') || 'rgba(76,201,240,0.04)'
      colors.center = getVar('--bg-grid-center-color') || 'rgba(76,201,240,0.10)'
      colors.beam = getVar('--bg-beam-color') || 'rgba(247,37,133,0.7)'
      colors.meteor = getVar('--bg-meteor-color') || 'rgba(76,201,240,0.8)'
    })

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    const RAD = (METEOR_ANGLE * Math.PI) / 180
    const cos = Math.cos(RAD)
    const sin = Math.sin(RAD)

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      const colW = W / COLS

      // Offset de paralaxe atual — lido do ref, sem re-render
      const px = parallaxRef.current.x
      const py = parallaxRef.current.y

      ctx.clearRect(0, 0, W, H)


      // ESTRELAS — fator pequeno, quase não se movem (camada mais distante)
      const STAR_FACTOR = 0.008
      stars.forEach(star => {
        const opacity =
          star.baseOpacity * (0.5 + 0.5 * Math.sin(Date.now() * star.speed + star.phase))
        ctx.beginPath()
        ctx.arc(star.x + px * STAR_FACTOR, star.y + py * STAR_FACTOR, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${opacity})`
        ctx.fill()
      })

      // GRID — sem paralaxe, é a estrutura fixa da cena
      for (let i = 1; i < COLS; i++) {
        const x = i * colW
        const isCenter = i === Math.floor(COLS / 2)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
ctx.strokeStyle = colors.grid
ctx.strokeStyle = colors.center
        ctx.setLineDash(isCenter ? [5, 8] : [])
        ctx.lineWidth = isCenter ? 1 : 0.5
        ctx.stroke()
      }
      ctx.setLineDash([])

      // BEAMS — fator médio
      const BEAM_FACTOR = 0.012
      beams.forEach(beam => {
        beam.y += beam.speed
        if (beam.y > H + beam.height) beam.y = -beam.height - 50

        const x = beam.colIndex * colW + px * BEAM_FACTOR
        const beamY = beam.y + py * BEAM_FACTOR

        const grad = ctx.createLinearGradient(0, beamY, 0, beamY + beam.height)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.25, colors.beam)
        grad.addColorStop(0.75, colors.beam)
        grad.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.moveTo(x, beamY)
        ctx.lineTo(x, beamY + beam.height)
        ctx.strokeStyle = grad
        ctx.globalAlpha = beam.opacity
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // METEOROS — fator maior (camada mais próxima no canvas)
      const METEOR_FACTOR = 0.02
      meteors.forEach(m => {
        m.x += m.speed * cos
        m.y += m.speed * sin

        if (m.x > W + m.length || m.y > H + m.length) {
          if (Math.random() > 0.5) {
            m.x = Math.random() * W
            m.y = -m.length - Math.random() * 100
          } else {
            m.x = -m.length - Math.random() * 100
            m.y = Math.random() * H
          }
        }

        const mx = m.x + px * METEOR_FACTOR
        const my = m.y + py * METEOR_FACTOR
        const tailX = mx - m.length * cos
        const tailY = my - m.length * sin

        const grad = ctx.createLinearGradient(tailX, tailY, mx, my)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, colors.meteor)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(mx, my)
        ctx.strokeStyle = grad
        ctx.globalAlpha = m.opacity
        ctx.lineWidth = m.width
        ctx.stroke()
        ctx.globalAlpha = 1

        ctx.beginPath()
        ctx.arc(mx, my, m.width * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = colors.meteor
        ctx.globalAlpha = m.opacity * 0.9
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* CAMADA 1 — Gradient base */}
      <div
        aria-hidden='true'
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -10,
          backgroundImage: `linear-gradient(
            45deg,
            var(--body-bg-color-1) 0%,
            var(--body-bg-color-2) 25%,
            var(--body-bg-color-3) 50%,
            var(--body-bg-color-4) 75%,
            var(--body-bg-color-5) 100%
          )`,
          backgroundSize: '100% 100%',
          animation: 'bgGradientShift 10s ease infinite',
        }}
      />

      {/* CAMADA 2 — Blobs com paralaxe */}
      <div
        aria-hidden='true'
        style={{ position: 'fixed', inset: 0, zIndex: -9, overflow: 'hidden' }}
      >
        <motion.div
          style={{
            ...blobBase,
            background: 'var(--bg-blob-1)',
            width: 600,
            height: 600,
            top: '-50%',
            left: '-21%',
            opacity: 0.158,
            x: blob1X,
            y: blob1Y,
          }}
        />
        <motion.div
          style={{
            ...blobBase,
            background: 'var(--bg-blob-2)',
            width: 500,
            height: 500,
            bottom: '-12%',
            right: '-32%',
            opacity: 0.156,
            x: blob2X,
            y: blob2Y,
          }}
        />
        <motion.div
          style={{
            ...blobBase,
            background: 'var(--bg-blob-3)',
            width: 380,
            height: 380,
            top: '10%',
            right: '5%',
            opacity: 0.154,
            x: blob3X,
            y: blob3Y,
          }}
        />
      </div>

      {/* CAMADA 3 — Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden='true'
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -8,
          pointerEvents: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      />

      <style>{`
        @keyframes bgGradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>
    </>
  )
}

const blobBase: React.CSSProperties = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(100px)',
}

export default AnimatedBackground
