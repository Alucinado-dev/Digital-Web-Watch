import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.tsx'
import './i18n.ts'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
