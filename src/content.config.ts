import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string(),
    coverAlt: z.string(),
    layout: z.string(),
    publishedAt: z.coerce.date(),
  }),
});

export const collections = { blog };