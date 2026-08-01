/**
 * Relationships.
 *
 * Not every organisation listed here is a client, and the UI must not flatten
 * the distinction. `engagement` states only what was actually delivered.
 *
 * Organisations are added here once their engagement can be described
 * accurately — never to make the list look longer.
 */

import type { Relationship } from "@/types/portfolio";

export const relationships: Relationship[] = [
  {
    name: "Gym Tonic Palma",
    type: "client",
    industry: "Fitness & Wellness",
    engagement: "Member app and WhatsApp assistant",
    projectSlug: "gym-tonic-app",
  },
  {
    name: "HYBRYD Mallorca",
    type: "client",
    industry: "Fitness & Wellness",
    engagement: "Brand direction and pre-launch waitlist",
    projectSlug: "hybryd-mallorca",
  },
  {
    name: "Buborant",
    type: "client",
    industry: "Food & Beverage",
    engagement: "QR table-ordering system",
    projectSlug: "buborant",
  },
  {
    name: "Reis Infinite Flavors",
    type: "client",
    industry: "Luxury & Concierge",
    engagement: "Brand direction and website",
    projectSlug: "reis-infinite-flavors",
  },
  {
    name: "My Lounge Palmanova",
    type: "client",
    industry: "Hospitality",
    engagement: "Venue website",
    projectSlug: "my-lounge-palmanova",
  },
  {
    name: "Jérémy Lerognon",
    type: "client",
    industry: "Real Estate",
    engagement: "Personal brand website",
    projectSlug: "jeremy-lerognon",
  },
  {
    name: "Oh La La",
    type: "client",
    industry: "Fashion & Retail",
    engagement: "Brand direction and website",
    projectSlug: "ohlala-fashion",
  },
  {
    name: "VINCXX",
    type: "client",
    industry: "Technology",
    engagement: "Digital business card",
    projectSlug: "vincxx",
  },
  {
    name: "FitClub Mallorca",
    type: "client",
    industry: "Fitness & Wellness",
    engagement: "WhatsApp assistant",
    url: "https://fitclubmallorca.com/",
  },
  {
    name: "Bubó Beach",
    type: "client",
    industry: "Hospitality",
    engagement: "Venue website",
    url: "https://businessbotss.github.io/bubobeach/",
  },
];

/**
 * The framing line for this section. Deliberately does not call everyone a
 * client.
 */
export const relationshipsIntro =
  "A selection of businesses, brands and teams I have worked with, supported or collaborated with across digital, creative, commercial and operational initiatives.";
