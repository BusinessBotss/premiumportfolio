/**
 * Publication rules for the project catalogue.
 *
 * These three predicates are the only place the rules live. Components ask a
 * question here rather than re-deriving it from `editorialStatus` or
 * `indexable`, so a rule can never drift between call sites.
 */

import type { Project, PublicProject } from "@/types/portfolio";

/**
 * Whether there is enough verified material to justify a case-study page.
 *
 * Read from the content itself, not from `contentCompleteness` — that field
 * records authoring intent and can fall out of date; this cannot.
 *
 * Requires identity, a renderable cover, and at least one substantive account
 * of the work: what Elias contributed, what was shipped, or images of it.
 */
export function hasMinimumCaseStudyContent(project: Project): boolean {
  const identified =
    Boolean(project.title) &&
    Boolean(project.slug) &&
    Boolean(project.category) &&
    Boolean(project.summary);

  const renderableCover = Boolean(project.cover?.src) && Boolean(project.cover?.alt);

  const substantiated =
    (project.contribution?.length ?? 0) > 0 ||
    (project.gallery?.length ?? 0) > 0 ||
    (project.deliverables?.length ?? 0) > 0;

  return identified && renderableCover && substantiated;
}

/**
 * Whether the project may appear anywhere a visitor can reach: listings,
 * archive, related links, and its own route.
 *
 * `draft` and `review` never qualify. There is no preview route, so a project
 * under review simply does not exist publicly until it is published.
 */
export function isPublicProject(project: Project): project is PublicProject {
  return (
    project.editorialStatus === "published" && hasMinimumCaseStudyContent(project)
  );
}

/**
 * Whether search engines may index the page.
 *
 * `indexable` is treated as intent, not authority: it is only honoured on a
 * project that is genuinely public, so a stale `true` cannot leak an
 * unfinished page into the sitemap.
 */
export function isIndexableProject(project: Project): project is PublicProject {
  return project.indexable && isPublicProject(project);
}
