import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArchiveFilterGrid,
  type ArchiveFilter,
  type FilteredAsset,
} from "@/components/projects/archive-filter-grid";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ProjectRow } from "@/components/projects/project-card";
import { Media } from "@/components/ui/media";
import { Section } from "@/components/ui/section";
import { archiveAssets, archiveCollections, getAssets } from "@/data/assets";
import { projects } from "@/data/projects";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";
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
    title: dictionary.metadata.archive.title,
    description: dictionary.metadata.archive.description,
    path: "/archive",
    locale: rawLocale,
  });
}

function filtersFor(assetId: string, projectId?: string): ArchiveFilter[] {
  const filters: ArchiveFilter[] = [];
  if (/cover|app|interface|bots|vincxx|buborant/i.test(assetId)) filters.push("web");
  if (/flyer|campaign|hybryd|ohlala|logo/i.test(assetId)) filters.push("brand");
  if (/lounge|buborant|beach|reis/i.test(assetId) || projectId === "my-lounge-palmanova") filters.push("hospitality");
  if (/rodrigo|jeremy/i.test(assetId) || projectId === "rodrigo-zabala") filters.push("realEstate");
  if (/gym|hybryd|wellness/i.test(assetId) || projectId === "gym-tonic-app") filters.push("fitness");
  if (/charter|marine|boat|DJI|063/i.test(assetId) || projectId === "mallorca-charter-experiences") filters.push("marine");
  if (/visual-campaign|tiktok|content/i.test(assetId)) filters.push("growth");
  return filters.length ? filters : ["web"];
}

export default async function ArchivePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const localizedProjects = localizeProjects(projects, locale);
  const showYear = localizedProjects.some((p) => Boolean(p.year));
  const filteredAssets: FilteredAsset[] = archiveAssets.map((asset) => ({
    asset,
    filters: filtersFor(asset.id, asset.projectId),
  }));

  return (
    <>
      <Section scheme="dark" className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="gutter flex flex-col gap-6">
          <span className="label text-content-faint">{dictionary.archive.eyebrow}</span>
          <MaskText
            as="h1"
            text={dictionary.archive.title}
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-xl text-lead leading-snug text-content-muted">
            {dictionary.metadata.archive.description}
          </p>
        </div>
      </Section>

      <Section scheme="light" className="py-16 md:py-20">
        <div className="gutter">
          <div className="label grid grid-cols-12 gap-4 border-b border-rule pb-3 text-content-faint">
            <span className="col-span-2 md:col-span-1">{dictionary.archive.tableNo}</span>
            <span className="col-span-10 md:col-span-4">{dictionary.archive.tableProject}</span>
            <span className={showYear ? "col-span-8 md:col-span-4" : "col-span-10 md:col-span-7"}>
              {dictionary.archive.tableCategory}
            </span>
            {showYear && (
              <span className="col-span-4 text-right md:col-span-3">
                {dictionary.archive.tableYear}
              </span>
            )}
          </div>

          {localizedProjects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 6) * 0.05}>
              <ProjectRow
                project={project}
                locale={locale}
                index={i}
                showYear={showYear}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {archiveAssets.length > 0 && (
        <Section scheme="paper" className="py-16 md:py-24">
          <div className="gutter mb-10 flex flex-col gap-3 border-b border-rule pb-6">
            <span className="label text-content-faint">{dictionary.archive.material}</span>
            <p className="max-w-xl text-sm leading-relaxed text-content-muted">
              {dictionary.archive.materialText}
            </p>
          </div>
          <ArchiveFilterGrid
            items={filteredAssets}
            projects={localizedProjects}
            locale={locale}
            dictionary={dictionary}
          />
        </Section>
      )}

      {archiveCollections.length > 0 && (
        <Section scheme="light" className="py-16 md:py-24">
          <div className="gutter mb-10 flex flex-col gap-3 border-b border-rule pb-6">
            <span className="label text-content-faint">{dictionary.archive.collections}</span>
            <p className="max-w-xl text-sm leading-relaxed text-content-muted">
              {dictionary.archive.collectionsText}
            </p>
          </div>

          <div className="gutter grid gap-12">
            {archiveCollections.map((collection) => {
              const assets = getAssets(collection.assetIds);
              const collectionCopy = dictionary.archive.collectionCopy[collection.id];
              const project = collection.projectId
                ? localizedProjects.find((p) => p.id === collection.projectId)
                : undefined;

              return (
                <section key={collection.id} className="grid gap-5 md:grid-cols-12">
                  <div className="flex flex-col gap-3 md:col-span-4">
                    <span className="label text-content-faint">
                      {collectionCopy?.category ?? collection.category}
                    </span>
                    <h2 className="font-display text-2xl leading-tight">
                      {collection.title}
                    </h2>
                    {(collectionCopy?.description ?? collection.description) && (
                      <p className="text-sm leading-relaxed text-content-muted">
                        {collectionCopy?.description ?? collection.description}
                      </p>
                    )}
                    {project && (
                      <Link
                        href={withLocale(locale, `/work/${project.slug}`)}
                        className="label inline-flex min-h-11 w-fit items-center text-content-muted transition-colors hover:text-accent"
                      >
                        {dictionary.archive.relatedProject}
                      </Link>
                    )}
                  </div>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8 md:grid-cols-4">
                    {assets.map((asset, i) => (
                      <li key={asset.id}>
                        <Reveal delay={(i % 4) * 0.05}>
                          <Media
                            asset={asset}
                            ratio={4 / 5}
                            sizes="(min-width: 768px) 16vw, 100vw"
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
