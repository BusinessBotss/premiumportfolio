"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_EDITORIAL } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  /** Concrete nouns only — sectors, disciplines. Never adjectives. */
  words: string[];
  /** Milliseconds each word holds. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through a fixed vocabulary in place.
 *
 * The full list stays in the DOM for assistive technology, so the meaning does
 * not depend on catching the right frame.
 */
export function WordRotate({ words, interval = 2400, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  if (reduced) {
    return <span className={className}>{words.join(", ")}</span>;
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          aria-hidden
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_EDITORIAL }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
