import { fetchAllWishlistService } from '@/lib/services/wishlist/get-wishlist.service';

export const displayWishlist = async () => {
  try {
    const data = await fetchAllWishlistService();

    if (data.status === false) {
      return {
        error: new Error(data?.message),
        dataWishlist: [],
      };
    }

    return {
      error: null,
      dataWishlist: data.payload?.wishlistItems ?? [],
    };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error : new Error('Failed to fetch Wishlist'),
      dataWishlist: [],
    };
  }
};
