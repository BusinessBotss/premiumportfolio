import type { Metadata } from "next";
import Link from "next/link";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRow } from "@/components/projects/project-card";
import { Media } from "@/components/ui/media";
import { Section } from "@/components/ui/section";
import { archiveAssets, archiveCollections, getAssets } from "@/data/assets";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "The full index of published projects and the visual material behind them.";

export const metadata: Metadata = buildMetadata({
  title: "Visual Archive — Elias",
  description: DESCRIPTION,
  path: "/archive",
});

export default function ArchivePage() {
  /* A Year column only exists if there is a year to put in it. */
  const showYear = projects.some((p) => Boolean(p.year));

  return (
    <>
      <Section scheme="dark" className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="gutter flex flex-col gap-6">
          <span className="label text-content-faint">Archive</span>
          <MaskText
            as="h1"
            text="Everything, in order."
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-xl text-lead leading-snug text-content-muted">
            {DESCRIPTION}
          </p>
        </div>
      </Section>

      <Section scheme="light" className="py-16 md:py-20">
        <div className="gutter">
          <div className="label grid grid-cols-12 gap-4 border-b border-rule pb-3 text-content-faint">
            <span className="col-span-2 md:col-span-1">No.</span>
            <span className="col-span-10 md:col-span-4">Project</span>
            <span className={showYear ? "col-span-8 md:col-span-4" : "col-span-10 md:col-span-7"}>
              Category
            </span>
            {showYear && (
              <span className="col-span-4 text-right md:col-span-3">Year</span>
            )}
          </div>

          {/* The cascade is capped so a long index never feels like a queue. */}
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 6) * 0.05}>
              <ProjectRow project={project} index={i} showYear={showYear} />
            </Reveal>
          ))}
        </div>
      </Section>

      {archiveAssets.length > 0 && (
        <Section scheme="paper" className="py-16 md:py-24">
          <div className="gutter mb-10 flex flex-col gap-3 border-b border-rule pb-6">
            <span className="label text-content-faint">Visual material</span>
            <p className="max-w-xl text-sm leading-relaxed text-content-muted">
              Covers and gallery frames from published work. Each links back to
              the project it belongs to.
            </p>
          </div>

          <ul className="gutter grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {archiveAssets.map((asset, i) => {
              const project = projects.find((p) => p.id === asset.projectId);
              const frame = (
                <Media
                  asset={asset}
                  ratio={1}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="transition duration-[var(--duration-hover)] ease-editorial group-hover:-translate-y-1"
                  imageClassName="transition-transform duration-[var(--duration-hover-image)] ease-editorial group-hover:scale-[1.05]"
                />
              );

              return (
                <li key={asset.id} className="group">
                  <Reveal delay={(i % 4) * 0.05}>
                    {project ? (
                      <Link href={`/work/${project.slug}`} aria-label={project.title}>
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
        </Section>
      )}

      {archiveCollections.length > 0 && (
        <Section scheme="light" className="py-16 md:py-24">
          <div className="gutter mb-10 flex flex-col gap-3 border-b border-rule pb-6">
            <span className="label text-content-faint">Collections</span>
            <p className="max-w-xl text-sm leading-relaxed text-content-muted">
              Asset groups that support published work or broader visual
              practice. Collections do not create case-study routes.
            </p>
          </div>

          <div className="gutter grid gap-12">
            {archiveCollections.map((collection) => {
              const assets = getAssets(collection.assetIds);
              const project = collection.projectId
                ? projects.find((p) => p.id === collection.projectId)
                : undefined;

              return (
                <section key={collection.id} className="grid gap-5 md:grid-cols-12">
                  <div className="flex flex-col gap-3 md:col-span-4">
                    <span className="label text-content-faint">{collection.category}</span>
                    <h2 className="font-display text-2xl leading-tight">
                      {collection.title}
                    </h2>
                    {collection.description && (
                      <p className="text-sm leading-relaxed text-content-muted">
                        {collection.description}
                      </p>
                    )}
                    {project && (
                      <Link
                        href={`/work/${project.slug}`}
                        className="label inline-flex min-h-11 w-fit items-center text-content-muted transition-colors hover:text-accent"
                      >
                        View related project
                      </Link>
                    )}
                  </div>
                  <ul className="grid grid-cols-2 gap-4 md:col-span-8 md:grid-cols-4">
                    {assets.map((asset, i) => (
                      <li key={asset.id}>
                        <Reveal delay={(i % 4) * 0.05}>
                          <Media
                            asset={asset}
                            ratio={4 / 5}
                            sizes="(min-width: 768px) 16vw, 50vw"
                          />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
}
