import { Flag } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import ResetBtn from '../components/ResetBtn'
import Clock from '../components/ui/Clock'
import CountDownContainer from '../components/ui/CountDownContainer'
import PageWrapper from '../components/PageWrapper'
import { useClock } from '../hooks/useClock'
import useStopwatchStore from '../stores/stopwatchStore'
import { Helmet } from 'react-helmet-async'
import { pageItemVariants } from '../utils/pageItemVariants'

const url = import.meta.env.VITE_APP_URL

const StopwatchPage = () => {
  const { laps, bestLap, worstLap, actions } = useStopwatchStore(state => state)

  const { time, start, pause, reset, isRunning } = useClock({
    mode: 'up',
    startTime: 0,
    interval: 10,
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

  return (
    <>
      <Helmet>
        <title>Cronômetro Online Gratuito | Digital Web Watch</title>
        <meta
          name='description'
          content='Cronômetro digital com voltas (lap), precisão de centésimos. Funciona direto no navegador, sem instalação.'
        />
        <meta property='og:title' content='Cronômetro Online Gratuito | Digital Web Watch' />
        <meta
          property='og:description'
          content='Cronômetro digital com voltas (lap), precisão de centésimos. Funciona direto no navegador, sem instalação.'
        />
        <link rel='canonical' href={`${url}/stopwatch`} />
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

        {/* Botões — o lap entra/sai com AnimatePresence */}
        <motion.section
          variants={pageItemVariants}
          className='w-full gap-6 flex relative items-center justify-center mx-auto py-6'
        >
          <PlayBtn isPaused={!isRunning} onClick={() => (isRunning ? pause() : start())} />
          <ResetBtn onClick={handleReset} />

          {/* AnimatePresence no botão de lap — entra quando isRunning=true
              O scale+blur na entrada e a saída para baixo dão leveza ao aparecimento
              sem competir visualmente com os botões principais */}
          <AnimatePresence>
            {isRunning && (
              <motion.button
                className='btn btn-neutral'
                onClick={handleLap}
                aria-label='Registrar volta'
                title='Registrar volta'
                initial={{ opacity: 0, scale: 0.7, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.7, filter: 'blur(4px)', y: 8 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.91 }}
              >
                <Flag size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Lista de voltas */}
        <AnimatePresence>
          {laps.length > 0 && (
            <motion.section
              className='w-full max-w-sm mx-auto px-4 py-4 flex flex-col gap-1'
              // A seção inteira entra com blur quando a primeira lap é registrada
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Cabeçalho — estático, sem animação individual */}
              <div className='grid grid-cols-3 text-xs opacity-40 uppercase tracking-widest pb-2 border-b border-white/10'>
                <span>Volta</span>
                <span className='text-center'>Split</span>
                <span className='text-right'>Total</span>
              </div>

              {/* AnimatePresence nas linhas — cada nova lap entra pelo topo
                  com slide+blur. Como a lista é revertida, a nova lap
                  sempre aparece na posição 0 — entra de cima */}
              <AnimatePresence initial={false}>
                {[...laps].reverse().map(lap => (
                  <motion.div
                    key={lap.id}
                    className={`grid grid-cols-3 text-sm py-1.5 border-b border-white/5 ${getLapStyle(lap.id)}`}
                    // initial={false} no AnimatePresence pai evita que todas
                    // as linhas animem na montagem — só novas laps animam
                    initial={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    // layout faz as linhas existentes se reposicionarem
                    // suavemente quando uma nova chega no topo
                    layout
                  >
                    <span className='opacity-60'>#{lap.id}</span>
                    <span className='text-center font-mono'>{formatSplit(lap.split)}</span>
                    <span className='text-right font-mono opacity-70'>{formatSplit(lap.time)}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </PageWrapper>
    </>
  )
}

export default StopwatchPage
