import CountDown from './components/CountDown/CountDown'
import { Heading } from './components/heading/Heading'
import Logo from './components/logo/Logo'
import Header from './layout/header'

function App() {
  return (
    <>
      <Header />

      <section className='w-full flex items-center justify-center gap-8 mx-auto py-3.5'>
        <a className='flex items-center justify-center gap-10 ' href=''>
          <Logo size={75} className='shrink' />
          <Heading className='shrink-0'> Digital Web Watch </Heading>
        </a>
      </section>

      <section className='w-full flex  overflow-hidden  items-center justify-center  mx-auto py-14'>
        <CountDown />
      </section>
    </>
  )
}

export default App
