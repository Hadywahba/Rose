"use client";

import { Loader } from "lucide-react";
import { cn } from "@/lib/utility/tailwind-merge";

interface LoadingProps {
    size?: number;
    className?: string;
    label?: string;
}

export default function Loading({ size = 32, className, label = "Loading..." }: LoadingProps) {
    return (
        <div className={cn("mt-3 flex flex-col items-center justify-center gap-2 text-[#741C21] dark:text-[#FFC2D0]", className)}>
            <Loader size={size} className="dark:strok-[#FFC2D0] animate-spin stroke-[#741C21]" />
            {label && <span className="text-sm font-medium">{label}</span>}
        </div>
    );
}
