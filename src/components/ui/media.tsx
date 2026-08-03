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
  const brandedFallback = asset.treatment === "branded-fallback";

  if (brandedFallback) {
    const copy =
      asset.id === "buborant-branded-fallback"
        ? {
            kicker: "Hospitality technology",
            title: "Buborant",
            body: "QR table-ordering interface / public case-study fallback",
          }
        : {
            kicker: asset.category ?? "Case study",
            title: asset.projectId ?? "Project",
            body: "Text-led fallback visual",
          };

    return (
      <div
        role="img"
        aria-label={asset.alt}
        className={cn(
          "grain relative overflow-hidden bg-[#17120d] text-white",
          className,
        )}
        style={{ aspectRatio: ratio ?? asset.aspectRatio }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45" />
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="label text-white/50">{copy.kicker}</span>
            <span className="label text-white/35">Public fallback</span>
          </div>
          <div className="max-w-[28rem]">
            <p className="font-display text-5xl leading-[0.88] md:text-7xl lg:text-8xl">
              {copy.title}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/62 md:text-base">
              {copy.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

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
