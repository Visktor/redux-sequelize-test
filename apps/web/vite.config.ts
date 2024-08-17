import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
      "#/assets": path.resolve(__dirname, "./src/assets"),
      "#/components": path.resolve(__dirname, "./src/components"),
      "#/context": path.resolve(__dirname, "./src/context"),
      "#/lib": path.resolve(__dirname, "./src/lib"),
      "#/pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
