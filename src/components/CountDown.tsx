import { useEffect, useState } from 'react'
import RotateGlowingBorder from './RotateGlowingBorder'

const CountDown = () => {
  /* hook pra capturar o tamanho da janela */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const countDownSize = windowWidth >= 560 ? 280 : 240

  return (
    <RotateGlowingBorder circleSize={countDownSize}>
      <span className='text-center text-5xl font-bold text-(--countdown-color) [font-family:var(--countdown-font)] text-shadow-(--countdown-shadow)'>
        00:00
      </span>
    </RotateGlowingBorder>
  )
}

export default CountDown
