type ClockProps = {
  time: number // time in milliseconds
}

const Clock = ({ time }: ClockProps) => {
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const paddedSeconds = seconds.toString().padStart(2, '0')
    const paddedMinutes = minutes.toString().padStart(2, '0')
    const paddedHours = hours.toString().padStart(2, '0')

    if (hours > 0) {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    }

    return `${paddedMinutes}:${paddedSeconds}`
  }

  return (
    <span className='text-center text-5xl font-bold text-(--countdown-color) [font-family:var(--countdown-font)] text-shadow-(--countdown-shadow)'>
      {formatTime(time)}
    </span>
  )
}

export default Clock
