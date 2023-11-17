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
      "@Hooks": path.resolve(__dirname, "./src/hooks"),
      "@Types": path.resolve(__dirname, "./src/types"),
      "@Utils": path.resolve(__dirname, "./src/utils"),
      "@Styles": path.resolve(__dirname, "./src/css/index.css"),
    },
  },
  test: {
    setupFiles: ["src/test/vitest.setup.ts"],
    includeSource: ["src/**/*.{js,ts,tsx}"],
    environment: "jsdom",
  },
});

// "paths": {
//  "@Styles": ["src/styles/index.css"]

//   "@/*": ["src/*"],
//   "@Components/*": ["src/components/index.ts"]
// },
