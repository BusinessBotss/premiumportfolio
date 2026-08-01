"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "@/components/layout/menu";
import { primaryNav, site } from "@/data/site";
import { EASE_SWIFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Global header.
 *
 * Transparent over the opening section, then condenses into a blurred bar and
 * hides while scrolling down — the page content matters more than persistent
 * chrome. It reappears on any upward scroll, and always when the menu is open.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(y > 24);
    setHidden(y > previous && y > 320 && !open);
  });

  const scheme = condensed ? "light" : "dark";

  return (
    <>
      <motion.header
        data-scheme={open ? "dark" : scheme}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: EASE_SWIFT }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          condensed && !open
            ? "border-b border-rule bg-surface/85 text-content backdrop-blur-md"
            : "text-content",
        )}
      >
        <div className="gutter flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center font-display text-base tracking-tight md:text-lg"
          >
            {site.wordmark}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="label inline-flex min-h-11 items-center text-content-muted transition-colors hover:text-content"
              >
                {item.label}
              </Link>
            ))}
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="label text-content-muted">Available</span>
            </span>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="global-menu"
            className="label inline-flex min-h-11 min-w-11 items-center justify-end md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      <div id="global-menu">
        <Menu open={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
}
