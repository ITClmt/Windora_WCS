import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api/proxy": {
        target: "https://api.openweathermap.org",
        changeOrigin: true,
        rewrite: (path) => {
          const url = new URL(path, "http://localhost");
          const type = url.searchParams.get("type") || "";
          const params = Object.fromEntries(url.searchParams.entries());
          const { type: _, ...cleanParams } = params;

          cleanParams.appid = process.env.VITE_API_KEY || "";

          let baseUrl = "";
          switch (type) {
            case "geo":
              baseUrl = "/geo/1.0/direct";
              break;
            case "weather":
              baseUrl = "/data/2.5/weather";
              break;
            case "forecast":
              baseUrl = "/data/2.5/forecast";
              break;
          }

          return `${baseUrl}?${new URLSearchParams(cleanParams)}`;
        },
      },
    },
  },
});
