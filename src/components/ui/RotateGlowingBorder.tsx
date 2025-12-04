type rotateGlowingBorderProps = {
  circleSize: number
  children: React.ReactNode
}

const RotateGlowingBorder = ({ circleSize, children }: rotateGlowingBorderProps) => {
  return (
    <>
      <div
        className='absolute z-10 animate-rotate-and-glow rounded-full'
        style={{
          width: `${circleSize + 15}px`,
          height: `${circleSize + 15}px`,
          background:
            'linear-gradient(var(--countdown-border-1), var(--countdown-border-2), var(--countdown-border-3), var(--countdown-border-4))',

          animation: 'rotateBorder 5s linear infinite, glowBorder 5s linear infinite',
        }}
      ></div>
      {children}
    </>
  )
}

export default RotateGlowingBorder

/* @keyframes glowBorder {
  0% {
    filter: blur(20px);
  }
  50% {
    filter: blur(5px);
  }
  100% {
    filter: blur(20px);
  }
}

@keyframes rotateBorder {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
 */
