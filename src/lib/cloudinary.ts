/**
 * Cloudinary delivery helpers.
 *
 * Every image in the portfolio is served through Cloudinary, so transformation
 * logic lives in one place rather than being hand-written into each `src`.
 * Non-Cloudinary URLs pass through untouched, which keeps the helpers safe to
 * call unconditionally.
 */

const UPLOAD_MARKER = "/image/upload/";

export interface TransformOptions {
  width?: number;
  height?: number;
  /** `fill` crops; `fit` scales inside bounds; `pad` preserves canvas size. */
  crop?: "fill" | "fit" | "pad" | "scale" | "thumb" | "limit";
  /** Hex background used for padded crops, without changing the source asset. */
  background?: string;
  /** Focal hint — "auto", "face", "north", etc. */
  gravity?: string;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | number;
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  dpr?: "auto" | number;
  blur?: number;
}

/** Responsive breakpoints used across the site. */
export const IMAGE_WIDTHS = [400, 640, 828, 1080, 1440, 1920, 2560] as const;

function isCloudinary(src: string): boolean {
  return src.includes("res.cloudinary.com") && src.includes(UPLOAD_MARKER);
}

function buildTransform(options: TransformOptions): string {
  const {
    width,
    height,
    crop,
    background,
    gravity,
    quality = "auto",
    format = "auto",
    dpr,
    blur,
  } = options;

  const parts = [`f_${format}`, `q_${quality}`];

  if (width) parts.push(`w_${Math.round(width)}`);
  if (height) parts.push(`h_${Math.round(height)}`);
  if (crop) parts.push(`c_${crop}`);
  if (background) parts.push(`b_rgb:${background.replace("#", "")}`);
  // A crop without gravity produces unpredictable framing on portraits.
  if (gravity) parts.push(`g_${gravity}`);
  else if (crop === "fill" || crop === "thumb") parts.push("g_auto");
  if (dpr) parts.push(`dpr_${dpr}`);
  if (blur) parts.push(`e_blur:${blur}`);

  return parts.join(",");
}

/**
 * Injects a transformation segment into a Cloudinary URL.
 * Returns the input unchanged when it is not a Cloudinary upload URL.
 */
export function cld(src: string, options: TransformOptions = {}): string {
  if (!isCloudinary(src)) return src;

  const [origin, rest] = src.split(UPLOAD_MARKER);
  return `${origin}${UPLOAD_MARKER}${buildTransform(options)}/${rest}`;
}

/** Builds a `srcSet` string across the responsive breakpoints. */
export function cldSrcSet(
  src: string,
  options: Omit<TransformOptions, "width"> = {},
  widths: readonly number[] = IMAGE_WIDTHS,
): string | undefined {
  if (!isCloudinary(src)) return undefined;

  return widths
    .map((width) => `${cld(src, { ...options, width })} ${width}w`)
    .join(", ");
}

/**
 * Tiny blurred version used as a background while the real asset decodes.
 * Cheap enough to inline as a CSS background without blocking the render.
 */
export function cldPlaceholder(src: string): string | undefined {
  if (!isCloudinary(src)) return undefined;
  return cld(src, { width: 24, quality: "auto:eco", blur: 400 });
}
