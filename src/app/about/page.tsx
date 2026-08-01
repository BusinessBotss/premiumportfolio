import type { Metadata } from "next";
import Link from "next/link";
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
import { buildMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "Elias works at the point where strategy, technology and brand meet — building digital systems and products for businesses in hospitality, fitness, real estate and lifestyle.";

export const metadata: Metadata = buildMetadata({
  title: "About Elias — Strategy, Design & Digital Systems",
  description: DESCRIPTION,
  path: "/about",
  image: site.media.portrait,
});

/**
 * Narrative in three parts: how the perspective was formed, what it produces,
 * and who it has been applied for. No mission statement, no values grid.
 */
const STORY = [
  "I started inside the businesses I now build for. Hospitality and fitness in Mallorca — where the gap between how a business presents itself and how it actually runs is impossible to miss, because you are standing in it.",
  "That is where the perspective comes from. Most digital work fails not because the technology is wrong but because it was designed for a business that does not exist: one with time to learn a new system, staff who will maintain it, and customers who read instructions.",
  "So the work runs in both directions. Strategy that is grounded in operations, and execution that ships. Through Business Bots Solutions I deliver the technical side with a team; the direction, positioning and product decisions stay with me.",
];

export default function AboutPage() {
  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-8 lg:col-span-7">
            <span className="label text-content-faint">About</span>
            <MaskText
              as="h1"
              text="A strategist who builds."
              className="font-display text-headline leading-[0.95]"
            />
            <p className="max-w-xl text-lead leading-snug text-content-muted">
              {site.role}. Based in {site.location}, working with businesses that
              need the thinking and the delivery to come from the same place.
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
            How I got here
          </span>
          <div className="flex flex-col gap-7 md:col-span-8">
            {STORY.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.06}>
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
          <span className="label text-content-faint">What I do</span>
          <h2 className="font-display text-title leading-none">
            Six areas, one practice.
          </h2>
        </div>

        <div className="gutter grid gap-x-10 gap-y-12 md:grid-cols-2">
          {capabilities.map((c, i) => (
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
          <span className="label text-content-faint">Who I work with</span>
          <p className="max-w-2xl text-sm leading-relaxed text-content-muted">
            {relationshipsIntro}
          </p>
        </div>

        <ul className="gutter grid gap-x-10 md:grid-cols-2">
          {relationships.map((r) => (
            <li
              key={r.name}
              className="flex items-baseline justify-between gap-6 border-b border-rule py-5"
            >
              <span className="font-display text-lg md:text-xl">
                {/* Linked only where the case study is actually published. */}
                {r.projectSlug && isPublicSlug(r.projectSlug) ? (
                  <Link
                    href={`/work/${r.projectSlug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {r.name}
                  </Link>
                ) : (
                  r.name
                )}
              </span>
              <span className="label shrink-0 text-right text-content-faint">
                {r.engagement}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section scheme="light" className="py-20 md:py-28">
        <div className="gutter flex flex-col items-start gap-8">
          <h2 className="max-w-2xl font-display text-title leading-tight">
            If any of this maps onto what you are building, the next step is a
            conversation.
          </h2>
          <div className="flex flex-wrap gap-3">
            <RippleButton href="/contact">Start a project</RippleButton>
            <RippleButton href="/work" variant="outline">
              See the work
            </RippleButton>
          </div>
        </div>
      </Section>
    </>
  );
}
