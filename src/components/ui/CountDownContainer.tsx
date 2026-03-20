import { useMediaQuery } from '@uidotdev/usehooks'
import { motion } from 'motion/react'
import RotateGlowingBorder from './RotateGlowingBorder'
import { pageItemVariants } from '../../utils/pageItemVariants'

type CountDownContainerProps = {
  circleSize?: number
  circleSizeMobile?: number
  children?: React.ReactNode
  // isRunning permite animar o círculo quando o timer está ativo
  isRunning?: boolean
}

const CountDownContainer = ({
  circleSize = 280,
  circleSizeMobile = 240,
  children,
  isRunning = false,
}: CountDownContainerProps) => {
  const mediaBreakPoint = 560
  const isSmallDevice = useMediaQuery(`only screen and (max-width : ${mediaBreakPoint}px)`)
  const countDownContainerSize = isSmallDevice ? circleSize : circleSizeMobile

  return (
    // Herda o stagger do PageWrapper — o círculo é o segundo elemento a entrar
    <motion.div
      variants={pageItemVariants}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Wrapper do pulso — anima scale quando isRunning muda
          O círculo "respira" levemente ao iniciar, criando feedback visual do play */}
      <motion.div
        animate={
          isRunning ?
            { scale: [1, 1.025, 1], transition: { duration: 0.4, ease: 'easeOut' } }
          : { scale: 1 }
        }
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RotateGlowingBorder circleSize={countDownContainerSize}>
          <div
            className='relative z-20 flex items-center justify-center rounded-full bg-(--countdown-bg) p-16'
            style={{ width: `${countDownContainerSize}px`, height: `${countDownContainerSize}px` }}
          >
            {children}
          </div>
        </RotateGlowingBorder>
      </motion.div>
    </motion.div>
  )
}

export default CountDownContainer
