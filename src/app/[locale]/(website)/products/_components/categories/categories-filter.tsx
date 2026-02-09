"use client";

import useInfiniteScroll from "react-infinite-scroll-hook";
import { useSearchParams } from "next/navigation";
import CategoryItem from "./categories-item";
import Loading from "@/components/shared/loading";
import ResetButton from "../reset/reset-button";
import { useInfiniteCategories } from "../../_hooks/use-categories";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function CategoriesFilters() {
    // Hooks for navigation and reading the current URL.
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Fetch categories with pagination using React Query's infinite query.
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } = useInfiniteCategories();

    // Flatten the paginated data into a single array of categories.
    const categories = data?.pages.flatMap((page) => page.categories) ?? [];

    // Get the currently selected category from the URL (if any).
    const activeCategory = searchParams.get("category");

    // Handle user clicking on a category.
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams);

        // If the clicked category is already active → remove it (unselect).
        if (activeCategory === category) {
            params.delete("category");
        } else {
            // Otherwise, set it as the active category in the URL.
            params.set("category", category);
        }

        // Update the URL with new query parameters (without full reload).
        router.push(`${pathname}?${params.toString()}`);
    };

    // Handle reset button click → clear the active category filter.
    const handleCategoryReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("category");
        router.push(`${pathname}?${params.toString()}`);
    };

    // Set up infinite scroll behavior.
    const [sentryRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        disabled: isLoading || isError,
        rootMargin: "0px 0px 400px 0px",
        delayInMs: 1000,
    });

    return (
        <div>
            {/* ===== Header Section ===== */}
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">Category</h2>

                {/* Reset button to clear the selected category */}
                <ResetButton onReset={handleCategoryReset} />
            </div>

            {/* ===== Categories List Section ===== */}
            <div className="scrollbar-thin scrollbar-thumb-[#7b1e24] scrollbar-track-transparent hover:scrollbar-thumb-[#5a1218] flex h-52 flex-col gap-1 overflow-auto  transition-all duration-300">
                {isLoading ? (
                    // Show loading spinner while categories are being fetched.
                    <div className="flex h-48 items-center justify-center">
                        <Loading label="Loading categories..." />
                    </div>
                ) : isError ? (
                    // Show error message if fetching fails.
                    <p className="text-sm text-red-500">Failed to load categories.</p>
                ) : (
                    <>
                        {/* Render all loaded categories */}
                        {categories.map((cat) => (
                            <CategoryItem
                                key={cat._id}
                                label={cat.name} // Category name
                                active={activeCategory === cat.slug} // Highlight if selected
                                image={cat.image} // Category image
                                onClick={() => handleCategoryClick(cat.slug)} // Handle click
                            />
                        ))}

                        {/* Invisible element that triggers fetching next page when in view */}
                        <div ref={sentryRef} className="h-1" />

                        {/* Show loading spinner while fetching the next page */}
                        {isFetchingNextPage && (
                            <div className="flex h-16 items-center justify-center">
                                <Loading label="Loading more..." />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}