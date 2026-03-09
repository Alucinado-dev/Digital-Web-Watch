import { useEffect } from 'react'
import { Flag } from 'lucide-react'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import { useClock } from '../hooks/useClock'
import useStopwatchStore from '../stores/stopwatchStore'

const StopwatchPage = () => {
  const { laps, bestLap, worstLap, actions } = useStopwatchStore(state => state)

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'up',
    startTime: 0,
    interval: 10, // 10ms para mostrar centésimos
    persistKey: 'stopwatch-time',
  })

  const handleLap = () => {
    if (!isRunning) return
    actions.addLap(time)
  }

  const handleReset = () => {
    reset(0)
    actions.reset()
  }

  const formatSplit = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const centiseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  const getLapStyle = (lapId: number) => {
    if (laps.length < 2) return ''
    if (lapId === bestLap?.id) return 'text-success'
    if (lapId === worstLap?.id) return 'text-error'
    return ''
  }

  useEffect(() => {
    document.title = 'Digital Web Watch | Cronômetro'
  }, [])

  return (
    <>
      <section className='flex w-full items-center justify-center mx-auto py-7'>
        <Logo size={64} />
      </section>

      <section className='w-full flex relative items-center justify-center mx-auto py-14'>
        <CountDownContainer circleSize={280} circleSizeMobile={240}>
          <Clock time={time} />
        </CountDownContainer>
      </section>

      <section className='w-full gap-6 flex relative items-center justify-center mx-auto py-6'>
        <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
        <ResetBtn onClick={handleReset} />

        {/* Botão de lap — só aparece enquanto está rodando */}
        {isRunning && (
          <button
            className='btn btn-neutral'
            onClick={handleLap}
            aria-label='Registrar volta'
            title='Registrar volta'
          >
            <Flag />
          </button>
        )}
      </section>

      {/* Lista de voltas */}
      {laps.length > 0 && (
        <section className='w-full max-w-sm mx-auto px-4 py-4 flex flex-col gap-1'>
          {/* Cabeçalho */}
          <div className='grid grid-cols-3 text-xs opacity-40 uppercase tracking-widest pb-2 border-b border-white/10'>
            <span>Volta</span>
            <span className='text-center'>Split</span>
            <span className='text-right'>Total</span>
          </div>

          {/* Voltas em ordem decrescente (mais recente no topo) */}
          {[...laps].reverse().map(lap => (
            <div
              key={lap.id}
              className={`grid grid-cols-3 text-sm py-1.5 border-b border-white/5 ${getLapStyle(lap.id)}`}
            >
              <span className='opacity-60'>#{lap.id}</span>
              <span className='text-center font-mono'>{formatSplit(lap.split)}</span>
              <span className='text-right font-mono opacity-70'>{formatSplit(lap.time)}</span>
            </div>
          ))}
        </section>
      )}
    </>
  )
}

export default StopwatchPage
