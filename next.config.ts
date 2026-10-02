import type { NextConfig } from "next";

/*
  Görsel ayarı burada tutulmuyor. Kenarda görsel dönüştürme servisi
  kullanılmadığı için dar sürümler derleme öncesinde `npm run images:optimize`
  ile üretiliyor; hangi dosyanın indirileceğine `components/ui/SiteImage.tsx`
  karar veriyor.
*/
const nextConfig: NextConfig = {};

export default nextConfig;
