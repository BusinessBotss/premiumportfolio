import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { HtmlLang } from "@/components/layout/html-lang";
import { SITE_URL, site } from "@/data/site";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata, personSchema } from "@/lib/metadata";

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const dictionary = getDictionary(rawLocale);

  return {
    metadataBase: new URL(SITE_URL),
    ...buildMetadata({
      title: dictionary.metadata.home.title,
      description: dictionary.metadata.home.description,
      path: "/",
      locale: rawLocale,
    }),
    icons: { icon: site.media.favicon },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dictionary = getDictionary(locale);

  return (
    <>
      <HtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
      />
      <a
        href="#main"
        className="sr-only-focusable label left-4 top-4 z-[60] border border-rule bg-surface px-4 py-2 text-content"
      >
        {dictionary.common.skipToContent}
      </a>
      <Header locale={locale} dictionary={dictionary} />
      <main id="main">{children}</main>
      <Footer locale={locale} dictionary={dictionary} />
    </>
  );
}
