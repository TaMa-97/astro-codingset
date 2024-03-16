import prefetch from "@astrojs/prefetch";
import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  site: "https://hogehoge.co.jp/",
  base: "/",
  output: "static",
  outDir: "./htdocs/",
  compressHTML: false,
  prefetch: true,
  server: {
    host: true,
    hmr: { clientPort: 3001 },
    port: 3001,
    watch: { usePolling: true },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/global" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
  integrations: [astroImageTools, prefetch()],
});
