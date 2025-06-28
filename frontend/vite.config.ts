import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithms: ['gzip'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
    }),
    compression({
      algorithms: ['brotliCompress'],
      exclude: [/\.(br)$ /, /\.(gz)$/],
      threshold: 1024,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
      mangle: {
        toplevel: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          form: ['react-hook-form', '@hookform/resolvers', 'zod'],
          icons: ['@iconify/react'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-label'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-hook-form', '@hookform/resolvers', 'zod'],
    exclude: ['@iconify/react'],
  },
})
