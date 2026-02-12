"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import CategoriesList from "./categories-list";
import Loading from "@/components/shared/loading";
import ResetButton from "../reset/reset-button";
import { useInfiniteCategories } from "../../_hooks/use-categories";
import { usePathname, useRouter } from "@/i18n/navigation";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CategoriesFilters() {

    // ================= Translation =================
    const t = useTranslations("products.filters");

    // ================= Navigation =================
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // ================= Queries =================
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError
    } = useInfiniteCategories();

    // ================= Variables =================
    const categories =
        data?.pages.flatMap((page) => page.categories) ?? [];

    const activeCategory = searchParams.get("category");

    // ================= Functions =================
    const handleCategoryClick = (category: string) => {
        const params = new URLSearchParams(searchParams);

        if (activeCategory === category) {
            params.delete("category");
        } else {
            params.set("category", category);
        }

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    const handleCategoryReset = () => {
        const params = new URLSearchParams(searchParams);
        params.delete("category");

        const query = params.toString();
        router.push(query ? `${pathname}?${query}` : pathname);
    };

    // ================= Return =================
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-zinc-800">
                    {t("category")}
                </h2>

                {activeCategory && (
                    <ResetButton onReset={handleCategoryReset} />
                )}
            </div>

            <div
                id="categories-scroll"
                className="scrollbar-thin scrollbar-thumb-[#7b1e24] scrollbar-track-transparent hover:scrollbar-thumb-[#5a1218] flex h-52 flex-col gap-1 overflow-auto transition-all duration-300"
            >
                {isLoading ? (
                    <div className="flex h-48 items-center justify-center">
                        <Loading label={t("loadingCategories")} />
                    </div>
                ) : isError ? (
                    <p className="text-sm text-red-500">
                        {t("failedToLoad")}
                    </p>
                ) : (
                    <InfiniteScroll
                        dataLength={categories.length}
                        next={fetchNextPage}
                        hasMore={!!hasNextPage}
                        loader={
                            <div className="flex h-16 items-center justify-center">
                                <Loading label={t("loadingMore")} />
                            </div>
                        }
                        scrollableTarget="categories-scroll"
                        endMessage={
                            categories.length > 0 && (
                                <p className="py-2 text-center text-xs text-gray-400">
                                    {t("noMore")}
                                </p>
                            )
                        }
                    >
                        <CategoriesList
                            categories={categories}
                            t={t}
                            activeCategory={activeCategory}
                            onCategoryClick={handleCategoryClick}
                        />
                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
}
