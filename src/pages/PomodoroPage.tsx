import { useEffect } from "react"
import Logo from "../components/Logo"
import CountDownContainer from "../components/ui/CountDownContainer"
import Cycles from "../components/Cycles"
import PlayBtn from "../components/PlayBtn"
import { useToggle } from "@uidotdev/usehooks"


const PomodoroPage = () => {

    useEffect(()=>{
        document.title = 'Digital Web Watch | Pomodoro'
    },[])

      const [isPaused, toggleIsPaused] = useToggle(true)
    return (
      <>
        <section className='flex  small-tablet:hidden w-full items-center justify-center  mx-auto py-7'>
          <Logo size={64} />
        </section>

        <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
          <CountDownContainer circleSize={280} circleSizeMobile={240} />
        </section>

        <section className='w-full flex relative items-center justify-center   mx-auto py-6'></section>

        <section>
          <Cycles />
        </section>

        <section className='w-full gap-6 flex relative items-center justify-center  mx-auto py-6'>
          <PlayBtn isPaused={isPaused} onClick={() => toggleIsPaused()} />
        </section>
      </>
    )
}

export default PomodoroPage