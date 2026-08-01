/* eslint-disable @next/next/no-page-custom-font -- Switzer is served by Fontshare; next/font would change the font source and visual metrics. */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE_URL, site } from "@/data/site";
import { buildMetadata, personSchema } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({ description: site.positioning, path: "/" }),
  icons: { icon: site.media.favicon },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Typefaces load from their own CDNs so the build never depends on a
            font fetch succeeding. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300..600&family=Geist+Mono:wght@400&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only-focusable label left-4 top-4 z-[60] border border-rule bg-surface px-4 py-2 text-content"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
