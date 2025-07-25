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
  // ADICIONE ESTA SEÇÃO PARA PERMITIR O ACESSO VIA GITPOD
  server: {
    hmr: {
      host: '5173-gatodomatos-erpprodutor-ms2v6vvl4lp.ws-us120.gitpod.io',
      protocol: 'wss'
    },
    host: '0.0.0.0',
    port: 5173,
  }
})

// teste