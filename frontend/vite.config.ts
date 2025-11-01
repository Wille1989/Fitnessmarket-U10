import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['offline.html', 'icons/icon-192x192.svg', 'icons/icon-512x512.svg'],
      manifest: {
        name: 'Fitness Market',
        short_name: 'FM',
        description: 'En enkel tränings- och kostplattform',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#111111',
        icons: [
          {
            src: '/icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
          },
        ],
      },
    }),
  ],
});
