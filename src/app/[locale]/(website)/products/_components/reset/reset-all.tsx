"use client";

import { RotateCcw } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function ResetAll() {
    const router = useRouter();
    const pathname = usePathname();

    const handleResetAll = () => {
        // Navigate to the same path but without any query params
        router.push(pathname);
    };

    return (
        <button
            onClick={handleResetAll}
            className="flex items-center justify-center gap-0.5 text-[#A6252A] text-sm bg-[#FBEAEA] px-4 py-2.5 rounded-md h-10 hover:bg-[#FADADA] transition-colors w-full"
        >
            <RotateCcw size={18} />
            <span>Reset All</span>
        </button>
    )
}
