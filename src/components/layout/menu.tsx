"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { footerNav, site, socialNav } from "@/data/site";
import { DURATION, EASE_EDITORIAL } from "@/lib/motion";
import { pad } from "@/lib/utils";

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Fullscreen navigation.
 *
 * Behaves as a modal dialog: focus moves in on open, Tab cycles inside it,
 * Escape closes, and the page behind stops scrolling.
 */
export function Menu({ open, onClose }: MenuProps) {
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    panel.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          data-scheme="dark"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          initial={{ opacity: 0, y: reduced ? 0 : "-2%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: reduced ? 0 : "-2%" }}
          transition={{ duration: DURATION.base, ease: EASE_EDITORIAL }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-surface text-content"
        >
          <nav className="gutter flex flex-1 flex-col justify-center pt-28">
            <ul className="flex flex-col">
              {footerNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: reduced ? 0 : 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: DURATION.base,
                    ease: EASE_EDITORIAL,
                    delay: reduced ? 0 : 0.08 + i * 0.06,
                  }}
                  className="group relative border-b border-rule"
                >
                  {/* The row rule redraws in accent, left to right, while the
                      display type opens up — the same two-property gesture
                      the small links use, scaled to the headline. */}
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-hover)] ease-editorial group-hover:scale-x-100"
                  />
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline gap-6 py-5 md:py-7"
                  >
                    <span className="label text-content-faint transition-colors duration-[var(--duration-hover)] ease-editorial group-hover:text-accent">
                      {pad(i + 1)}
                    </span>
                    <span className="font-display text-headline leading-none tracking-normal transition-[color,letter-spacing] duration-[var(--duration-hover)] ease-editorial group-hover:tracking-[0.015em] group-hover:text-accent">
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="gutter flex flex-col gap-6 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-1">
              <span className="label text-content-faint">Direct</span>
              <a
                href={`mailto:${site.contact.email}`}
                className="link-editorial inline-flex min-h-11 min-w-11 items-center text-lead"
              >
                {site.contact.email}
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {socialNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-editorial label inline-flex min-h-11 min-w-11 items-center text-content-muted [--link-tracking-hover:0.26em] [--link-tracking:0.16em]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
