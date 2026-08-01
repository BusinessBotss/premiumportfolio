import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShineBorderProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one pass. */
  duration?: number;
  rounded?: "full" | "lg";
}

/**
 * A slowly travelling highlight along the border.
 *
 * Budget: one or two per page, on the availability marker or the final CTA.
 * Beyond that it stops signalling anything. Pure CSS, so it costs nothing on
 * the main thread and disappears under `prefers-reduced-motion`.
 */
export function ShineBorder({
  children,
  className,
  duration = 9,
  rounded = "full",
}: ShineBorderProps) {
  return (
    <div
      className={cn(
        "relative isolate p-px",
        rounded === "full" ? "rounded-full" : "rounded-lg",
        className,
      )}
      style={{
        background:
          "linear-gradient(90deg, var(--rule), var(--accent), var(--rule), var(--rule))",
        backgroundSize: "200% auto",
        animation: `shine ${duration}s linear infinite`,
      }}
    >
      <div
        className={cn(
          "bg-surface",
          rounded === "full" ? "rounded-full" : "rounded-[7px]",
        )}
      >
        {children}
      </div>
    </div>
  );
}
