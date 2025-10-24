import type { HTMLAttributes } from 'react'
import style from './Container.module.css'

type ContainerProps = {
  children: React.ReactNode
  isFluid?: boolean
} & HTMLAttributes<HTMLDivElement>

const Container = ({ children, isFluid = false, className, ...rest }: ContainerProps) => {
  const containerClasses = [isFluid ? style.containerFluid : style.container, className].join(' ')

  return (
    <>
    {isFluid ? (
      <section className='max-w-dvw'>
        {children}
      </section>
    ) : (
      <div {...rest} className={containerClasses}>
      {children}
    </div>
    )}

    </>
  )
}

export default Container
