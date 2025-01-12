import { buildPostURL } from "@/utils/buildPostURL";
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog"> & {
  data: CollectionEntry<"blog">["data"] & {
    url: string;
  }
}

export const mapBlogCollection = (post: CollectionEntry<"blog">): Post => {
  const data = { ...post.data, url: buildPostURL(post) };
  return {
    ...post,
    data,
  }
}