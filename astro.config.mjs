import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
// https://astro.build/config
export default defineConfig({
  site: "https://falconiere.io",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds],
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      optimize: true,
    }),
    sitemap(),
    react(),
  ],
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
});
