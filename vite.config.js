import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png', 'favicon.ico'],
      manifest: {
        name: 'Kids Ministry App',
        short_name: 'KidsMin', // Nombre que aparece bajo el icono en el celular
        description: 'Gestión de roles y maestros para el ministerio de niños',
        theme_color: '#4f46e5', // El color índigo que identifica a AM.DEV
        background_color: '#ffffff',
        display: 'standalone', // Hace que se vea como app nativa sin barra de navegador
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Clave para que el icono se vea bien en Android
          }
        ]
      }
    })
  ]
})