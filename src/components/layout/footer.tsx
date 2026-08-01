import Link from "next/link";
import { RippleButton } from "@/components/motion/ripple-button";
import { ShineBorder } from "@/components/motion/shine-border";
import { MaskText } from "@/components/motion/mask-text";
import { LocalTime } from "@/components/ui/local-time";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { AppDictionary } from "@/i18n/dictionaries";
import { withLocale } from "@/i18n/routing";

/**
 * Closing section and site footer.
 *
 * The last thing on every page is a way to start a conversation — one
 * committed action, one faster alternative.
 */
export function Footer({ locale, dictionary }: { locale: Locale; dictionary: AppDictionary }) {
  const footerNav = [
    { label: dictionary.navigation.footer.work, href: withLocale(locale, "/work") },
    { label: dictionary.navigation.footer.about, href: withLocale(locale, "/about") },
    { label: dictionary.navigation.footer.archive, href: withLocale(locale, "/archive") },
    { label: dictionary.navigation.footer.contact, href: withLocale(locale, "/contact") },
  ];
  const socialNav = [
    { label: dictionary.navigation.social.whatsapp, href: site.contact.whatsapp },
    { label: dictionary.navigation.social.instagram, href: site.contact.instagram },
    { label: dictionary.navigation.social.email, href: `mailto:${site.contact.email}` },
    { label: dictionary.navigation.social.pitchDeck, href: site.contact.pitchDeck },
  ];

  return (
    <footer data-scheme="dark" className="grain bg-surface text-content">
      <div className="gutter flex flex-col gap-16 py-24 md:py-32">
        <div className="flex flex-col gap-10">
          <ShineBorder className="self-start">
            <span className="flex items-center gap-2 px-4 py-2">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="label text-content-muted">{dictionary.common.availability}</span>
            </span>
          </ShineBorder>

          <MaskText
            as="h2"
            text={
              locale === "es"
                ? "Construyamos algo útil, distintivo y listo para crecer."
                : locale === "de"
                  ? "Lass uns etwas Nützliches, Prägnantes und Skalierbares bauen."
                  : "Let's build something useful, distinctive and ready to scale."
            }
            className="max-w-4xl font-display text-headline leading-[1.02]"
          />

          <div className="flex flex-wrap items-center gap-4">
            <RippleButton href={withLocale(locale, "/contact")}>
              {dictionary.common.startProject}
            </RippleButton>
            <RippleButton href={site.contact.whatsapp} variant="outline">
              {dictionary.common.preferWhatsapp}
            </RippleButton>
          </div>
        </div>

        <div className="grid gap-10 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="label text-content-faint">{dictionary.navigation.direct}</span>
            <a
              href={`mailto:${site.contact.email}`}
              className="link-editorial inline-flex min-h-11 min-w-11 items-center"
            >
              {site.contact.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            <span className="label text-content-faint">{dictionary.navigation.navigate}</span>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-editorial inline-flex min-h-11 min-w-11 items-center"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <span className="label text-content-faint">{dictionary.navigation.elsewhere}</span>
            {socialNav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial inline-flex min-h-11 min-w-11 items-center"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="label text-content-faint">{dictionary.navigation.basedIn}</span>
            <span>{dictionary.common.location}</span>
            <LocalTime />
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm text-content-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>
            {site.venture.role} —{" "}
            <a
              href={site.venture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial inline-flex min-h-11 items-center align-baseline"
            >
              {site.venture.name}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
