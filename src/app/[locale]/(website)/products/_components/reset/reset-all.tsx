"use client";

import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function ResetAll() {
    const t = useTranslations("products.filters");
    const router = useRouter();
    const pathname = usePathname();

    const handleResetAll = () => {
        // Navigate to the same path but without any query params
        router.push(pathname);
    };

    return (
        <button
            onClick={handleResetAll}
            className="flex items-center justify-center gap-0.5 text-maroon-600 text-sm bg-maroon-50 hover:bg-maroon-100 px-4 py-2.5 h-10 w-full rounded-md transition-colors
"
        >
            <RotateCcw size={18} />
            <span>{t("resetAll")}</span>
        </button>
    )
}
