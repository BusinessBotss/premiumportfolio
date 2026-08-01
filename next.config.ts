import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid workspace root inference issues when multiple lockfiles exist.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Cloudinary handles resizing, format and quality; Next only decides widths.
    loaderFile: "./src/lib/cloudinary-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
