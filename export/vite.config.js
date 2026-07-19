import { defineConfig } from "vite";

export default defineConfig({
  // Relative base so the built site works from any path,
  // including a GitHub Pages project subpath (user.github.io/repo/).
  base: "./",
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
