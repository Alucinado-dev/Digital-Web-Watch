import type { HTMLAttributes } from 'react'
import { motion } from 'motion/react'
import logo from '../assets/img/Digital Web Watch logo.png'
import { pageItemVariants } from '../utils/pageItemVariants'

type LogoProps = HTMLAttributes<HTMLElement> & {
  size: number
}

const Logo = ({ size, ...props }: LogoProps) => {
  return (
    // motion.div herda as variants do PageWrapper via contexto
    // não precisa declarar initial/animate — o stagger cuida disso
    <motion.div
      className='items-center flex w-full justify-center cursor-pointer'
      variants={pageItemVariants}
    >
      <figure {...props} style={{ width: `${size}px`, height: `${size}px` }} className='hidden'>
        <img
          className='w-full h-full object-center object-cover'
          src={logo}
          alt='Logo de Digital Web Watch'
        />
      </figure>

      <h1 className='large-tablet:text-3xl text-2xl mobile:text-4xl font-bold text-(--logo-text-color) text-shadow-(--logo-text-shadow)'>
        Digital Web Watch
      </h1>
    </motion.div>
  )
}

export default Logo
