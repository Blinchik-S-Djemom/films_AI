import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/kinopoisk": {
        target: "https://api.kinopoisk.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kinopoisk/, ""),
        headers: {
          "X-API-KEY": "G4NNKVT-JHN400C-QXT5A8H-S1HM0KN",
        },
      },
    },
  },
});
