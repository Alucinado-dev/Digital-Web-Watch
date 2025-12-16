import { useEffect } from 'react'
import Logo from '../components/Logo'
import CountDownContainer from '../components/ui/CountDownContainer'
import Cycles from '../components/Cycles'
import PlayBtn from '../components/PlayBtn'
import { useClock } from '../hooks/useClock'
import Clock from '../components/ui/Clock'
import ResetBtn from '../components/ResetBtn'
import usePomodoroStore from '../stores/pomodoroStore'
import NextBtn from '../components/ResetBtn'

const PomodoroPage = () => {
  const {
    workflow,
    SessionIndex,
    config: { duration },
    actions,
  } = usePomodoroStore(state => state)

  const currentWorkState = workflow[SessionIndex]
  const timeInSeconds = duration[currentWorkState]

  const advanceAndStart = () => {
    actions.advanceToNextWorkState()
  }

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'down',
    startTime: timeInSeconds * 1000,
    interval: 1000,
    onComplete: advanceAndStart,
    persistKey: 'pomodoro-time',
  })

  useEffect(() => {
    const newTimeInMs = duration[workflow[SessionIndex]] * 1000

    reset(newTimeInMs)
    start()
  }, [SessionIndex, duration, reset, start, workflow]) 

  const handleReset = () => {
    actions.resetSequence()
  }

  useEffect(() => {
    document.title = `Digital Web Watch | ${
      currentWorkState === 'workTime'
        ? 'Work'
        : currentWorkState === 'shortBreak'
        ? 'Short Break'
        : 'Long Break'
    }`
  }, [currentWorkState])

  return (
    <>
      <section className='flex  small-tablet:hidden w-full items-center justify-center  mx-auto py-7'>
        <Logo size={64} />
      </section>

      <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
        <CountDownContainer circleSize={280} circleSizeMobile={240}>
          <Clock time={time} />
        </CountDownContainer>
      </section>

      <section className='w-full flex relative items-center justify-center   mx-auto py-6'></section>

      <section>
        <Cycles />
      </section>

      <section className='w-full gap-6 flex relative items-center justify-center  mx-auto py-6'>
        <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
        <ResetBtn onClick={handleReset} />
        <NextBtn onClick={advanceAndStart}/>
      </section>
    </>
  )
}

export default PomodoroPage
