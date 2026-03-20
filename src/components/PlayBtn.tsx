import { Pause, Play } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { pageItemVariants } from '../utils/pageItemVariants'

type PlayBtnProps = {
  isPaused: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const PlayBtn = ({ isPaused = true, ...rest }: PlayBtnProps) => {
  const variants = isPaused ? 'btn btn-success' : 'btn btn-error'

  return (
    <motion.button
      className={variants}
      variants={pageItemVariants} // herda o stagger do PageWrapper
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.91 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...(rest as object)}
      aria-label={isPaused ? 'Play' : 'Pause'}
      title={isPaused ? 'Play' : 'Pause'}
    >
      {/* AnimatePresence anima a troca entre Play e Pause */}
      <AnimatePresence mode='wait' initial={false}>
        {isPaused ?
          <motion.span
            key='play'
            initial={{ rotate: -30, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <Play size={20} />
          </motion.span>
        : <motion.span
            key='pause'
            initial={{ rotate: 30, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -30, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            <Pause size={20} />
          </motion.span>
        }
      </AnimatePresence>
    </motion.button>
  )
}

export default PlayBtn
