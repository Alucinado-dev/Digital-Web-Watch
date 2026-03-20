import { useEffect } from 'react'
import { motion } from 'motion/react'
import Cycles from '../components/Cycles'
import Logo from '../components/Logo'
import NextBtn from '../components/NextBtn'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import PageWrapper from '../components/PageWrapper'
import { useClock } from '../hooks/useClock'
import usePomodoroStore from '../stores/pomodoroStore'
import { Helmet } from 'react-helmet-async'
import { useSound } from '../hooks/useSound'
import alert from '../assets/audio/mixkit-sci-fi-ship-siren-alert-1653.ogg'
import alertFallback from '../assets/audio/mixkit-sci-fi-ship-siren-alert-1653.wav'
import { pageItemVariants } from '../utils/pageItemVariants'

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
    actions.advanceToNextWorkState()
  }

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'down',
    startTime: timeInSeconds * 1000,
    interval: 1000,
    onComplete: advanceToNextPhase,
    persistKey: 'pomodoro-time',
  })

  useEffect(() => {
    const newTimeInMs = duration[workflow[SessionIndex]] * 1000
    reset(newTimeInMs)
  }, [SessionIndex, duration, reset, workflow])

  const handleReset = () => actions.resetSequence()

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
          content='Técnica Pomodoro no navegador. Configure ciclos de foco, pausas curtas e longas. Sem instalação.'
        />
        <link rel='canonical' href={`${url}/`} />
      </Helmet>

      {/* PageWrapper orquestra o stagger de todos os filhos */}
      <PageWrapper>
        <motion.section
          variants={pageItemVariants}
          className='flex w-full items-center justify-center mx-auto py-7'
        >
          <Logo size={64} />
        </motion.section>

        <motion.section
          variants={pageItemVariants}
          className='w-full flex relative items-center justify-center mx-auto py-14'
        >
          <CountDownContainer circleSize={280} circleSizeMobile={240} isRunning={isRunning}>
            <Clock time={time} />
          </CountDownContainer>
        </motion.section>

        <motion.section
          variants={pageItemVariants}
          className='w-full flex relative items-center justify-center mx-auto h-40'
        >
          <Cycles />
        </motion.section>

        <motion.section
          variants={pageItemVariants}
          className='w-full gap-6 flex relative items-center justify-center mx-auto py-6'
        >
          <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
          <ResetBtn onClick={handleReset} />
          <NextBtn onClick={advanceToNextPhase} />
        </motion.section>
      </PageWrapper>
    </>
  )
}

export default PomodoroPage
