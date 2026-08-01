import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaskText } from "@/components/motion/mask-text";
import { PixelImage } from "@/components/motion/pixel-image";
import { Reveal } from "@/components/motion/reveal";
import { RippleButton } from "@/components/motion/ripple-button";
import { Section } from "@/components/ui/section";
import { portrait } from "@/data/assets";
import { capabilities } from "@/data/capabilities";
import { relationships, relationshipsIntro } from "@/data/clients";
import { isPublicSlug } from "@/data/projects";
import { site } from "@/data/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  localizeCapability,
  translateEngagement,
  translateRelationshipsIntro,
} from "@/i18n/localized-content";
import { withLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);

  return buildMetadata({
    title: dictionary.metadata.about.title,
    description: dictionary.metadata.about.description,
    path: "/about",
    locale: rawLocale,
    image: site.media.portrait,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);
  const localizedCapabilities = capabilities.map((capability) => localizeCapability(capability, locale));

  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <span className="label text-content-faint">{dictionary.about.eyebrow}</span>
            <MaskText
              as="h1"
              text={dictionary.about.title}
              className="font-display text-headline leading-[0.95]"
            />
            <p className="max-w-xl text-lead leading-snug text-content-muted">
              {dictionary.about.intro}
            </p>
          </div>

          <div className="lg:col-span-5">
            <PixelImage
              src={portrait.src}
              alt={portrait.alt}
              ratio={4 / 5}
              focus={portrait.focus}
            />
          </div>
        </div>
      </Section>

      <Section scheme="light">
        <div className="gutter grid gap-10 md:grid-cols-12">
          <span className="label text-content-faint md:col-span-3">
            {dictionary.about.storyLabel}
          </span>
          <div className="flex flex-col gap-7 md:col-span-8">
            {dictionary.about.story.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 0.06}>
                <p className="text-lead leading-snug text-content-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section scheme="paper">
        <div className="gutter mb-12 flex flex-col gap-4 border-b border-rule pb-6">
          <span className="label text-content-faint">{dictionary.about.whatLabel}</span>
          <h2 className="font-display text-title leading-none">
            {dictionary.about.whatTitle}
          </h2>
        </div>

        <div className="gutter grid gap-x-10 gap-y-12 md:grid-cols-2">
          {localizedCapabilities.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.06}>
              <div className="flex flex-col gap-4 border-t border-rule pt-6">
                <h3 className="font-display text-xl leading-tight md:text-2xl">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-content-muted">
                  {c.description}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {c.areas.map((a) => (
                    <li key={a} className="label text-content-faint">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section scheme="dark">
        <div className="gutter mb-12 flex flex-col gap-4 border-b border-rule pb-6">
          <span className="label text-content-faint">{dictionary.about.relationshipsLabel}</span>
          <p className="max-w-2xl text-sm leading-relaxed text-content-muted">
            {translateRelationshipsIntro(relationshipsIntro, locale)}
          </p>
        </div>

        <ul className="gutter grid gap-x-10 md:grid-cols-2">
          {relationships.map((r) => (
            <li
              key={r.name}
              className="flex items-baseline justify-between gap-6 border-b border-rule py-5"
            >
              <span className="font-display text-lg md:text-xl">
                {r.projectSlug && isPublicSlug(r.projectSlug) ? (
                  <Link
                    href={withLocale(locale, `/work/${r.projectSlug}`)}
                    className="transition-colors hover:text-accent"
                  >
                    {r.name}
                  </Link>
                ) : (
                  r.name
                )}
              </span>
              <span className="label min-w-0 text-right text-content-faint">
                {translateEngagement(r.engagement, locale)}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section scheme="light" className="py-20 md:py-28">
        <div className="gutter flex flex-col items-start gap-8">
          <h2 className="max-w-2xl font-display text-title leading-tight">
            {dictionary.about.cta}
          </h2>
          <div className="flex flex-wrap gap-3">
            <RippleButton href={withLocale(locale, "/contact")}>
              {dictionary.common.startProject}
            </RippleButton>
            <RippleButton href={withLocale(locale, "/work")} variant="outline">
              {dictionary.common.seeWork}
            </RippleButton>
          </div>
        </div>
      </Section>
    </>
  );
}
