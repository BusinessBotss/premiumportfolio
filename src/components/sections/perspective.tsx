import { TextReveal } from "@/components/motion/text-reveal";
import { Section } from "@/components/ui/section";
import type { AppDictionary } from "@/i18n/dictionaries";

/**
 * The positioning statement.
 *
 * Forty-one words. This is the only place on the home page where a paragraph
 * is allowed to take up a full screen, and the only use of the scroll-linked
 * reveal.
 */
export function Perspective({ dictionary }: { dictionary: AppDictionary }) {
  return (
    <Section id="perspective" scheme="paper">
      <div className="gutter">
        <span className="label mb-10 block text-content-faint">
          {dictionary.home.perspective.eyebrow}
        </span>
        <TextReveal
          text={dictionary.home.perspective.text}
          className="max-w-5xl font-display text-title leading-[1.25]"
        />
      </div>
    </Section>
  );
}
