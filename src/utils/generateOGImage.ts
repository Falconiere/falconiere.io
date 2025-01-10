
import { defaultMetaDescription } from "@/data/site/defaultMetaDescription";
import type { CollectionEntry } from "astro:content";
import fs from "fs/promises";
import path from 'path';
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";

type Params = {
  post?: CollectionEntry<"blog"> | null;
}

const getLocalImageToBase64 = async (image: string) => {
  const pathImage = `./src/data/blog/images/${image}`;
  const imageBuffer = await fs.readFile(pathImage);
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  let ext = path.extname(image).slice(1);
  if (ext === "jpg") {
    ext = "jpeg";
  }
  // transform the image to have the size of 1200x630
  const resizedImage = await sharp(imageBuffer).resize(1200, 630).toBuffer();

  // transform the image to base64
  const finalImage = Buffer.from(resizedImage).toString('base64');
  return `data:image/${ext};base64,${finalImage}`;
}

export const generateOGImage = async ({ post }: Params) => {
  const openSansBold = await fs.readFile(
    "./public/fonts/Open_Sans/static/OpenSans-Bold.ttf"
  );

  const openSansRegular = await fs.readFile(
    "./public/fonts/Open_Sans/static/OpenSans-Regular.ttf"
  );

  const title = post?.data?.title || defaultMetaDescription.title;
  const description = post?.data?.description || defaultMetaDescription.description;
  const image = post?.data?.cover ? await getLocalImageToBase64(post.data.cover) : 
  const template = html`
  <div style="
    display: flex; 
    height: 100%; 
    width: 100%; 
    background-image: url(${image}); 
    background-size: contain; 
    background-position: right; 
    background-repeat: no-repeat;
    background-color: #0d1117;
    color: white;
    font-family: OpenSansRegular;
  ">
    <div style="display: flex; padding: 20px; background-color: rgba(0, 0, 0, 0.9); width: 100%; height: 100%; box-sizing: border-box;">
      <div style="display: flex; flex-direction: column; justify-content: center;">
        <h1 style="font-size: 48px; margin: 0; font-family: OpenSansBold">
          ${title}
        </h1>
        <p style="font-size: 24px; margin-top: 20px; font-family: OpenSansRegular;">
          ${description}
        </p>
        </div>
    </div>
  </div>`
  const svg = await satori(
    template as unknown as string,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "OpenSansBold",
          data: openSansBold,
        },
        {
          name: "OpenSansRegular",
          data: openSansRegular,
        }
      ],
    }
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}