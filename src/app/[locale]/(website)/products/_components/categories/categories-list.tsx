"use client";

import CategoryItem from "./categories-item";
import { Category, TransFn } from "@/lib/types/categories";

type Props = {
  categories: Category[];
  t: TransFn;
  activeCategory: string | null;
  onCategoryClick: (slug: string) => void;
};

export default function CategoriesList({
  categories,
  t,
  activeCategory,
  onCategoryClick,
}: Props) {
  // Render category items
  return (
    <>
      {categories.map((cat) => {
        const translatedLabel = t.has(`items.${cat.slug}`)
          ? t(`items.${cat.slug}`)
          : cat.name;

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
