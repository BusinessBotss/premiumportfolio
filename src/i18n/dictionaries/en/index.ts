import { archive } from "./archive";
import { about } from "./about";
import { common } from "./common";
import { contact, enquiry } from "./contact";
import { home } from "./home";
import { navigation } from "./navigation";
import { labels, projects } from "./projects";
import { work } from "./work";
import type { Dictionary } from "@/i18n/types";

export const en: Dictionary = {
  locale: "en",
  navigation,
  common,
  metadata: {
    home: { title: common.siteTitle, description: common.positioning },
    work: {
      title: "Selected Work — Elias",
      description:
        "Selected digital systems, products and brand work for businesses in hospitality, fitness, real estate and lifestyle.",
    },
    archive: {
      title: "Visual Archive — Elias",
      description: "The full index of published projects and the visual material behind them.",
    },
    about: {
      title: "About Elias — Strategy, Design & Digital Systems",
      description:
        "Elias works at the point where strategy, technology and brand meet — building digital systems and products for businesses in hospitality, fitness, real estate and lifestyle.",
    },
    contact: {
      title: "Contact Elias — Start a Project",
      description:
        "Start a project with Elias — strategy, digital products and brand direction for businesses in hospitality, fitness, real estate and lifestyle.",
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
