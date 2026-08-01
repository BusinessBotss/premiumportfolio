import { MaskText } from "@/components/motion/mask-text";
import { PixelImage } from "@/components/motion/pixel-image";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { portrait } from "@/data/assets";
import { site } from "@/data/site";

/**
 * About preview.
 *
 * Two paragraphs and a portrait. The full story belongs on /about; this only
 * has to make the visitor want it.
 */
export function AboutPreview() {
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
          <span className="label text-content-faint">05 — About</span>

          <MaskText
            as="h2"
            text="A strategist who builds."
            className="font-display text-headline leading-[1.02]"
          />

          <Reveal delay={0.1} className="flex max-w-xl flex-col gap-5">
            <p className="leading-relaxed text-content-muted">
              I work across digital systems, product and brand — usually for
              businesses in hospitality, fitness, real estate and lifestyle,
              where the operation and the marketing are the same problem seen
              from two sides.
            </p>
            <p className="leading-relaxed text-content-muted">
              I founded {site.venture.name} to deliver that work with structure:
              automation, apps and interfaces built on infrastructure the client
              actually controls. Everything on this site is something that
              shipped.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <a
              href="/about"
              className="label border-b border-rule pb-1 text-content-muted transition-colors hover:text-content"
            >
              More about {site.firstName}
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
