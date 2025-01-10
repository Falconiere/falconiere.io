import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: "./src/data/blog/posts" }),
  schema: () => z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    cover: z.string().default("Astronaut-Headshot-Closeup.jpeg"),
    coverAlt: z.string(),
    date: z.coerce.date(),
    draft: z.boolean(),
    tags: z.array(z.string()).nullable(),
  }),
});

export const collections = {
  blog
};