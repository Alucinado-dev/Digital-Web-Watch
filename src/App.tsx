import { PlaySquareIcon } from 'lucide-react'
import CountDown from './components/CountDown'

import Input from './components/input'
import Logo from './components/Logo'
import SubmitBtn from './components/SubmitBtn'

import Header from './layout/header'
import Cycles from './components/Cycles'

function App() {
  return (
    <>
      <Header />
      <section className='flex  small-tablet:hidden w-full items-center justify-center  mx-auto py-7'>
        <Logo size={64} />
      </section>

      <section className='w-full flex relative items-center justify-center  mx-auto py-14'>
        <CountDown />
      </section>

      <section className='w-full flex relative items-center justify-center  mx-auto py-6'>
        <Input label='nome da tarefa' />
      </section>

      <section>
        <Cycles />
      </section>

      <section className='w-full flex relative items-center justify-center  mx-auto py-6'>
        <SubmitBtn Icon={PlaySquareIcon} isDisabled={false} text='Enviar' />
      </section>
    </>
  )
}

export default App
