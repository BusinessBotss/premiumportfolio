"use client";

import { useState } from "react";
import { HexagonBackground } from "@/components/motion/hexagon-background";
import { Reveal } from "@/components/motion/reveal";
import { Media } from "@/components/ui/media";
import { Section } from "@/components/ui/section";
import { capabilities } from "@/data/capabilities";
import { getProject } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { localizeCapability } from "@/i18n/localized-content";
import { pad } from "@/lib/utils";

/**
 * Capabilities.
 *
 * Uneven panels rather than six identical boxes, so the emphasis is readable
 * at a glance. No prices, no icons — the linked projects do the proving.
 */
const SPANS = [
  "lg:col-span-4",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-4",
  "lg:col-span-3",
  "lg:col-span-3",
] as const;

export function Capabilities({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  const localizedCapabilities = capabilities.map((capability) => localizeCapability(capability, locale));
  const [activeIndex, setActiveIndex] = useState(0);
  const active = localizedCapabilities[activeIndex];

  return (
    <Section id="capabilities" scheme="dark">
      <div className="gutter">
        <div className="mb-16 flex flex-col gap-3 border-b border-rule pb-6">
          <span className="label text-content-faint">
            {dictionary.home.capabilities.eyebrow}
          </span>
          <h2 className="font-display text-title leading-none">
            {dictionary.home.capabilities.title}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="grid gap-px overflow-hidden border border-rule bg-rule lg:col-span-7 lg:grid-cols-6">
            {localizedCapabilities.map((capability, i) => (
              <Reveal
                key={capability.id}
                delay={(i % 3) * 0.06}
                className={`${SPANS[i % SPANS.length]} bg-surface`}
              >
                <button
                  type="button"
                  aria-pressed={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  className="relative isolate flex h-full flex-col gap-6 p-8 text-left transition-colors hover:bg-surface/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent md:p-10"
                >
                  {capability.technical && <HexagonBackground opacity={0.35} />}

                <div className="flex items-baseline gap-4">
                  <span className="label text-content-faint">{pad(i + 1)}</span>
                  <h3 className="font-display text-2xl leading-tight">
                    {capability.title}
                  </h3>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-content-muted">
                  {capability.description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-2">
                  {capability.areas.map((area) => (
                    <li
                      key={area}
                      className="label rounded-full border border-rule px-3 py-1.5 text-content-muted"
                    >
                      {area}
                    </li>
                  ))}
                </ul>

                {capability.relatedProjectSlugs && (
                  <span className="flex flex-wrap gap-x-4 gap-y-1 border-t border-rule pt-4">
                    {capability.relatedProjectSlugs.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <span key={slug} className="label text-content-muted">
                          {project.title}
                        </span>
                      );
                    })}
                  </span>
                )}
                </button>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-28 flex flex-col gap-4">
              {active.image && (
                <Media
                  key={active.image.id}
                  asset={active.image}
                  ratio={active.image.treatment === "contained-portrait" ? 4 / 5 : 4 / 5}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              )}
              <div className="border-t border-rule pt-4">
                <span className="label text-content-faint">{active.title}</span>
                <p className="mt-2 text-sm leading-relaxed text-content-muted">
                  {active.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
