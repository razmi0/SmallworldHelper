/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["src/test/vitest.setup.ts"],
    includeSource: ["src/**/*.{js,ts,tsx}"],
    environment: "jsdom",
  },
});
