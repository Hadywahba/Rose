import React from "react";
import { cn } from "@/lib/utility/cn.util";

// ✅ Props type
type HighlightedHeadingProps = {
    text: string; // The heading text
    highlightWidth: string; // Width of the pink highlight (after pseudo-element)
    borderWidth: string; // Width of the bottom border (before pseudo-element)
    className?: string; // ✅ Optional custom class
};

export default function HighlightedHeading({ text, highlightWidth, borderWidth, className }: HighlightedHeadingProps) {
    return (
        <h2
            style={
                {
                    "--highlight-width": highlightWidth,
                    "--border-width": borderWidth,
                } as React.CSSProperties
            }
            className={cn(
                // Base styles
                "h2 relative inline-block ps-[0.7px] pb-0.5 text-3xl font-bold text-[#741C21]",
                // Dark mode
                "dark:text-[#FFC2D0]",
                // Pink highlight (after)
                "after:absolute after:bottom-0 after:left-0 after:-z-10 after:h-4 after:w-[var(--highlight-width)] after:rounded-r-2xl after:bg-[#fdd7d7] after:content-[''] dark:after:bg-[#3F3F46]",
                // Red border (before)
                "before:absolute before:bottom-0 before:left-0 before:z-20 before:h-0.5 before:w-[var(--border-width)] before:rounded-r-2xl before:bg-[#E65073] before:content-[''] dark:before:bg-[#FF668B]",
                className
            )}
        >
            {text}
        </h2>
    );
}
