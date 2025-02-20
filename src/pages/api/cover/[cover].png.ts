
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import fs from "node:fs/promises";
export const GET: APIRoute = async ({ params }) => {
  const cover = params.cover;
  console.info("params", cover);
  if (!cover) {
    return new Response("Cover not found", { status: 404 });
  }
  const path = `./src/data/assets/images/${cover}`;
  const imageBuffer = await fs.readFile(path);
  const jpegImage = await sharp(imageBuffer).jpeg().toBuffer();
  return new Response(jpegImage, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};

export const getStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.filter((post) => !post.data?.cover?.includes("https")).map((post) => ({
    params: { cover: post.data?.cover },
  }));
}
