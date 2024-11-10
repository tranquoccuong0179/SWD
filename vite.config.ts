import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "node:path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    open: '/home',
    proxy: {
      '/api': {
        target: 'https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/',
        changeOrigin: true,
        secure: true
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
