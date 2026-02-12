"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation"; 
import { useSearchParams } from "next/navigation"; 

export default function ResetAll() {
    const t = useTranslations("products.filters");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const hasActiveFilters = searchParams.toString().length > 0;

    const handleResetAll = () => {
        if (!hasActiveFilters) return;
        router.push(pathname); 
    };

    return (
        <button
            onClick={handleResetAll}
            disabled={!hasActiveFilters}
            className={`flex items-center justify-center gap-1 text-sm px-4 py-2.5 h-10 w-full rounded-md transition-colors
                ${hasActiveFilters
                    ? "text-maroon-600 bg-maroon-50 hover:bg-maroon-100"
                    : "text-gray-400 bg-gray-100 cursor-not-allowed"
                }
            `}
        >
            <RotateCcw size={18} />
            <span>{t("resetAll")}</span>
        </button>
    );
}