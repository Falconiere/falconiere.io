import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: "./src/data/blog/posts" }),
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    cover: z.string().default("Astronaut-Headshot-Closeup.jpg"),
    coverAlt: z.string(),
    publishedAt: z.coerce.date().transform((date) => date.toISOString()),
    draft: z.boolean(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog
};