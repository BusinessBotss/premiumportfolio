/**
 * Capabilities.
 *
 * Six areas, each tied to real work where it exists. No prices — pricing is a
 * conversation, not a menu item.
 */

import type { Capability } from "@/types/portfolio";

export const capabilities: Capability[] = [
  {
    id: "ai-systems",
    title: "AI Systems & Automation",
    description:
      "Assistants and automated workflows that absorb the repetitive part of a business, so the people stay on the part that needs judgement.",
    areas: [
      "WhatsApp assistants",
      "Workflow automation",
      "Systems integration",
      "Self-hosted infrastructure",
    ],
    relatedProjectSlugs: ["gym-tonic-app"],
    technical: true,
  },
  {
    id: "digital-products",
    title: "Digital Products",
    description:
      "Apps and interfaces built around the two or three things a user actually came to do, and stripped of everything else.",
    areas: [
      "Mobile applications",
      "Web platforms",
      "Booking and ordering flows",
      "Interface design",
    ],
    relatedProjectSlugs: ["gym-tonic-app", "buborant", "vincxx"],
  },
  {
    id: "hospitality-technology",
    title: "Hospitality Technology",
    description:
      "Technology for venues that has to survive a full terrace on a Saturday — ordering, booking and guest communication that staff will keep using.",
    areas: [
      "QR ordering systems",
      "Reservation and booking",
      "Guest communication",
      "Venue digital presence",
    ],
    relatedProjectSlugs: ["buborant", "my-lounge-palmanova"],
  },
  {
    id: "brand-direction",
    title: "Brand & Creative Direction",
    description:
      "Positioning, visual language and content direction — decided before design starts, so the design has something to be right about.",
    areas: [
      "Positioning and naming",
      "Visual identity",
      "Art and content direction",
      "Launch campaigns",
    ],
    relatedProjectSlugs: ["hybryd-mallorca", "reis-infinite-flavors", "ohlala-fashion"],
  },
  {
    id: "commercial-expansion",
    title: "Commercial Expansion",
    description:
      "Opening a market you have not sold into before: who to reach, what to say, and the structure that makes the conversation repeatable.",
    areas: [
      "Market entry",
      "Partnerships and introductions",
      "Sales and acquisition structure",
      "International positioning",
    ],
  },
  {
    id: "strategic-consulting",
    title: "Strategic Consulting",
    description:
      "Clarity before automation. Deciding what the business should do, in what order, before anything gets built.",
    areas: [
      "Operational diagnosis",
      "Digital strategy",
      "Roadmap and prioritisation",
      "Build-or-buy decisions",
    ],
    technical: true,
  },
];
