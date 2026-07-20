import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kaynak görseller build öncesinde optimize edildiği için edge image
  // dönüştürme servisine ihtiyaç duyulmaz; Next Image yine boyut, lazy-load
  // ve responsive `sizes` davranışlarını sağlar.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
