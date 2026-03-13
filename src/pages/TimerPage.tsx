import { useEffect } from 'react'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import { useClock } from '../hooks/useClock'
import useTimerStore from '../stores/timerStore'
import { Helmet } from 'react-helmet-async'
import { useSound } from '../hooks/useSound'


const url = import.meta.env.VITE_APP_URL

const TimerPage = () => {
  const {
    config: { duration },
    actions,
  } = useTimerStore(state => state)



  const { playAlert } = useSound({
    src: ['sounds/alerts.mp3', 'sounds/alerts.ogg'],

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

  // Sincroniza o relógio se a duração configurada mudar
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
          content='Defina um tempo e receba um alerta quando acabar. Timer gratuito, sem instalação. Ideal para cozinhar, exercícios, estudos ou qualquer atividade que precise de um lembrete. Grátis para usar, fácil de acessar. timer online, timer grátis, timer regressivo, timer para cozinha, timer para exercícios, timer para estudos, timer sem instalação, timer fácil de usar. , timer regressivo online, temporizador online, timer de contagem regressiva, timer de cozinha, timer de exercícios, timer de estudos, timer sem instalação, timer fácil de usar.'
        />
        <meta property='og:title' content='Timer Regressivo Online | Digital Web Watch' />
        <meta
          property='og:description'
          content='Defina um tempo e receba um alerta quando acabar. Timer gratuito, sem instalação. Ideal para cozinhar, exercícios, estudos ou qualquer atividade que precise de um lembrete. Grátis para usar, fácil de acessar. timer online, timer grátis, timer regressivo, timer para cozinha, timer para exercícios, timer para estudos, timer sem instalação, timer fácil de usar. , timer regressivo online, temporizador online, timer de contagem regressiva, timer de cozinha, timer de exercícios, timer de estudos, timer sem instalação, timer fácil de usar.'
        />
        <link rel='canonical' href={`${url}/timer`} />
      </Helmet>

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
