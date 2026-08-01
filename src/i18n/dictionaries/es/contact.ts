export const contact = {
  eyebrow: "Contacto",
  title: "Empezar un proyecto.",
  intro:
    "Siete preguntas cortas. Lleva aproximadamente un minuto y hace que la primera respuesta sea útil, no otra petición de contexto.",
  directWhatsapp: "¿Prefieres WhatsApp? Inicia una conversación directa",
  direct: "Directo",
  background: "Contexto",
  backgroundText:
    "Un resumen breve de cómo trabaja Business Bots Solutions, la estructura de entrega y cómo suele ser un proyecto.",
  pitchDeck: "Ver pitch deck",
};

export const enquiry = {
  steps: [
    {
      id: "building",
      question: "¿Qué estás construyendo?",
      hint: "Una frase es suficiente.",
      placeholder: "Una app de miembros para un gimnasio en Palma…",
    },
    {
      id: "support",
      question: "¿Qué tipo de apoyo necesitas?",
      options: ["Estrategia y dirección", "Diseño y marca", "Construcción y entrega", "De principio a fin"],
    },
    {
      id: "outcome",
      question: "¿Qué resultado importa más?",
      options: ["Más consultas", "Menos trabajo manual", "Una marca más fuerte", "Un nuevo mercado", "Otra cosa"],
    },
    { id: "timeline", question: "¿Cuál es el plazo?", options: ["Ahora", "Este trimestre", "Este año", "Aún explorando"] },
    {
      id: "investment",
      question: "¿Con qué rango de inversión trabajas?",
      hint: "Solo sirve para ajustar el alcance de la conversación.",
      options: ["Menos de 2.000 €", "2.000–6.000 €", "6.000–15.000 €", "15.000 €+", "Aún no lo sé"],
    },
    { id: "contact", question: "¿A quién debería responder?" },
    {
      id: "detail",
      question: "¿Algo más que deba saber?",
      hint: "Opcional.",
      placeholder: "Enlaces, limitaciones, contexto…",
      optional: true,
    },
  ],
  name: "Nombre",
  contact: "Email o teléfono",
  ready: "Listo para enviar",
  readyTitle: "Con esto puedo responderte bien.",
  readyText:
    "Elige cómo quieres enviarlo. Aún no se ha enviado nada: el mensaje se abre en tu propia app para que puedas revisarlo primero.",
  sendWhatsapp: "Enviar por WhatsApp",
  sendEmail: "Enviar por email",
  back: "Atrás",
  review: "Revisar",
  continue: "Continuar",
  messageIntro: "Consulta de {name} ({contact})",
  subject: "Consulta de proyecto — {name}",
};
