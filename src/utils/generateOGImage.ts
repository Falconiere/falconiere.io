
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

const buildRandomLinearGradientCssTwoColors = () => {
  const colors = [
    "#FF0000",
    "#FF7F00",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#4B0082",
    "#8B00FF",
  ];
  const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
  return `linear-gradient(135deg, ${randomColor1}, ${randomColor2})`;
}

const getLocalImageToBase64 = async (image: string) => {
  const pathImage = `./src/data/blog/assets/images/${image}`;
  const imageBuffer = await fs.readFile(pathImage);
  let ext = path.extname(image).slice(1);
  if (ext === "jpg") {
    ext = "jpeg";
  }
  // transform the image to size 250x250
  const resizedImage = await sharp(imageBuffer).resize(250, 250).toBuffer();

  // transform the image to base64
  const finalImage = Buffer.from(resizedImage).toString('base64');
  return `data:image/${ext};base64,${finalImage}`;
}

export const generateOGImage = async ({ post }: Params = {}) => {
  const openSansBold = await fs.readFile(
    "./public/fonts/Open_Sans/static/OpenSans-Bold.ttf"
  );

  const openSansRegular = await fs.readFile(
    "./public/fonts/Open_Sans/static/OpenSans-Regular.ttf"
  );

  const title = post?.data?.title || defaultMetaDescription.title;
  const description = post?.data?.description || defaultMetaDescription.description;
  const image = await getLocalImageToBase64(post?.data?.cover ?? defaultMetaDescription.image);
  const template = html`
  <div style="
    display: flex; 
    height: 100%; 
    width: 100%; 
    background-image: ${buildRandomLinearGradientCssTwoColors()};
    color: white;
    font-family: OpenSansRegular;
    position: relative;
  ">
    <div style="display: flex; padding: 40px; width: 100%; height: 100%; box-sizing: border-box;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.7);
      gap: 20px;
    ">
      <img src="${image}" style="width: 250px; height: 250px; border-radius: 50%;" />
      <div style="display: flex; flex-direction: column; justify-content: center; flex: 1; margin: auto 0;">
        <h1 style="font-size: 46px; margin: 0; font-family: OpenSansBold">
          ${title}
        </h1>
        <p style="font-size: 24px; line-height: 1.3; margin: 0; font-family: OpenSansRegular; white-space: pre-wrap;">
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