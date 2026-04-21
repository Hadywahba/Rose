export async function fetchWishlistStatusAction() {
  const resp = await fetch(`/api/wishlist`, {
    cache: 'no-store',
  });

  const payload = resp.json();
  return payload;
}
