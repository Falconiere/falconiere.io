import { getLocalImageToBase64 } from "@/utils/generateOGImage";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import sharp from "sharp";
import fs from "fs/promises";
export const GET: APIRoute = async ({ params }) => {
  const cover = params.cover;
  console.info("params", cover);
  if (!cover) {
    return new Response("Cover not found", { status: 404 });
  }
  const path = `./src/data/assets/images/${cover}`;
  const imageBuffer = await fs.readFile(path);
  const pngImage = await sharp(imageBuffer).png().toBuffer();
  return new Response(pngImage, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};

export const getStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.filter((post) => !post.data?.cover?.includes("https")).map((post) => ({
    params: { cover: post.data?.cover },
  }));
}
