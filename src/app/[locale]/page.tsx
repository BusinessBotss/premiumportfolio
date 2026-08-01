import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPreview } from "@/components/sections/about-preview";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Perspective } from "@/components/sections/perspective";
import { Proof } from "@/components/sections/proof";
import { SelectedWork } from "@/components/sections/selected-work";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);

  return buildMetadata({
    title: dictionary.metadata.home.title,
    description: dictionary.metadata.home.description,
    path: "/",
    locale: rawLocale,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dictionary={dictionary} />
      <Perspective dictionary={dictionary} />
      <SelectedWork locale={locale} dictionary={dictionary} />
      <Capabilities locale={locale} dictionary={dictionary} />
      <Industries locale={locale} dictionary={dictionary} />
      <AboutPreview locale={locale} dictionary={dictionary} />
      <Proof locale={locale} dictionary={dictionary} />
    </>
  );
}
