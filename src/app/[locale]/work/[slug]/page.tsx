import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { RippleButton } from "@/components/motion/ripple-button";
import { ShareButton } from "@/components/motion/share-button";
import { Section } from "@/components/ui/section";
import { getNextProject, getProject, projects } from "@/data/projects";
import { SITE_URL, site } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { translateDiscipline, translateIndustry } from "@/i18n/localized-content";
import { withLocale } from "@/i18n/routing";
import { localizeProject } from "@/lib/localized-projects";
import { buildMetadata, projectSchema } from "@/lib/metadata";
import { isIndexableProject } from "@/lib/projects";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) return {};
  const project = getProject(slug);
  if (!project) return {};
  const localized = localizeProject(project, rawLocale);

  return buildMetadata({
    title: `${project.title} — ${site.firstName}`,
    description: localized.summary,
    path: `/work/${project.slug}`,
    locale: rawLocale,
    type: "article",
    noindex: !isIndexableProject(project),
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const sourceProject = getProject(slug);
  if (!sourceProject) notFound();
  const project = localizeProject(sourceProject, locale);
  const nextSource = getNextProject(slug);
  const next = nextSource ? localizeProject(nextSource, locale) : undefined;
  const url = `${SITE_URL}${withLocale(locale, `/work/${project.slug}`)}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            projectSchema({
              title: project.title,
              summary: project.summary,
              slug: project.slug,
              locale,
              year: project.year,
              client: project.client,
            }),
          ),
        }}
      />

      <Section scheme="dark" flush className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="gutter flex flex-col gap-8">
          <Link
            href={withLocale(locale, "/work")}
            className="label inline-flex min-h-11 w-fit items-center text-content-faint transition-colors hover:text-content"
          >
            ← {dictionary.common.selectedWork}
          </Link>
          <MaskText
            as="h1"
            text={project.title}
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-2xl text-lead leading-snug text-content-muted">
            {project.summary}
          </p>
        </div>
      </Section>

      <Section scheme="light" className="py-16 md:py-20">
        <dl className="gutter grid grid-cols-2 gap-x-8 gap-y-10 border-b border-rule pb-12 md:grid-cols-4">
          {project.client && <Fact term={dictionary.labels.client} value={project.client} />}
          <Fact
            term={dictionary.labels.sector}
            value={project.industries.map((industry) => translateIndustry(industry, locale)).join(", ")}
          />
          {project.year && <Fact term={dictionary.labels.year} value={project.year} />}
          <Fact
            term={dictionary.labels.status}
            value={dictionary.labels.statusValues[project.status]}
          />
          <Fact
            term={dictionary.labels.discipline}
            value={project.disciplines.map((discipline) => translateDiscipline(discipline, locale)).join(", ")}
            className="col-span-2"
          />
          {project.location && <Fact term={dictionary.labels.location} value={project.location} />}
          <Fact term={dictionary.labels.category} value={project.category} />
        </dl>

        {project.overview && (
          <div className="gutter mt-16 grid gap-8 md:grid-cols-12">
            <span className="label text-content-faint md:col-span-3">
              {dictionary.labels.overview}
            </span>
            <Reveal className="md:col-span-8">
              <p className="text-lead leading-snug">{project.overview}</p>
            </Reveal>
          </div>
        )}

        {(project.challenge || project.response) && (
          <div className="gutter mt-16 grid gap-12 md:grid-cols-2">
            {project.challenge && (
              <Passage term={dictionary.labels.challenge} body={project.challenge} />
            )}
            {project.response && (
              <Passage term={dictionary.labels.response} body={project.response} />
            )}
          </div>
        )}
      </Section>

      {project.deliverables && project.deliverables.length > 0 && (
        <Section scheme="paper" className="py-20 md:py-24">
          <div className="gutter grid gap-8 md:grid-cols-12">
            <span className="label text-content-faint md:col-span-3">
              {dictionary.labels.delivered}
            </span>
            <ul className="md:col-span-9">
              {project.deliverables.map((d, i) => (
                <Reveal key={d} delay={i * 0.05}>
                  <li className="flex items-baseline gap-6 border-b border-rule py-5 text-lead leading-snug">
                    <span className="label shrink-0 text-content-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {(project.outcome || (project.metrics && project.metrics.length > 0)) && (
        <Section scheme="dark" className="py-20 md:py-24">
          <div className="gutter flex flex-col gap-10">
            <span className="label text-content-faint">{dictionary.labels.outcome}</span>
            {project.outcome && (
              <p className="max-w-3xl text-lead leading-snug">{project.outcome}</p>
            )}
          </div>
        </Section>
      )}

      {(project.contribution || project.collaborators || project.credits) && (
        <Section scheme="light" className="py-20 md:py-24">
          <div className="gutter grid gap-12 md:grid-cols-12">
            {project.contribution && project.contribution.length > 0 && (
              <div className="flex flex-col gap-5 md:col-span-7">
                <span className="label text-content-faint">
                  {dictionary.labels.contribution}
                </span>
                <ul className="flex flex-col gap-3">
                  {project.contribution.map((c) => (
                    <li key={c} className="text-base leading-relaxed text-content-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}

      <Section scheme="light" className="py-16 md:py-20">
        <div className="gutter flex flex-col gap-8 border-t border-rule pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            {project.externalUrl ? (
              <RippleButton href={project.externalUrl} variant="outline">
                {dictionary.common.liveProject}
              </RippleButton>
            ) : (
              <p className="max-w-md text-sm leading-relaxed text-content-muted">
                {project.externalUnavailableReason ?? dictionary.common.unavailable}
              </p>
            )}
          </div>
          <ShareButton
            url={url}
            title={`${project.title} — ${site.name}`}
            label={dictionary.common.shareProject}
            copyLabel={dictionary.common.copyLink}
            copiedLabel={dictionary.common.copied}
          />
        </div>
      </Section>

      {next && next.slug !== project.slug && (
        <Section scheme="dark" flush className="py-20 md:py-28">
          <Link href={withLocale(locale, `/work/${next.slug}`)} className="group gutter block py-2">
            <span className="label text-content-faint">{dictionary.common.nextProject}</span>
            <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-headline leading-[0.95] transition-colors group-hover:text-accent">
                {next.title}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-content-muted">
                {next.summary}
              </p>
            </div>
          </Link>
        </Section>
      )}
    </>
  );
}

function Fact({
  term,
  value,
  className,
}: {
  term: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="label text-content-faint">{term}</dt>
      <dd className="mt-2 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}

function Passage({ term, body }: { term: string; body: string }) {
  return (
    <Reveal className="flex flex-col gap-5">
      <span className="label text-content-faint">{term}</span>
      <p className="text-base leading-relaxed text-content-muted">{body}</p>
    </Reveal>
  );
}
