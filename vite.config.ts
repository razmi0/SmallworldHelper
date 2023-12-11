/// <reference types="vite/client" />
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
      "@Components": path.resolve(__dirname, "./src/components"),
      "@Containers": path.resolve(__dirname, "./src/components/containers/Containers.tsx"),
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Context": path.resolve(__dirname, "./src/hooks/context"),
      "@Types": path.resolve(__dirname, "./src/types/types.ts"),
      "@Utils": path.resolve(__dirname, "./src/utils"),
      "@Css": path.resolve(__dirname, "./src/css/index.css"),
      "@CssModules": path.resolve(__dirname, "./src/components/styles/index.ts"),
      "@Icons": path.resolve(__dirname, "./icons"),
    },
  },
  test: {
    setupFiles: ["src/test/vitest.setup.ts"],
    includeSource: ["src/**/*.{js,ts,tsx}"],
    environment: "jsdom",
  },
});
