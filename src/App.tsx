import CountDown from './components/CountDown/CountDown'
import Logo from './components/Logo'

import Header from './layout/header'

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
    </>
  )
}

export default App
