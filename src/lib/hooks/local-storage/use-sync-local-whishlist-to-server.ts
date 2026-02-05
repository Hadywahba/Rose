"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useLocalWishlist } from "./use-local-storage-whishlist";
import { addToWhishlistAction } from "@/lib/actions/whishlist/add-to-whishlist.action";

export function useSyncLocalWishlistToServer() {
  const queryClient = useQueryClient();
  const { list, remove } = useLocalWishlist();

  /**
   * Sync all local wishlist ids to server after successful login.
   * - Adds each id to server wishlist
   * - Removes successfully synced ids from localStorage
   * - Invalidates wishlist caches once at the end
   */
  const sendWhishlistProductsFromStorageToServer = useCallback(async () => {
    if (!list.length) return;

    const productIds = [...list];

    for (const productId of productIds) {
      const payload = await addToWhishlistAction(productId);

      // If server succeeded, remove from local
      if (!("error" in payload)) {
        remove(productId);
      }
    }

    // Refresh server wishlist queries once
    await queryClient.invalidateQueries({ queryKey: ["wishlist-items"] });

    // Optional: if you cache wishlist-check per product, refresh them too
    // (only needed if those components are visible now)
    await Promise.all(
      productIds.map((id) =>
        queryClient.invalidateQueries({ queryKey: ["wishlist-check", id] }),
      ),
    );
  }, [list, remove, queryClient]);

  return { sendWhishlistProductsFromStorageToServer };
}
