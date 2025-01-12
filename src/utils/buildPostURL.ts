import type { CollectionEntry } from "astro:content";

const baseDomain = import.meta.env.MODE === "development" ? "http://localhost:4321" : "https://falconiere.io";
export const buildPostURL = (post: CollectionEntry<"blog">) => {
  const postUrl = `${baseDomain}/blog/posts/${post.id}`;
  return postUrl
}