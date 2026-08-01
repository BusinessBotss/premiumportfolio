import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/motion/carousel";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { RippleButton } from "@/components/motion/ripple-button";
import { ShareButton } from "@/components/motion/share-button";
import { Media } from "@/components/ui/media";
import { Section } from "@/components/ui/section";
import { getNextProject, getProject, projects } from "@/data/projects";
import { SITE_URL, site } from "@/data/site";
import { buildMetadata, projectSchema } from "@/lib/metadata";
import { isIndexableProject } from "@/lib/projects";
import type { Project } from "@/types/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Every published project is prerendered; the catalogue is static. Drafts and
 * projects under review are absent from `projects`, so they get no route.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/**
 * Nothing is rendered on demand. Without this an unpublished slug would still
 * resolve at request time, which is exactly the leak the editorial status is
 * meant to prevent.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    title: `${project.title} — ${site.firstName}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.cover.src,
    imageFit:
      project.cover.treatment === "contained-portrait" ||
      project.cover.treatment === "business-bots-cover"
        ? "contain"
        : "cover",
    imageBackground:
      project.cover.treatment === "business-bots-cover"
        ? "101112"
        : project.cover.treatment === "contained-portrait"
          ? "ebe6dc"
          : undefined,
    type: "article",
    noindex: !isIndexableProject(project),
  });
}

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  private: "Private",
};

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const url = `${SITE_URL}/work/${project.slug}`;
  const hasContainedGallery =
    project.gallery?.some((asset) => asset.treatment === "contained-portrait") ?? false;

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
              year: project.year,
              image: project.cover.src,
              client: project.client,
            }),
          ),
        }}
      />

      {/* 1 — Project hero */}
      <Section scheme="dark" flush className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="gutter flex flex-col gap-8">
          <Link
            href="/work"
            className="label inline-flex min-h-11 w-fit items-center text-content-faint transition-colors hover:text-content"
          >
            ← Selected Work
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

        <div className="gutter mt-14">
          <Media
            asset={project.cover}
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
            ratio={project.cover.treatment === "contained-portrait" ? 4 / 3 : 16 / 9}
          />
        </div>
      </Section>

      {/* 2 — Client, sector, year, role. The grid auto-flows, so an absent
          year closes the gap instead of leaving a hole. */}
      <Section scheme="light" className="py-16 md:py-20">
        <dl className="gutter grid grid-cols-2 gap-x-8 gap-y-10 border-b border-rule pb-12 md:grid-cols-4">
          {project.client && <Fact term="Client" value={project.client} />}
          <Fact term="Sector" value={project.industries.join(", ")} />
          {project.year && <Fact term="Year" value={project.year} />}
          <Fact term="Status" value={STATUS_LABEL[project.status]} />
          <Fact term="Discipline" value={project.disciplines.join(", ")} className="col-span-2" />
          {project.location && <Fact term="Location" value={project.location} />}
          <Fact term="Category" value={project.category} />
        </dl>

        {/* 3 — Overview */}
        {project.overview && (
          <div className="gutter mt-16 grid gap-8 md:grid-cols-12">
            <span className="label text-content-faint md:col-span-3">Overview</span>
            <Reveal className="md:col-span-8">
              <p className="text-lead leading-snug">{project.overview}</p>
            </Reveal>
          </div>
        )}

        {/* 4 — Challenge / 5 — Response */}
        {(project.challenge || project.response) && (
          <div className="gutter mt-16 grid gap-12 md:grid-cols-2">
            {project.challenge && (
              <Passage term="Challenge" body={project.challenge} />
            )}
            {project.response && (
              <Passage term="Strategic response" body={project.response} />
            )}
          </div>
        )}
      </Section>

      {/* 7 — Deliverables */}
      {project.deliverables && project.deliverables.length > 0 && (
        <Section scheme="paper" className="py-20 md:py-24">
          <div className="gutter grid gap-8 md:grid-cols-12">
            <span className="label text-content-faint md:col-span-3">Delivered</span>
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

      {/* 8 — Results */}
      {(project.outcome || (project.metrics && project.metrics.length > 0)) && (
        <Section scheme="dark" className="py-20 md:py-24">
          <div className="gutter flex flex-col gap-10">
            <span className="label text-content-faint">Outcome</span>
            {project.outcome && (
              <p className="max-w-3xl text-lead leading-snug">{project.outcome}</p>
            )}
            {project.metrics && project.metrics.length > 0 && (
              <dl className="grid grid-cols-2 gap-8 border-t border-rule pt-10 md:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-2">
                    <dt className="font-display text-title leading-none">{m.value}</dt>
                    <dd className="text-sm text-content-muted">{m.label}</dd>
                    {m.source && (
                      <dd className="label text-content-faint">{m.source}</dd>
                    )}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Section>
      )}

      {/* 9 — Contribution and collaborators */}
      {(project.contribution || project.collaborators || project.credits) && (
        <Section scheme="light" className="py-20 md:py-24">
          <div className="gutter grid gap-12 md:grid-cols-12">
            {project.contribution && project.contribution.length > 0 && (
              <div className="flex flex-col gap-5 md:col-span-7">
                <span className="label text-content-faint">My contribution</span>
                <ul className="flex flex-col gap-3">
                  {project.contribution.map((c) => (
                    <li key={c} className="text-base leading-relaxed text-content-muted">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.collaborators && project.collaborators.length > 0 && (
              <div className="flex flex-col gap-5 md:col-span-5">
                <span className="label text-content-faint">Collaborators</span>
                <ul className="flex flex-col gap-3">
                  {project.collaborators.map((c) => (
                    <li key={c.name} className="text-base leading-relaxed">
                      {c.url ? (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-accent"
                        >
                          {c.name}
                        </a>
                      ) : (
                        c.name
                      )}
                      <span className="text-content-muted"> — {c.role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.credits && (
              <p className="text-sm leading-relaxed text-content-muted md:col-span-12">
                {project.credits}
              </p>
            )}
          </div>
        </Section>
      )}

      {/* 10 — Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <Section scheme="paper" className="py-20 md:py-24">
          <div className="gutter mb-10">
            <span className="label text-content-faint">Gallery</span>
          </div>
          {hasContainedGallery ? (
            <ul className="gutter grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {project.gallery.map((asset, i) => (
                <Reveal key={asset.id} delay={(i % 4) * 0.05}>
                  <li>
                    <Media
                      asset={asset}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </li>
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="gutter">
              <Carousel label={`${project.title} gallery`}>
                {project.gallery.map((asset) => (
                  <div key={asset.id} className="w-full shrink-0 snap-start md:w-[46vw]">
                    <Media asset={asset} sizes="(min-width: 768px) 46vw, 80vw" />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </Section>
      )}

      {/* 11 — Live artefact + share */}
      <Section scheme="light" className="py-16 md:py-20">
        <div className="gutter flex flex-col gap-8 border-t border-rule pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            {project.externalUrl ? (
              <RippleButton href={project.externalUrl} variant="outline">
                Visit the live project
              </RippleButton>
            ) : (
              <p className="max-w-md text-sm leading-relaxed text-content-muted">
                {project.externalUnavailableReason ??
                  "The live artefact is not publicly available."}
              </p>
            )}
          </div>
          <ShareButton url={url} title={`${project.title} — ${site.name}`} />
        </div>
      </Section>

      {/* 12 — Next project */}
      {next && next.slug !== project.slug && (
        <Section scheme="dark" flush className="py-20 md:py-28">
          <Link href={`/work/${next.slug}`} className="group gutter block py-2">
            <span className="label text-content-faint">Next project</span>
            <div className="mt-5 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-headline leading-[0.95] transition-colors group-hover:text-accent">
                {next.title}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-content-muted">
                {next.summary}
              </p>
            </div>
            <div className="mt-10">
              <Media
                asset={next.cover}
                sizes="(min-width: 1280px) 1200px, 100vw"
                ratio={21 / 9}
                imageClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
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
