
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Permite que o Vite seja acessado de fora do container
    port: 5173,
    hmr: {
      // Garante que o Hot Module Replacement funcione corretamente no Gitpod
      clientPort: 443,
    },
  }
})