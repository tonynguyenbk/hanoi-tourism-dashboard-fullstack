import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Tách các thư viện lớn thành chunk riêng để tải nhanh hơn
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':   ['react', 'react-dom', 'react-router-dom'],
          'vendor-charts':  ['recharts'],
          'vendor-leaflet': ['leaflet', 'react-leaflet'],
          'vendor-pdf':     ['jspdf', 'jspdf-autotable'],
        },
      },
    },
  },
})
