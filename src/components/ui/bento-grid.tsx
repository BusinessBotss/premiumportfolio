"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto", className)}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    tag,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    tag?: string;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "row-span-1 rounded-2xl group/bento p-6 border border-border bg-card-bg shadow-sm hover:shadow-md transition-all flex flex-col space-y-3",
                className
            )}
        >
            {header && <div className="mb-2">{header}</div>}
            <div className="flex items-start gap-3">
                {icon && (
                    <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                )}
                <div className="flex-1 min-w-0">
                    {tag && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">
                            {tag}
                        </span>
                    )}
                    <h3 className="font-black text-base leading-tight group-hover/bento:text-foreground transition-colors">
                        {title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};
