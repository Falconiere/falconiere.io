
import { OpenGraphImage } from "@/components/OpenGraphImage";
import { defaultMetaDescription } from "@/data/site/defaultMetaDescription";
import { generateOGImage } from "@/utils/generateOGImage";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const GET: APIRoute = async ({ params }) => {
  const post_id = params.post_id;
  const post = post_id ? await getEntry("blog", post_id) : null
  const png = await generateOGImage({ post });
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const getStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { post_id: post.id },
  }));
}
