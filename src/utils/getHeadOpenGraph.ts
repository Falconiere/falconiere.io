import { getEntry } from "astro:content";

export const getHeadOpenGraph = async (id?: string) => {
  const post = id ? await getEntry("blog", id) : undefined;
  const title = post?.data?.title ?? "Falconiere Barbosa";
  const description = post?.data?.description ?? "Falconiere Barbosa - Blog";
  const image = id ? `/api/${id}.png` : "/api/og-image.png";
  const author = post?.data?.author ?? "Falconiere Barbosa - Blog";
  const date = post?.data?.publishedAt ?? new Date().toISOString();
  const tags = post?.data?.tags?.join(", ") ?? "";
  const url = id ? `https://falconiere.io/blog/${id}` : "https://falconiere.io";
  const site_name = "Falconiere Barbosa";
  const type = post ? "article" : "website";
  const coverAlt = post?.data?.coverAlt ?? "Falconiere Barbosa - Blog";
  return {
    title,
    description,
    image,
    author,
    date,
    tags,
    url,
    site_name,
    type,
    coverAlt
  };
};