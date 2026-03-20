import { useEffect } from 'react'
import { motion } from 'motion/react'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import PageWrapper from '../components/PageWrapper'
import { useClock } from '../hooks/useClock'
import useTimerStore from '../stores/timerStore'
import { Helmet } from 'react-helmet-async'
import { useSound } from '../hooks/useSound'
import alert from '../assets/audio/alexis_gaming_cam-timer-terminer-342934.ogg'
import alertFallback from '../assets/audio/alexis_gaming_cam-timer-terminer-342934.wav'
import { pageItemVariants } from '../utils/pageItemVariants'

const url = import.meta.env.VITE_APP_URL

const TimerPage = () => {
  const {
    config: { duration },
    actions,
  } = useTimerStore(state => state)

  const { playAlert } = useSound({
    src: [alert, alertFallback],
    volume: 0.7,
    enabled: true,
  })

  const handleComplete = () => {
    playAlert()
    actions.setFinished(true)
  }

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'down',
    startTime: duration,
    interval: 1000,
    onComplete: handleComplete,
    persistKey: 'timer-time',
  })

  useEffect(() => {
    reset(duration)
  }, [duration, reset])

  const handleReset = () => {
    actions.reset()
    reset(duration)
  }

  return (
    <>
      <Helmet>
        <title>Timer Regressivo Online | Digital Web Watch</title>
        <meta
          name='description'
          content='Defina um tempo e receba um alerta quando acabar. Timer gratuito, sem instalação. Ideal para cozinhar, exercícios, estudos ou qualquer atividade que precise de um lembrete.'
        />
        <meta property='og:title' content='Timer Regressivo Online | Digital Web Watch' />
        <meta
          property='og:description'
          content='Defina um tempo e receba um alerta quando acabar. Timer gratuito, sem instalação.'
        />
        <link rel='canonical' href={`${url}/timer`} />
      </Helmet>

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
          className='w-full gap-6 flex relative items-center justify-center mx-auto py-6'
        >
          <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
          <ResetBtn onClick={handleReset} />
        </motion.section>
      </PageWrapper>
    </>
  )
}

export default TimerPage
