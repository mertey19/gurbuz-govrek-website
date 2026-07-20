import NextImage, { type ImageProps } from "next/image";

export function SiteImage(props: ImageProps) {
  return <NextImage {...props} unoptimized />;
}
