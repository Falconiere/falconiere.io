
import { generateOGImage } from "@/utils/generateOGImage";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  console.log(params)
  const png = await generateOGImage()

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
