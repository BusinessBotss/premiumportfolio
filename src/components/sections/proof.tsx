import Link from "next/link";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { relationships, relationshipsIntro } from "@/data/clients";
import { isPublicSlug } from "@/data/projects";
import { testimonials } from "@/data/testimonials";

/**
 * Proof.
 *
 * Named relationships and what was actually delivered. Quotes render only when
 * verified ones exist; until then the evidence is the work itself, which is a
 * stronger claim than anonymous praise.
 */
export function Proof() {
  return (
    <Section id="proof" scheme="dark">
      <div className="gutter mb-14 flex flex-col gap-4 border-b border-rule pb-6">
        <span className="label text-content-faint">06 — Proof</span>
        <h2 className="font-display text-title leading-none">Who I work with.</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-content-muted">
          {relationshipsIntro}
        </p>
      </div>

      <Marquee duration={52} className="mb-6">
        {relationships.map((r) => (
          <RelationshipChip key={r.name} name={r.name} engagement={r.engagement} slug={r.projectSlug} />
        ))}
      </Marquee>

      <Marquee duration={64} reverse>
        {[...relationships].reverse().map((r) => (
          <RelationshipChip
            key={`${r.name}-b`}
            name={r.name}
            engagement={r.industry}
            slug={r.projectSlug}
          />
        ))}
      </Marquee>

      {testimonials.length > 0 && (
        <div className="gutter mt-20 grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <Reveal key={`${t.name}-${t.company}`}>
              <figure className="flex flex-col gap-5 border-t border-rule pt-6">
                <blockquote className="text-lead leading-snug">“{t.quote}”</blockquote>
                <figcaption className="label text-content-muted">
                  {t.name} — {t.role}, {t.company}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

function RelationshipChip({
  name,
  engagement,
  slug,
}: {
  name: string;
  engagement: string;
  slug?: string;
}) {
  const content = (
    <span className="flex shrink-0 items-baseline gap-3 whitespace-nowrap">
      <span className="font-display text-2xl md:text-3xl">{name}</span>
      <span className="label text-content-faint">{engagement}</span>
    </span>
  );

  /* A slug is not a promise of a page. Unpublished work stays as plain text
     rather than becoming a dead link. */
  if (!slug || !isPublicSlug(slug)) return content;

  return (
    <Link href={`/work/${slug}`} className="transition-colors hover:text-accent">
      {content}
    </Link>
  );
}
