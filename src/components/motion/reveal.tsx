"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_EDITORIAL, VIEWPORT } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly — long cascades read as slow, not considered. */
  delay?: number;
}

/**
 * The default entrance. Fires once, respects reduced motion by dropping the
 * travel and keeping the fade.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? DURATION.fast : DURATION.base,
        ease: EASE_EDITORIAL,
        delay: reduced ? 0 : d,
      },
    }),
  };

  return (
    <motion.div
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}
