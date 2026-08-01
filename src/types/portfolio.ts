/**
 * Portfolio domain model.
 *
 * Adaptive-rendering contract: every narrative field is optional. Case-study
 * sections render only when their data exists, so a project can ship with the
 * facts that are verified today and grow richer without a code change. Nothing
 * is ever filled with placeholder copy.
 */

// ── Projects ──────────────────────────────────────────────────────────────

/** What the project actually is, in the world. */
export type ProjectStatus = "live" | "in-progress" | "archived" | "private";

/**
 * Whether the case study is ready to be published — deliberately separate from
 * `status`. A live project can sit in `draft` because nothing has been written
 * about it yet, and a private project can be `published` when the authorised
 * content allows it. One field cannot express both without lying about one.
 */
export type EditorialStatus = "draft" | "review" | "published";

/**
 * How much of the narrative exists. Authoring metadata: it records intent,
 * while `hasMinimumCaseStudyContent` in lib/projects decides what actually
 * ships by reading the content itself rather than trusting this label.
 */
export type ContentCompleteness = "minimal" | "partial" | "complete";

export type ProjectTier = "featured" | "secondary";

export type Discipline =
  | "Brand Direction"
  | "Visual Identity"
  | "Web Design"
  | "Web Development"
  | "Product Design"
  | "AI Systems"
  | "Automation"
  | "Content Direction"
  | "Community Strategy"
  | "Digital Strategy"
  | "Operations"
  | "Commercial Strategy";

export type Industry =
  | "Hospitality"
  | "Real Estate"
  | "Fitness & Wellness"
  | "Food & Beverage"
  | "Luxury & Concierge"
  | "Fashion & Retail"
  | "Legal Services"
  | "Beauty & Personal Care"
  | "Technology"
  | "Industrial";

/** A verified, attributable outcome. Never invent these. */
export interface Metric {
  value: string;
  label: string;
  /** How this number was established. Omit only when self-evident. */
  source?: string;
}

export interface Collaborator {
  name: string;
  role: string;
  url?: string;
}

export interface Project {
  // Identity — always required
  id: string;
  slug: string;
  title: string;
  client?: string;
  category: string;
  tier: ProjectTier;
  status: ProjectStatus;
  industries: Industry[];
  disciplines: Discipline[];

  /** One line. Used in grids and metadata. Required for every project. */
  summary: string;

  // Publication — governs routes, listings and indexing
  editorialStatus: EditorialStatus;
  contentCompleteness: ContentCompleteness;
  /**
   * Intent to be indexed, not authority to be. `isIndexableProject` only
   * honours it on a project that is genuinely published, so a stale `true`
   * here can never leak an unfinished page into the sitemap.
   */
  indexable: boolean;

  /**
   * Optional because an unverified year is worse than no year. When absent
   * nothing renders in its place — no label, no dash, no reserved column.
   * Never used as a key and never used to order the catalogue.
   */
  year?: string;

  // Media
  cover?: ImageAsset;
  gallery?: ImageAsset[];

  // Narrative — optional; each drives one case-study section
  overview?: string;
  challenge?: string;
  response?: string;
  /** What Elias personally did, distinct from what the project delivered. */
  contribution?: string[];
  outcome?: string;
  deliverables?: string[];

  // Evidence
  metrics?: Metric[];
  collaborators?: Collaborator[];
  credits?: string;

  // Links
  location?: string;
  externalUrl?: string;
  pitchDeckUrl?: string;
  /** Reason the live site is unavailable, shown instead of a dead link. */
  externalUnavailableReason?: string;
  /** Internal-only scope notes for unpublished review material. */
  verifiedScope?: string[];
}

export type PublicProject = Project & { cover: ImageAsset };

// ── Assets ────────────────────────────────────────────────────────────────

/**
 * Provenance governs placement. Only original, client-provided and operational
 * assets may appear beside published work; licensed stock and visual
 * references must never imply a client relationship.
 */
export type AssetOrigin =
  | "original-work"
  | "client-provided"
  | "operational-content"
  | "licensed-stock"
  | "visual-reference";

export type AssetUsage = "selected-work" | "archive" | "industry" | "internal";
export type AssetVisibility = "public" | "contextual" | "internal-reference";

export interface ImageAsset {
  id: string;
  src: string;
  /** Required. Describes content, not decoration. */
  alt: string;
  origin: AssetOrigin;
  usage: AssetUsage[];
  visibility?: AssetVisibility;
  /** width / height. Reserves layout space and prevents CLS. */
  aspectRatio: number;
  projectId?: string;
  credit?: string;
  featured?: boolean;
  /** Cloudinary gravity hint, e.g. "auto", "face", "north". */
  focus?: string;
  /** Editorial rendering treatment for non-photographic assets. */
  treatment?: "business-bots-cover" | "contained-portrait";
}

export interface AssetCollection {
  id: string;
  title: string;
  category: string;
  description?: string;
  projectId?: string;
  assetIds: string[];
  featured?: boolean;
  archiveVisible: boolean;
}

// ── Relationships ─────────────────────────────────────────────────────────

/**
 * Not every organisation is a client. This distinction is deliberate and
 * must not be flattened in the UI.
 */
export type RelationshipType =
  | "client"
  | "collaboration"
  | "employer"
  | "supported";

export interface Relationship {
  name: string;
  type: RelationshipType;
  industry: Industry;
  /** Only what was actually delivered or contributed. */
  engagement: string;
  url?: string;
  projectSlug?: string;
}

// ── Capabilities ──────────────────────────────────────────────────────────

export interface Capability {
  id: string;
  title: string;
  description: string;
  /** Three or four concrete areas. No generic filler. */
  areas: string[];
  relatedProjectSlugs?: string[];
  /** Enables the hexagon treatment for AI/automation/industrial contexts. */
  technical?: boolean;
}

// ── Testimonials ──────────────────────────────────────────────────────────

/**
 * Attribution is mandatory in the type system. Anonymous praise cannot be
 * represented, and therefore cannot be rendered.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectSlug?: string;
}

// ── Industries ────────────────────────────────────────────────────────────

export interface IndustryEntry {
  name: Industry;
  /** True only where real project work exists. Drives honest labelling. */
  hasProjectExperience: boolean;
  note: string;
  /** Omitted where no authorised image exists; the entry renders typographically. */
  image?: ImageAsset;
  projectSlugs?: string[];
}
