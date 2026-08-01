"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languageNames, locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  compact = false,
}: {
  locale: Locale;
  label: string;
  compact?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div
      aria-label={label}
      className={cn(
        "flex items-center",
        compact ? "gap-2" : "gap-1 rounded-full border border-rule p-1",
      )}
    >
      {!compact && <span className="sr-only">{label}</span>}
      {locales.map((target) => {
        const active = target === locale;
        return (
          <Link
            key={target}
            href={switchLocalePath(pathname, target)}
            hrefLang={target}
            aria-current={active ? "page" : undefined}
            aria-label={`${languageNames[target]}${active ? `, ${label}` : ""}`}
            className={cn(
              "label inline-flex min-h-11 min-w-11 items-center justify-center transition-colors",
              active
                ? "text-content"
                : "text-content-faint hover:text-content",
              !compact && active && "rounded-full bg-content/10",
            )}
          >
            {target.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
