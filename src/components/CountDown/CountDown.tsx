import RotateGlowingBorder from './RotateGlowingBorder'

const CountDown = () => {
  return (
    <RotateGlowingBorder circleSize={280}>
      <span className='text-center text-5xl font-bold text-(--countdown-color) [font-family:var(--countdown-font)] text-shadow-(--countdown-shadow)'>
        00:00
      </span>
    </RotateGlowingBorder>
  )
}

export default CountDown
