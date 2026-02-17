import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        watchlist: resolve(__dirname, "src/watchlist/index.html"),
        movie: resolve(__dirname, "src/movie-details/index.html"),
      },
    },
  },
});