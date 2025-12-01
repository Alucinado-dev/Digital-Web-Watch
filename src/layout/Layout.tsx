import { Paperclip } from 'lucide-react'
import CountDown from '../components/CountDown'
import Cycles from '../components/Cycles'
import Input from '../components/input'
import Logo from '../components/Logo'
import PlayBtn from '../components/PlayBtn'
import SubmitBtn from '../components/SubmitBtn'
import Footer from './Footer'
import Header from './header'

const Layout = () => {
  return (
    <div className='flex flex-col overflow-x-hidden '>
      <Header />

      <main>
        <section className='flex  small-tablet:hidden w-full items-center justify-center  mx-auto py-7'>
          <Logo size={64} />
        </section>

        <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
          <CountDown />
        </section>

        <section className='w-full flex relative items-center justify-center   mx-auto py-6'>
          <Input label='nome da tarefa' />
        </section>

        <section>
          <Cycles />
        </section>

        <section className='w-full flex relative items-center justify-center  mx-auto py-6'>
          <SubmitBtn Icon={Paperclip} isDisabled={false} text='Enviar' />
        </section>

        <section className='w-full gap-6 flex relative items-center justify-center  mx-auto py-6'>
          <PlayBtn isPaused={true} />
          <PlayBtn isPaused={false} />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
