import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { SettingsBtn, SettingsModal } from '../features/SettingsModal'
import VolumeControl from '../features/VolumeControl'
import Footer from './Footer'
import Header from './Header'
import { useNavigationDirection } from '../hooks/useNavigationDirection'
import AnimatedBackground from '../features/AnimatedBackground'

// Distância horizontal do slide em pixels
// 40px é suficiente para dar sensação de movimento sem ser agressivo
const SLIDE_DISTANCE = 40

const Layout = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { direction } = useNavigationDirection()

  // Variants definem os três estados da animação:
  // - initial:  estado de entrada (antes de aparecer)
  // - animate:  estado final (visível)
  // - exit:     estado de saída (antes de desaparecer)
  //
  // Usamos uma função que recebe o `direction` como custom prop
  // para que cada troca de página calcule a direção correta
  const pageVariants: Variants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir === 0 ? 0 : -dir * SLIDE_DISTANCE,
      scale: 0.98,
    }),
    animate: () => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2, ease: 'easeOut' as const },
        scale: { duration: 0.25, ease: 'easeOut' as const },
      },
    }),
    exit: (dir: number) => ({
      opacity: 0,
      x: dir === 0 ? 0 : dir * SLIDE_DISTANCE,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 400, damping: 35 },
        opacity: { duration: 0.15, ease: 'easeIn' as const },
        scale: { duration: 0.15 },
      },
    }),
  }

  return (
    <div className='flex flex-col relative overflow-x-hidden widescreen:max-w-480 widescreen:mx-auto min-h-screen'>

      <AnimatedBackground/>
      <Header />

      <main className='flex-1 flex flex-col items-center justify-start widescreen:max-w-480 widescreen:mx-auto'>
        {/*
          AnimatePresence precisa estar FORA do elemento com key.
          mode="wait" garante que a saída termina antes da entrada começar.
          custom passa o valor dinâmico (direction) para as variants.
        */}
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={location.pathname} // chave que dispara a animação na troca de rota
            custom={direction} // valor passado para as variant functions
            variants={pageVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            // overflow hidden evita que o slide cause scroll horizontal
            style={{ width: '100%', overflow: 'hidden' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

        <div className='fixed bottom-5 right-5'>
          <SettingsBtn />
        </div>
        <div className='fixed bottom-5 left-5'>
          <VolumeControl initialVolume={0.7} />
        </div>
        <SettingsModal />
      </main>

      <Footer text={t('footerText')} />
    </div>
  )
}

export default Layout
