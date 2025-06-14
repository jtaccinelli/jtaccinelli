// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    alpinejs({
      entrypoint: "/src/alpine.config.ts",
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
