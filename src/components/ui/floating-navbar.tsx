"use client";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: { name: string; link: string }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);
    const lastY = useRef(0);

    useEffect(() => {
        return scrollYProgress.on("change", (val) => {
            const direction = val > lastY.current ? "down" : "up";
            setVisible(direction === "up" || val < 0.05);
            lastY.current = val;
        });
    }, [scrollYProgress]);

    return (
        <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "fixed top-6 inset-x-0 mx-auto z-[100] flex max-w-fit items-center gap-1 px-4 py-2 rounded-full border border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm",
                className
            )}
        >
            <span className="font-black text-sm mr-4 tracking-tight">ebp</span>
            {navItems.map((item) => (
                <a
                    key={item.name}
                    href={item.link}
                    className="text-gray-600 hover:text-black font-medium text-sm px-3 py-1.5 rounded-full hover:bg-gray-50 transition-all"
                >
                    {item.name}
                </a>
            ))}
            <a
                href="https://wa.me/34631690524"
                target="_blank"
                rel="noreferrer"
                className="ml-2 bg-black text-white text-sm font-bold px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
            >
                Contact
            </a>
        </motion.div>
    );
};
