import { ArrowBigRightDash } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { pageItemVariants } from '../utils/pageItemVariants'

type NextBtnProps = ButtonHTMLAttributes<HTMLButtonElement>

const NextBtn = (props: NextBtnProps) => {
  return (
    <motion.button
      className='btn btn-accent'
      variants={pageItemVariants}
      whileHover={{ scale: 1.08, x: 3 }} // leve nudge para direita reforça o conceito de "próximo"
      whileTap={{ scale: 0.91, x: 6 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...(props as object)}
    >
      <ArrowBigRightDash size={20} />
    </motion.button>
  )
}

export default NextBtn
