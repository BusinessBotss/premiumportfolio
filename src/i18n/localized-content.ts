import type { Locale } from "@/i18n/config";
import type { Capability, Industry, IndustryEntry, Relationship } from "@/types/portfolio";

const disciplineMap = {
  es: {
    "Brand Direction": "Dirección de marca",
    "Visual Identity": "Identidad visual",
    "Web Design": "Diseño web",
    "Web Development": "Desarrollo web",
    "Product Design": "Diseño de producto",
    "AI Systems": "Sistemas de IA",
    Automation: "Automatización",
    "Content Direction": "Dirección de contenido",
    "Community Strategy": "Estrategia de comunidad",
    "Digital Strategy": "Estrategia digital",
    Operations: "Operaciones",
    "Commercial Strategy": "Estrategia comercial",
  },
  de: {
    "Brand Direction": "Markenentwicklung",
    "Visual Identity": "Visuelle Identität",
    "Web Design": "Webdesign",
    "Web Development": "Webentwicklung",
    "Product Design": "Produktdesign",
    "AI Systems": "KI-Systeme",
    Automation: "Automatisierung",
    "Content Direction": "Content-Richtung",
    "Community Strategy": "Community-Strategie",
    "Digital Strategy": "Digitale Strategie",
    Operations: "Betrieb",
    "Commercial Strategy": "Kommerzielle Strategie",
  },
} as const;

const industryMap = {
  es: {
    Hospitality: "Hospitality",
    "Real Estate": "Inmobiliario",
    "Fitness & Wellness": "Fitness y wellness",
    "Food & Beverage": "Gastronomía y bebidas",
    "Luxury & Concierge": "Lujo y concierge",
    "Fashion & Retail": "Moda y retail",
    "Private Services": "Servicios privados",
    "Beauty & Personal Care": "Belleza y cuidado personal",
    Technology: "Tecnología",
    Industrial: "Industrial",
  },
  de: {
    Hospitality: "Hospitality",
    "Real Estate": "Immobilien",
    "Fitness & Wellness": "Fitness & Wellness",
    "Food & Beverage": "Gastronomie",
    "Luxury & Concierge": "Luxus & Concierge",
    "Fashion & Retail": "Fashion & Retail",
    "Private Services": "Private Dienstleistungen",
    "Beauty & Personal Care": "Beauty & Körperpflege",
    Technology: "Technologie",
    Industrial: "Industrie",
  },
} as const;

const capabilityCopy = {
  es: {
    "ai-systems": {
      title: "Sistemas de IA y automatización",
      description:
        "Asistentes y flujos automatizados que absorben la parte repetitiva del negocio para que las personas se queden con lo que requiere criterio.",
      areas: ["Asistentes de WhatsApp", "Automatización de flujos", "Integración de sistemas", "Infraestructura propia"],
    },
    "digital-products": {
      title: "Productos digitales",
      description:
        "Apps e interfaces construidas alrededor de las dos o tres acciones que el usuario realmente vino a hacer.",
      areas: ["Aplicaciones móviles", "Plataformas web", "Reservas y pedidos", "Diseño de interfaz"],
    },
    "hospitality-technology": {
      title: "Tecnología para hospitality",
      description:
        "Tecnología para locales que tiene que sobrevivir una terraza llena un sábado: pedidos, reservas y comunicación que el equipo seguirá usando.",
      areas: ["Pedidos por QR", "Reservas", "Comunicación con huéspedes", "Presencia digital del local"],
    },
    "brand-direction": {
      title: "Marca y dirección creativa",
      description:
        "Posicionamiento, lenguaje visual y dirección de contenido decididos antes de diseñar, para que el diseño tenga algo claro que resolver.",
      areas: ["Posicionamiento", "Identidad visual", "Dirección de arte", "Campañas de lanzamiento"],
    },
    "commercial-expansion": {
      title: "Expansión comercial",
      description:
        "Entrar en un mercado nuevo: a quién llegar, qué decir y qué estructura permite repetir la conversación.",
      areas: ["Entrada a mercado", "Partners", "Estructura comercial", "Posicionamiento internacional"],
    },
    "strategic-consulting": {
      title: "Consultoría estratégica",
      description:
        "Claridad antes de automatizar. Decidir qué debería hacer el negocio y en qué orden antes de construir nada.",
      areas: ["Diagnóstico operativo", "Estrategia digital", "Roadmap", "Decisiones build-or-buy"],
    },
  },
  de: {
    "ai-systems": {
      title: "KI-Systeme & Automatisierung",
      description:
        "Assistenten und automatisierte Abläufe, die repetitive Arbeit übernehmen, damit Menschen bei Aufgaben mit Urteilskraft bleiben.",
      areas: ["WhatsApp-Assistenten", "Workflow-Automatisierung", "Systemintegration", "Eigene Infrastruktur"],
    },
    "digital-products": {
      title: "Digitale Produkte",
      description:
        "Apps und Interfaces rund um die wenigen Dinge, die Nutzer wirklich erledigen wollen.",
      areas: ["Mobile Apps", "Web-Plattformen", "Buchungs- und Bestellflüsse", "Interface Design"],
    },
    "hospitality-technology": {
      title: "Hospitality Technology",
      description:
        "Technologie für Venues, die einen vollen Samstag überstehen muss: Bestellungen, Buchungen und Kommunikation, die Teams weiter nutzen.",
      areas: ["QR-Bestellsysteme", "Reservierungen", "Gästekommunikation", "Digitale Venue-Präsenz"],
    },
    "brand-direction": {
      title: "Marke & Kreativdirektion",
      description:
        "Positionierung, visuelle Sprache und Content-Richtung, bevor Design beginnt.",
      areas: ["Positionierung", "Visuelle Identität", "Art Direction", "Launch-Kampagnen"],
    },
    "commercial-expansion": {
      title: "Kommerzielle Expansion",
      description:
        "Einen neuen Markt öffnen: wen man erreicht, was man sagt und welche Struktur Gespräche wiederholbar macht.",
      areas: ["Markteintritt", "Partnerschaften", "Sales-Struktur", "Internationale Positionierung"],
    },
    "strategic-consulting": {
      title: "Strategische Beratung",
      description:
        "Klarheit vor Automatisierung. Entscheiden, was ein Geschäft tun sollte und in welcher Reihenfolge.",
      areas: ["Operative Diagnose", "Digitale Strategie", "Roadmap", "Build-or-buy"],
    },
  },
} as const;

