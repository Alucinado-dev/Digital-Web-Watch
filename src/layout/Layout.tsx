import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { SettingsBtn, SettingsModal } from '../features/SettingsModal'
import VolumeControl from '../features/VolumeControl'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col relative overflow-x-hidden widescreen:max-w-480 widescreen:mx-auto min-h-screen'>
      <Header />

      <main className='flex-1 flex flex-col items-center justify-center widescreen:max-w-480 widescreen:mx-auto'>
        <Outlet />
        <div className='fixed bottom-5 right-5'>
          <SettingsBtn />
        </div>
        <div className='fixed bottom-5 left-5'>
          <VolumeControl initialVolume={0.7} />
        </div>
        <SettingsModal />
      </main>

      <Footer text={t('footerText')} />
    </div>
  )
}

export default Layout
