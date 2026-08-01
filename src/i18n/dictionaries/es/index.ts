import { archive } from "./archive";
import { about } from "./about";
import { common } from "./common";
import { contact, enquiry } from "./contact";
import { home } from "./home";
import { navigation } from "./navigation";
import { labels, projects } from "./projects";
import { work } from "./work";
import type { Dictionary } from "@/i18n/types";

export const es: Dictionary = {
  locale: "es",
  navigation,
  common,
  metadata: {
    home: { title: common.siteTitle, description: common.positioning },
    work: {
      title: "Proyectos destacados — Elias",
      description:
        "Sistemas digitales, productos y dirección de marca para negocios de hospitality, fitness, inmobiliario y lifestyle.",
    },
    archive: {
      title: "Archivo visual — Elias",
      description: "El índice completo de proyectos publicados y el material visual que los acompaña.",
    },
    about: {
      title: "Sobre Elias — Estrategia, diseño y sistemas digitales",
      description:
        "Elias trabaja donde se cruzan estrategia, tecnología y marca, construyendo sistemas digitales y productos para negocios de hospitality, fitness, inmobiliario y lifestyle.",
    },
    contact: {
      title: "Contacto Elias — Empezar un proyecto",
      description:
        "Empieza un proyecto con Elias: estrategia, producto digital y dirección de marca para negocios de hospitality, fitness, inmobiliario y lifestyle.",
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