const relationshipEngagement = {
  es: {
    "Member app and WhatsApp assistant": "App de miembros y asistente de WhatsApp",
    "Brand direction and pre-launch waitlist": "Dirección de marca y waitlist pre-lanzamiento",
    "QR table-ordering system": "Sistema de pedidos por QR",
    "Brand direction and website": "Dirección de marca y web",
    "Venue website": "Web del local",
    "Personal brand website": "Web de marca personal",
    "Digital business card": "Tarjeta de visita digital",
    "WhatsApp assistant": "Asistente de WhatsApp",
  },
  de: {
    "Member app and WhatsApp assistant": "Mitglieder-App und WhatsApp-Assistent",
    "Brand direction and pre-launch waitlist": "Markenentwicklung und Pre-Launch-Waitlist",
    "QR table-ordering system": "QR-Bestellsystem",
    "Brand direction and website": "Markenentwicklung und Website",
    "Venue website": "Venue-Website",
    "Personal brand website": "Personal-Brand-Website",
    "Digital business card": "Digitale Visitenkarte",
    "WhatsApp assistant": "WhatsApp-Assistent",
  },
} as const;

const relationshipsIntroMap = {
  es:
    "Una selección de negocios, marcas y equipos con los que he trabajado, apoyado o colaborado en iniciativas digitales, creativas, comerciales y operativas.",
  de:
    "Eine Auswahl von Unternehmen, Marken und Teams, mit denen ich an digitalen, kreativen, kommerziellen und operativen Initiativen gearbeitet oder sie unterstützt habe.",
} as const;

const categoryMap = {
  es: {
    "Brand Direction": "Dirección de marca",
    "Digital Product": "Producto digital",
    "Hospitality Technology": "Tecnología hospitality",
    "Brand & Web": "Marca y web",
    "Hospitality Web": "Web hospitality",
    "Personal Brand": "Marca personal",
    "Real Estate · Personal Brand · Lead Qualification":
      "Inmobiliario · Marca personal · Cualificación de leads",
    "Hospitality · Marine · Booking Experience":
      "Hospitality · Náutico · Experiencia de reserva",
    "Founder Project · AI Systems · Digital Strategy":
      "Proyecto fundador · Sistemas de IA · Estrategia digital",
    "Industrial Technology · Digital Experience":
      "Tecnología industrial · Experiencia digital",
    "Product system": "Sistema de producto",
    "Brand and website": "Marca y web",
    "Hospitality platform": "Plataforma hospitality",
    "Campaign system": "Sistema de campaña",
    "Concierge website": "Web concierge",
    "Real estate website": "Web inmobiliaria",
    "Venue website": "Web de local",
    "Fashion identity": "Identidad de moda",
    "Digital identity": "Identidad digital",
    "AI consultancy": "Consultoría de IA",
    "Marine campaign": "Campaña náutica",
  },
  de: {
    "Brand Direction": "Markenentwicklung",
    "Digital Product": "Digitales Produkt",
    "Hospitality Technology": "Hospitality Technology",
    "Brand & Web": "Marke & Web",
    "Hospitality Web": "Hospitality-Web",
    "Personal Brand": "Personal Brand",
    "Real Estate · Personal Brand · Lead Qualification":
      "Immobilien · Personal Brand · Lead-Qualifizierung",
    "Hospitality · Marine · Booking Experience":
      "Hospitality · Marine · Buchungserlebnis",
    "Founder Project · AI Systems · Digital Strategy":
      "Founder Project · KI-Systeme · Digitale Strategie",
    "Industrial Technology · Digital Experience":
      "Industrietechnologie · Digitale Erfahrung",
    "Product system": "Produktsystem",
    "Brand and website": "Marke und Website",
    "Hospitality platform": "Hospitality-Plattform",
    "Campaign system": "Kampagnensystem",
    "Concierge website": "Concierge-Website",
    "Real estate website": "Immobilien-Website",
    "Venue website": "Venue-Website",
    "Fashion identity": "Fashion-Identität",
    "Digital identity": "Digitale Identität",
    "AI consultancy": "KI-Beratung",
    "Marine campaign": "Marine-Kampagne",
  },
} as const;

