import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Scheme = "light" | "paper" | "dark";

interface SectionProps {
  children: ReactNode;
  id?: string;
  /** Flips the semantic colour tokens for everything inside. */
  scheme?: Scheme;
  className?: string;
  /** Removes the default vertical rhythm for full-bleed compositions. */
  flush?: boolean;
}

export function Section({
  children,
  id,
  scheme = "light",
  className,
  flush = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-scheme={scheme}
      className={cn(
        "relative bg-surface text-content",
        !flush && "py-24 md:py-32 lg:py-40",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  /** Mono eyebrow, e.g. "02 — Selected Work". */
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {eyebrow && <span className="label text-content-muted">{eyebrow}</span>}
      <h2 className="text-title leading-[1.05]">{title}</h2>
    </div>
  );
}
