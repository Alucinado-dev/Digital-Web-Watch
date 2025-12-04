import { useMediaQuery } from '@uidotdev/usehooks'
import RotateGlowingBorder from './RotateGlowingBorder'

type CountDownContainerProps = {
  circleSize?: number
  circleSizeMobile?: number
  children? : React.ReactNode
}

const CountDownContainer = ({
  circleSize = 280,
  circleSizeMobile = 240,
  children,
}: CountDownContainerProps) => {
  const mediaBreakPoint = 560
  const isSmallDevice = useMediaQuery(`only screen and (max-width : ${mediaBreakPoint}px)`)

  const countDownContainerSize = isSmallDevice ? circleSize : circleSizeMobile

  return (
    <RotateGlowingBorder circleSize={countDownContainerSize}>
      <div
        className='relative z-20 flex items-center justify-center rounded-full bg-(--countdown-bg) p-16'
        style={{ width: `${countDownContainerSize}px`, height: `${countDownContainerSize}px` }}
      >
        <span className='text-center text-5xl font-bold text-(--countdown-color) [font-family:var(--countdown-font)] text-shadow-(--countdown-shadow)'>
          00:00
          {children}
        </span>
      </div>
    </RotateGlowingBorder>
  )
}

export default CountDownContainer
