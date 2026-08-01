import { TextReveal } from "@/components/motion/text-reveal";
import { Section } from "@/components/ui/section";

/**
 * The positioning statement.
 *
 * Forty-one words. This is the only place on the home page where a paragraph
 * is allowed to take up a full screen, and the only use of the scroll-linked
 * reveal.
 */
const STATEMENT =
  "Most businesses do not need more tools. They need someone who understands how the operation actually runs, decides what should exist, and then builds it. I work between strategy and execution, because the gap between them is where most projects quietly fail.";

export function Perspective() {
  return (
    <Section id="perspective" scheme="paper">
      <div className="gutter">
        <span className="label mb-10 block text-content-faint">01 — Perspective</span>
        <TextReveal
          text={STATEMENT}
          className="max-w-5xl font-display text-title leading-[1.25]"
        />
      </div>
    </Section>
  );
}
