import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { featuredProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";
import { localizeProjects } from "@/lib/localized-projects";

/** Column span and offset per position in the typography-led grid. */
const LAYOUT = [
  { span: "lg:col-span-7", offset: "" },
  { span: "lg:col-span-5", offset: "lg:mt-12" },
  { span: "lg:col-span-5", offset: "" },
  { span: "lg:col-span-7", offset: "lg:mt-10" },
] as const;

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
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
