import { archive } from "./archive";
import { about } from "./about";
import { common } from "./common";
import { contact, enquiry } from "./contact";
import { home } from "./home";
import { navigation } from "./navigation";
import { labels, projects } from "./projects";
import { work } from "./work";
import type { Dictionary } from "@/i18n/types";

export const de: Dictionary = {
  locale: "de",
  navigation,
  common,
  metadata: {
    home: { title: common.siteTitle, description: common.positioning },
    work: {
      title: "Ausgewählte Arbeiten — Elias",
      description:
        "Digitale Systeme, Produkte und Markenentwicklung für Unternehmen in Hospitality, Fitness, Immobilien und Lifestyle.",
    },
    archive: {
      title: "Visuelles Archiv — Elias",
      description: "Der vollständige Index veröffentlichter Projekte und des visuellen Materials dahinter.",
    },
    about: {
      title: "Über Elias — Strategie, Design und digitale Systeme",
      description:
        "Elias arbeitet dort, wo Strategie, Technologie und Marke zusammenkommen, und baut digitale Systeme für Hospitality, Fitness, Immobilien und Lifestyle.",
    },
    contact: {
      title: "Kontakt Elias — Projekt starten",
      description:
        "Starte ein Projekt mit Elias: Strategie, digitale Produkte und Markenentwicklung für Hospitality, Fitness, Immobilien und Lifestyle.",
    },
  },
  home,
  work,
  archive,
  about,
  contact,
  enquiry,
  projects,
  labels,
};
