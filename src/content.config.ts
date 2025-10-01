import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { format } from "date-fns";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/data/blog/posts",
  }),
  schema: () =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        cover: z.string().default("Astronaut-Headshot-Closeup.jpeg"),
        coverAlt: z.string(),
        date: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        createdAt: z.coerce.number(),
        draft: z.boolean(),
        tags: z.array(z.string()).nullable(),
        url: z.string().optional(),
      })
      .transform((entry) => ({
        ...entry,
        formattedDate: format(entry.date, "MMMM dd, yyyy"),
      })),
});

export const collections = {
  blog,
};
