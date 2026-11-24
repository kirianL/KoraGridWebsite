import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["motion", "@number-flow/react"],
          "vendor-lenis": ["lenis"],
          "vendor-geo": ["d3-geo", "topojson-client", "world-atlas/countries-50m.json"],
        },
      },
    },
  },
});
