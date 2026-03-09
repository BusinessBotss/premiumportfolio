// ── PROJECT CARDS (Apple Carousel) ────────────────────────────────────────────
// Optimized for Landscape (16:9) display.
export const projectsData = [
    {
        id: "buborant",
        category: "System",
        title: "QR Table Ordering · Buborant",
        description:
            "Sistema que automatiza pedidos escaneando un QR en mesa. Accede al menú digital y envío de pedidos a cocina/sistema interno.",
        tech: ["QR Automation", "Real-time Order", "Operational Efficiency"],
        link: "https://businessbotss.github.io/buborant/",
        src: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773083469/Screenshot_2026-03-09_at_20.11.00_mev4ei.png",
    },
    {
        id: "bubo-beach",
        category: "Website",
        title: "Bubó Beach · Reservation",
        description:
            "Interfaz digital desarrollada para restaurante y beach venue. Presentación visual clara y experiencia de reserva online.",
        tech: ["Reservation UI", "Visual Design", "Mobile Focused"],
        link: "https://businessbotss.github.io/bubobeach/",
        src: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772973944/Screenshot_2026-03-08_at_13.37.59_bwauml.png",
    },
    {
        id: "my-lounge",
        category: "Website",
        title: "My Lounge Palmanova",
        description:
            "Landing page orientada a reservas y visibilidad digital para clientes internacionales.",
        tech: ["Landing Page", "Lead Gen", "Hospitality Presence"],
        link: "https://businessbotss.github.io/myloungepalmanova/",
        src: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772964367/Screenshot_2026-03-08_at_11.04.33_bvb77g.png",
    },
    {
        id: "gym-tonic-app",
        category: "Mobile App",
        title: "Gym Tonic App",
        description:
            "App móvil para gestión de gimnasio: reservas de clases y comunicación directa.",
        tech: ["App Architecture", "Booking System", "UI Design"],
        link: "https://gymtonicapp.goodbarber.app/index.html?standalone=1",
        src: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772964332/Screenshot_2026-03-08_at_11.04.55_d9qgxb.png",
    },
];

// ── SERVICES BENTO ────────────────────────────────────────────────────────────
export const servicesData = [
    {
        title: "AI Automation",
        description: "Bots de WhatsApp y workflows que responden clientes y automatizan reservas.",
        tag: "Automation",
    },
    {
        title: "Hospitality Systems",
        description: "Infraestructuras digitales completas que simplifican operaciones de venues VIP.",
        tag: "Product",
    },
    {
        title: "Creative Branding",
        description: "Identidad visual y materiales gráficos para proyectos digitales y físicos.",
        tag: "Design",
    },
    {
        title: "Webs & Platforms",
        description: "Interfaces premium diseñadas para transformar operaciones en sistemas gestionables.",
        tag: "Architecture",
    },
    {
        title: "Digital Menus",
        description: "Sistemas dinámicos con QR, optimizados para móvil y actualización rápida.",
        tag: "F&B",
    },
    {
        title: "Content Creation",
        description: "Storytelling visual y conceptos para campañas de marcas de estilo de vida.",
        tag: "Content",
    },
];

// ── GALLERY GRID (LayoutGrid) ────────────────────────────────────────────────
// 3-column grid · auto-rows-[18rem]
// Symmetry: tall portrait anchors (row-span-2) on left/right edges,
//           landscape / square fills in the center column.
//
// Grid map (each row = 18rem):
// [col1 r1-2: IG Agent 4:5] [col2 r1: Automation 16:9]  [col3 r1-2: Campaign 9:16]
// [col1 cont.]               [col2 r2: UI Screens sq.]   [col3 cont.]
// [col1 r3-4: Walking 4:5]  [col2 r3: Charter 16:9]     [col3 r3-4: Apps 4:5]
// [col1 cont.]               [col2 r4: Menu 16:9]        [col3 cont.]
// [col1 r5: Branding sq.]   [col2 r5: Analytics sq.]    [col3 r5: Logo sq.]
// [col1 r6-7: Flyer 9:16]   [col2 r6: Dashboard 16:9]  [col3 r6-7: Event 9:16]
// [col1 cont.]               [col2 r7: TikTok sq.]       [col3 cont.]

