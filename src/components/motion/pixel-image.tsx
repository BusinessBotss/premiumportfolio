"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cld } from "@/lib/cloudinary";
import { VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const COLS = 8;
const ROWS = 8;
const TOTAL = COLS * ROWS;
/** Coprime with TOTAL, so `i * STEP % TOTAL` visits every cell exactly once. */
const STEP = 37;

interface PixelImageProps {
  src: string;
  alt: string;
  /** width / height of the frame. */
  ratio?: number;
  focus?: string;
  className?: string;
}

/**
 * Portrait reveal in a fixed pixel order.
 *
 * The sequence is derived arithmetically rather than randomly, so the server
 * and client agree and the animation looks identical on every visit.
 */
export function PixelImage({
  src,
  alt,
  ratio = 3 / 4,
  focus = "face",
  className,
}: PixelImageProps) {
  const reduced = useReducedMotion();

  const url = cld(src, {
    width: 1200,
    crop: "fill",
    gravity: focus,
    quality: "auto:good",
  });

  const frame = (
    <div
      className={cn("relative overflow-hidden bg-surface-raised", className)}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
    </div>
  );

  if (reduced) return frame;

  const cell: Variants = {
    hidden: { opacity: 0 },
    visible: (order: number) => ({
      opacity: 1,
      transition: { duration: 0.32, delay: order * 0.014, ease: "linear" },
    }),
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden bg-surface-raised", className)}
      style={{ aspectRatio: ratio }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      role="img"
      aria-label={alt}
    >
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
        aria-hidden
      >
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS;
          const row = Math.floor(i / COLS);
          return (
            <motion.div
              key={i}
              custom={(i * STEP) % TOTAL}
              variants={cell}
              style={{
                backgroundImage: `url("${url}")`,
                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
