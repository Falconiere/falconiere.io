import { defaultMetaDescription } from "@/data/site/defaultMetaDescription";
import { buildPostURL } from "@/utils/buildPostURL";
import { getEntry } from "astro:content";
import { format } from "date-fns";

export const getHeadOpenGraph = async (slug?: string) => {

  const post = slug ? await getEntry("blog", slug) : undefined;
  const title = post?.data?.title ?? defaultMetaDescription.title
  const isImageCoverHosted = typeof post?.data?.cover === "string" && post?.data?.cover.includes("https://")
  const description = post?.data?.description ?? defaultMetaDescription.description;
  const image = isImageCoverHosted ? post?.data?.cover : `https://falconiere.io${slug ? `/api/${slug}.png` : "/api/og-image.png"}`;
  const author = post?.data?.author ?? defaultMetaDescription.author;
  const date = format(new Date(post?.data?.date ?? new Date()), "yyyy-MM-dd");
  const tags = post?.data?.tags?.join(", ") ?? "";
  const url = post ? buildPostURL(post) : "https://falconiere.io";
  const site_name = "Falconiere Barbosa";
  const type = post ? "article" : "website";
  const coverAlt = post?.data?.coverAlt ?? "Falconiere Barbosa - Blog";
  const keywords = defaultMetaDescription.keywords;
  const section = slug ? "blog" : "home";

  return {
    title: slug ? `${title} - Insights by Falconiere R. Barbosa` : title,
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
    section
  };
};