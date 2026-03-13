import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'
import './i18n.ts'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log('Service Worker registrado:', reg)
      })
      .catch(err => {
        console.error('Erro ao registrar SW:', err)
      })
  })
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
