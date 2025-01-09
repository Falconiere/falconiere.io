import { getEntry } from "astro:content";
import fs from "fs/promises";
import satori from "satori";
import sharp from "sharp";

type Params = {
  post_id?: string;
}

export const generateOGImage = async (data?: Params) => {
  const openSans = await fs.readFile(
    "./public/fonts/Open_Sans/static/OpenSans-ExtraBold.ttf"
  );

  const post_id = data?.post_id;
  let post;
  post = post_id ? await getEntry("blog", post_id) : null

  const svg = await satori(
    {
      type: "div",
      props: {
        children: post?.data?.title ?? "Falconiere Barbosa - Blog",
        style: {
          fontWeight: "bold",
          fontSize: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          padding: "20px",
          textAlign: "center",
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "OpenSans",
          data: openSans,
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}