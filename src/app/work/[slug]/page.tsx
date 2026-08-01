import { redirect } from "next/navigation";
import { legacyToEnglish } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  redirect(legacyToEnglish(`/work/${slug}`));
}
