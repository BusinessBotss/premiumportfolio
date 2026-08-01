/**
 * Industries.
 *
 * `hasProjectExperience` is the honest divider: sectors with delivered work are
 * labelled and linked; sectors where the capability transfers but no project
 * exists yet are stated as such, never dressed up with a stock photograph that
 * implies a client relationship.
 */

import type { IndustryEntry } from "@/types/portfolio";
import { projects } from "@/data/projects";

/** Reuses an authorised project cover rather than sourcing decorative stock. */
function coverOf(slug: string) {
  return projects.find((p) => p.slug === slug)?.cover;
}

export const industries: IndustryEntry[] = [
  {
    name: "Hospitality",
    hasProjectExperience: true,
    note: "Venue presence, ordering and guest communication for bars, lounges and beach clubs.",
    projectSlugs: ["my-lounge-palmanova", "buborant"],
    image: coverOf("my-lounge-palmanova"),
  },
  {
    name: "Fitness & Wellness",
    hasProjectExperience: true,
    note: "Member apps, class schedules and brand direction for gyms and training concepts.",
    projectSlugs: ["gym-tonic-app", "hybryd-mallorca"],
    image: coverOf("hybryd-mallorca"),
  },
  {
    name: "Food & Beverage",
    hasProjectExperience: true,
    note: "Ordering systems and brand presence for restaurants, private chefs and venues.",
    projectSlugs: ["buborant", "reis-infinite-flavors"],
    image: coverOf("buborant"),
  },
  {
    name: "Real Estate",
    hasProjectExperience: true,
    note: "Personal brand and lead routing for agents working in an introduction-led market.",
    projectSlugs: ["jeremy-lerognon"],
    image: coverOf("jeremy-lerognon"),
  },
  {
    name: "Fashion & Retail",
    hasProjectExperience: true,
    note: "Brand direction and digital presence for independent labels.",
    projectSlugs: ["ohlala-fashion"],
    image: coverOf("ohlala-fashion"),
  },
  {
    name: "Luxury & Concierge",
    hasProjectExperience: true,
    note: "Private service positioning where the sale depends on trust before price.",
    projectSlugs: ["reis-infinite-flavors"],
    image: coverOf("reis-infinite-flavors"),
  },
  {
    name: "Legal Services",
    hasProjectExperience: false,
    note: "Intake automation and enquiry handling. No published project yet.",
  },
  {
    name: "Beauty & Personal Care",
    hasProjectExperience: false,
    note: "Booking systems and client communication. No published project yet.",
  },
];

export const provenIndustries = industries.filter((i) => i.hasProjectExperience);
