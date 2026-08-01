import type { Metadata } from "next";
import { Enquiry } from "@/components/contact/enquiry";
import { MaskText } from "@/components/motion/mask-text";
import { RippleButton } from "@/components/motion/ripple-button";
import { ShineBorder } from "@/components/motion/shine-border";
import { LocalTime } from "@/components/ui/local-time";
import { Section } from "@/components/ui/section";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "Start a project with Elias — strategy, digital products and brand direction for businesses in hospitality, fitness, real estate and lifestyle.";

export const metadata: Metadata = buildMetadata({
  title: "Contact Elias — Start a Project",
  description: DESCRIPTION,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Section scheme="dark" className="pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="gutter flex flex-col gap-8">
          <ShineBorder className="w-fit rounded-full">
            <span className="label flex items-center gap-2.5 rounded-full px-4 py-2 text-content-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {site.availability}
            </span>
          </ShineBorder>

          <MaskText
            as="h1"
            text="Start a project."
            className="font-display text-headline leading-[0.95]"
          />
          <p className="max-w-2xl text-lead leading-snug text-content-muted">
            Seven short questions. It takes about a minute and means the first
            reply is useful rather than a request for more information.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
            <span className="label text-content-faint">
              {site.location} — <LocalTime />
            </span>
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-11 items-center border-b border-rule text-content-muted transition-colors hover:text-content"
            >
              Prefer WhatsApp? Start a direct conversation
            </a>
          </div>
        </div>
      </Section>

      <Section scheme="light" className="py-16 md:py-24">
        <div className="gutter grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Enquiry />
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-4">
            <div className="flex flex-col gap-4 border-t border-rule pt-6">
              <span className="label text-content-faint">Direct</span>
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
              <span className="label text-content-faint">Background</span>
              <p className="text-sm leading-relaxed text-content-muted">
                A short overview of how {site.venture.name} works, the delivery
                structure and what a typical engagement looks like.
              </p>
              <RippleButton href={site.contact.pitchDeck} variant="outline">
                View the pitch deck
              </RippleButton>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
