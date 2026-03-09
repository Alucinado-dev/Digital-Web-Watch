
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { useTranslation } from 'react-i18next'


const Layout = () => {

  const { t } = useTranslation()


  return (
    <div className='flex flex-col overflow-x-hidden '>
      <Header />

      <main>
        <Outlet/>
      </main>

      <Footer  text={t('footerText')}/>
    </div>
  )
}

export default Layout
