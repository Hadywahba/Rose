"use client";

import CategoryItem from "./categories-item";

type Category = {
    _id: string;
    slug: string;
    name: string;
    image?: string;
};

type TransFn = {
    (id: string, params?: Record<string, unknown> | undefined): string;
    has: (id: string) => boolean;
};

type Props = {
    categories: Category[];
    t: TransFn;
    activeCategory: string | null;
    onCategoryClick: (slug: string) => void;
};

export default function CategoriesList({ categories, t, activeCategory, onCategoryClick }: Props) {
    return (
        <>
            {categories.map((cat) => {
                const translatedLabel = t.has(`items.${cat.slug}`) ? t(`items.${cat.slug}`) : cat.name;

                return (
                    <CategoryItem
                        key={cat._id}
                        label={translatedLabel}
                        active={activeCategory === cat.slug}
                        image={cat.image ?? ""}
                        onClick={() => onCategoryClick(cat.slug)}
                    />
                );
            })}
        </>
    );
}
