import fs from "node:fs/promises";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import sharp from "sharp";
export const GET: APIRoute = async ({ params }) => {
  const filename = params.filename;
  if (!filename) {
    return new Response("Cover not found", { status: 404 });
  }
  const path = `./src/data/assets/images/${filename}`;
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
  return posts.map((post) => ({
    params: { filename: post.data?.cover },
    props: {
      post: post.data,
    },
  }));
};
