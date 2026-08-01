"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { DURATION, EASE_EDITORIAL, VIEWPORT_EARLY } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Granularity of the reveal. */
type Split = "word" | "char";

interface MaskTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Seconds between units. Lower for long headlines. */
  stagger?: number;
  /**
   * `word` for sentences, `char` for a short display line where the cascade
   * itself is the composition. Characters multiply the unit count fast, so a
   * char split wants a smaller stagger.
   */
  split?: Split;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Headline treatment: each unit rises out of its own mask.
 *
 * The full string is exposed to assistive technology through `aria-label`
 * while the animated spans are hidden, so the reveal never fragments the text
 * for a screen reader. Under `prefers-reduced-motion` the component renders
 * plain text with no wrappers at all.
 */
export function MaskText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  split = "word",
  as: Tag = "span",
}: MaskTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const unit: Variants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: {
        duration: DURATION.reveal,
        ease: EASE_EDITORIAL,
        delay: delay + i * stagger,
      },
    }),
  };

  /** Shared props: every unit observes its own viewport entry, once. */
  const motionProps = {
    variants: unit,
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: VIEWPORT_EARLY,
  };

  if (split === "char") {
    // Words stay grouped so the line still wraps between words, never inside
    // one. The cascade index runs across the whole string, so the rhythm is
    // continuous rather than restarting at each word — hence the per-word
    // offset into the character sequence, derived rather than accumulated so
    // nothing is mutated during render.
    const offsets = words.map((_, i) =>
      words.slice(0, i).reduce((n, w) => n + w.length, 0),
    );

    return (
      <Tag className={className} aria-label={text}>
        {words.map((w, wi) => (
          <span
            key={`${w}-${wi}`}
            aria-hidden
            className={cn("inline-flex", wi < words.length - 1 && "pr-[0.25em]")}
          >
            {Array.from(w).map((char, ci) => (
              <span
                key={`${char}-${ci}`}
                className="inline-flex overflow-hidden align-bottom"
              >
                <motion.span
                  className="inline-block"
                  custom={offsets[wi] + ci}
                  {...motionProps}
                >
                  {char}
                </motion.span>
              </span>
            ))}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span
            className={cn("inline-block", i < words.length - 1 && "pr-[0.25em]")}
            custom={i}
            {...motionProps}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
