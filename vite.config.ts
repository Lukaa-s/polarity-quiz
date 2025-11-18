import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ← important pour autoriser l'accès depuis l'extérieur
    allowedHosts: ['.ngrok-free.app'], // ← autorise tous les sous-domaines ngrok
  },
});
