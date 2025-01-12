import { defaultMetaDescription } from "@/data/site/defaultMetaDescription";
import { getEntry } from "astro:content";
import { format } from "date-fns";

export const getHeadOpenGraph = async (id?: string) => {
  const post = id ? await getEntry("blog", id) : undefined;
  const title = post?.data?.title ?? defaultMetaDescription.title
  const description = post?.data?.description ?? defaultMetaDescription.description;
  const image = `https://falconiere.io/${id ? `/api/${id}.png` : "/api/og-image.png"}`;
  const author = post?.data?.author ?? defaultMetaDescription.author;
  const date = format(new Date(post?.data?.date ?? new Date()), "yyyy-MM-dd");
  const tags = post?.data?.tags?.join(", ") ?? "";
  const url = id ? `https://falconiere.io/blog/${id}/${post?.data.createdAt}` : "https://falconiere.io";
  const site_name = "Falconiere Barbosa";
  const type = post ? "article" : "website";
  const coverAlt = post?.data?.coverAlt ?? "Falconiere Barbosa - Blog";
  const keywords = defaultMetaDescription.keywords;
  return {
    title: id ? `${title} - Insights by Falconiere R. Barbosa` : title,
    description,
    image,
    author,
    date,
    tags,
    url,
    site_name,
    type,
    coverAlt,
    keywords,
  };
};