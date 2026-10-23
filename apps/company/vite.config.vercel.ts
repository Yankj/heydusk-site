import vinext from "vinext";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/postcss";
import { defineConfig } from "vite";

// Vercel needs Vinext's Nitro adapter. The main vite.config.ts remains the
// Cloudflare/Sites build used by ChatGPT Sites previews.
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  plugins: [vinext(), nitro()],
});
