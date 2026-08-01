"use client";

import { useCallback, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  children: ReactNode;
  /** Internal route, external URL or mailto. Omit for a real button. */
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
}

/**
 * Reserved for actions that commit the visitor to something: starting a
 * project, opening WhatsApp, sending an enquiry, opening the deck.
 */
export function RippleButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const reduced = useReducedMotion();

  const spawn = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const ripple: Ripple = {
        id: Date.now(),
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setRipples((current) => [...current, ripple]);
      window.setTimeout(
        () => setRipples((current) => current.filter((r) => r.id !== ripple.id)),
        700,
      );
    },
    [reduced],
  );

  const classes = cn(
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden",
    "rounded-full px-7 py-3.5 text-sm transition-colors duration-300",
    variant === "solid"
      ? "bg-content text-surface hover:bg-accent"
      : "border border-rule text-content hover:border-content",
    className,
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute z-0 rounded-full bg-current opacity-20"
            style={{ left: r.x, top: r.y, translate: "-50% -50%" }}
            initial={{ width: 0, height: 0, opacity: 0.28 }}
            animate={{ width: 420, height: 420, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          onMouseDown={spawn}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onMouseDown={spawn}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} onMouseDown={spawn} className={classes}>
      {inner}
    </button>
  );
}
