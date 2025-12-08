import { useCallback, useEffect, useRef, useState } from 'react'

type Mode = 'up' | 'down'

interface UseClockOptions {
  mode: Mode
  startTime: number // em milissegundos
  interval?: number // em ms, padrão 1000
  onTick?: (time: number) => void
  onComplete?: () => void
  isRunning?: boolean
  persistKey?: string // chave para localStorage
}

export function useClock({
  mode,
  startTime,
  interval = 1000,
  onTick,
  onComplete,
  isRunning = false,
  persistKey,
}: UseClockOptions) {
  const [time, setTime] = useState(() => {
    if (persistKey) {
      const saved = localStorage.getItem(persistKey)
      return saved ? parseInt(saved) : startTime
    }
    return startTime
  })

  const [running, setRunning] = useState(isRunning)
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

const tick = useCallback(() => {
  setTime(prev => {
    const next = mode === 'up' ? prev + interval : prev - interval

    if (persistKey) {
      localStorage.setItem(persistKey, String(next))
    }

    if (onTick) onTick(next)

    if (mode === 'down' && next <= 0) {
      clearInterval(intervalRef.current!)
      setRunning(false)
      if (onComplete) onComplete()
      return 0
    }

    return next
  })
}, [interval, mode, onTick, onComplete, persistKey])


  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, interval)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [interval, running, tick])

  const start = () => setRunning(true)
  const pause = () => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }
  const reset = () => {
    pause()
    setTime(startTime)
    if (persistKey) localStorage.setItem(persistKey, String(startTime))
  }

  return { time, start, pause, reset, isRunning: running }
}
