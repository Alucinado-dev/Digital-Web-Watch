import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

// Container que orquestra o stagger dos filhos
// staggerChildren faz cada filho direto entrar com delay progressivo
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // 80ms entre cada filho
      delayChildren: 0.05, // pequeno delay inicial após a page transition
    },
  },
}



type PageWrapperProps = {
  children: ReactNode
  className?: string
}

// Wrapper que envolve o conteúdo de cada page
// Os filhos diretos precisam ser motion.* ou usar variants="pageItem"
const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper
