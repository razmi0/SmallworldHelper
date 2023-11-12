/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Icons": path.resolve(__dirname, "./src/components/icons"),
      "@Charts": path.resolve(__dirname, "./src/components/charts"),
      "@Components": path.resolve(__dirname, "./src/components"),
    },
  },
  test: {
    includeSource: ["src/**/*.{js,ts,tsx}"],
    environment: "jsdom",
  },
});
