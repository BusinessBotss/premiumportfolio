/**
 * Industry editorial system.
 *
 * Images here describe categories and sectors. They are not project covers and
 * must not be used to imply a completed client project where none exists.
 */

import { getAsset } from "@/data/assets";
import type { IndustryEntry } from "@/types/portfolio";

export const industries: IndustryEntry[] = [
  {
    name: "Hospitality",
    hasProjectExperience: true,
    note:
      "Venue presence, ordering, booking and guest communication for bars, lounges, beach clubs and hospitality concepts.",
    projectSlugs: [
      "my-lounge-palmanova",
      "buborant",
      "mallorca-charter-experiences",
    ],
    image: getAsset("dubai-nightlife-booking-interface"),
  },
  {
    name: "Fitness & Wellness",
    hasProjectExperience: true,
    note:
      "Member apps, class schedules, community systems and brand direction for gyms and training concepts.",
    projectSlugs: ["gym-tonic-app", "hybryd-mallorca"],
    image: getAsset("hybryd-cover"),
  },
  {
    name: "Food & Beverage",
    hasProjectExperience: true,
    note:
      "Brand presence, booking flows and digital experiences for restaurants, private chefs and hospitality venues.",
    projectSlugs: ["reis-infinite-flavors", "my-lounge-palmanova"],
    image: getAsset("reis-food-landscape"),
  },
  {
    name: "Real Estate",
    hasProjectExperience: true,
    note:
      "Personal brand, credibility and lead routing for property advisors working in trust-led markets.",
    projectSlugs: ["rodrigo-zabala", "jeremy-lerognon"],
    image: getAsset("real-estate-editorial-architecture"),
  },
  {
    name: "Fashion & Retail",
    hasProjectExperience: true,
    note:
      "Brand direction, editorial presentation and digital presence for independent labels.",
    projectSlugs: ["ohlala-fashion"],
    image: getAsset("portfolio-visual-branding-flyer"),
  },
  {
    name: "Luxury & Concierge",
    hasProjectExperience: true,
    note:
      "Private service positioning where trust, discretion and experience matter before price.",
    projectSlugs: [
      "mallorca-charter-experiences",
      "reis-infinite-flavors",
      "my-lounge-palmanova",
    ],
    image: getAsset("mallorca-charter-gallery-08"),
  },
  {
    name: "Private Services",
    hasProjectExperience: false,
    note:
      "Digital positioning, booking and client communication for private professionals, wellness concepts and experience-led services.",
    image: getAsset("stock-wellness-01"),
  },
  {
    name: "Beauty & Personal Care",
    hasProjectExperience: false,
    note:
      "Booking, brand presentation and client communication for beauty, skincare and personal-care services.",
    image: getAsset("beauty-personal-care-editorial"),
  },
];

export const provenIndustries = industries.filter((i) => i.hasProjectExperience);
