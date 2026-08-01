"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_SWIFT } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title: string;
  className?: string;
}

/**
 * Case-study sharing.
 *
 * Uses the native share sheet where the device offers one, and falls back to
 * an explicit menu everywhere else. Every target is a real link, so it works
 * with the keyboard and without JavaScript-driven popups.
 */
export function ShareButton({ url, title, className }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const targets = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}` },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
  ];

  async function handleTrigger() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Dismissed by the user — fall through to the menu.
      }
    }
    setOpen((v) => !v);
  }

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={handleTrigger}
        aria-expanded={open}
        aria-haspopup="menu"
        className="label inline-flex min-h-11 items-center border-b border-rule text-content-muted transition-colors hover:text-content"
      >
        Share project
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE_SWIFT }}
            className="absolute left-0 top-full z-20 mt-3 flex w-44 flex-col border border-rule bg-surface p-1"
          >
            <button
              type="button"
              role="menuitem"
              onClick={copy}
              className="min-h-11 px-3 py-3 text-left text-sm transition-colors hover:bg-surface-raised"
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
            {targets.map((t) => (
              <a
                key={t.label}
                role="menuitem"
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-3 py-3 text-sm transition-colors hover:bg-surface-raised"
              >
                {t.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
