import { generateOGImage } from "@/utils/generateOGImage";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  const post = slug ? await getEntry("blog", slug) : null
  const png = await generateOGImage({ post });
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const getStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.filter((post) => post.data?.cover && typeof post.data?.cover === "string" && !post.data?.cover.includes("https://")).map((post) => ({
    params: { slug: post.id },
  }));
}
