import { redirect } from "next/navigation";
import { legacyToEnglish } from "@/i18n/routing";

export default function WorkPage() {
  redirect(legacyToEnglish("/work"));
}
