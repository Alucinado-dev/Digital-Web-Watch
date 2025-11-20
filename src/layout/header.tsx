import Container from '../components/Container/Container'
import Navbar from '../components/Navbar/Navbar'

const Header = () => {
  return (
    <header className='w-full flex items-center justify-center p-2.5 bg-[var(--Header-bg-color)]'>
      <Container isFluid={false}>
        <Navbar />
      </Container>
    </header>
  )
}

export default Header

//
