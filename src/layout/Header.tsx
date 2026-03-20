import { motion } from 'motion/react'
import Navbar from '../components/Navbar'

const Header = () => {
  return (
    <motion.header
      className='w-full flex items-center sticky top-0 z-50 justify-center p-2.5 bg-(--Header-bg-color)'
      // Entra deslizando de cima uma única vez no mount
      // O header é o primeiro elemento que o usuário vê —
      // uma entrada limpa de cima ancora o layout visualmente
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 28,
        delay: 0.05, // leve delay para não competir com o logo da página
      }}
    >
      <Navbar />
    </motion.header>
  )
}

export default Header
