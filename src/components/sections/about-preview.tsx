import { MaskText } from "@/components/motion/mask-text";
import { PixelImage } from "@/components/motion/pixel-image";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { portrait } from "@/data/assets";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";

/**
 * About preview.
 *
 * Two paragraphs and a portrait. The full story belongs on /about; this only
 * has to make the visitor want it.
 */
export function AboutPreview({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  return (
    <Section id="about" scheme="light">
      <div className="gutter grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <PixelImage
            src={portrait.src}
            alt={portrait.alt}
            ratio={4 / 5}
            focus={portrait.focus}
          />
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7 lg:pt-10">
          <span className="label text-content-faint">{dictionary.home.about.eyebrow}</span>

          <MaskText
            as="h2"
            text={dictionary.home.about.title}
            className="font-display text-headline leading-[1.02]"
          />

          <Reveal delay={0.1} className="flex max-w-xl flex-col gap-5">
            {dictionary.home.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-content-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href={withLocale(locale, "/about")}
              className="label border-b border-rule pb-1 text-content-muted transition-colors hover:text-content"
            >
              {dictionary.home.about.link}
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
