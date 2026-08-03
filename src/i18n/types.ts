import type { Locale } from "@/i18n/config";

export interface ProjectCopy {
  summary: string;
  overview?: string;
  challenge?: string;
  response?: string;
  outcome?: string;
  contribution?: string[];
  deliverables?: string[];
  category?: string;
}

export interface Dictionary {
  locale: Locale;
  navigation: {
    primary: {
      work: string;
      expertise: string;
      about: string;
      contact: string;
    };
    footer: {
      work: string;
      about: string;
      archive: string;
      contact: string;
    };
    social: {
      whatsapp: string;
      instagram: string;
      email: string;
      pitchDeck: string;
    };
    menu: string;
    close: string;
    available: string;
    language: string;
    direct: string;
    navigate: string;
    elsewhere: string;
    basedIn: string;
  };
  common: {
    availability: string;
    siteTitle: string;
    positioning: string;
    role: string;
    location: string;
    startProject: string;
    preferWhatsapp: string;
    allWork: string;
    seeWork: string;
    liveProject: string;
    unavailable: string;
    selectedWork: string;
    nextProject: string;
    gallery: string;
    shareProject: string;
    copyLink: string;
    copied: string;
    languageLabel: string;
    skipToContent: string;
  };
  metadata: {
    home: { title: string; description: string };
    work: { title: string; description: string };
    archive: { title: string; description: string };
    about: { title: string; description: string };
    contact: { title: string; description: string };
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      ctaWork: string;
      ctaContact: string;
      scroll: string;
    };
    perspective: {
      eyebrow: string;
      text: string;
    };
    selected: {
      eyebrow: string;
      title: string;
    };
    capabilities: {
      eyebrow: string;
      title: string;
      referenceLabel: string;
    };
    industries: {
      eyebrow: string;
      titlePrefix: string;
      noProject: string;
    };
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      link: string;
    };
    proof: {
      eyebrow: string;
      title: string;
    };
  };
  work: {
    eyebrow: string;
    title: string;
    countLabel: string;
    alsoDelivered: string;
    shorter: string;
  };
  archive: {
    eyebrow: string;
    title: string;
    tableNo: string;
    tableProject: string;
    tableCategory: string;
    tableYear: string;
    material: string;
    materialText: string;
    collections: string;
    collectionsText: string;
    prototypes: string;
    prototypesText: string;
    relatedProject: string;
    filters: Record<string, string>;
    collectionCopy: Record<string, { title?: string; category: string; description?: string }>;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    storyLabel: string;
    story: string[];
    whatLabel: string;
    whatTitle: string;
    relationshipsLabel: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    directWhatsapp: string;
    direct: string;
    background: string;
    backgroundText: string;
    pitchDeck: string;
  };
  enquiry: {
    steps: Array<{
      id: string;
      question: string;
      hint?: string;
      placeholder?: string;
      options?: string[];
      optional?: boolean;
    }>;
    name: string;
    contact: string;
    ready: string;
    readyTitle: string;
    readyText: string;
    sendWhatsapp: string;
    sendEmail: string;
    back: string;
    review: string;
    continue: string;
    messageIntro: string;
    subject: string;
  };
  projects: Record<string, ProjectCopy>;
  labels: {
    client: string;
    sector: string;
    year: string;
    status: string;
    discipline: string;
    location: string;
    category: string;
    overview: string;
    challenge: string;
    response: string;
    delivered: string;
    outcome: string;
    contribution: string;
    collaborators: string;
    statusValues: Record<string, string>;
  };
}
