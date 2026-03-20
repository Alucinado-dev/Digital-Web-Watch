import { AnimatePresence, motion } from 'motion/react'

type ClockProps = {
  time: number // time in milliseconds
}

const Clock = ({ time }: ClockProps) => {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const paddedSeconds = seconds.toString().padStart(2, '0')
    const paddedMinutes = minutes.toString().padStart(2, '0')
    const paddedHours = hours.toString().padStart(2, '0')

    if (hours > 0) return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    return `${paddedMinutes}:${paddedSeconds}`
  }

  const formatted = formatTime(time)

  // O key muda a cada segundo — AnimatePresence anima a saída do valor antigo
  // e a entrada do novo. Blur leve cria um efeito de "flip" digital premium.
  // Usamos os segundos como key (não o tempo total) para que a animação
  // só dispare uma vez por segundo, não a cada ms
  const secondsKey = Math.floor(time / 1000)

  return (
    <AnimatePresence mode='popLayout' initial={false}>
      <motion.span
        key={secondsKey}
        className='text-center silkscreen-bold  text-5xl font-bold text-(--countdown-color) [font-family:var(--countdown-font)] text-shadow-(--countdown-shadow)'
        initial={{ opacity: 0.4, filter: 'blur(6px)', scale: 0.97 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.02 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {formatted}
      </motion.span>
    </AnimatePresence>
  )
}

export default Clock
