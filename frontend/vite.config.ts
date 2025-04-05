import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: "0.0.0.0",
    allowedHosts: ["frontend-z3vp.onrender.com"],
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    host: "0.0.0.0",
  },
});
