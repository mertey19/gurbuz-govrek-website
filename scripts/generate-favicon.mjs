import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = Buffer.from(`
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="92" fill="#071A33"/>
    <rect x="22" y="22" width="468" height="468" rx="72" fill="none" stroke="#D6A84B" stroke-width="28"/>
    <text x="256" y="320" text-anchor="middle" fill="#F1D587" font-family="Arial, Helvetica, sans-serif" font-size="210" font-weight="700" letter-spacing="-18">GG</text>
  </svg>
`);

async function renderPng(size) {
  return sharp(source)
    .resize(size, size)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

function wrapPngAsIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size, 6);
  header.writeUInt8(size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(header.length, 18);
  return Buffer.concat([header, png]);
}

const publicDirectory = path.resolve("public");
const [favicon, appleTouchIcon] = await Promise.all([renderPng(96), renderPng(180)]);

await Promise.all([
  writeFile(path.join(publicDirectory, "favicon-96x96.png"), favicon),
  writeFile(path.join(publicDirectory, "favicon.ico"), wrapPngAsIco(favicon, 96)),
  writeFile(path.join(publicDirectory, "apple-touch-icon.png"), appleTouchIcon),
]);
