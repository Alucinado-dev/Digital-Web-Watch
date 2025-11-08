import type { HTMLAttributes } from 'react'
import logo from '../../assets/img/Digital Web Watch logo.png'

type LogoProps = HTMLAttributes<HTMLElement> & {
  size?: number
}

const Logo = ({ size, ...props }: LogoProps) => {
  return (
    <figure {...props} style={{ width: `${size}px`, height: `${size}px` }}>
      <img
        className='w-full h-full object-center object-cover'
        src={logo}
        alt='Logo de Digital Web Watch'
      />
    </figure>
  )
}

export default Logo
