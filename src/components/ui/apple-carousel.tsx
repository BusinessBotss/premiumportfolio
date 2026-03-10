"use client";
import { useRef, useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CardData {
    category: string;
    title: string;
    description?: string;
    src: string;
    link?: string;
    features?: string[];
    position?: string;
}

interface CarouselProps {
    cards: CardData[];
    heading?: string;
    className?: string;
}

export function AppleCarousel({ cards, heading, className }: CarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(false);
        dragStart.current = {
            x: e.pageX - (scrollRef.current?.offsetLeft ?? 0),
            scrollLeft: scrollRef.current?.scrollLeft ?? 0,
        };
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragStart.current || !scrollRef.current) return;
        const dx = e.pageX - (scrollRef.current.offsetLeft ?? 0) - dragStart.current.x;
        if (Math.abs(dx) > 5) setIsDragging(true);
        scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };

    const onMouseUp = () => { dragStart.current = null; };

    return (
        <div className={cn("w-full", className)}>
            {heading && (
                <h2 className="text-3xl md:text-5xl font-black mb-3">{heading}</h2>
            )}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none" }}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                {cards.map((card) => (
                    <CarouselCard key={card.title} card={card} isDragging={isDragging} />
                ))}
            </div>
        </div>
    );
}

function CarouselCard({ card, isDragging }: { card: CardData; isDragging: boolean }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        if (open) { document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey); }
        else document.body.style.overflow = "auto";
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    useOutsideClick(ref, () => setOpen(false));

    const handleClick = (e: React.MouseEvent) => {
        if (isDragging) { e.preventDefault(); return; }
        setOpen(true);
    };

    const fallbackGradient = "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)";

    return (
        <>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 backdrop-blur-md z-50"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 flex items-center justify-center z-[60] p-4">
                        <motion.button
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center bg-background rounded-full shadow-lg border border-border hover:bg-muted z-[70] cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-foreground"><path d="M18 6 6 18M6 6l12 12" /></svg>
                        </motion.button>
                        <motion.div
                            layoutId={`card-${card.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row bg-background rounded-3xl overflow-hidden shadow-2xl border border-border"
                        >
                            <motion.div layoutId={`img-${card.title}-${id}`} className="md:w-1/2 h-64 md:h-auto shrink-0 relative flex items-center justify-center bg-gray-50 overflow-hidden">
                                {card.src ? (
                                    <>
                                        <div
                                            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 saturate-150 scale-110"
                                            style={{ backgroundImage: `url(${card.src})` }}
                                        />
                                        <div className="relative z-10 w-full h-full">
                                            <Image
                                                src={card.src}
                                                alt={card.title}
                                                fill
                                                sizes="(min-width: 1024px) 50vw, 100vw"
                                                className="object-contain"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-6xl" style={{ background: fallbackGradient }}>
                                        {card.category === "Automation" ? "🤖" : card.category === "Design" ? "🎨" : "🖥️"}
                                    </div>
                                )}
                                <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-foreground border border-border">
                                    {card.category}
                                </span>
                            </motion.div>
                            <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto">
                                <h2 className="text-3xl font-black mb-4 text-foreground">{card.title}</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{card.description}</p>
                                {card.features && card.features.length > 0 && (
                                    <div className="mb-8">
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Key Features</p>
                                        <ul className="space-y-2">
                                            {card.features.map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-foreground/80 font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-auto">
                                    <a
                                        href={card.link || "https://wa.me/34631690524"}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-block px-8 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-all shadow-lg"
                                    >
                                        Visit Page →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                layoutId={`card-${card.title}-${id}`}
                whileHover={{ y: -6 }}
                onClick={handleClick}
                className="flex-shrink-0 w-80 md:w-96 flex flex-col bg-card-bg border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group"
            >
                <motion.div layoutId={`img-${card.title}-${id}`} className="h-52 overflow-hidden bg-gray-50 shrink-0 relative flex items-center justify-center group">
                    {card.src ? (
                        <>
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 saturate-150 scale-110"
                                style={{ backgroundImage: `url(${card.src})` }}
                            />
                            <div className="relative z-10 w-full h-full">
                                <Image
                                    src={card.src}
                                    alt={card.title}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, 90vw"
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                                    draggable={false}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: fallbackGradient }}>
                            {card.category === "Automation" ? "🤖" : card.category === "Design" ? "🎨" : "🖥️"}
                        </div>
                    )}
                </motion.div>
                <div className="p-6 flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">{card.category}</span>
                    <h3 className="text-foreground font-black text-xl leading-tight mb-2 transition-colors group-hover:text-foreground/80">{card.title}</h3>
                    {card.description && <p className="text-muted-foreground text-sm line-clamp-2">{card.description}</p>}
                    <span className="mt-4 text-xs font-bold text-foreground group-hover:underline">View Details →</span>
                </div>
            </motion.div>
        </>
    );
}
