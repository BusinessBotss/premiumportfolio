import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Enquiry } from "@/components/contact/enquiry";
import { MaskText } from "@/components/motion/mask-text";
import { RippleButton } from "@/components/motion/ripple-button";
import { ShineBorder } from "@/components/motion/shine-border";
import { LocalTime } from "@/components/ui/local-time";
import { Section } from "@/components/ui/section";
import { site } from "@/data/site";
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
    title: dictionary.metadata.contact.title,
    description: dictionary.metadata.contact.description,
    path: "/contact",
    locale: rawLocale,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter flex flex-col gap-8">
          <ShineBorder className="w-fit rounded-full">
            <span className="label flex items-center gap-2.5 rounded-full px-4 py-2 text-content-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {dictionary.common.availability}
            </span>
          </ShineBorder>

          <MaskText
            as="h1"
            text={dictionary.contact.title}
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-2xl text-lead leading-snug text-content-muted">
            {dictionary.contact.intro}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
            <span className="label text-content-faint">
              {dictionary.common.location} — <LocalTime />
            </span>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-11 items-center border-b border-rule text-content-muted transition-colors hover:text-content"
            >
              {dictionary.contact.directWhatsapp}
            </a>
          </div>
        </div>
      </Section>

      <Section scheme="light" className="py-16 md:py-24">
        <div className="gutter grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Enquiry dictionary={dictionary} />
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-4">
            <div className="flex flex-col gap-4 border-t border-rule pt-6">
              <span className="label text-content-faint">{dictionary.contact.direct}</span>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-11 min-w-11 items-center text-base transition-colors hover:text-accent"
              >
                {site.contact.email}
              </a>
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center text-base transition-colors hover:text-accent"
              >
                WhatsApp
              </a>
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center text-base transition-colors hover:text-accent"
              >
                Instagram
              </a>
            </div>

            <div className="flex flex-col gap-4 border-t border-rule pt-6">
              <span className="label text-content-faint">{dictionary.contact.background}</span>
              <p className="text-sm leading-relaxed text-content-muted">
                {dictionary.contact.backgroundText}
              </p>
              <RippleButton href={site.contact.pitchDeck} variant="outline">
                {dictionary.contact.pitchDeck}
              </RippleButton>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
