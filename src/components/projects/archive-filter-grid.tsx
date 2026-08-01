"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Media } from "@/components/ui/media";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";
import type { ImageAsset, PublicProject } from "@/types/portfolio";
import { cn } from "@/lib/utils";

export type ArchiveFilter =
  | "all"
  | "web"
  | "brand"
  | "hospitality"
  | "realEstate"
  | "fitness"
  | "marine"
  | "growth";

export interface FilteredAsset {
  asset: ImageAsset;
  filters: ArchiveFilter[];
}

export function ArchiveFilterGrid({
  items,
  projects,
  locale,
  dictionary,
}: {
  items: FilteredAsset[];
  projects: PublicProject[];
  locale: Locale;
  dictionary: AppDictionary;
}) {
  const [active, setActive] = useState<ArchiveFilter>("all");
  const visible = useMemo(
    () => items.filter((item) => active === "all" || item.filters.includes(active)),
    [active, items],
  );
  const filters = Object.entries(dictionary.archive.filters) as [ArchiveFilter, string][];

  return (
    <div className="flex flex-col gap-8">
      <div className="gutter flex flex-wrap gap-2" aria-label={dictionary.archive.material}>
        {filters.map(([key, label]) => {
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(key)}
              className={cn(
                "label inline-flex min-h-11 items-center rounded-full border px-4 transition-colors",
                selected
                  ? "border-content bg-content text-surface"
                  : "border-rule text-content-muted hover:border-content hover:text-content",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <ul className="gutter grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visible.map(({ asset }, i) => {
          const project = projects.find((p) => p.id === asset.projectId);
          const frame = (
            <Media
              asset={asset}
              ratio={1}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
              className="transition duration-[var(--duration-hover)] ease-editorial group-hover:-translate-y-1"
              imageClassName="transition-transform duration-[var(--duration-hover-image)] ease-editorial group-hover:scale-[1.05]"
            />
          );

          return (
            <li key={asset.id} className="group">
              <Reveal delay={(i % 4) * 0.05}>
                {project ? (
                  <Link
                    href={withLocale(locale, `/work/${project.slug}`)}
                    aria-label={project.title}
                  >
                    {frame}
                  </Link>
                ) : (
                  frame
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
