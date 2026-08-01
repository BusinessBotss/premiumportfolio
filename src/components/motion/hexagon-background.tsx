import { cn } from "@/lib/utils";

interface HexagonBackgroundProps {
  className?: string;
  /** 0–1. Keep low; this is texture, not decoration. */
  opacity?: number;
}

/**
 * Honeycomb texture.
 *
 * Restricted to AI, automation and systems contexts, where the reference to
 * circuitry is meaningful. It should never appear behind brand or hospitality
 * work. Static SVG — no runtime cost.
 */
export function HexagonBackground({
  className,
  opacity = 0.5,
}: HexagonBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" className="text-rule">
        <defs>
          <pattern
            id="hexagons"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(0.9)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="hexFade">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hexMask">
            <rect width="100%" height="100%" fill="url(#hexFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" mask="url(#hexMask)" />
      </svg>
    </div>
  );
}
