import { useCallback, useEffect, useRef, useState } from 'react'

type Mode = 'up' | 'down'

interface UseClockOptions {
  mode: Mode
  startTime: number
  interval?: number
  onTick?: (time: number) => void
  onComplete?: () => void
  isRunning?: boolean
  persistKey?: string
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

  // Refs para onTick e onComplete — evita que funções recriadas no pai
  // causem re-execução desnecessária dos effects e do tick
  const onCompleteRef = useRef(onComplete)
  const onTickRef = useRef(onTick)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])
  useEffect(() => {
    onTickRef.current = onTick
  }, [onTick])

  const tick = useCallback(() => {
    setTime(prev => {
      const next = mode === 'up' ? prev + interval : prev - interval
      if (persistKey) localStorage.setItem(persistKey, String(next))
      if (onTickRef.current) onTickRef.current(next)
      if (mode === 'down' && next <= 0) return 0
      return next
    })
  }, [interval, mode, persistKey])

  // Observa o tempo e dispara onComplete quando chega a zero
  // onCompleteRef.current não vai nas deps — é um ref, não muda
  useEffect(() => {
    if (mode === 'down' && time <= 0 && running) {
      clearInterval(intervalRef.current!)
      setRunning(false)
      onCompleteRef.current?.()
    }
  }, [time, mode, running])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, interval)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [interval, running, tick])

  const start = useCallback(() => setRunning(true), [])

  const pause = useCallback(() => {
    setRunning(false)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const reset = useCallback(
    (newTime?: number) => {
      pause()
      const timeToSet = newTime !== undefined ? newTime : startTime
      setTime(timeToSet)
      if (persistKey) localStorage.setItem(persistKey, String(timeToSet))
    },
    [pause, startTime, persistKey],
  )

  return { time, start, pause, reset, isRunning: running }
}
