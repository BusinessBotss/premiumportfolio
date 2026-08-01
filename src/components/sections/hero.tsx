import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { RippleButton } from "@/components/motion/ripple-button";
import { LocalTime } from "@/components/ui/local-time";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";

/**
 * Opening screen.
 *
 * One name, one statement, two actions. Everything else waits for the scroll.
 * The background is a pair of slowly drifting light fields — abstract motion
 * that does not compete with the type and costs nothing to render.
 */
export function Hero({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  return (
    <section
      data-scheme="dark"
      className="grain relative flex min-h-[92svh] flex-col justify-end overflow-hidden bg-surface text-content pb-12 pt-32 md:min-h-svh md:pb-16"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -left-[10%] top-[-20%] size-[70vw] rounded-full opacity-[0.28] blur-[100px]"
          style={{
            background: "radial-gradient(circle, var(--accent), transparent 65%)",
            animation: "drift 26s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -right-[15%] bottom-[-25%] size-[60vw] rounded-full opacity-[0.16] blur-[120px]"
          style={{
            background: "radial-gradient(circle, #ffffff, transparent 62%)",
            animation: "drift 34s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="gutter flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Reveal>
            <span className="label text-content-muted">
              {dictionary.common.location} — {dictionary.common.role}
            </span>
          </Reveal>

          {/* The name is the only place the cascade runs per character —
              it is short enough that the letters read as a composition
              rather than a queue. */}
          <MaskText
            as="h1"
            text={dictionary.home.hero.title}
            split="char"
            stagger={0.035}
            className="font-display text-display leading-[0.86] tracking-[-0.03em]"
          />
        </div>

        <div className="flex flex-col gap-10 border-t border-rule pt-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1} className="max-w-xl">
            <p className="text-lead leading-snug text-content-muted">
              {dictionary.common.positioning}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-4">
              <RippleButton href={withLocale(locale, "/work")}>
                {dictionary.home.hero.ctaWork}
              </RippleButton>
              <RippleButton href={withLocale(locale, "/contact")} variant="outline">
                {dictionary.home.hero.ctaContact}
              </RippleButton>
            </div>
          </Reveal>
        </div>

        <div className="flex items-center justify-between">
          <a
            href="#perspective"
            className="label inline-flex min-h-11 min-w-11 items-center text-content-faint transition-colors hover:text-content"
          >
            {dictionary.home.hero.scroll}
          </a>
          <LocalTime />
        </div>
      </div>
    </section>
  );
}
