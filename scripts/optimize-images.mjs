import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageDirectory = path.resolve("public/images");
const imageNames = (await readdir(imageDirectory)).filter((name) => name.endsWith(".png"));

for (const name of imageNames) {
  const filePath = path.join(imageDirectory, name);
  const optimized = await sharp(filePath)
    .resize({ width: 1280, withoutEnlargement: true })
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      quality: 90,
      colours: 256,
      dither: 0.9,
    })
    .toBuffer();
  await writeFile(filePath, optimized);
}

const socialCardPath = path.resolve("public/og.png");
const socialCard = await sharp(socialCardPath)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .png({
    compressionLevel: 9,
    adaptiveFiltering: true,
    palette: true,
    quality: 92,
    colours: 256,
    dither: 0.9,
  })
  .toBuffer();
await writeFile(socialCardPath, socialCard);
