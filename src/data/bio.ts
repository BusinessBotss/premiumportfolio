export interface ExperienceEntry {
    company: string;
    role: string;
    period: string;
    image?: string;
    bullets: string[];
}

export interface TestimonialEntry {
    metric: string;
    label: string;
    quote: string;
    source: string;
}

export interface ClientLogo {
    name: string;
    src?: string;
    initials: string;
}

export interface EducationEntry {
    title: string;
    issuer: string;
    year?: string;
}

export const bioData = {
    name: "Elias J Perez",
    title: "AI CONSULTANT & DESIGNER",
    tagline: "Bridging the gap between Premium Hospitality and AI Systems.",
    contact: {
        phone: "+34 644 075 065",
        email: "info@businessbots.org",
        location: "Palma de Mallorca | Dubai",
        website: "businessbotspage.web.app",
        whatsapp: "https://wa.me/34631690524",
        instagram: "https://www.instagram.com/eliasburgzzz?igsh=MTNsbGI3cHpmc2tzbA%3D%3D&utm_source=qr",
        pitchDeck: "https://pdflink.to/ourpitchdeck/",
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
        "Creative Direction",
        "Community Management",
        "Strategic Consulting",
    ],
    education: [
        { title: "Google AI Essentials", issuer: "Google", year: "2024" },
        { title: "Google Sheets & Data", issuer: "Google", year: "2024" },
        { title: "Marketing Digital", issuer: "Google", year: "2023" },
        { title: "Diseño de Interiores y Exteriores", issuer: "Curso Certificado", year: "2022" },
    ] as EducationEntry[],
    trackRecord: [
        { value: "10Y", label: "Creative Direction", detail: "Restaurantes · Charters · Lifestyle · Viñedos" },
        { value: "5Y", label: "AI & Digital Systems", detail: "Agents · Webs · Automation · Apps" },
        { value: "3Y", label: "Hospitality VIP", detail: "Nikki Beach Mallorca" },
    ],
    experience: [
        {
            company: "Business Bots Solutions",
            role: "Founder & AI Systems Director",
            period: "2023 – Present",
            bullets: [
                "Fundador y consultor principal de soluciones AI para negocios físicos.",
                "Diseño y despliegue de AI Agents, chatbots multilingues y workflows de automatización (n8n).",
                "Desarrollo de interfaces digitales, aplicaciones web y plataformas escalables.",
                "Dirección creativa y técnica de productos y servicios AI.",
            ],
        },
        {
            company: "Brand & Digital Strategy Project",
            role: "Creative & Strategic Director",
            period: "Nov 2024 – Jan 2025",
            bullets: [
                "Definición de posicionamiento, narrativa de marca y USPs para hybrid performance club.",
                "Auditoría y migración de +1.200 posts y +300 reels; centralización de activos digitales.",
                "Rediseño de identidad visual: logo, sistema tipográfico, texturas y formatos sociales.",
                "Producción de contenido Instagram en dos idiomas, gestión de comunidad y flujos de captación de leads.",
            ],
        },
        {
            company: "Nikki Beach Mallorca",
            role: "VIP Assistant",
            period: "2022 – 2025",
            image: "https://lodgedestinations.com/wp-content/uploads/2025/01/nikki-beach-mallorca-1624x1080.jpg.webp",
            bullets: [
                "Gestión de clientes internacionales en venue VIP de referencia en Mallorca.",
                "Operaciones de servicio y coordinación en events de alto perfil.",
                "Reservas, experiencias VIP y atención personalizada a clientes premium.",
                "Marketing digital interno y dinámicas de equipo.",
            ],
        },
        {
            company: "Freelance Creative Direction",
            role: "Graphic Designer & Brand Consultant",
            period: "2016 – 2022",
            bullets: [
                "10 años de trabajo gráfico y creativo para negocios locales e internacionales.",
                "Identidades visuales y materiales para pizzerías, lounge bars, charters y bodegas.",
                "Campañas sociales, menús digitales y sistemas de branding para F&B y lifestyle.",
                "Dirección visual de marcas desde cero hasta presencia digital completa.",
            ],
        },
    ] as ExperienceEntry[],
    testimonials: [
        {
            metric: "+45%",
            label: "Content Engagement",
            quote: "Business Bots transformed our customer service. The chatbot handles 80% of inquiries automatically.",
            source: "Hospitality Client",
        },
        {
            metric: "3x",
            label: "Lead Generation",
            quote: "The multilingual support opened new markets for us. We're now serving clients across Europe seamlessly.",
            source: "F&B Brand",
        },
        {
            metric: "€12K",
            label: "Monthly Savings",
            quote: "The smart restaurant system gave us real-time analytics we never had before. Game changer.",
            source: "Restaurant Group",
        },
    ] as TestimonialEntry[],
    clientLogos: [
        { name: "Nikki Beach Mallorca", initials: "NB" },
        { name: "Bubó Beach", initials: "BB" },
        { name: "My Lounge Palmanova", initials: "ML" },
        { name: "Gym Tonic", initials: "GT" },
        { name: "Buborant", initials: "BR" },
        { name: "HYBRYD", initials: "HY" },
    ] as ClientLogo[],
};
