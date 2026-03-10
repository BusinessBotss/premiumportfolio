import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid workspace root inference issues when multiple lockfiles exist.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.aceternity.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lodgedestinations.com" },
      { protocol: "https", hostname: "businessbotss.github.io" },
    ],
  },
};

export default nextConfig;
