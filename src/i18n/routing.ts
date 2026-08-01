import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export function withLocale(locale: Locale, path = "/"): string {
  const cleanPath = path === "/" ? "" : path.replace(/^\/+/, "/");
  return `/${locale}${cleanPath}`;
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/");
  return isLocale(parts[1]) ? `/${parts.slice(2).join("/")}`.replace(/\/$/, "") || "/" : pathname;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return withLocale(locale, stripLocale(pathname));
}

export function legacyToEnglish(path = "/"): string {
  return withLocale(defaultLocale, path);
}
