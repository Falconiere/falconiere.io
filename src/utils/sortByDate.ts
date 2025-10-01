import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export const sortByDate = (a: Post, b: Post) => {
  const dateA =
    a.data.date instanceof Date
      ? a.data.date.getTime()
      : new Date(a.data.date).getTime();
  const dateB =
    b.data.date instanceof Date
      ? b.data.date.getTime()
      : new Date(b.data.date).getTime();
  return dateB - dateA;
};
