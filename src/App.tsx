import Container from "./components/Container/Container"
import { Heading } from "./components/heading/Heading"
import Logo from "./components/logo/Logo"




function App() {

  return (
    <>
      <Container isFluid= {false} >
        <Heading > Digital Web Watch </Heading>
      </Container>

      <Container isFluid = {true} > 
        <Logo/>
      </Container>
    </>
  )
}

export default App
