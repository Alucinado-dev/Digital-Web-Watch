import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'

import { VitePWA } from 'vite-plugin-pwa'
import robotsTxt from 'vite-plugin-robots-txt'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://seudominio.com',
      dynamicRoutes: ['/', '/stopwatch', '/timer'],
    }),
    robotsTxt({
      policies: [
        {
          userAgent: '*',
          allow: ['/'],
        },
      ],
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Digital Web Watch | Pomodoro online | Timer online | Cronometro online',
        short_name: 'Digital Web Watch',
        description:
          'Técnica Pomodoro no navegador. Configure ciclos de foco, pausas curtas e longas. Sem instalação. Grátis para usar, fácil de acessar. Cronômetro digital com voltas (lap), precisão de centésimos. Funciona direto no navegador, sem instalação. Ideal para esportes, estudos, ou qualquer atividade que precise de medição de tempo. Sem custos, sem anúncios. Defina um tempo e receba um alerta quando acabar. Timer gratuito, sem instalação.',
        start_url: '/',
        display: 'standalone',
        background_color: '#212529',
        theme_color: '#f72585',
        lang: 'pt-BR',
        orientation: 'portrait',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],

      },
      
    }),
  ],

  server: {
    port: 3000,
    open: true,
  },
})
