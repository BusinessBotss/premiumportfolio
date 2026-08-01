export const locales = ["en", "es", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const languageNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

export const languageCodes: Record<Locale, string> = {
  en: "en",
  es: "es",
  de: "de",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  de: "de_DE",
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}
