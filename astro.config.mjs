// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';


// https://astro.build/config
export default defineConfig({
  site: 'https://falconiere.io',
  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
    ]

  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    mdx({
      optimize: true,
    }),
    sitemap(),
    react()
  ],
});