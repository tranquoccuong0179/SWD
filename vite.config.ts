import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "node:path";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    open: '/home'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
