import type { HTMLAttributes } from 'react'
import logo from '../../assets/img/Digital Web Watch logo.png'

type LogoProps = HTMLAttributes<HTMLElement> & {
  size: number
}

const Logo = ({ size, ...props }: LogoProps) => {
  return (
    <div className='items-center flex w-full justify-center cursor-pointer'>
      <figure {...props} style={{ width: `${size}px`, height: `${size}px` }}>
        <img
          className='w-full h-full object-center object-cover'
          src={logo}
          alt='Logo de Digital Web Watch'
        />
      </figure>

      <h1 className='large-tablet:text-3xl text-2xl mobile:text-4xl font-bold    text-(--logo-text-color) text-shadow-(--logo-text-shadow) '>
        Digital Web Watch
      </h1>
    </div>
  )
}

export default Logo
