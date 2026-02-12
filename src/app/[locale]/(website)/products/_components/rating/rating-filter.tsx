"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import ResetButton from "../reset/reset-button";
import StarItem from "./star-item";

export default function RatingFilter() {
    const t = useTranslations("products.filters");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const ratingParam = searchParams.get("rating");
    const activeRating = ratingParam ? Number(ratingParam) : null;

    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleRatingClick = (rating: number) => {
        const params = new URLSearchParams(searchParams);

        if (activeRating === rating) {
            params.delete("rating");
        } else {
            params.set("rating", rating.toString());
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    const handleRatingReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("rating");

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">
                    {t("rating")}
                </h2>

                {activeRating && (
                    <ResetButton onReset={handleRatingReset} />
                )}
            </div>

            {/* Stars */}
            <div className="flex flex-row items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <StarItem
                        key={rating}
                        rating={rating}
                        active={activeRating !== null && activeRating >= rating}
                        hoverActive={
                            hoverRating !== null && hoverRating >= rating
                        }
                        onMouseEnter={() => setHoverRating(rating)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => handleRatingClick(rating)}
                    />
                ))}
            </div>
        </div>
    );
}
