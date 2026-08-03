"use client";

import Link from "next/link";
import { WordRotate } from "@/components/motion/word-rotate";
import { industries } from "@/data/industries";
import { isPublicSlug } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { localizeIndustry } from "@/i18n/localized-content";
import { withLocale } from "@/i18n/routing";
import { pad } from "@/lib/utils";

/**
 * Industries.
 *
 * Hovering or focusing a row swaps the preview, but the note under each name
 * carries the same information — the visual is an enhancement, never the only
 * way to read the section. Sectors without delivered work say so.
 */
export function Industries({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  const localizedIndustries = industries.map((industry) => localizeIndustry(industry, locale));

  return (
    <section data-scheme="paper" className="bg-surface py-24 text-content md:py-32 lg:py-40">
      <div className="gutter">
        <div className="mb-16 flex flex-col gap-3 border-b border-rule pb-6">
          <span className="label text-content-faint">
            {dictionary.home.industries.eyebrow}
          </span>
          <h2 className="flex flex-wrap items-baseline gap-x-3 font-display text-title leading-none">
            {dictionary.home.industries.titlePrefix}{" "}
            <WordRotate
              words={localizedIndustries.map((i) => i.name)}
              className="text-accent"
            />
          </h2>
        </div>

        <div className="grid gap-12">
          <ul className="grid gap-x-10 md:grid-cols-2">
            {localizedIndustries.map((industry, i) => (
              <li key={industry.name}>
                <div className="group border-b border-rule py-6">
                  <div className="flex items-baseline gap-5">
                    <span className="label text-content-faint">{pad(i + 1)}</span>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-2xl leading-tight md:text-3xl">
                          {industry.name}
                        </h3>
                        {!industry.hasProjectExperience && (
                          <span className="label text-content-faint">
                            {dictionary.home.industries.noProject}
                          </span>
                        )}
                      </div>

                      <p className="max-w-lg text-sm leading-relaxed text-content-muted">
                        {industry.note}
                      </p>

                      {/* Unpublished slugs are dropped, not greyed out — a
                          link that leads nowhere is worse than no link. */}
                      {industry.projectSlugs?.some(isPublicSlug) && (
                        <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                          {industry.projectSlugs.filter(isPublicSlug).map((slug) => (
                            <li key={slug}>
                              <Link
                                href={withLocale(locale, `/work/${slug}`)}
                                className="label text-content-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                              >
                                {slug.replace(/-/g, " ")}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
