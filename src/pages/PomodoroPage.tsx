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
import { Helmet } from 'react-helmet-async'
import { useSound } from '../hooks/useSound'
import alert from '../assets/audio/mixkit-sci-fi-ship-siren-alert-1653.ogg'
import alertFallback from '../assets/audio/mixkit-sci-fi-ship-siren-alert-1653.wav'

const url = import.meta.env.VITE_APP_URL

const PomodoroPage = () => {
  const {
    workflow,
    SessionIndex,
    config: { duration },
    actions,
  } = usePomodoroStore(state => state)

  const currentWorkState = workflow[SessionIndex]
  const timeInSeconds = duration[currentWorkState]

    const { playAlert } = useSound({
    src: [alert, alertFallback],
      volume: 0.7,
      enabled: true,
    })


    
  const advanceToNextPhase = () => {
      playAlert()
      console.log('acabou o tempo')
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





  return (
    <>
      <Helmet>
        <title>Pomodoro Online Grátis | Digital Web Watch</title>
        <meta
          name='description'
          content='Técnica Pomodoro no navegador. Configure ciclos de foco, pausas curtas e longas. Sem instalação. Grátis para usar, fácil de acessar. Aumente sua produtividade com o Pomodoro Timer do Digital Web Watch. , pomodoro online, pomodoro grátis, timer pomodoro, técnica pomodoro, pomodoro para estudos, pomodoro para trabalho, pomodoro sem instalação, pomodoro fácil de usar.'
        />
        <meta property='og:title' content='Pomodoro Online Grátis | Digital Web Watch' />
        <meta
          property='og:description'
          content=' Técnica Pomodoro no navegador. Configure ciclos de foco, pausas curtas e longas. Sem instalação. Grátis para usar, fácil de acessar. Aumente sua produtividade com o Pomodoro Timer do Digital Web Watch. , pomodoro online, pomodoro grátis, timer pomodoro, técnica pomodoro, pomodoro para estudos, pomodoro para trabalho, pomodoro sem instalação, pomodoro fácil de usar.'
        />
        <link rel='canonical' href={`${url}/`} />
      </Helmet>
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
