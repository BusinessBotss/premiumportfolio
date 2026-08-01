import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { translateCategory } from "@/i18n/localized-content";
import type { PublicProject } from "@/types/portfolio";

export function getProjectCopy(project: PublicProject, locale: Locale) {
  return getDictionary(locale).projects[project.slug] ?? {};
}

export function localizeProject(project: PublicProject, locale: Locale): PublicProject {
  const copy = getProjectCopy(project, locale);
  return {
    ...project,
    summary: copy.summary ?? project.summary,
    overview: copy.overview ?? project.overview,
    challenge: copy.challenge ?? project.challenge,
    response: copy.response ?? project.response,
    outcome: copy.outcome ?? project.outcome,
    contribution: copy.contribution ?? project.contribution,
    deliverables: copy.deliverables ?? project.deliverables,
    category: copy.category ?? translateCategory(project.category, locale),
  };
}

export function localizeProjects(projects: PublicProject[], locale: Locale): PublicProject[] {
  return projects.map((project) => localizeProject(project, locale));
}
