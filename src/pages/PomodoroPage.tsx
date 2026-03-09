import { useEffect } from 'react'
import Cycles from '../components/Cycles'
import Logo from '../components/Logo'
import NextBtn from '../components/NextBtn'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import { useClock } from '../hooks/useClock'
import usePomodoroStore from '../stores/pomodoroStore'

const PomodoroPage = () => {
  const {
    workflow,
    SessionIndex,
    config: { duration },
    actions,
  } = usePomodoroStore(state => state)

  const currentWorkState = workflow[SessionIndex]
  const timeInSeconds = duration[currentWorkState]

  const advanceToNextPhase = () => {
    actions.advanceToNextWorkState()
  }

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'down',
    startTime: timeInSeconds * 1000,
    interval: 1000,
    onComplete: advanceToNextPhase,
    persistKey: 'pomodoro-time',
  })

  // Efeito que sincroniza o relógio quando a fase do Pomodoro muda
  useEffect(() => {
    const newTimeInMs = duration[workflow[SessionIndex]] * 1000
    reset(newTimeInMs)
  }, [SessionIndex, duration, reset, workflow])

  const handleReset = () => {
    actions.resetSequence()
  }

  useEffect(() => {
    document.title = `Digital Web Watch | ${
      currentWorkState === 'workTime' ? 'Work'
      : currentWorkState === 'shortBreak' ? 'Short Break'
      : 'Long Break'
    }`
  }, [currentWorkState])

  return (
    <>
      <section className='flex   w-full items-center justify-center  mx-auto py-7'>
        <Logo size={64} />
      </section>

      <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
        <CountDownContainer circleSize={280} circleSizeMobile={240}>
          <Clock time={time} />
        </CountDownContainer>
      </section>

      <section className='w-full flex relative items-center justify-center   mx-auto py-6'></section>

      <section className='w-full flex relative items-center justify-center  mx-auto  h-40'>
        <Cycles />
      </section>

      <section className='w-full gap-6 flex relative items-center justify-center  mx-auto py-6'>
        <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
        <ResetBtn onClick={handleReset} />
        <NextBtn onClick={advanceToNextPhase} />
      </section>
    </>
  )
}

export default PomodoroPage
