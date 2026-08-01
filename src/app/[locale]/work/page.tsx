import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/ui/section";
import { featuredProjects, projects, secondaryProjects } from "@/data/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizeProjects } from "@/lib/localized-projects";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);

  return buildMetadata({
    title: dictionary.metadata.work.title,
    description: dictionary.metadata.work.description,
    path: "/work",
    locale: rawLocale,
    image: featuredProjects[0]?.cover.src,
  });
}

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
const RATIOS = [4 / 3, 3 / 4, 3 / 4, 4 / 3];

export default async function WorkPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const localizedFeatured = localizeProjects(featuredProjects, locale);
  const localizedSecondary = localizeProjects(secondaryProjects, locale);

  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter flex flex-col gap-8">
          <span className="label text-content-faint">{dictionary.work.eyebrow}</span>
          <MaskText
            as="h1"
            text={dictionary.work.title}
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-2xl text-lead leading-snug text-content-muted">
            {dictionary.metadata.work.description}
          </p>
          <p className="label text-content-faint">
            {dictionary.work.countLabel
              .replace("{total}", String(projects.length))
              .replace("{featured}", String(featuredProjects.length))}
          </p>
        </div>
      </Section>

      <Section scheme="light" className="pt-20 md:pt-28">
        <div className="gutter grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {localizedFeatured.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 0.08}
              className={SPANS[i % SPANS.length]}
            >
              <ProjectCard
                project={project}
                locale={locale}
                index={i}
                ratio={RATIOS[i % RATIOS.length]}
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={i === 0}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {localizedSecondary.length > 0 && (
        <Section scheme="paper">
          <div className="gutter mb-14 flex flex-col gap-4 border-b border-rule pb-6">
            <span className="label text-content-faint">{dictionary.work.alsoDelivered}</span>
            <h2 className="font-display text-title leading-none">
              {dictionary.work.shorter}
            </h2>
          </div>

          <div className="gutter grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {localizedSecondary.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.06}>
                <ProjectCard
                  project={project}
                  locale={locale}
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
