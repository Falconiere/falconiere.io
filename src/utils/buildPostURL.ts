import type { CollectionEntry } from "astro:content";
import { format } from "date-fns";

export const buildPostURL = (post: CollectionEntry<"blog">) => {
  const id = post.id;
  const date = format(new Date(post.data.date), 'yyyy-MM');
  const postUrl = `https://falconiere.io/blog/posts/${date}/${id}`;
  return postUrl
}