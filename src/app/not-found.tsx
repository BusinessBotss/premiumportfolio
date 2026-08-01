import { RippleButton } from "@/components/motion/ripple-button";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section scheme="dark" className="flex min-h-[70svh] items-center">
      <div className="gutter flex flex-col items-start gap-8">
        <span className="label text-content-faint">404</span>
        <h1 className="max-w-2xl font-display text-headline leading-[0.95]">
          That page does not exist.
        </h1>
        <p className="max-w-md text-lead leading-snug text-content-muted">
          It may have been renamed, or the link may be incomplete.
        </p>
        <div className="flex flex-wrap gap-3">
          <RippleButton href="/work">View selected work</RippleButton>
          <RippleButton href="/" variant="outline">
            Back home
          </RippleButton>
        </div>
      </div>
    </Section>
  );
}
