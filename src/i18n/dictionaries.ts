import { de } from "@/i18n/dictionaries/de";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { defaultLocale, type Locale } from "@/i18n/config";

const dictionaries = { en, es, de } as const;

export function getDictionary(locale: Locale = defaultLocale) {
  return dictionaries[locale];
}

export type AppDictionary = ReturnType<typeof getDictionary>;
