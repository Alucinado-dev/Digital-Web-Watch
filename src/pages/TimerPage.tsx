import { useEffect } from 'react'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import { useClock } from '../hooks/useClock'
import useTimerStore from '../stores/timerStore'

const TimerPage = () => {
  const {
    config: { duration },
    actions,
  } = useTimerStore(state => state)

  const handleComplete = () => {
    actions.setFinished(true)
  }

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'down',
    startTime: duration,
    interval: 1000,
    onComplete: handleComplete,
    persistKey: 'timer-time',
  })

  // Sincroniza o relógio se a duração configurada mudar
  useEffect(() => {
    reset(duration)
  }, [duration, reset])

  const handleReset = () => {
    actions.reset()
    reset(duration)
  }

  useEffect(() => {
    document.title = 'Digital Web Watch | Timer'
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
      </section>
    </>
  )
}

export default TimerPage
