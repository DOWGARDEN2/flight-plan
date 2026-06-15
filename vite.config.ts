import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Repo is served from https://<user>.github.io/flight-plan/ on GitHub Pages.
// If you rename the repo, change BASE to '/<new-name>/'.
const BASE = '/flight-plan/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Flight Plan',
        short_name: 'Flight Plan',
        description: "James's daily plan for the August SAT and college applications.",
        theme_color: '#0b1120',
        background_color: '#0b1120',
        display: 'standalone',
        orientation: 'portrait',
        scope: BASE,
        start_url: BASE,
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: BASE + 'index.html'
      }
    })
  ]
})
