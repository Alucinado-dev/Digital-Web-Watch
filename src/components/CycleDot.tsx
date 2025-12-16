import type { CycleVariant } from "../stores/pomodoroStore"





type CycleDotProp = {
  variant: CycleVariant
}


const CycleDot = ({variant}: CycleDotProp) => {
  const variants = {
    workTime: 'var(--pomodoro-cycleDot-workTime)',
    shortBreak: 'var(--pomodoro-cycleDot-shortBreak)',
    longBreak: 'var(--pomodoro-cycleDot-longBreak)',
  }

  return <span className="w-6 h-6 rounded-full" style={{ backgroundColor: variants[variant]
  }}></span>
}

export default CycleDot

