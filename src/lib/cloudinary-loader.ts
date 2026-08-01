/**
 * Global `next/image` loader.
 *
 * Registered via `images.loaderFile` in next.config.ts, so every `<Image>` in
 * the app is served through Cloudinary with automatic format and quality at
 * the exact width the layout requested. Non-Cloudinary URLs pass through.
 */

import { cld } from "@/lib/cloudinary";

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({ src, width, quality }: LoaderArgs): string {
  return cld(src, { width, quality: quality ?? "auto", format: "auto" });
}
