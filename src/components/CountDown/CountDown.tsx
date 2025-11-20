const CountDown = () => {
  const circleSize = 280

  return (
    <div
      className='relative flex items-center justify-center rounded-full bg-[var(--countdown-bg)] p-16'
      style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
    >
      <div
        className='absolute -z-10 animate-rotate-and-glow rounded-full'
        style={{
          width: `${circleSize + 15}px`,
          height: `${circleSize + 15}px`,
          background:
            'linear-gradient(45deg, var(--countdown-border-1), var(--countdown-border-2))',

          animation: 'rotateBorder 5s linear infinite, glowBorder 5s linear infinite',
        }}
      ></div>
      <span className='text-center text-5xl font-bold text-[var(--countdown-color)] [font-family:var(--countdown-font)] [text-shadow:var(--countdown-shadow)]'>
        00:00
      </span>
    </div>
  )
}

export default CountDown
