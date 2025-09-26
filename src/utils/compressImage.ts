import sharp from "sharp";
import fs from "node:fs/promises";
export const compressImage = async (image: string) => {
  const imageBuffer = await fs.readFile(image);
  const compressedImage = sharp(imageBuffer);
  return await compressedImage.metadata()
    .then((metadata) => {
      const width = metadata.width ?? 0;
      const height = metadata.height ?? 0;
      const croppedImage = compressedImage.resize({
        width: Math.min(1200, width < 1200 ? width : 1200),
        height: Math.min(630, height < 630 ? height : 630),
      });

      // if the image is larger than 1MB, compress it
      if (metadata?.size && metadata.size > 1024 * 1024 * 1) {
        return croppedImage.jpeg({
          quality: 80,
        }).toBuffer();
      }
      return croppedImage.toBuffer();
    });
};