export interface ExperienceEntry {
    company: string;
    role: string;
    period: string;
    image?: string;
    bullets: string[];
}

export const bioData = {
    name: "Elias J Perez",
    title: "AI CONSULTANT & DESIGNER",
    tagline: "Bridging the gap between Premium Hospitality and AI Systems.",
    contact: {
        phone: "+34 631 690 524",
        email: "info@businessbots.org",
        location: "Palma de Mallorca | Dubai",
        website: "businessbotspage.web.app",
        whatsapp: "https://wa.me/34631690524",
        instagram: "https://www.instagram.com/eliasburgzzz?igsh=MTNsbGI3cHpmc2tzbA%3D%3D&utm_source=qr",
    },
    summary:
        "Mi trayectoria combina experiencia directa en hospitality premium con el desarrollo de infraestructuras digitales, automatización y aplicaciones para negocios físicos. El enfoque no es crear tecnología aislada, sino infraestructuras digitales completas que simplifiquen operaciones y mejoren la experiencia del cliente.",
    skills: [
        "Hospitality Operations",
        "AI Agent Architecture",
        "UI/UX for Business Tools",
        "Workflow Automation",
        "Brand Visual Identity",
        "Social Media Analytics",
        "VIP Experience Management",
    ],
    trackRecord: [
        { value: "3Y", label: "Hospitality VIP", detail: "Nikki Beach Mallorca" },
        { value: "5Y", label: "AI & Digital Systems", detail: "Business Bots Solutions" },
        { value: "10Y", label: "Creative Direction", detail: "2016 – 2026" },
    ],
    experience: [
        {
            company: "Nikki Beach Mallorca",
            role: "Hospitality Experience",
            period: "2022 – Present",
            image: "https://lodgedestinations.com/wp-content/uploads/2025/01/nikki-beach-mallorca-1624x1080.jpg.webp",
            bullets: [
                "Gestión de clientes internacionales.",
                "Operaciones de servicio y venues premium.",
                "Reservas y experiencias VIP.",
                "Marketing digital y dinámicas internas.",
            ],
        },
        {
            company: "Business Bots Solutions",
            role: "Founder & AI Systems Director",
            period: "2023 – Present",
            bullets: [
                "Desarrollo de infraestructuras digitales que resuelven problemas reales del sector.",
                "Automatización conversacional y workflows internos (n8n).",
                "Diseño de interfaces digitales, aplicaciones y plataformas web escalables.",
            ],
        },
    ],
};
