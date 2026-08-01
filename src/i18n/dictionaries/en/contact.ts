export const contact = {
  eyebrow: "Contact",
  title: "Start a project.",
  intro:
    "Seven short questions. It takes about a minute and means the first reply is useful rather than a request for more information.",
  directWhatsapp: "Prefer WhatsApp? Start a direct conversation",
  direct: "Direct",
  background: "Background",
  backgroundText:
    "A short overview of how Business Bots Solutions works, the delivery structure and what a typical engagement looks like.",
  pitchDeck: "View the pitch deck",
};

export const enquiry = {
  steps: [
    {
      id: "building",
      question: "What are you building?",
      hint: "A sentence is enough.",
      placeholder: "A members app for a gym in Palma…",
    },
    {
      id: "support",
      question: "What kind of support do you need?",
      options: ["Strategy and direction", "Design and brand", "Build and delivery", "End to end"],
    },
    {
      id: "outcome",
      question: "What outcome matters most?",
      options: ["More enquiries", "Less manual work", "A stronger brand", "A new market", "Something else"],
    },
    {
      id: "timeline",
      question: "What is the timeline?",
      options: ["Now", "Within a quarter", "This year", "Still exploring"],
    },
    {
      id: "investment",
      question: "What investment range are you working with?",
      hint: "This only sets the scope of the conversation.",
      options: ["Under €2,000", "€2,000 – €6,000", "€6,000 – €15,000", "€15,000+", "Not sure yet"],
    },
    { id: "contact", question: "Who should I reply to?" },
    {
      id: "detail",
      question: "Anything else worth knowing?",
      hint: "Optional.",
      placeholder: "Links, constraints, context…",
      optional: true,
    },
  ],
  name: "Name",
  contact: "Email or phone",
  ready: "Ready to send",
  readyTitle: "That is everything I need to reply properly.",
  readyText:
    "Choose how you would like to send it. Nothing has been submitted yet — the message opens in your own app so you can read it first.",
  sendWhatsapp: "Send on WhatsApp",
  sendEmail: "Send by email",
  back: "Back",
  review: "Review",
  continue: "Continue",
  messageIntro: "Enquiry from {name} ({contact})",
  subject: "Project enquiry — {name}",
};
