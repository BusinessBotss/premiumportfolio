import Link from "next/link";
import { Media } from "@/components/ui/media";
import type { Locale } from "@/i18n/config";
import { translateDiscipline } from "@/i18n/localized-content";
import { withLocale } from "@/i18n/routing";
import type { PublicProject } from "@/types/portfolio";
import { cn, pad } from "@/lib/utils";

interface ProjectCardProps {
  project: PublicProject;
  locale: Locale;
  /** Display index, used for the editorial numbering. */
  index: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Frame ratio. Overrides the asset ratio to build an asymmetric grid. */
  ratio?: number;
}

export function ProjectCard({
  project,
  locale,
  index,
  sizes,
  priority,
  className,
  ratio,
}: ProjectCardProps) {
  const secondary = project.gallery?.find(
    (asset) => asset.id !== project.cover.id && !asset.usage.includes("contextual-gallery"),
  );

  return (
    <article className={className}>
      {/*
        One pointer state drives the whole card: the frame lifts, the image
        pushes in behind it, the title steps right and warms to the accent,
        the caret arrives, and the rule under the disciplines draws itself.
        Separate durations keep it choreographed rather than simultaneous —
        the image is the slowest element, so it reads as depth.

        Everything is a CSS transition, so `prefers-reduced-motion` is
        already handled by the global block in globals.css, and Tailwind's
        `hover:` only compiles under `@media (hover: hover)`, so nothing
        sticks on touch.
      */}
      <Link href={withLocale(locale, `/work/${project.slug}`)} className="group block">
        <div className="relative">
          <Media
            asset={project.cover}
            sizes={sizes}
            priority={priority}
            ratio={ratio}
            className="transition duration-[var(--duration-hover)] ease-editorial group-hover:-translate-y-1.5"
            imageClassName="transition-transform duration-[var(--duration-hover-image)] ease-editorial group-hover:scale-[1.05]"
          />
          {secondary && (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-4 right-4 hidden w-[34%] overflow-hidden border border-rule bg-surface shadow-2xl opacity-0 transition duration-[var(--duration-hover-image)] ease-editorial group-hover:translate-y-0 group-hover:opacity-100 md:block"
            >
              <Media
                asset={secondary}
                sizes="18vw"
                ratio={secondary.treatment === "contained-portrait" ? 4 / 5 : 1}
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="flex items-baseline gap-2 font-display text-xl leading-tight transition duration-[var(--duration-hover)] ease-editorial group-hover:translate-x-1 group-hover:text-accent md:text-2xl">
              {project.title}
              <span
                aria-hidden
                className="inline-block -translate-x-2 text-base opacity-0 transition duration-[var(--duration-hover)] delay-[var(--delay-hover-trail)] ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
              >
                ↗
              </span>
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-content-muted transition duration-[var(--duration-hover)] delay-[var(--delay-hover-trail)] ease-editorial group-hover:translate-x-1">
              {project.summary}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5 pt-1">
            <span className="label text-content-faint transition duration-[var(--duration-hover)] ease-editorial group-hover:text-accent">
              {pad(index + 1)}
            </span>
            {project.year && (
              <span className="label text-content-muted">{project.year}</span>
            )}
          </div>
        </div>

        <div className="relative mt-4 border-t border-rule pt-3">
          <span
            aria-hidden
            className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-hover)] ease-editorial group-hover:scale-x-100"
          />
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {project.disciplines.slice(0, 3).map((d) => (
              <li key={d} className="label text-content-faint">
                {translateDiscipline(d, locale)}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}

/**
 * Compact row used in the archive and secondary listings.
 *
 * `showYear` is decided by the list, not by the row: a year column only exists
 * when at least one project in the table has a year. Otherwise the column is
 * gone entirely — header included — and Category absorbs the width, so an
 * unverified year leaves no empty gutter behind.
 */
export function ProjectRow({
  project,
  index,
  locale,
  showYear = true,
}: {
  project: PublicProject;
  index: number;
  locale: Locale;
  showYear?: boolean;
}) {
  return (
    <Link
      href={withLocale(locale, `/work/${project.slug}`)}
      className={cn(
        "group relative grid grid-cols-12 items-center gap-4 border-b border-rule py-6",
        "transition duration-[var(--duration-hover)] ease-editorial hover:text-accent",
      )}
    >
      {/* The rule under the row redraws in accent, left to right. */}
      <span
        aria-hidden
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[var(--duration-hover)] ease-editorial group-hover:scale-x-100"
      />
      <span className="label col-span-2 text-content-faint transition duration-[var(--duration-hover)] ease-editorial group-hover:text-accent md:col-span-1">
        {pad(index + 1)}
      </span>
      <span className="col-span-10 font-display text-xl transition duration-[var(--duration-hover)] ease-editorial group-hover:translate-x-1 md:col-span-4 md:text-2xl">
        {project.title}
      </span>
      <span
        className={cn(
          "text-sm text-content-muted transition duration-[var(--duration-hover)] delay-[var(--delay-hover-trail)] ease-editorial group-hover:translate-x-1",
          showYear ? "col-span-8 md:col-span-4" : "col-span-10 md:col-span-7",
        )}
      >
        {project.category}
      </span>
      {showYear && (
        <span className="label col-span-4 text-right text-content-muted md:col-span-3">
          {project.year}
        </span>
      )}
    </Link>
  );
}
