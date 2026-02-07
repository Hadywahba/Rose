"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ResetButton from "../reset/reset-button";
import StarItem from "./components/star-item";

export default function RatingFilter() {
    // Next.js navigation hooks
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get the current active rating from the URL
    const activeRating = Number(searchParams.get("rating"));
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    // Handle rating click
    const handleRatingClick = (rating: number) => {
        const params = new URLSearchParams(searchParams);

        if (activeRating === rating) params.delete("rating");
        else params.set("rating", rating.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    // Reset rating filter
    const handleRatingReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("rating"); // remove only rating
        router.push(`${pathname}?${params.toString()}`); // keep other params like category
    };

    return (
        <div>
            {/* Header with Reset Button */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">Rating</h2>
                {/* ✅ Reusable Reset Button */}
                <ResetButton onReset={handleRatingReset} />
            </div>

            {/* Rating Stars */}
            <div className="flex flex-row items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                    <StarItem
                        key={rating}
                        rating={rating}
                        active={activeRating >= rating}
                        hoverActive={hoverRating !== null && hoverRating >= rating}
                        onMouseEnter={() => setHoverRating(rating)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => handleRatingClick(rating)}
                    />
                ))}
            </div>
        </div>
    );
}
