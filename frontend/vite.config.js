// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Rewrite path if needed, often not for direct API mapping
      },
      // You can add more proxy rules if needed, e.g., for /uploads
      '/uploads': {
        target: 'http://localhost:5000', // Your backend server URL for uploads
        changeOrigin: true,
      },
    },
  },
})