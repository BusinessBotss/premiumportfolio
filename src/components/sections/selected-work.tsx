import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { featuredProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";
import { localizeProjects } from "@/lib/localized-projects";

/**
 * Selected Work.
 *
 * An asymmetric editorial grid rather than a card wall: the frames differ in
 * width, ratio and vertical offset, so the eye moves through the work instead
 * of scanning a table. Every entry leads to an internal case study.
 */

/** Column span, frame ratio and offset per position in the grid. */
const LAYOUT = [
  { span: "lg:col-span-7", ratio: 4 / 3, offset: "" },
  { span: "lg:col-span-5", ratio: 3 / 4, offset: "lg:mt-32" },
  { span: "lg:col-span-5", ratio: 3 / 4, offset: "" },
  { span: "lg:col-span-7", ratio: 4 / 3, offset: "lg:mt-24" },
] as const;

const SIZES = "(max-width: 1024px) 100vw, 55vw";

export function SelectedWork({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  const localizedFeatured = localizeProjects(featuredProjects, locale);

  return (
    <Section id="work" scheme="light">
      <div className="gutter">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
          <div className="flex flex-col gap-3">
            <span className="label text-content-faint">
              {dictionary.home.selected.eyebrow}
            </span>
            <h2 className="font-display text-title leading-none">
              {dictionary.home.selected.title}
            </h2>
          </div>
          <Link
            href={withLocale(locale, "/work")}
            className="label border-b border-rule pb-1 text-content-muted transition-colors hover:text-content"
          >
            {dictionary.common.allWork}
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-20 lg:grid-cols-12">
          {localizedFeatured.map((project, i) => {
            const layout = LAYOUT[i % LAYOUT.length];
            return (
              <Reveal
                key={project.id}
                delay={i * 0.08}
                className={`${layout.span} ${layout.offset}`}
              >
                <ProjectCard
                  project={project}
                  locale={locale}
                  index={i}
                  ratio={layout.ratio}
                  sizes={SIZES}
                  priority={i === 0}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
