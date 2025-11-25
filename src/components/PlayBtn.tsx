import { Pause, Play } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

type PlayBtnProps = {
  isPaused: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const PlayBtn = ({ isPaused = true, ...rest }: PlayBtnProps) => {
  const variants = isPaused ? 'btn btn-success' : 'btn btn-error'

  return (
    <button className={variants} {...rest} aria-label={isPaused ? 'Play' : 'Pause'}>
      {isPaused ? <Play /> : <Pause />}
    </button>
  )
}

export default PlayBtn