export const galleryGridCards = [
    // ── TALL LEFT · rows 1–2: WhatsApp Agent Instagram post (4:5)
    {
        id: 1,
        content: "WhatsApp Agent — Instagram content for the AI customer service bot.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773099526/1_op0rko.png",
    },
    // ── CENTER · row 1: AI Automation Workflow (16:9)
    {
        id: 2,
        content: "AI Automation Workflow — n8n system connecting APIs, WhatsApp bots, and business data flows.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772958590/n8n_io_-_AI_workflow_automation_tool_adsl4c.jpg",
    },
    // ── TALL RIGHT · rows 1–2: Business Campaign Flyer (9:16)
    {
        id: 3,
        content: "Business Campaign — Flyer series for digital services targeting hospitality businesses.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772962729/9_gaheha.png",
    },
    // ── CENTER · row 2: UI Screens Dashboard (square)
    {
        id: 4,
        content: "UI Screens — Interface designs for digital applications and internal management tools.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773049835/IMG_4893_emtuco.jpg",
    },
    // ── TALL LEFT · rows 3–4: Walking Club Campaign (4:5)
    {
        id: 5,
        content: "Walking Club — Campaign visual for a lifestyle community event.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773099512/9_vdqsw0.png",
    },
    // ── CENTER · row 3: Charter Web Cover (16:9)
    {
        id: 6,
        content: "Charter Platform — Hero cover for a luxury charter and yachting website.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773081474/IMG_4909_heoxhm.jpg",
    },
    // ── TALL RIGHT · rows 3–4: Personalized Apps (4:5)
    {
        id: 7,
        content: "Personalized Apps — Campaign post for custom application development services.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773099511/7_piitvm.png",
    },
    // ── CENTER · row 4: Digital Menu Interface (16:9)
    {
        id: 8,
        content: "Digital Menu — Cocktail bar interface designed for mobile-first ordering in F&B venues.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772960086/Screenshot_2026-03-08_at_09.48.09_qhldai.png",
    },
    // ── LEFT · row 5: Branding (square)
    {
        id: 9,
        content: "Creative Branding — Visual identity and graphic materials for digital and physical projects.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772958059/53_kiwsbf.jpg",
    },
    // ── CENTER · row 5: TikTok Analytics (square)
    {
        id: 10,
        content: "Social Analytics — 28-day TikTok performance metrics showing content reach and engagement.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773060311/IMG_7605_gci77f.png",
    },
    // ── RIGHT · row 5: Business Bots Logo (square)
    {
        id: 11,
        content: "Business Bots — Official brand logo and visual identity for the consulting agency.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773099488/Screenshot_2025-12-01_at_13.42.12_gojw8e.png",
    },
    // ── TALL LEFT · rows 6–7: Event Flyer (9:16)
    {
        id: 12,
        content: "Event Marketing — Promotional flyer for nightlife and social events.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772962730/17_n9dz2v.png",
    },
    // ── CENTER · row 6: Fitness Dashboard (16:9)
    {
        id: 13,
        content: "Fitness Dashboard — Client management and metrics panel for fitness and coaching businesses.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772960086/Screenshot_2026-03-08_at_09.42.15_crwwgd.png",
    },
    // ── TALL RIGHT · rows 6–7: Speed Dating Event (9:16)
    {
        id: 14,
        content: "Speed Dating Event — Campaign series for premium social events in nightlife venues.",
        className: "md:col-span-1 md:row-span-2",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1772962733/19_kq9zni.png",
    },
    // ── CENTER · row 7: UI Screen Detail (square)
    {
        id: 15,
        content: "Product Interface — Web app UI reference for digital product design and modular navigation.",
        className: "md:col-span-1 md:row-span-1",
        thumbnail: "https://res.cloudinary.com/ddjl4shzl/image/upload/v1773049663/IMG_4892_rixex7.jpg",
    },
];
