import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/** Editorial index numbering: 1 → "01". Used in grids and section headers. */
export function pad(n: number): string {
    return String(n).padStart(2, "0");
}
