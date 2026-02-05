"use client";
import { useLocalWishlist } from "@/lib/hooks/local-storage/use-local-storage-whishlist";
import { useAddToWhishlist } from "@/lib/hooks/whishlist/use-add-to-whishlist";
import { useRemoveFromWhishlist } from "@/lib/hooks/whishlist/use-remove-from-whishlist";
import { useWishlistStatus } from "@/lib/hooks/whishlist/use-whishlist-status";
import { HeartMinus, HeartPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";

type ProductCardWhishlistButtonsProps = {
  productId: string;
};

export default function ProductCardWhishlistButtons({
  productId,
}: ProductCardWhishlistButtonsProps) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { add, has, remove } = useLocalWishlist();

  //Query  to check if product is in whishlist in server
  const { data } = useWishlistStatus(productId);

  // Variables
  const session = useSession();

  // derive-state
  const inServerWishlist = data?.isInWishlist ?? false;   //server
  const inInLocalStorage = has(productId);   //local-storage

  const isInWhislist =
    session.status === "authenticated" ? inServerWishlist : inInLocalStorage;
  // Mutation
  // add-to-whishlist
  const { onAddToWhishlist, addWhishlistPending } =
    useAddToWhishlist(productId);
  // remove-from-whishlist
  const { onRemoveFromWhishlist, removeWhishlistPending } =
    useRemoveFromWhishlist(productId);

  return (
    <>
      {/* add whishlist-button */}
      {!isInWhislist && (
        <button
          disabled={addWhishlistPending}
          onClick={() => {
            if (session.status === "authenticated") onAddToWhishlist();

            if (session.status === "unauthenticated") {
              add(productId);
              toast.success(t('product-added-successfully'));
            }
          }}
          className="absolute top-3 start-3 bg-white rounded-full flex items-center gap-1 text-sm text-maroon-600 overflow-hidden whitespace-nowrap w-8 hover:w-40 transition-[width] duration-300 ease-in-out p-1 group  "
        >
          <HeartPlus size={20} className="shrink-0" />
          <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            {t("add-to-wishlist")}
          </span>
        </button>
      )}

      {/* remove whishlist-button */}
      {isInWhislist && (
        <button
          disabled={removeWhishlistPending}
          onClick={() => {
            if (session.status === "authenticated") onRemoveFromWhishlist();
            if (session.status === "unauthenticated") {
              remove(productId);
              toast.success(t('product-removed-successfully-0'))
            
            }
          }}
          className="absolute top-3 start-3 bg-white rounded-full flex items-center gap-1 text-sm text-maroon-600 overflow-hidden whitespace-nowrap w-8 hover:w-48 transition-[width] duration-300 ease-in-out p-1 group  "
        >
          <HeartMinus size={20} className="shrink-0" />
          <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
            {t("remove-from-whishlist")}
          </span>
        </button>
      )}
    </>
  );
}
