import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // <-- 1. Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    // --- 2. ADD THE PWA PLUGIN ---
    VitePWA({
      registerType: 'autoUpdate', // Auto-update the service worker
      
      // 3. Add the "manifest" details
      manifest: {
        name: 'CheckAm: The Counterfeit Hunter',
        short_name: 'CheckAm',
        description: 'AI-powered counterfeit detection and reporting.',
        theme_color: '#3498db', // Your main brand color
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // You'll need to add this icon
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // And this one
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
}) 