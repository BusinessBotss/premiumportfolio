import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elias — Business Bots OS",
  description:
    "Premium portfolio of Elias. Design, Automation, Web Interfaces, Music. Built for F&B, wellness, and lifestyle brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
