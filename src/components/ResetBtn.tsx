import { TimerReset } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { motion } from 'motion/react'
import { pageItemVariants } from '../utils/pageItemVariants'

type ResetBtnProps = ButtonHTMLAttributes<HTMLButtonElement>

const ResetBtn = (props: ResetBtnProps) => {
  return (
    <motion.button
      title='reset'
      className='btn btn-warning'
      variants={pageItemVariants}
      whileHover={{ scale: 1.08 }}
      // Reset tem um shake no tap — feedback de "apagar" mais expressivo que scale simples
      whileTap={{
        rotate: [-4, 4, -3, 3, 0],
        scale: 0.93,
        transition: { duration: 0.3 },
      }}
      {...(props as object)}
    >
      <TimerReset size={20} />
    </motion.button>
  )
}

export default ResetBtn
