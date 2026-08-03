/**
 * Project catalogue.
 *
 * Only projects with a verified live artefact and an authorised cover image
 * appear here. Narrative fields (challenge, response, outcome, metrics) are
 * intentionally absent where they have not been confirmed — the case-study
 * template renders around what exists rather than inventing filler.
 *
 * To enrich a project, add the field. No component change is required.
 *
 * `catalogue` is the raw authoring list. Everything the site renders comes
 * from `projects`, which is the published subset — so a draft cannot leak by
 * being forgotten at one call site.
 */

import { getAsset, getAssets } from "@/data/assets";
import { isIndexableProject, isPublicProject } from "@/lib/projects";
import type { Project, PublicProject } from "@/types/portfolio";

const catalogue: Project[] = [
  // ── Featured ────────────────────────────────────────────────────────────
  {
    id: "hybryd-mallorca",
    slug: "hybryd-mallorca",
    title: "HYBRYD Mallorca",
    client: "HYBRYD Mallorca",
    category: "Brand Direction",
    tier: "featured",
    status: "in-progress",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    location: "Mallorca, Spain",
    industries: ["Fitness & Wellness", "Hospitality"],
    disciplines: ["Brand Direction", "Visual Identity", "Web Design", "Community Strategy"],
    summary:
      "Brand direction and pre-launch positioning for a hybrid training concept in Mallorca.",
    overview:
      "HYBRYD is being built as a training concept rather than a gym. The work covers how the brand presents itself before opening — name, visual language, tone and the waitlist experience that turns early interest into a contactable audience.",
    deliverables: [
      "Brand direction and visual language",
      "Pre-launch waitlist experience",
      "Content and community direction",
    ],
    externalUrl: "http://hybrydwaitlist.web.app/",
    cover: getAsset("hybryd-cover"),
    gallery: getAssets(["hybryd-cover", "fitness-editorial-wall-artwork"]),
  },
  {
    id: "gym-tonic-app",
    slug: "gym-tonic-app",
    title: "Gym Tonic App",
    client: "Gym Tonic Palma",
    category: "Digital Product",
    tier: "featured",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    location: "Palma de Mallorca, Spain",
    industries: ["Fitness & Wellness"],
    disciplines: ["Product Design", "Digital Strategy", "Automation"],
    summary:
      "A member-facing mobile app for a Palma gym, covering schedule, contact and day-to-day member actions.",
    overview:
      "Gym Tonic needed its members to have one place to check the timetable and reach the club without going through social media. The app consolidates those actions and sits alongside a WhatsApp assistant for enquiries that need a reply.",
    deliverables: [
      "Member mobile app",
      "Class schedule and club information",
      "WhatsApp assistant for member enquiries",
    ],
    externalUrl: "https://gymtonicapp.goodbarber.app/index.html?standalone=1",
    cover: getAsset("gym-tonic-cover"),
    gallery: getAssets(["gym-tonic-cover"]),
  },
  {
    id: "buborant",
    slug: "buborant",
    title: "Buborant",
    client: "Buborant",
    category: "Hospitality Technology",
    tier: "featured",
    status: "live",
    editorialStatus: "review",
    contentCompleteness: "partial",
    indexable: false,
    industries: ["Food & Beverage", "Hospitality"],
    disciplines: ["Product Design", "Web Development", "Operations"],
    summary:
      "A QR table-ordering interface that lets guests browse and order without waiting for service.",
    overview:
      "Table ordering removes the slowest step in a busy service: getting a member of staff to the table. The interface is built to be read on a phone in direct sunlight, in a few seconds, by someone who has never seen it before.",
    deliverables: [
      "QR table-ordering interface",
      "Menu structure and categories",
      "Mobile-first ordering flow",
    ],
    externalUrl: "https://businessbotss.github.io/buborant/",
    cover: getAsset("buborant-qr-table-system-reference"),
    gallery: getAssets(["buborant-qr-table-system-reference"]),
  },
  {
    id: "reis-infinite-flavors",
    slug: "reis-infinite-flavors",
    title: "Reis Infinite Flavors",
    client: "Cristy Reis",
    category: "Brand & Web",
    tier: "featured",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    industries: ["Food & Beverage", "Luxury & Concierge"],
    disciplines: ["Brand Direction", "Web Design", "Web Development", "Content Direction"],
    summary:
      "Digital presence for a private chef, built to present the offer and open a direct booking conversation.",
    overview:
      "A private chef sells trust before they sell food. The site leads with the work itself and keeps the path to a conversation short, because most enquiries arrive from a phone during a short window of interest.",
    deliverables: [
      "Brand and visual direction",
      "Responsive site",
      "Direct enquiry flow",
    ],
    externalUrl: "https://reis-infinite-flavors.vercel.app/",
    cover: getAsset("reis-cover"),
    gallery: getAssets([
      "reis-food-landscape",
      "reis-kitchen-moment",
      "reis-cover",
      "reis-booking-interface",
      "reis-detail-plate",
      "reis-table-service",
    ]),
  },

  // ── Secondary ───────────────────────────────────────────────────────────
  {
    id: "my-lounge-palmanova",
    slug: "my-lounge-palmanova",
    title: "My Lounge Palmanova",
    client: "My Lounge Palmanova",
    category: "Hospitality Web",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "minimal",
    indexable: true,
    location: "Palmanova, Mallorca",
    industries: ["Hospitality", "Food & Beverage"],
    disciplines: ["Web Design", "Web Development", "Content Direction"],
    summary:
      "Venue site for a Palmanova lounge, structured around location, offer and direct contact.",
    deliverables: ["Venue site", "Menu and offer presentation", "Direct contact routing"],
    externalUrl: "https://my-lounge-palmanova.vercel.app/#reservar",
    cover: getAsset("my-lounge-menu-interface"),
  },
  {
    id: "jeremy-lerognon",
    slug: "jeremy-lerognon",
    title: "Jérémy Lerognon",
    client: "Jérémy Lerognon",
    category: "Personal Brand",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "minimal",
    indexable: true,
    location: "Mallorca, Spain",
    industries: ["Real Estate"],
    disciplines: ["Brand Direction", "Web Design", "Web Development"],
    summary:
      "Personal brand site for a real-estate agent, built around credibility and a single point of contact.",
    deliverables: ["Personal brand site", "Property and service presentation", "Contact routing"],
    externalUrl: "https://businessbotss.github.io/jeremylerognon/",
    cover: getAsset("jeremy-cover"),
  },
  {
    id: "ohlala-fashion",
    slug: "ohlala-fashion",
    title: "Oh La La",
    client: "Oh La La",
    category: "Brand & Web",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "minimal",
    indexable: true,
    industries: ["Fashion & Retail"],
    disciplines: ["Brand Direction", "Web Design", "Content Direction"],
    summary:
      "Digital presence for a slow-fashion label, built to carry the product photography rather than compete with it.",
    deliverables: ["Brand site", "Collection presentation", "Enquiry flow"],
    cover: getAsset("ohlala-cover"),
  },
  {
    id: "vincxx",
    slug: "vincxx",
    title: "VINCXX",
    client: "VINCXX",
    category: "Digital Product",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "minimal",
    indexable: true,
    industries: ["Technology"],
    disciplines: ["Product Design", "Web Development", "Visual Identity"],
    summary:
      "A digital business card that replaces a paper hand-off with a link and an NFC tap.",
    deliverables: ["Digital business card", "NFC-ready link structure", "Contact save flow"],
    externalUrl: "https://businessbotss.github.io/VINCXX/",
    cover: getAsset("vincxx-cover"),
  },
  {
    id: "rodrigo-zabala",
    slug: "rodrigo-zabala",
    title: "Rodrigo Zabala",
    client: "Rodrigo Zabala",
    category: "Real Estate · Personal Brand · Lead Qualification",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    industries: ["Real Estate"],
    disciplines: ["Brand Direction", "Web Design", "Digital Strategy", "Commercial Strategy"],
    summary:
      "A multilingual digital profile and enquiry experience designed to present a real-estate advisor, communicate available services and turn visitor interest into better-qualified WhatsApp conversations.",
    contribution: [
      "Information architecture for the professional profile",
      "Interface and responsive experience",
      "Property enquiry and lead-qualification journey",
      "WhatsApp conversion flow",
      "Visual campaign direction for the coordinated property flyers",
    ],
    deliverables: [
      "Multilingual real-estate profile",
      "Service and property presentation interface",
      "Lead-qualification form",
      "Direct WhatsApp enquiry flow",
      "Coordinated real-estate campaign assets",
    ],
    externalUrl: "https://rodrigozabala.info",
    cover: getAsset("rodrigo-flyer-cover"),
    gallery: getAssets([
      "rodrigo-flyer-cover",
      "rodrigo-flyer-02",
      "rodrigo-flyer-03",
      "rodrigo-flyer-04",
    ]),
  },
  {
    id: "mallorca-charter-experiences",
    slug: "mallorca-charter-experiences",
    title: "Mallorca Charter Experiences",
    category: "Hospitality · Marine · Booking Experience",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    location: "Mallorca, Spain",
    industries: ["Hospitality", "Luxury & Concierge"],
    disciplines: ["Content Direction", "Web Design", "Digital Strategy"],
    summary:
      "A visual and enquiry-oriented marine experience designed to help visitors discover boats, understand the offer and move naturally toward a direct booking conversation.",
    contribution: [
      "Content and experience structure",
      "Boat-discovery interface direction",
      "Visual asset curation",
      "Enquiry-oriented user journey",
      "Mobile-first presentation",
    ],
    deliverables: [
      "Charter discovery experience",
      "Boat presentation layouts",
      "Lifestyle and marine gallery",
      "Enquiry and booking-oriented interface",
      "Downloadable information access where available",
    ],
    cover: getAsset("mallorca-charter-cover"),
    gallery: getAssets([
      "mallorca-charter-gallery-01",
      "mallorca-charter-gallery-02",
      "mallorca-charter-cover",
      "mallorca-charter-gallery-03",
      "mallorca-charter-gallery-04",
      "mallorca-charter-gallery-05",
      "mallorca-charter-gallery-06",
      "mallorca-charter-gallery-07",
      "mallorca-charter-gallery-08",
    ]),
  },
  {
    id: "business-bots-solutions",
    slug: "business-bots-solutions",
    title: "Business Bots Solutions",
    client: "Business Bots Solutions",
    category: "Founder Project · AI Systems · Digital Strategy",
    tier: "secondary",
    status: "live",
    editorialStatus: "published",
    contentCompleteness: "partial",
    indexable: true,
    industries: ["Technology"],
    disciplines: ["AI Systems", "Automation", "Digital Strategy", "Product Design"],
    summary:
      "The company founded by Elias to develop digital systems, automation, interfaces and strategic technology solutions for real businesses.",
    contribution: [
      "Founder",
      "Strategic direction",
      "Service and product definition",
      "Digital positioning",
      "Development and direction of client-facing solutions",
    ],
    deliverables: [
      "Business identity and digital positioning",
      "Company website",
      "AI and automation solution concepts",
      "Digital interfaces and operational tools",
      "Client project portfolio",
      "Commercial pitch deck",
    ],
    externalUrl: "https://business-bots-solutions.web.app",
    pitchDeckUrl: "https://pdflink.to/ourpitchdeck/",
    cover: getAsset("business-bots-logo"),
    gallery: getAssets([
      "business-bots-logo",
      "business-bots-macbook-01",
      "business-bots-consultancy-flyer",
      "business-bots-macbook-02",
    ]),
  },
  {
    id: "renata-sa",
    slug: "renata-sa",
    title: "Renata SA",
    client: "Renata SA",
    category: "Industrial Technology · Digital Experience",
    tier: "secondary",
    status: "in-progress",
    editorialStatus: "review",
    contentCompleteness: "minimal",
    indexable: false,
    industries: ["Industrial", "Technology"],
    disciplines: ["Web Design", "Digital Strategy", "Web Development"],
    summary:
      "A digital modernization project for a Swiss microbattery manufacturer, focused on clearer product information, responsive architecture and specialist product-discovery tools.",
    externalUrl: "https://www.renata.com/en/",
    externalUnavailableReason:
      "The project is under editorial review and has no authorised public case-study cover yet.",
    verifiedScope: [
      "Website modernization",
      "Information architecture",
      "Product and packaging structure",
      "Responsive experience",
      "SEO and multilingual considerations",
      "Battery Finder and Cross Reference concepts",
    ],
  },
];

// ── Selectors ─────────────────────────────────────────────────────────────

/**
 * The published set. This is what "the projects" means everywhere in the UI —
 * listings, archive, related links, routes and structured data all read from
 * here, so nothing unpublished can reach a visitor.
 */
export const projects: PublicProject[] = catalogue.filter(isPublicProject);

/** The subset search engines may see. Drives the sitemap and robots metadata. */
export const indexableProjects: PublicProject[] = catalogue.filter(isIndexableProject);

export const featuredProjects = projects.filter((p) => p.tier === "featured");
export const secondaryProjects = projects.filter((p) => p.tier === "secondary");

export function getProject(slug: string): PublicProject | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Guards cross-links so an unpublished slug renders as plain text, not a 404. */
export function isPublicSlug(slug: string): boolean {
  return projects.some((p) => p.slug === slug);
}

/** Ordered neighbour for the "next project" link, wrapping at the end. */
export function getNextProject(slug: string): PublicProject | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
