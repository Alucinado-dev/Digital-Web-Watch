
import CountDown from "./components/CountDown/CountDown"
import { Heading } from "./components/heading/Heading"
import Logo from "./components/logo/Logo"
import Navbar from "./components/Navbar/Navbar"





function App() {

  return (
    <>
        <header>
          <Navbar/>
        </header>

        <section className="w-full flex items-center justify-center gap-8 mx-auto py-3.5">
        <Logo/>
        <Heading> Digital Web Watch </Heading>
        </section>

        <section className="w-full">
        <CountDown/>

        </section>

    </>
  )
}

export default App
