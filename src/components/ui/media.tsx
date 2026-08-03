import Image from "next/image";
import type { ImageAsset } from "@/types/portfolio";
import { cldPlaceholder } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

interface MediaProps {
  asset: ImageAsset;
  /** Required. Wrong `sizes` is the most common cause of oversized downloads. */
  sizes: string;
  /** Only true for the single largest image above the fold. */
  priority?: boolean;
  /** Overrides the asset ratio when the layout dictates the frame. */
  ratio?: number;
  className?: string;
  imageClassName?: string;
}

/**
 * Every image on the site goes through here.
 *
 * The wrapper holds the aspect ratio so layout space is reserved before the
 * asset arrives, and a blurred 24px version fills the frame in the meantime.
 */
export function Media({
  asset,
  sizes,
  priority = false,
  ratio,
  className,
  imageClassName,
}: MediaProps) {
  const placeholder = cldPlaceholder(asset.src);
  const businessBotsCover = asset.treatment === "business-bots-cover";
  const containedPortrait = asset.treatment === "contained-portrait";

  if (businessBotsCover) {
    return (
      <div
        className={cn(
          "grain relative overflow-hidden bg-[#101112] text-white",
          className,
        )}
        style={{ aspectRatio: ratio ?? asset.aspectRatio }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute left-4 top-4 flex gap-2 font-mono text-[10px] uppercase text-white/38 md:left-6 md:top-6">
          <span>AI systems</span>
          <span>/</span>
          <span>Digital strategy</span>
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase text-white/30 md:bottom-6 md:right-6">
          Founder project
        </div>
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-contain p-[18%] md:p-[16%]", imageClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-raised",
        containedPortrait &&
          (asset.category === "business-development" ? "bg-[#101112]" : "bg-[#ebe6dc]"),
        className,
      )}
      style={{
        aspectRatio: ratio ?? asset.aspectRatio,
        backgroundImage: placeholder ? `url("${placeholder}")` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          containedPortrait ? "object-contain p-3 md:p-5" : "object-cover",
          imageClassName,
        )}
        style={{
          objectPosition: asset.focus === "face" ? "center 22%" : undefined,
        }}
      />
    </div>
  );
}
