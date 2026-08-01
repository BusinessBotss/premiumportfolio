"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full pass. Longer feels calmer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}

/**
 * Continuous horizontal ticker.
 *
 * Runs on a CSS keyframe so it stays off the main thread, and pauses whenever
 * it scrolls out of view. Under `prefers-reduced-motion` it degrades to a
 * normal horizontally scrollable row.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0 });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={cn("flex gap-12 overflow-x-auto", className)}
        tabIndex={0}
        role="group"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("flex overflow-hidden", className)}
      style={{ maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" }}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 items-center gap-12 pr-12"
          style={{
            animation: `marquee ${duration}s linear infinite`,
            animationDirection: reverse ? "reverse" : "normal",
            animationPlayState: inView ? "running" : "paused",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
