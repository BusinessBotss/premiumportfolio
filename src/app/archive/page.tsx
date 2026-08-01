import { redirect } from "next/navigation";
import { legacyToEnglish } from "@/i18n/routing";

export default function ArchivePage() {
  redirect(legacyToEnglish("/archive"));
}
