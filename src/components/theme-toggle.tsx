"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (storedTheme) return storedTheme;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "light";
    });

    useEffect(() => {
        if (typeof document === "undefined") return;
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-8 right-8 z-[100] p-3 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-border transition-all duration-300 backdrop-blur-md group shadow-xl"
            aria-label="Toggle Night Mode"
        >
            <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className={`absolute w-full h-full text-foreground transition-all duration-500 transform ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
                <Moon className={`absolute w-full h-full text-foreground transition-all duration-500 transform ${theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
            </div>
        </button>
    );
};
