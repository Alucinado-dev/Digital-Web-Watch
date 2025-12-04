import { useToggle } from '@uidotdev/usehooks'
import CountDown from '../components/ui/CountDownContainer'
import Cycles from '../components/Cycles'
import Footer from './Footer'
import Header from './Header'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'

const Layout = () => {
  const [isPaused, toggleIsPaused] = useToggle(true)

  return (
    <div className='flex flex-col overflow-x-hidden '>
      <Header />

      <main>
        <section className='flex  small-tablet:hidden w-full items-center justify-center  mx-auto py-7'>
          <Logo size={64} />
        </section>

        <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
          <CountDown circleSize={280} circleSizeMobile={240} />
        </section>

        <section className='w-full flex relative items-center justify-center   mx-auto py-6'></section>

        <section>
          <Cycles />
        </section>

        <section className='w-full gap-6 flex relative items-center justify-center  mx-auto py-6'>
          <PlayBtn isPaused={isPaused} onClick={() => toggleIsPaused()} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