const industryNotes = {
  es: {
    Hospitality: "Presencia, pedidos, reservas y comunicación para bares, lounges, beach clubs y conceptos hospitality.",
    "Fitness & Wellness": "Apps de miembros, horarios y dirección de marca para gimnasios y conceptos de entrenamiento.",
    "Food & Beverage": "Presencia de marca, reservas y experiencias digitales para restaurantes, chefs privados y locales.",
    "Real Estate": "Marca personal, credibilidad y routing de leads para asesores inmobiliarios.",
    "Fashion & Retail": "Dirección de marca, presentación editorial y presencia digital para marcas independientes.",
    "Luxury & Concierge": "Posicionamiento de servicios privados donde importan confianza, discreción y experiencia.",
    "Private Services": "Posicionamiento digital, reservas y comunicación para profesionales privados y servicios a medida.",
    "Beauty & Personal Care": "Reservas, presentación de marca y comunicación para belleza, skincare y cuidado personal.",
  },
  de: {
    Hospitality: "Venue-Präsenz, Bestellungen und Gästekommunikation für Bars, Lounges und Beach Clubs.",
    "Fitness & Wellness": "Mitglieder-Apps, Kurspläne und Markenentwicklung für Gyms und Trainingskonzepte.",
    "Food & Beverage": "Bestellsysteme und Markenpräsenz für Restaurants, private Chefs und Venues.",
    "Real Estate": "Personal Brand und Lead-Routing für Immobilienberater in empfehlungsgetriebenen Märkten.",
    "Fashion & Retail": "Markenentwicklung und digitale Präsenz für unabhängige Labels.",
    "Luxury & Concierge": "Positionierung privater Services, bei denen Vertrauen vor dem Preis kommt.",
    "Private Services": "Digitale Positionierung, Buchung und Kundenkommunikation für private Profis und maßgeschneiderte Services.",
    "Beauty & Personal Care": "Buchung, Markenpräsentation und Kundenkommunikation für Beauty, Skincare und Körperpflege.",
  },
} as const;

export function translateDiscipline(value: string, locale: Locale): string {
  if (locale === "en") return value;
  return disciplineMap[locale][value as keyof (typeof disciplineMap)[typeof locale]] ?? value;
}

export function translateIndustry(value: Industry | string, locale: Locale): string {
  if (locale === "en") return value;
  return industryMap[locale][value as keyof (typeof industryMap)[typeof locale]] ?? value;
}

export function localizeCapability(capability: Capability, locale: Locale): Capability {
  if (locale === "en") return capability;
  const copy = capabilityCopy[locale][capability.id as keyof (typeof capabilityCopy)[typeof locale]];
  if (!copy) return capability;
  return { ...capability, ...copy, areas: [...copy.areas] };
}

export function localizeIndustry(entry: IndustryEntry, locale: Locale): IndustryEntry {
  if (locale === "en") return entry;
  return {
    ...entry,
    name: translateIndustry(entry.name, locale) as Industry,
    note: industryNotes[locale][entry.name as keyof (typeof industryNotes)[typeof locale]] ?? entry.note,
  };
}

export function translateEngagement(value: Relationship["engagement"], locale: Locale): string {
  if (locale === "en") return value;
  return relationshipEngagement[locale][value as keyof (typeof relationshipEngagement)[typeof locale]] ?? value;
}

export function translateRelationshipsIntro(value: string, locale: Locale): string {
  if (locale === "en") return value;
  return relationshipsIntroMap[locale] ?? value;
}

export function translateCategory(value: string, locale: Locale): string {
  if (locale === "en") return value;
  return categoryMap[locale][value as keyof (typeof categoryMap)[typeof locale]] ?? value;
}
