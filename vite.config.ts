import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'


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
  ],

  server: {
    port: 3000,
    open: true,
  },
})
