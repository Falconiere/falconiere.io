import fs from 'node:fs/promises';
import type { CollectionEntry } from 'astro:content';
import { defaultMetaDescription } from '@/data/site/defaultMetaDescription';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';

type Params = {
  post?: CollectionEntry<'blog'> | null;
};

export const getLocalImageToBase64 = async (pathImage: string) => {
  const imageBuffer = await fs.readFile(pathImage);
  const pngImage = sharp(imageBuffer);
  const resizedImage = await pngImage.metadata().then(metadata => {
    // width and height
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    return pngImage
      .resize({
        width: Math.min(1200, width < 1200 ? width : 1200),
        height: Math.min(630, height < 630 ? height : 630),
      })
      .jpeg({
        quality: 80,
      })
      .toBuffer();
  });

  const finalImage = Buffer.from(resizedImage).toString('base64');
  return `data:image/jpeg;base64,${finalImage}`;
};

export const generateOGImage = async ({ post }: Params = {}) => {
  const interExtraBold = await fs.readFile(
    './public/fonts/Inter/static/Inter_28pt-ExtraBold.ttf'
  );

  const interRegular = await fs.readFile(
    './public/fonts/Inter/static/Inter_28pt-Regular.ttf'
  );

  const isPost = post !== undefined;

  const title = post?.data?.title || 'Falconiere R. Barbosa';
  const description = post?.data?.description || defaultMetaDescription.summary;

  const pathImage = post?.data?.cover
    ? `./src/data/assets/images/${post?.data?.cover}`
    : './src/data/assets/images/Astronaut-Headshot-Closeup.jpeg';

  const image = await getLocalImageToBase64(pathImage);
  const logo = await getLocalImageToBase64('./src/data/assets/images/logo.png');
  const avatar = await getLocalImageToBase64('./src/assets/avatar.jpg');

  const template = html` <div
    style="
    display: flex; 
    height: 630px; 
    width: 1200px; 
    color: white;
    font-family: InterRegular;
    ${isPost &&
    `
        background-image: url(${image});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        overflow: hidden;
      `}
    ${!isPost && 'background-color: #000;'}
  "
  >
    <div
      style="display: flex; padding: 40px; width: 1210px; height: 630px; box-sizing: border-box;
      justify-content: center;
      align-items: center;
      gap: 30px;
      background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%,  rgba(0, 0, 0, 0.7) 100%,  rgba(0, 0, 0, 0.5) 100%);
    "
    >
      <img
        src="${avatar}"
        style="width: 400px; height: 400px; border-radius: 50%;
        object-fit: cover;
        overflow: hidden;
        ${isPost && 'display: none;'}
        "
      />
      <div
        style="display: flex; flex-direction: column; justify-content: center; flex: 1; margin: auto 0;"
      >
        <h1
          style="
          font-size: 48px;
          margin: 0px; font-family: InterExtraBold; text-transform: uppercase;"
        >
          ${title}
        </h1>
        <p style="font-size: 24px; margin: 0px font-family: InterRegular;">
          ${description}
        </p>
      </div>
    </div>
    <img
      src="${logo}"
      style="position: absolute; bottom: 20px; right: 20px; width: 100px; height: 100px; border-radius: 50%;"
    />
  </div>`;

  const svg = await satori(template as unknown as string, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'InterExtraBold',
        data: interExtraBold,
      },
      {
        name: 'InterRegular',
        data: interRegular,
      },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
};
