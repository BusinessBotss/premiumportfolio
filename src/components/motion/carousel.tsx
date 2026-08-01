"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: ReactNode;
  label: string;
  className?: string;
}

/**
 * Horizontal track for galleries, campaign collections and secondary work.
 *
 * Built on native scroll-snap rather than transform-driven slides, so it keeps
 * momentum scrolling on touch, arrow-key and tab navigation on desktop, and
 * works if the JavaScript for the controls never arrives.
 */
export function Carousel({ children, label, className }: CarouselProps) {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, [sync]);

  function step(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className={cn("relative", className)}>
      <div
        ref={track}
        onScroll={sync}
        tabIndex={0}
        role="group"
        aria-label={label}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 md:gap-6"
      >
        {children}
      </div>

      <div className="mt-4 flex gap-2">
        <TrackButton onClick={() => step(-1)} disabled={atStart} label="Previous" glyph="←" />
        <TrackButton onClick={() => step(1)} disabled={atEnd} label="Next" glyph="→" />
      </div>
    </div>
  );
}

function TrackButton({
  onClick,
  disabled,
  label,
  glyph,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  glyph: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-rule text-content transition-colors hover:border-content disabled:opacity-30 disabled:hover:border-rule"
    >
      <span aria-hidden>{glyph}</span>
    </button>
  );
}
