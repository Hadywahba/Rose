"use client";

import { Star } from "lucide-react";

export type StarItemProps = {
    rating: number;
    active: boolean;
    hoverActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
};

export default function StarItem({ active, hoverActive, onMouseEnter, onMouseLeave, onClick }: StarItemProps) {
    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="flex cursor-pointer items-center transition-transform hover:scale-105"
        >
            <Star
                size={25}
                className={`stroke-yellow-500 transition-colors ${
                    hoverActive || active ? "fill-yellow-500" : "fill-none hover:fill-yellow-500 hover:stroke-yellow-500"
                }`}
            />
        </button>
    );
}
