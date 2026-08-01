import { AboutPreview } from "@/components/sections/about-preview";
import { Capabilities } from "@/components/sections/capabilities";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Perspective } from "@/components/sections/perspective";
import { Proof } from "@/components/sections/proof";
import { SelectedWork } from "@/components/sections/selected-work";

/**
 * Home.
 *
 * Seven sections plus the global footer, each doing one job:
 * interest, positioning, credibility, capability, context, trust, contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Perspective />
      <SelectedWork />
      <Capabilities />
      <Industries />
      <AboutPreview />
      <Proof />
    </>
  );
}
