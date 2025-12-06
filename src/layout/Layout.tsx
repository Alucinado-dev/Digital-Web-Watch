
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'


const Layout = () => {


  return (
    <div className='flex flex-col overflow-x-hidden '>
      <Header />

      <main>
        <Outlet/>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
