export const contact = {
  eyebrow: "Kontakt",
  title: "Projekt starten.",
  intro:
    "Sieben kurze Fragen. Das dauert ungefähr eine Minute und sorgt dafür, dass die erste Antwort nützlich ist, statt nur mehr Kontext abzufragen.",
  directWhatsapp: "Lieber WhatsApp? Direktes Gespräch starten",
  direct: "Direkt",
  background: "Hintergrund",
  backgroundText:
    "Ein kurzer Überblick darüber, wie Business Bots Solutions arbeitet, wie die Lieferung strukturiert ist und wie ein typisches Engagement aussieht.",
  pitchDeck: "Pitch Deck ansehen",
};

export const enquiry = {
  steps: [
    {
      id: "building",
      question: "Was baust du?",
      hint: "Ein Satz reicht.",
      placeholder: "Eine Mitglieder-App für ein Gym in Palma…",
    },
    {
      id: "support",
      question: "Welche Unterstützung brauchst du?",
      options: ["Strategie und Richtung", "Design und Marke", "Build und Lieferung", "End-to-end"],
    },
    {
      id: "outcome",
      question: "Welches Ergebnis zählt am meisten?",
      options: ["Mehr Anfragen", "Weniger manuelle Arbeit", "Eine stärkere Marke", "Ein neuer Markt", "Etwas anderes"],
    },
    { id: "timeline", question: "Wie sieht der Zeitplan aus?", options: ["Jetzt", "In diesem Quartal", "Dieses Jahr", "Noch in Klärung"] },
    {
      id: "investment",
      question: "Mit welchem Investmentrahmen arbeitest du?",
      hint: "Das hilft nur, den Umfang des Gesprächs einzuordnen.",
      options: ["Unter 2.000 €", "2.000–6.000 €", "6.000–15.000 €", "15.000 €+", "Noch unklar"],
    },
    { id: "contact", question: "Wem soll ich antworten?" },
    {
      id: "detail",
      question: "Gibt es noch etwas Wichtiges?",
      hint: "Optional.",
      placeholder: "Links, Einschränkungen, Kontext…",
      optional: true,
    },
  ],
  name: "Name",
  contact: "E-Mail oder Telefon",
  ready: "Bereit zum Senden",
  readyTitle: "Damit kann ich sinnvoll antworten.",
  readyText:
    "Wähle, wie du es senden möchtest. Noch wurde nichts übermittelt — die Nachricht öffnet sich in deiner eigenen App, damit du sie zuerst prüfen kannst.",
  sendWhatsapp: "Per WhatsApp senden",
  sendEmail: "Per E-Mail senden",
  back: "Zurück",
  review: "Prüfen",
  continue: "Weiter",
  messageIntro: "Anfrage von {name} ({contact})",
  subject: "Projektanfrage — {name}",
};
