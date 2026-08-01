import type { Metadata } from "next";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { featuredProjects, projects, secondaryProjects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "Selected digital systems, products and brand work for businesses in hospitality, fitness, real estate and lifestyle.";

export const metadata: Metadata = buildMetadata({
  title: "Selected Work — Elias",
  description: DESCRIPTION,
  path: "/work",
  image: featuredProjects[0]?.cover.src,
});

/** Alternating column spans keep the index editorial rather than gridded. */
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const RATIOS = [4 / 3, 3 / 4, 3 / 4, 4 / 3];

export default function WorkPage() {
  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter flex flex-col gap-8">
          <span className="label text-content-faint">Selected Work</span>
          <MaskText
            as="h1"
            text="The work itself."
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-2xl text-lead leading-snug text-content-muted">
            {DESCRIPTION}
          </p>
          <p className="label text-content-faint">
            {projects.length} projects — {featuredProjects.length} featured
          </p>
        </div>
      </Section>

      <Section scheme="light" className="pt-20 md:pt-28">
        <div className="gutter grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {featuredProjects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 0.08}
              className={SPANS[i % SPANS.length]}
            >
              <ProjectCard
                project={project}
                index={i}
                ratio={RATIOS[i % RATIOS.length]}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {secondaryProjects.length > 0 && (
        <Section scheme="paper">
          <div className="gutter mb-14 flex flex-col gap-4 border-b border-rule pb-6">
            <span className="label text-content-faint">Also delivered</span>
            <h2 className="font-display text-title leading-none">
              Shorter engagements.
            </h2>
          </div>

          <div className="gutter grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.06}>
                <ProjectCard
                  project={project}
                  index={featuredProjects.length + i}
                  ratio={4 / 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
