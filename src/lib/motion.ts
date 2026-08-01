/**
 * Shared motion language.
 *
 * One easing vocabulary and one set of variants, so every section moves with
 * the same rhythm. Anything that needs different timing should compose these
 * rather than inventing new curves.
 */

import type { Transition, Variants } from "motion/react";

/** Long, decelerating curve. Editorial reveals, page transitions. */
export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;

/** Symmetric curve. Hover states, menus, anything reversible. */
export const EASE_SWIFT = [0.65, 0, 0.35, 1] as const;

/**
 * Seconds. Mirrored in milliseconds by the `--duration-*` tokens in
 * globals.css — change one, change the other.
 */
export const DURATION = {
  fast: 0.28,
  hover: 0.42,
  base: 0.6,
  slow: 0.9,
  reveal: 1.1,
} as const;

/** Reveals fire once; re-animating on every scroll pass reads as restless. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

/** Larger elements need less of themselves visible before triggering. */
export const VIEWPORT_EARLY = { once: true, amount: 0.15 } as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_EDITORIAL,
};

// ── Variants ──────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

/** Headline lines masked behind `overflow: hidden` on the parent. */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE_EDITORIAL },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_EDITORIAL },
  },
};

/** Parent wrapper that cascades its children. */
export function stagger(childDelay = 0.07, initialDelay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: childDelay,
        delayChildren: initialDelay,
      },
    },
  };
}

// ── Reduced motion ────────────────────────────────────────────────────────

/**
 * Strips transforms from a variant set while keeping opacity, so a user with
 * `prefers-reduced-motion` still gets the content — just without travel.
 *
 * Pass the result of `useReducedMotion()` from `motion/react`.
 */
export function respectMotion(
  variants: Variants,
  reduced: boolean | null,
): Variants {
  if (!reduced) return variants;
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: DURATION.fast } },
  };
}
