import Link from "next/link";
import { HexagonBackground } from "@/components/motion/hexagon-background";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { capabilities } from "@/data/capabilities";
import { getProject } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { localizeCapability } from "@/i18n/localized-content";
import { withLocale } from "@/i18n/routing";
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

        <div className="grid gap-px overflow-hidden border border-rule bg-rule lg:grid-cols-6">
          {localizedCapabilities.map((capability, i) => (
            <Reveal
              key={capability.id}
              delay={(i % 3) * 0.06}
              className={`${SPANS[i % SPANS.length]} bg-surface`}
            >
              <div className="relative isolate flex h-full flex-col gap-6 p-8 md:p-10">
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
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-rule pt-4">
                    {capability.relatedProjectSlugs.map((slug) => {
                      const project = getProject(slug);
                      if (!project) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={withLocale(locale, `/work/${slug}`)}
                            className="label text-content-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                          >
                            {project.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
