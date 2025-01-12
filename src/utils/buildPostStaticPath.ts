import type { CollectionEntry } from "astro:content";
import { format } from "date-fns";

export const buildPostStaticPath = (post: CollectionEntry<"blog">) => {
  const id = post.id;
  const date = format(new Date(post.data.date), 'yyyy-MM');
  const staticPath = `/${date}/${id}`;
  return staticPath
}