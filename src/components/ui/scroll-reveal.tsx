"use client";
import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: string;
    baseOpacity?: number;
    enableBlur?: boolean;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
}

const ScrollReveal = ({
    children,
    enableBlur = true,
    baseOpacity = 0.08,
    baseRotation = 2,
    blurStrength = 6,
    containerClassName = "",
    textClassName = "",
    rotationEnd = "bottom bottom",
    wordAnimationEnd = "bottom bottom",
}: ScrollRevealProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);

    const splitText = useMemo(() => {
        const text = typeof children === "string" ? children : "";
        return text.split(/(\s+)/).map((word, index) => {
            if (word.match(/^\s+$/)) return word;
            return (
                <span className="word" key={index} style={{ display: "inline-block" }}>
                    {word}
                </span>
            );
        });
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { transformOrigin: "0% 50%", rotate: baseRotation },
            {
                ease: "none",
                rotate: 0,
                scrollTrigger: {
                    trigger: el,
                    scroller: window,
                    start: "top bottom",
                    end: rotationEnd,
                    scrub: true,
                },
            }
        );

        const wordElements = el.querySelectorAll(".word");

        gsap.fromTo(
            wordElements,
            { opacity: baseOpacity, willChange: "opacity" },
            {
                ease: "none",
                opacity: 1,
                stagger: 0.05,
                scrollTrigger: {
                    trigger: el,
                    scroller: window,
                    start: "top bottom-=20%",
                    end: wordAnimationEnd,
                    scrub: true,
                },
            }
        );

        if (enableBlur) {
            gsap.fromTo(
                wordElements,
                { filter: `blur(${blurStrength}px)` },
                {
                    ease: "none",
                    filter: "blur(0px)",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: el,
                        scroller: window,
                        start: "top bottom-=20%",
                        end: wordAnimationEnd,
                        scrub: true,
                    },
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

    return (
        <h2
            ref={containerRef}
            className={`scroll-reveal ${containerClassName}`}
            style={{ margin: "20px 0" }}
        >
            <p
                className={`scroll-reveal-text ${textClassName}`}
                style={{
                    fontSize: "clamp(1.6rem, 4vw, 3rem)",
                    lineHeight: 1.5,
                    fontWeight: 600,
                }}
            >
                {splitText}
            </p>
        </h2>
    );
};

export default ScrollReveal;
